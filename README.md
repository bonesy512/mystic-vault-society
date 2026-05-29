# Mystic Vault Society — Next.js 16 Publishing Platform

Mystic Vault Society is a premium, service-based independent publishing guild dedicated to science fiction and fantasy (SFF) authors. Founded by authors for authors, the platform acts as a high-performance marketing hub, a professional service catalog, an immersive worldbuilding lore showcase (featuring the debut novel *Rise of the Veilbreaker* by Michael Schustereit), and a secure, decoupled e-commerce merchandise portal.

This project represents a complete architectural overhaul, replacing a legacy, bloated Managed WordPress and WooCommerce infrastructure with a lightning-fast, secure, and modern Next.js 16 App Router application optimized for Vercel Edge.

---

## 🏛️ Architecture & Core Mechanics

The platform leverages a modern, decoupled JAMstack architecture to achieve sub-millisecond edge delivery:

### 1. Partial Prerendering (PPR)
- **Static Page Layouts:** Presentations, author catalogs, and service guides are compiled as static layouts at build time to enable instant loading.
- **Dynamic Holes:** Route pages like `/shop/success` use React `<Suspense>` boundaries to isolate dynamic, request-time processing (such as query parameter checks). This allows the surrounding page shells to remain static, while streaming the dynamic checkout statuses dynamically.
- **Zero-Date Layout Footers:** Avoids dynamic runtime object instantiation (like `new Date()`) inside static layouts (such as footers) to ensure 100% compilation safety during pre-rendering stages.

### 2. Next.js 16 Component-Level Caching
- **Native Caching:** Enabled natively via `cacheComponents: true` inside the Next.js configurations.
- **Granular 'use cache' directives:** Key data-fetching modules (like fetching static books, products, or blog configurations) declare the `'use cache'` directive with set revalidation lifespans (`cacheLife('days')` or `cacheLife('hours')`) to optimize page assembly speeds.

## 📂 Dynamic Routing & Navigation

We refactored the dynamic routing directory structure to align with Next.js 16 conventions:
- **File System Refactoring:** Repaired the dynamic route folder by moving it from a percent-encoded path `src/app/authors/%5Bslug%5D/` to a standard literal Next.js dynamic path `src/app/authors/[slug]/`.
- **Interactive Navigation Menu Dropdown:** The desktop navigation bar (`src/components/layout/Navbar.tsx`) converts the static "Authors" link into a hover/click dropdown menu.
  - Clicking the primary "Authors" link routes to the `/authors` directory catalog page.
  - Hovering/focusing opens the dropdown displaying individual authors parsed from the XML: **Michael Schustereit** (Epic Sci-Fi & Dark Fantasy) and **Thomas Schustereit** (Creative Design & Illustration).
- **Mobile Navigation Sub-links:** Indented sub-links expand automatically underneath the main "Authors" menu trigger on smaller screen sizes.
- **The Team Directory Grid:** The master route at `/authors` features a responsive list mapping over the guild's roster, displaying custom corner avatar frames, detailed bio excerpts, primary literary focuses, and custom "Enter Vault" buttons.

---

## 💳 E-Commerce & Secure Fulfillment Pipelines

We replaced standard WooCommerce integrations with a lightweight, serverless pipeline:

```
[Customer clicks Buy Now]
        │
        ▼
[Stripe Server Action (stripe.ts)] ──► Redirects to Stripe Checkout
        │
        ▼ (On Success)
[Stripe Webhook Event]
        │
        ▼ (Signature Construct)
[Zod Payload Validation] ──► (Invalid: Status 400 rejection)
        │
        ├─► [Resend API] ──► Sends Transactional PDF/Email Receipt
        │
        └─► [Printify API] ──► Submits POD order to Printify fulfillment
                  │
                  ▼ (If Printify API Fails)
            [Resend Alert] ──► Notifies publisher@mysticvaultsociety.com to manually process
```

### 1. Zod-Guard Webhook Payload Parsing
- Webhook endpoints verify signatures cryptographically using the Stripe SDK.
- The resulting session object is validated at runtime against a schema (`CheckoutSessionPayloadSchema`) written in **Zod** that maps customer details, shipping address parameters, and checkout metadata.
- This structure blocks unvalidated parameters, guarding against **Prototype Pollution** or unexpected Stripe payloads.

### 2. Decoupled Fulfillment Integrations
- **Resend integration:** dispatches clean HTML transactional email receipts to buyers upon receiving the webhook event.
- **Printify REST API Integration:** maps validated shipping address structures to Printify order placement APIs.
- **Administrative Fail-Safes:** If the Printify API endpoint is down or rejects shipping details, an automated, urgent alert email containing full checkout logs is instantly fired to the publishing house for manual order creation.

---

## 🛡️ Security and Fault Tolerance Controls

We strictly adhere to enterprise-grade security and developer best practices:

- **Strict TypeScript (No `any` Casts):** No `any` type escapes are allowed in the code. All parameters are strictly defined. Caught errors use `catch (err)` formats type-guarded with `err instanceof Error`. Custom configuration overrides use exact compiler types (e.g., `typeof Stripe.API_VERSION` for API versions).
- **Environment Isolation:** Secrets are kept strictly server-side and never exposed to the client. The system uses secure environment access tags (`process.env.STRIPE_SECRET_KEY`, `process.env.RESEND_API_KEY`, etc.) exclusively.
- **Vulnerability Leak Prevention (Error Boundaries):** A dedicated layout-level error boundary at `src/app/error.tsx` catches unhandled runtime application anomalies. It masks raw system exceptions and database stack traces to protect against **Information Disclosure** vulnerabilities. It presents a themed, clean fantasy notification screen showing the secure Next.js `error.digest` ID, which administrators can match against private server logs.

---

## 🔍 Discovery & SEO Integration

- **Metadata API:** Native Next.js 16 metadata structures are declared on all page templates. Custom dynamic titles, descriptions, and OpenGraph variables are dynamically generated for book details and author biographies.
- **Dynamic Sitemaps (`src/app/sitemaps.ts`):** Programmatic sitemaps build indexes of active pathways: `/`, `/authors`, `/services`, `/shop`, `/contact`, and dynamic author slugs (e.g. `/authors/michael-schustereit`).
- **Robots Config (`src/app/robots.ts`):** Directs crawler indexes, granting crawling rights for public pages while excluding backend API structures `/api/` and payment redirection hooks `/shop/success`.

---

## 🛠️ Getting Started

### Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/mystic-vault-society.git
   cd mystic-vault-society
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment keys:**
   Create a `.env.local` file at the root:
   ```env
   # Stripe Credentials
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # Integrations
   RESEND_API_KEY=re_...
   PRINTIFY_API_KEY=pr_...
   PRINTIFY_SHOP_ID=123456
   ```
   *Note: If Stripe keys are unconfigured, local execution triggers a fail-safe redirect to a mock checkout success view for local validation.*

4. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Run production builds:**
   ```bash
   npm run build
   ```
   Verify that compilation runs cleanly and creates optimized static assets and Partial Prerendered (PPR) dynamic bundles.
