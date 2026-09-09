# Michael portfolio — phase-one foundation

The portfolio is isolated from the pre-existing estimate-comparison application. No parent application files were changed.

## Run and validate

- `npm install` installs the locked Next.js, React, TypeScript, Tailwind CSS and Motion dependencies.
- `npm run dev` starts development on port 5181.
- `npm run build` exports the production site into `out/`.
- `npm start` previews the exported site on http://127.0.0.1:5180.
- `npm run typecheck` validates TypeScript.
- `npm test` checks exported routes, internal links, metadata, project content and contact details.

## Architecture

Next.js App Router with static export, TypeScript, Tailwind utilities and a custom token-based stylesheet. Server components render the content; client components are limited to navigation, the enquiry brief, and foundational Motion interactions. Routes are `/`, `/work`, `/work/plp-estimate-unifier`, `/work/production-order-crm`, `/work/aurelis-estate`, `/about`, and `/contact`. Unknown routes render a real 404. The resume configuration is disabled until verified material is supplied.

`app/` owns routes and metadata. `components/portfolio.tsx` provides reusable project previews, case-study sections, labels, links, process, system visual, CTA, and footer. `components/interactive.tsx` contains navigation, motion, and the enquiry form. `lib/content.ts` is the typed content boundary with all extended project fields, social links, testimonials and resume configuration. `src/content.mjs` retains the supplied descriptions, capabilities, technologies, services and process text; edit these records without changing layouts. A CMS adapter can later return the same Project type.

Case studies support title, category, status, year, industry/client, hero media, overview, problem, solution, responsibilities, features, technologies, architecture/workflow, design process, challenges, outcomes, gallery, live URL and next-project navigation. Missing facts are labeled editable placeholders; typed media includes alt text and dimensions. No client, date, metric, quote or employment history has been invented.

## Design system

Charcoal #171819, warm white #f1efe9, gray #a4a6aa, blue action #5268ef and accent #8c99ff. Space Grotesk for display, DM Sans for body, system monospace for metadata. Google Fonts uses display=swap and local fallbacks. Editorial typography, generous spacing, fine borders, restrained system geometry and large concept previews establish the identity. Project artwork is explicitly conceptual, not actual application screenshots. Approved hero media and galleries replace previews through the data layer.

## Contact and placeholders

Verified contact: kyade345@gmail.com and +234 902 398 3129. Email and telephone links work directly. The enquiry form downloads a local text brief, then offers to open it in the visitor's email app. It does not store or automatically send personal information; its status does not claim delivery. A server-backed submission flow can be added later if desired.

LinkedIn, GitHub, Fiverr and Contra are non-clickable Coming soon placeholders until URLs are provided. Testimonials are empty data with an explicitly editable section. Only Aurelis has a supplied live URL; its live content could not be independently retrieved during the initial build.

## Accessibility and next phase

Semantic landmarks, native labeled controls, skip navigation, keyboard focus, Escape-to-close mobile navigation, restrained motion and reduced-motion support are included. Native links preserve browser history and anchors. No smooth-scroll hijacking or hydration-time viewport assumptions. Image records reserve dimensions and use Next Image lazy loading; no heavy 3D or scroll runtime is included. Test real devices and assistive technology before a public launch; passing automated checks is not a full accessibility audit.

Future motion work: one scroll-driven workflow, selective text and image reveals, and capable-pointer cursor responses. Introduce GSAP only if that specific sequence requires it. Keep content accessible before and during animation, retain anchor behavior, and respect reduced motion.
