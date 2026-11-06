// Project copy combines Michael's supplied tool attribution with observed public interfaces.
// Design-focus text describes the visible work; it does not claim a client's original brief or results.
export const websiteProjects = [
  {
    slug:'forge-fitness',name:'Forge Fitness',short:'A training brand with an interactive edge.',category:'Custom Development · Fitness · Concept Website',
    description:'A fitness concept website combining a bold training identity with membership comparisons, program exploration, interactive tools, and a class-schedule interface.',
    problem:'The interface brings programs, pricing, coaches, and training information into a single browsable experience.',
    outcome:'A dark, high-contrast landing page connects membership tiers and a cost estimator with training programs, schedule filters, comparison sliders, and FAQ controls. Booking is explicitly illustrative.',
    tech:['Custom code','AI-assisted coding','Claude Code'],features:['Membership comparison','Membership cost estimator','Training-program exploration','Coach profiles','Before-and-after comparison sliders','Class-schedule filters','Fitness calculator interfaces','FAQ disclosures'],url:'https://forgefitnesslanding.netlify.app/',storyMode:'design',note:'Concept website. The brand, booking flows, and promotional figures shown in its screenshots are demonstration content, not verified business results.'
  },
  {
    slug:'rise-hydration',name:'RISE Hydration',short:'A product story you can explore.',category:'Custom Development · Product Experience · Visual Website',
    description:'An immersive hydration-product website built around can imagery, four flavor identities, ingredient storytelling, and an interactive flavor presentation.',
    problem:'The design organizes a visually rich product story around the collection, ingredients, and flavor selection.',
    outcome:'Product-led compositions connect the four-flavor collection with ingredient cards, scroll-led storytelling, and direct flavor controls.',
    tech:['Custom code','AI-assisted coding','Claude Code'],features:['Four-flavor product collection','Can-led visual presentation','Interactive flavor controls','Ingredient storytelling','Section-based navigation','Waitlist entry point'],url:'https://risehydration.netlify.app/',storyMode:'design'
  },
  {
    slug:'key-tapper',name:'Key Tapper',short:'Spot the flash. Make the tap.',category:'Game Development · Lovable · Browser Experience',
    description:'A browser-based reaction game built with Lovable, inviting players to tap flashing squares across selectable grid sizes.',problem:'The game centers on a clear visual action: identify the flashing square and respond on a grid.',outcome:'A guest-play interface combines grid-based difficulty selection with session audio preferences and navigation to a leaderboard and shop.',tech:['Lovable'],features:['Flashing-square reaction gameplay','Guest-play entry','Selectable grid sizes','Locked difficulty tiers','Session audio controls','Leaderboard navigation','Shop navigation'],url:'https://rhythm-flash-mastermind.lovable.app/',storyMode:'design'
  },
  {
    slug:'svip',name:'SVIP',short:'A digital home for security experiences.',category:'Framer Development · Security Industry · Multi-page Website',
    description:'A Framer website for a security experience center, connecting its membership proposition with experience zones, industry events, and editorial content.',
    problem:'The site organizes several audience journeys: understanding the center, exploring its environments, discovering events, and finding membership information.',
    outcome:'A restrained black-and-gold visual system brings together membership calls to action, experience-zone content, event archives, and links to podcast and contact pages.',
    tech:['Framer'],features:['Membership-focused homepage','Experience-zone pages','Event and archive navigation','Image-led content sections','Podcast navigation','Responsive Framer layouts'],url:'https://www.svip.news/',storyMode:'design'
  },
  {
    slug:'capy-custom-pc',name:'CapyCustomPC',short:'From hardware specifications to a clear choice.',category:'Base44 Development · Gaming PCs · Product Website',
    description:'A Base44 website showcasing gaming PC builds through product cards, component specifications, a visual gallery, and dedicated browsing pages.',
    problem:'The product presentation connects the look of each build with its hardware specifications and browsing options.',
    outcome:'The homepage combines build-series filters, specification cards, a PC gallery, and FAQ content with navigation to the wider catalog and community pages.',
    tech:['Base44'],features:['Gaming PC product presentation','Build-series filters','Component specification cards','Dedicated builds catalog','Visual PC gallery','FAQ disclosures','Community navigation'],url:'https://cappy-custom-pc-copy-copy-4a28dc09.base44.app/',storyMode:'design',note:'The showcase covers the website and product catalog. Some custom-builder entry points are presented as coming soon.'
  },
{
  "slug": "northridge-build",
  "name": "Northridge Build Co.",
  "short": "Built around a clear project story.",
  "category": "Construction · Interactive Website · Concept Project",
  "description": "An end-to-end frontend engineering concept built with React and TypeScript, combining 18 component-based sections, a shared animation system, a live cost estimator, and a validated four-step consultation flow.",
  "problem": "The design needs to help prospective clients explore construction services, compare visual examples, and describe a potential project.",
  "outcome": "A self-contained frontend connects editorial project browsing with interactive planning tools. The implementation report documents responsive checks at seven widths from 375 to 1920 pixels, touch-form testing, and reduced-motion checks. These are project-reported results, not a fresh audit of the source site.",
  "tech": ["React 19", "TypeScript", "Vite 8", "Tailwind CSS v4", "GSAP / ScrollTrigger", "Lenis", "Framer Motion", "React Hook Form", "Zod", "Lucide React", "oxlint", "Claude Code"],
  "features": [
    "Construction project showcase",
    "Service exploration",
    "Before-and-after comparison",
    "Illustrative cost estimator",
    "Sample project timeline",
    "Stylized service-area map",
    "Multi-step consultation interface",
    "FAQ disclosures"
  ],
  "url": "https://northridge-build.netlify.app/",
  "storyMode": "design",
  "note": "Fictional company and concept website. Project details, dates, pricing, statistics, credentials, and testimonials shown in the demo are illustrative, not verified client results."
},
{
  "slug": "billora",
  "name": "Billora",
  "short": "From quote to invoice to paid.",
  "category": "Frontend Application · Invoicing · Business Tools",
  "description": "A browser-local invoicing and quotation application with a shared document editor, live financial calculations, PDF export, and payment-status tracking.",
  "problem": "Freelancers and small service businesses need a clear way to prepare quotes, turn accepted work into invoices, and track balances without a complex accounting interface.",
  "outcome": "A connected client-to-quote-to-invoice workflow combines reusable document editing with calculated balances and derived statuses. The supplied project report records 48 passing unit tests and browser verification of the acceptance workflow; these are reported implementation results, not a new financial or security audit.",
  "tech": [
    "Next.js 16",
    "TypeScript",
    "Tailwind CSS v4",
    "shadcn/ui / Radix",
    "Zustand",
    "React Hook Form",
    "Zod",
    "Recharts",
    "dnd-kit",
    "React PDF",
    "date-fns",
    "Vitest",
    "Netlify"
  ],
  "features": [
    "Shared quote and invoice editor with live A4 preview",
    "Three document templates",
    "Keyboard-accessible line-item reordering",
    "Discounts and tax calculations",
    "Quote-to-invoice conversion with duplicate prevention",
    "Partial-payment and balance tracking",
    "Client-side PDF export and print layouts",
    "Draft autosave and recovery",
    "Search, filtering, and client records",
    "Six-currency formatting"
  ],
  "url": "https://billora-invoicing.netlify.app/",
  "note": "Browser-local application with localStorage persistence. Screenshots show seeded demo records from a fresh browser session, not real customer finances. No authentication, cloud sync, email delivery, or payment-processing integration is included. Recording a payment updates local records only."
},
{
  "slug": "billora-landing",
  "name": "Billora — Product Landing Page",
  "short": "A little less admin. A clearer product story.",
  "category": "Landing Page Design · Product Storytelling · Interactive Concept",
  "description": "A standalone Billora landing-page concept using warm neutrals, editorial typography, and interactive product illustrations to explain a simpler billing experience.",
  "problem": "The design needs to introduce a billing-product concept, communicate its core flow, and make document styles tangible before visitors explore the product.",
  "outcome": "A cohesive marketing experience connects an illustrated workspace, a four-step billing story, feature panels, selectable document styles, FAQ disclosures, and clear exploration calls to action.",
  "tech": [],
  "features": [
    "Editorial hero and illustrated workspace",
    "Four-step quote-to-payment product story",
    "Client and balance feature panels",
    "Minimal, Modern, and Professional document styles",
    "Six-currency formatting presentation",
    "FAQ disclosures",
    "Reduced-motion control",
    "Product exploration calls to action"
  ],
  "url": "https://billora-beige.vercel.app/",
  "storyMode": "design",
  "note": "Standalone product landing-page concept, separate from the Billora invoicing application. All displayed workspace and document information is fictional demonstration content. The landing page collects no billing information and does not process payments."
},
{
  "slug": "sora-house",
  "name": "Sora House",
  "short": "A considered digital welcome by the Atlantic.",
  "category": "Hospitality · Hotel Website · Visual Design",
  "description": "A multi-page hospitality website with architectural imagery, refined typography, and a calm coastal palette, connecting room discovery with experiences and stay planning.",
  "problem": "The website needs to convey the atmosphere of a coastal stay while making room options, amenities, experiences, and practical information easy to explore.",
  "outcome": "An image-led experience brings room comparisons, individual room pages, a filterable gallery, and a structured stay-planning interface into one coherent journey.",
  "tech": [],
  "features": [
    "Architectural homepage and editorial storytelling",
    "Room and suite comparison",
    "Individual room pages with imagery and amenities",
    "Dining and coastal experience pages",
    "Filterable image gallery",
    "Arrival, departure, and guest selection",
    "Multi-step stay-planning interface",
    "Responsive navigation and mobile layouts"
  ],
  "url": "https://sora-house-five.vercel.app/",
  "storyMode": "design",
  "note": "The stay-planning interface lets visitors review dates, rooms, and pricing. Online reservations are not yet available, and no payment is taken."
},
{
  "slug": "velune",
  "name": "VELUNE",
  "short": "Everyday skincare. A complete shopping experience.",
  "category": "Full-Stack Ecommerce · Customer Accounts · Store Operations",
  "description": "A full-stack skincare ecommerce platform connecting a refined storefront with Supabase customer accounts, database-backed products and inventory, Stripe checkout integration, and permission-controlled store management.",
  "problem": "The shopping experience needs to help customers discover suitable products, compare their options, build a routine, and move confidently from browsing to checkout.",
  "outcome": "The implementation connects 36 products and 72 variants with customer accounts, persistent bags, inventory reservations, order snapshots, and fulfillment controls. The project report records connected-service checks across authentication, catalog, database, and management workflows, alongside Stripe sandbox verification.",
  "tech": ["Next.js 16", "React 19", "TypeScript", "Supabase Auth", "PostgreSQL", "Drizzle ORM", "Stripe", "React Hook Form", "Zod", "Tailwind CSS", "Vercel"],
  "features": [
    "Full ecommerce storefront",
    "Supabase authentication and customer accounts",
    "Stripe Checkout integration in test mode",
    "Product catalog and category collections",
    "Product detail pages with usage information",
    "Preference-led routine finder",
    "Persistent guest and customer bags with transactional merging",
    "Saved wishlists and routines",
    "Product search, filtering, and sorting",
    "Inventory reservations and immutable order snapshots",
    "Permission-controlled catalog and fulfillment management",
    "Responsive desktop and mobile shopping"
  ],
  "url": "https://velune-gray.vercel.app/",
  "note": "Stripe checkout currently runs in test mode. Hosted sign-in requires final production configuration; live billing and full-refund acceptance remain pending."
}
];
