/** Details supplied in project implementation reports; no client outcomes inferred. */
export const projectDetails: Record<string, {
 responsibilities:string[];architecture:string;designProcess:string;challenges:string;
}> = {
 'northridge-build': {
  responsibilities: ['End-to-end frontend architecture and implementation with Claude Code', 'Design and build of 18 sections and shared navigation/footer', 'Reusable animation primitives and scroll interaction engineering', 'Client-side pricing model and validated consultation flow', 'Photography sourcing, optimization, and attribution', 'Responsive, keyboard, touch, and reduced-motion verification'],
  architecture: 'React 19 and TypeScript run on Vite 8, with Tailwind CSS v4 for styling. Section-based component trees share a scoped useGsapContext hook and MaskLine/revealLines text-reveal primitives. GSAP and ScrollTrigger coordinate scroll motion, Lenis handles scrolling, and Framer Motion handles component interactions. A separate pricing module computes illustrative ranges from project type, area, and finish level. React Hook Form and Zod validate each consultation step; an isolated submitConsultation function provides a future API integration point. The current project has no backend or CMS.',
  designProcess: 'The concept combines restrained architectural imagery, editorial layouts, and application-style planning tools. The supplied report documents iterative implementation and browser verification with Claude Code. Thirty-two Pexels photos were sourced and credited by photographer, then re-encoded locally after the source CDN quality parameter failed to reduce payload. The report records a reduction from approximately 20 MB to under 8 MB. Fictional statistics, credentials, testimonials, and pricing are labeled in the interface; the service-area graphic is explicitly a stylized visualization.',
  challenges: 'A blurred header changed the containing block of its fixed mobile menu; moving the overlay to a sibling restored viewport coverage. Lenis stop/start calls prevented scrolling behind the open menu. Centralized in-page navigation removed competing native and Lenis scroll animations. Separate outer and inner elements prevented GSAP scroll transforms from overwriting Framer Motion hover transforms. The report documents menu checks at eight scroll depths, touch-form completion, transform inspection, and reduced-motion checks that suppress ambient effects while retaining entrance reveals.'
 },
 'billora':{
  "responsibilities": [
    "Frontend application architecture and responsive interface implementation",
    "Shared document builder, previews, PDF and print output",
    "Calculation, status, and conversion logic",
    "Local persistence and domain-state management",
    "Validation, regression testing, and browser audit fixes"
  ],
  "architecture": "Next.js App Router provides thin route wrappers over domain components. Separate libraries own calculations, status derivation, currency formatting, dates, storage, and PDF generation. Zustand stores connect each domain entity to a dedicated localStorage repository. React Hook Form and Zod handle validation, while dnd-kit enables line-item reordering. The quote and invoice editor shares a document model and preview; React PDF produces client-side documents. There is no backend or cloud persistence.",
  "designProcess": "The supplied report describes phased development from domain types and pure calculations through client management, document editing, conversion, payments, dashboards, and output. The interface uses shared design tokens and accessible Radix primitives. Desktop shows editor and preview side by side; mobile renders Edit/Preview tabs. A later browser audit exercised the complete billing flow and added error boundaries, loading states, metadata, and regression coverage.",
  "challenges": "The audit corrected a broken command-palette wrapper, false autosave/recovery feedback under React development double invocation, CSS Grid overflow near 1024 pixels, and duplicate mobile/desktop editor trees. Centralized status derivation handles draft, partial, paid, and overdue states; discounts are capped, tax follows discounts, and a shared rounding helper is used. The report records 48 tests covering calculation, status, conversion, and numbering logic, plus browser verification of quote conversion, payments, PDF export, and persistence."
},
 'velune':{
  "responsibilities": [
    "Product experience and responsive storefront design",
    "Visual identity, reusable components, and approved media integration",
    "Server-side authentication and customer-continuity flows",
    "PostgreSQL schema, catalog, cart, inventory, and order services",
    "Stripe sandbox checkout and provider-event handling",
    "Permission-controlled store management and fulfillment",
    "Accessibility, loading, SEO, and implementation verification"
  ],
  "architecture": "Next.js 16 App Router, React 19, and strict TypeScript form a modular monolith with explicit feature boundaries. Supabase Auth handles identity; Drizzle accesses a private PostgreSQL commerce schema through server-side services. The recorded schema contains 59 application tables. Server code verifies ownership and staff permissions before protected reads and mutations. Stripe test Checkout uses durable idempotency keys, signed webhooks, and a provider-event inbox. Orders retain item and price snapshots; inventory reservations, payments, refunds, and fulfillment have separate lifecycle records.",
  "designProcess": "A custom V identity, warm ivory and plum palette, and self-hosted Space Grotesk and Manrope connect the storefront with account and staff interfaces. Category browsing, texture guidance, and a three-question routine finder help customers discover products. The implementation progressed through storefront design, service integration, management workflows, authentication continuity, loading recovery, and SEO. Approved product and campaign imagery was generated through Higgsfield and integrated as local assets. Photography remains a mix of reviewed imagery and packaging illustrations.",
  "challenges": "Guest selections needed to survive authentication without duplicate merges or cross-account state leaks. Validated return paths, transactional bag restoration, expiring save intentions, and identity-aware request invalidation address that continuity. Server-authoritative prices, integer minor units, inventory locks, and idempotent mutations protect commerce state. Fulfillment checks reject ineligible orders and concurrent over-shipment. Loading work coordinates the full page reveal and shares database reads; hydration-safe motion avoids mutating server markers. The report records 13 local authentication checks, 23 committed-schema checks, and sandbox payment verification. These are implementation records, not a fresh production or security audit."
}
};
