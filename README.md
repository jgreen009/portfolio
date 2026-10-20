# Michael’s portfolio — local development

The application stays inside `portfolio/`. It is a Next.js App Router static export with TypeScript, Tailwind CSS, custom design tokens, and Motion. No hosting or delivery provider is configured.

## Commands

Run these from this directory:

- `npm ci`: install the lockfile dependencies (network required for uncached packages).
- `npm run dev`: development server, port 5181.
- `npm run build`: production export into `out/`; no font-download request is needed.
- `npm start`: local production preview, port 5180. An alternative is `npm start -- --port 5190`.
- `npm run typecheck`: TypeScript validation.
- `npm test`: regression checks against an existing local export with `NEXT_PUBLIC_SITE_URL` unset.
- `npm run test:e2e`: browser interactions and responsive screenshots.
- `npm run test:a11y`: axe accessibility scans.
- `npm run test:all`: typecheck, production build, export tests, then browser tests.
- `npm run audit`: six production browser measurements with explicit network/CPU throttling, saved to `audit-results/browser-performance.json`. These are not Lighthouse scores.
- `npm run test:seo`: builds with a reserved test origin, verifies metadata, then restores the local export. Run separately from preview tests.
- `npm run audit:lighthouse`: optional scored audit; requires a successful `npm install -D lighthouse` first. Repeated registry connection resets prevented this dependency from being installed during Phase 3.
- `npm run assets:generate`: regenerate the nine share images and two PNG icons locally.

Browser tools use installed Microsoft Edge by default. Set `PLAYWRIGHT_CHANNEL` to another installed Playwright-supported Chromium channel when needed; set `BROWSER_EXECUTABLE` for the Lighthouse browser executable on another machine. Browser testing requires permission to launch processes. E2E owns port 5187; performance audits own port 5188. Both refuse a conflicting server and clean up their own preview. Build before testing; do not run browser suites concurrently on the same port. Generated screenshots, traces and audit artifacts remain local and are ignored by Git.

## Routes and component structure

| Route | Purpose |
| --- | --- |
| `/` | Positioning, expertise, work, six-stage workflow, services, ecosystem, about, contact |
| `/work/` | Selected-work archive |
| `/work/plp-estimate-unifier/` | PLP case study |
| `/work/production-order-crm/` | Production Board and Order CRM case study |
| `/work/aurelis-estate/` | Aurelis Estate case study |
| `/work/forge-fitness/` | Forge Fitness case study |
| `/work/rise-hydration/` | RISE Hydration case study |
| `/work/key-tapper/` | Key Tapper case study |
| `/work/svip/` | SVIP case study |
| `/work/capy-custom-pc/` | CapyCustomPC case study |
| `/about/` | Michael’s approach and capabilities |
| `/contact/` | Direct contact and local brief preparation |

Unknown URLs return the custom 404. `app/` owns routes, metadata, sitemap and robots output. `components/portfolio.tsx` owns shared server-rendered project layouts and sections. `interactive.tsx` owns navigation; `enquiry.tsx` owns the contact UI. `motion.tsx`, `systems.tsx`, `workflow.tsx`, and the client workflow loader retain the Phase 2 animation system. `project-illustrations.tsx` contains original editorial system diagrams. `lib/motion.ts` holds animation tokens. `src/styles.css`, `app/globals.css`, and `app/phase-two.css` hold the approved design system and responsive styles.

## Content editing and visibility

Edit original project copy in `src/content.mjs` and the five added website/game records in `src/website-projects.mjs`. Screenshot paths, alt text, captions and intrinsic dimensions live in `src/project-media.json`; files live under `public/projects/<slug>/`. The archive has eight projects; four are featured on the homepage. Extended project fields, readiness, social profiles, testimonials, and résumé configuration live in `lib/content.ts`. Preserve the `Project` shape if a future CMS replaces the local data source. `outcome` currently contains the supplied solution narrative; it is not evidence of measured results.

Optional fields use `draft`, `verified`, `hidden`, or `comingSoon`. Only `verified` fields with actual values render. Do not mark something verified merely to fill a section. Case studies omit missing dates, clients, responsibilities, engineering details, metrics and galleries. Their existing descriptions, capabilities, tools and conceptual illustrations remain visible. No placeholder label or empty card is needed for spacing.

Social profiles require `state: 'verified'` and a valid HTTPS URL. Add actual LinkedIn, GitHub, Fiverr and Contra addresses to `socialLinks`; unavailable links remain absent. Testimonials require a verified state, genuine quote and name, plus permission to publish. The entire section is absent while its filtered list is empty. Résumé remains disabled and has no public navigation; adding a résumé route/download requires reviewed content and a deliberate implementation.

For project media, add local optimized WebP/AVIF/PNG files under `public/`, set an absolute site path such as `/projects/approved-image.webp`, meaningful alt text, and real intrinsic width/height. Entries in `src/project-media.json` automatically supply verified hero and gallery media. Use permission-cleared screenshots without private customer data. Aim for under 250 KB per screenshot where feasible. Reserve aspect ratios; non-critical images are lazy-loaded by default; the About portrait and case-study covers are prioritized. Static export uses unoptimized Next Image, so prepare assets at sensible display sizes yourself. Existing editorial diagrams are explicitly labeled CONCEPT PREVIEW.

See `docs/content-readiness.md` for pending content.

## Fonts, SEO and sharing

Space Grotesk and DM Sans are installed as versioned Fontsource variable-font packages and emitted locally through `next/font/local`, with swap and adjusted Arial fallbacks. Runtime Google Fonts requests are removed. Font licenses are included in their npm packages. An uncached `npm ci` needs package-registry access; building with installed dependencies does not need remote fonts.

`lib/seo.ts` supplies unique route titles/descriptions, Open Graph and X cards, and verified JSON-LD. `lib/site-url.mjs` validates `NEXT_PUBLIC_SITE_URL`. Copy `.env.example` to `.env.local` when the final address is known. The required value is the **exact approved public HTTPS origin**, with no path, query, fragment or credentials. No final value has been supplied; leave it empty now. Never enter localhost or guess a domain.

With the variable unset, the site builds locally, emits no canonical or absolute share-image URL, uses noindex/nofollow, disallows robots, and exports a sitemap with no URLs. With a valid configured origin, a fresh build emits canonical URLs, absolute OG/X image URLs, twelve sitemap entries, allowed robots, and origin-dependent WebSite/BreadcrumbList schema. Person, ProfilePage and project CreativeWork data use supplied facts only. A local-only preview is intentionally not indexable; this lowers its Lighthouse SEO score.

Share assets are static 1200×630 PNGs in `public/og/`: `portfolio.png`, `plp-estimate-unifier.png`, `production-order-crm.png`, `aurelis-estate.png`, and one image for each of the five added projects. They use original CSS geometry and installed fonts, with no stock or AI imagery. Icons are `public/favicon.svg`, `public/icons/icon-192.png`, and `public/icons/apple-touch-icon.png`. Regenerate with the local script only when titles/design change; builds consume committed assets.

## Contact and future delivery

Verified email: `mikkyade345@gmail.com`. Phone: `+234 902 398 3129`. The form validates locally, focuses an error summary, downloads a dated text brief, and announces that nothing was sent. Editing fields invalidates prepared text. Copy-email and copy-brief actions include feedback; denied clipboard access selects the prepared brief for manual copying. Short briefs get a fully encoded mailto body; long briefs use an email handoff with instructions to copy text or attach the file. Sending remains the visitor’s action in their configured mail app. No form data is stored or submitted by this application.

`lib/submission.ts` defines a future `SubmissionAdapter` and typed payload/result. A later approved server endpoint or edge function can implement it. No provider is chosen. Never put delivery API keys in `NEXT_PUBLIC_*`, browser code, or this static export. A direct delivery integration requires its own infrastructure, consent, error handling, security and privacy review.

## Before any future deployment

Obtain explicit publishing instructions, the exact production origin, and hosting decisions. Add approved content where ready; remaining optional content may stay hidden. Rebuild with the approved origin, verify generated canonicals/robots/sitemap/share URLs, and rerun tests/audits. Verify the host serves `404.html` with a 404 status, static MIME types, response compression and suitable caching/security headers. Check email handoff on physical phones and assistive-technology navigation. No automated result constitutes full accessibility certification. Current evidence and limitations are in `report.md`.

## Final motion and local verification

The final polish keeps Motion and native scrolling. Shared JS and CSS tokens come from lib/motion.ts. The activity hook in lib/use-motion-activity.ts gates foreground/viewport playback. components/polish.tsx supplies bounded button content movement, local depth, project sequencing and case-section navigation. components/concept-playback.tsx adds finite editorial demonstrations; components/workflow.tsx rearranges a small SVG system at stage intersections. app/polish.css holds supporting interactions and reduced-motion overrides.

The primary CTA keeps a fixed hit area; only its content moves up to four pixels. Touch and reduced-motion modes disable pointer movement. Hero cycling pauses for eight seconds after manual selection, remains paused while controls hold focus, and stops offscreen or in hidden documents. Project demonstrations finish after four steps rather than looping. Screenshots open directly through native image links. There is no new gallery-dialog dependency, exit-transition delay, scroll hijacking or GSAP runtime.

The current project paths are /work/key-tapper/ and /work/capy-custom-pc/. Their local media and social-card filenames match. Earlier reports retain historical route names; their replacements are recorded in the current report. Source-site live URLs retain their original spelling.

The preview server serves JPEG/WebP MIME types and maps Windows-exported nested Next segment payloads to the dot-separated prefetch requests made by App Router. Deployment remains separate: a future static host must support the exported asset layout or be validated with a fresh build on that host.

Browser tests include six viewport widths (360, 390, 768, 1024, 1440, 1920), disabled JavaScript, keyboard, actual browser reduced-motion emulation, pointer bounds, lifecycle event suspension, all screenshot decoding and the headshot. JSON results are written to audit-results/playwright-edge.json by default. Set PLAYWRIGHT_CHANNEL=chromium and PLAYWRIGHT_RESULTS_FILE to a different local filename to test the installed Chromium channel separately. See report.md for actual executed results and limits.
