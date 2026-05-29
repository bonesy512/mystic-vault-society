# Checklist — SEO Architecture & Interactive Tools

- `[x]` Local & Global SEO Schemas
  - `[x]` Embed JSON-LD LocalBusiness/Organization schema in `src/app/layout.tsx`
  - `[x]` Update layout/footer elements to highlight Austin local consultations (Lakeway, Bee Cave, West Lake Hills)
  - `[x]` Embed JSON-LD E-E-A-T schemas (ProfilePage/Person) in `src/app/authors/[slug]/page.tsx`
  - `[x]` Embed JSON-LD E-E-A-T schemas (Article/BlogPosting) in `src/app/blog/[slug]/page.tsx`
- `[x]` Interactive Components
  - `[x]` Create `src/components/tools/Quiz.tsx` (Publishing Readiness Quiz)
  - `[x]` Create `src/components/tools/Timeline.tsx` (Rise of the Veilbreaker Lore Timeline)
  - `[x]` Create `src/components/tools/BriefBuilder.tsx` (Book Cover Brief Builder)
- `[x]` Routing & Page Integration
  - `[x]` Create `/tools/quiz` page view
  - `[x]` Create `/tools/timeline` page view
  - `[x]` Create `/tools/brief-builder` page view
  - `[x]` Link tools inside `Navbar.tsx`, `/services`, or `/shop`
- `[x]` Verification & Documentation
  - `[x]` Run build `npm run build` to verify compilation
  - `[x]` Update `docs/task.md` and `docs/walkthrough.md`

---

# Checklist — Vercel Web Analytics Integration

- `[x]` Tooling Installation
  - `[x]` Install Vercel CLI globally (`npm i -g vercel`)
  - `[x]` Install Vercel Analytics package (`npm i @vercel/analytics`)
- `[x]` Root Layout Integration
  - `[x]` Import `Analytics` from `@vercel/analytics/react` in `src/app/layout.tsx`
  - `[x]` Embed `<Analytics />` inside the root layout body (before `<Navbar />`)
- `[x]` Verification & Documentation
  - `[x]` Run build `npm run build` to verify zero compilation errors
  - `[x]` Update `docs/task.md` and `docs/walkthrough.md`
