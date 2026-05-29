# Decision Log — Mystic Vault Society (Next.js 16 Migration)

This document captures the structured multi-agent design review process for the Mystic Vault Society platform migration from WordPress/WooCommerce to Next.js 16.

---

## Phase 1: Lead Designer's Proposal

### 1. Theme & Styling
- **Obsidian Dark Aesthetic:** Global background (`#0B0B0C`), foreground (`#F5F5F7`), Crimson/Burgundy Accent (`#722F37` / `@/642b36` in DIVI), and deep slate grays for cards (`#161618` and `#232526`).
- **Typography:** Using Google Font `Outfit` or `Inter` via `next/font/google`.
- **Components:** Shadcn/ui (Radix UI primitives) styled using standard CSS variables matching the dark fantasy theme.

### 2. Architecture & Routing
- **App Router Layout:** 
  - `app/layout.tsx` (Global Shell with header navigation and footer)
  - `app/page.tsx` (Cinematic hero landing page)
  - `app/authors/[slug]/page.tsx` (Author profiles, specifically Michael Schustereit)
  - `app/services/page.tsx` (Tiered service catalog with interactive cards)
  - `app/shop/page.tsx` (Decoupled Stripe-driven shop)
  - `app/api/webhooks/stripe/route.ts` (Stripe fulfillment)
  - `app/actions/stripe.ts` (Server Action to initiate checkout sessions)
- **Content Layer:** MDX using `@next/mdx` for worldbuilding blogs and author narratives. Custom loaders to render files under `content/posts/` and `content/authors/`.

### 3. Decoupled E-Commerce & Operations
- **Stripe Server Action:** Securely creates sessions, accepts order metadata, returns URL to client.
- **Webhook Handlers:** Receives `checkout.session.completed` on edge runtime.
- **Printify Integration:** Server-side POST fetch to Printify's order endpoint with payload mapping customer details and line items (bookmarks, t-shirts, etc.).
- **System Messaging:** Resend + React Email for transactional receipt emails on checkout success or contact form submission.
- **Database:** Prisma ORM connected to Supabase (PostgreSQL) for user accounts, checkout sessions, and order logging.

---

## Phase 2: Structured Review Loop

### 1️⃣ Skeptic / Challenger Review

**Objection 1: Prisma Client on Vercel Edge**
- *Objection:* You specified deployment to Vercel Edge Architecture. The standard Prisma Client is NOT compatible with Vercel Edge runtimes without a data proxy (like Prisma Accelerate) due to native binary requirements. Connecting directly to Supabase from the Edge will crash.
- *Designer Response:* We will use `pg` or `@neondatabase/serverless` (or Supabase's JS library) directly in the edge handler, or we will configure the API routes to run on the standard Node.js Serverless runtime (default) rather than the Edge runtime for DB-heavy mutations, while using Edge/PPR for static shell pages. We will use Prisma on the serverless node runtime for the webhooks, as webhooks do not require Edge runtime latency.
- *Resolution:* API route handlers for Stripe webhooks and database calls will run on Node.js Serverless runtime. All static presentation routes will run on Edge.

**Objection 2: Printify API Failure / Order Loss**
- *Objection:* Ingestion of a Stripe checkout webhook to trigger Printify on-demand order placement is highly fragile. If the Printify API is down, or if shipping validation fails (e.g. wrong address), the order is lost in Stripe but unpaid or unfulfilled in Printify.
- *Designer Response:* We will implement database logging for orders. When the Stripe webhook fires, it will write the order status to Supabase as `PENDING_FULFILLMENT`. It will then attempt to call Printify. If the Printify call succeeds, it updates the status to `FULFILLED`. If it fails, it logs the error, marks the status as `FAILED_FULFILLMENT`, and triggers a Resend email alert to MVS admins (`publisher@mysticvaultsociety.com`) to manually resolve the order.
- *Resolution:* Add database-backed state tracking and transactional fallback notifications for order fulfillment.

**Objection 3: YAGNI on Supabase/Prisma for a service guild**
- *Objection:* The WordPress XML lists only 3 authors and 7 merchandise products. Why introduce Prisma + Supabase for order relational states when WooCommerce plugins are replaced by Stripe Checkout? Stripe stores all customer, metadata, and payment information natively. Using Prisma + Supabase adds database management overhead.
- *Designer Response:* Excellent point. The society is a boutique independent publishing guild, publishing "up to ten books a year." Customer data, orders, and products can be managed directly via Stripe (Stripe Dashboard acts as the CRM and order book). However, storing user inquiries and active authors/books on disk via MDX/JSON is highly maintainable and zero-cost. We can eliminate the relational database entirely for the initial migration, relying on Stripe's metadata for order details and Resend for customer receipts. This represents a massive reduction in complexity.
- *Resolution:* Eliminate Prisma + Supabase database dependency. Rely on Stripe Dashboard, Stripe Checkout Metadata, and programmatic Resend emails for transactional record-keeping.

---

### 2️⃣ Constraint Guardian Review

**Objection 1: Next.js 16 Caching & Partial Prerendering (PPR)**
- *Objection:* Enabling `cacheComponents: true` in Next.js 16 requires strict isolation of dynamic inputs (headers, cookies, searchParams, and Stripe cart badges) from static shell components. If you fetch Stripe cart badges or user data in layout header without suspense, the entire site falls back to dynamic rendering, defeating PPR.
- *Designer Response:* We will implement the global shell (`layout.tsx`) as 100% static. The Navigation Bar component (`Navbar.tsx`) will be static. The e-commerce shopping cart badge (which tracks items dynamically in localStorage/client-side) will be imported as a client-side component with `ssr: false` or wrapped inside a `<Suspense fallback={<CartBadgeSkeleton />}>` boundary so the surrounding layout can be fully prerendered.
- *Resolution:* Cart badges and dynamic parts are isolated within client-side components wrapped in `<Suspense>` boundaries.

**Objection 2: Granular 'use cache' directives**
- *Objection:* Next.js 16's `'use cache'` is powerful but can cache stale data (like product prices or stock availability) indefinitely unless explicit cache lifetimes are defined.
- *Designer Response:* We will fetch shop products statically from the Stripe API during build time, but we will add cache revalidation (`cacheLife('hours')` or 3600 seconds) on functions that retrieve products from Stripe.
- *Resolution:* Implement `'use cache'` at the Stripe fetch function level with explicit revalidation settings (`cacheLife('hours')`).

**Objection 3: Environment Secret Safety**
- *Objection:* Using Resend, Stripe, and Printify require API secrets. If any Server Action accidentally exposes these keys or runs them on the client side, the platform is compromised.
- *Designer Response:* We will strictly prefix client-exposed variables with `NEXT_PUBLIC_` (none are needed for Stripe/Printify backend keys). We will use `stripe-node` and fetch calls only inside backend Route Handlers (`app/api/...`) and Server Actions (`app/actions/...`) which run strictly server-side.
- *Resolution:* Strict enforcement of Server Action environment isolation.

---

### 3️⃣ User Advocate Review

**Objection 1: Cart Checkout Redirection Experience**
- *Objection:* If users click "Buy Now" on merchandise or services, a slow API response while initiating `stripe.checkout.sessions.create()` will leave them clicking repeatedly with no feedback, making the UI feel broken.
- *Designer Response:* We will implement button loading states. When a user clicks "Buy", the button will show a loading spinner, disable itself, and use a transition state via React's `useTransition` to handle the Server Action execution cleanly.
- *Resolution:* Add unified loading animations and button-disabling states to all e-commerce actions.

**Objection 2: Contact Form Feedback**
- *Objection:* In the WordPress site, the contact form used DIVI's built-in mailer. A custom Resend contact form needs clear visual validation (error boundaries for empty fields, confirmation alerts on success) that aligns with the atmospheric dark fantasy aesthetic.
- *Designer Response:* We will build a contact form component using React Server Actions and `useActionState`. On success, it displays a beautiful crimson success card. On failure, it shows inline red-alert highlights.
- *Resolution:* Use `useActionState` to handle contact form states with atmospheric visual feedback.

---

## Phase 3: Integration & Arbitration

### Arbiter Decisions
1. **Database:** APPROVED the elimination of Prisma + Supabase. This reduces infrastructure costs, removes database connection pooling issues on Vercel, and keeps the project highly portable.
2. **Next.js 16 Caching & PPR:** APPROVED. The main shell is static. The cart icon will use client-side hydration isolation.
3. **Stripe/Printify Webhook:** APPROVED Node.js serverless runtime for webhook API to ensure compatibility with standard fetch APIs and libraries.
4. **Order Failure Notifications:** APPROVED. Webhook failure will send automatic administrative emails using Resend to MVS admins.

**Final Disposition: APPROVED**
*Reasoning:* The proposed design reduces legacy complexity, cuts database overhead, maximizes Edge/PPR performance, and provides robust checkout and contact channels.

---

## Phase 4: Strict Type Safety & Security Refinements

### 1. Zero 'any' Casting Enforcement
- **Stripe apiVersion Cast:** The Stripe Node SDK version (`22.2.0`) typed configuration constraints limit custom version configurations. We implemented a type-safe cast using `as unknown as typeof Stripe.API_VERSION` rather than raw `any` types. This enforces strict compiler compliance while allowing custom API version declarations.
- **Secure Exception Catches:** Refactored all Stripe Server Action and Webhook routing catch blocks from `catch (err: any)` to strict `catch (err)` formats, using type checking blocks (`err instanceof Error`) to capture string exception messages safely.

### 2. Runtime Payload Validation via Zod
- **Stripe Webhook Guarding:** Integrated `zod` schema definitions (`CheckoutSessionPayloadSchema`) directly in the webhook handler endpoint.
- **Prototype Injection Protection:** Validating the webhook payload checks standard properties (`id`, `amount_total`, `customer_details`, `metadata`, `shipping_details`) explicitly. This prevents Prototype Pollution vulnerabilities by rejecting unvalidated payload properties at runtime.
- **Resilient Address Parsing:** Defined nested schemas for Stripe addresses (`city`, `state`, `line1`, `line2`, `postal_code`, `country`) so that custom Printify order fulfillment mapping runs under fully-typed properties, removing type evasions.

### 3. Masked Exception Error Boundaries
- **Cryptographic Log Referencing:** Exposes only the Next.js standard secure `error.digest` to end-users, enabling administrators to search server-side logs securely for debugging without publishing the stack trace to the public interface.

---

## Phase 5: Blog Ingestion & Compiler Compatibility

### 1. Ingestion Strategy
- Parsed the legacy WordPress XML (`mysticvaultsociety.WordPress.2026-05-29.xml`) to extract `post` type nodes.
- Ingested 6 published posts cleanly into a static data file `src/data/posts.ts` containing safe string escapes.

### 2. Caching & PPR Coexistence
- **Objection:** During compilation, Next.js 16 rejected `export const experimental_ppr = true` inside `src/app/blog/page.tsx`, reporting a conflict with `nextConfig.cacheComponents: true`.
- **Resolution:** Omitted route-level `experimental_ppr = true` from the static directory view (`src/app/blog/page.tsx`) to prioritize component caching optimizations. Under Next.js 16, component caching provides equivalent performance gains for static hubs while remaining fully compatible with the compiler rules.
- **Dynamic Segment PPR:** Suspensed the dynamic post details inside `src/app/blog/[slug]/page.tsx` within `<Suspense>` to preserve the global shell's static prerendering structure.

