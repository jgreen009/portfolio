# Phase 3 handover — Michael’s portfolio

Date: 10 September 2026  
Status: Implemented locally, with the scored Lighthouse audit still pending because dependency downloads repeatedly failed. No deployment was performed.

## Outcome and scope

Phase 3 keeps the approved Phase 2 design, seven routes, motion, operational hero, six-stage workflow, editorial project illustrations, native navigation, and static export. Public placeholder clutter is removed. SEO, static sharing assets, local fonts, accessible contact preparation, browser tests and content-readiness documentation are in place. The unrelated parent application was not modified.

The verified email remains `mikkyade345@gmail.com`; the phone remains `+234 902 398 3129`. Aurelis retains `https://aurelis-estate.netlify.app/`. Production Board and Order CRM retains “Phase 2 complete”. No clients, dates, results, metrics, quotes, surname or social profiles were invented.

Phase 1 and Phase 2 handovers are preserved in `docs/phase-1-report.md` and `docs/phase-2-report.md`.

## Site structure

| Route | Content |
| --- | --- |
| `/` | Hero, expertise, selected work, workflow, services, ecosystem, about preview, contact CTA |
| `/work/` | Three-project archive |
| `/work/plp-estimate-unifier/` | Document-intelligence case study |
| `/work/production-order-crm/` | Production CRM case study |
| `/work/aurelis-estate/` | Visual-development case study and supplied live link |
| `/about/` | About Michael and his six-stage approach |
| `/contact/` | Direct contact, copy email, and local project-brief preparation |

Unknown URLs return the custom 404 with a 404 HTTP status. Navigation and footer are shared. The missing testimonial section is omitted, so About flows directly into the final CTA. Automation remains a primary service, and Webflow/Framer remain prominent.

Case studies show supplied overview, business problem, solution, capabilities and tools, followed by next-project navigation and contact. Known status/industry facts remain. Missing optional facts and sections do not render. Existing diagrams remain explicitly marked CONCEPT PREVIEW; they are editorial system visuals, not application screenshots.

## Main files changed or added in Phase 3

| Files | Purpose |
| --- | --- |
| `lib/content.ts` | Typed draft/verified/hidden/comingSoon states, optional field readiness, public testimonial/social filters |
| `components/portfolio.tsx`, `app/page.tsx` | Conditional public content and cleaner case-study sequence |
| `lib/site-url.mjs`, `lib/seo.ts` | Origin validation and centralized metadata/schema |
| `components/structured-data.tsx` | Safely serialized JSON-LD |
| `app/layout.tsx`, all route pages, `app/not-found.tsx` | Local fonts, route metadata and structured data |
| `app/robots.ts`, `app/sitemap.ts`, `.env.example` | Static origin-aware robots/sitemap configuration |
| `public/og/*.png`, `public/icons/*.png`, `scripts/generate-assets.mjs` | Four local share images and two PNG icons |
| `components/enquiry.tsx`, `components/interactive.tsx`, `lib/enquiry.mjs`, `lib/submission.ts` | Contact validation, download/copy/handoff, future adapter contract |
| `src/styles.css`, `app/phase-two.css` | Self-hosted font variables and accessible contact-state styling |
| `server.mjs` | Explicit preview ports, MIME types, gzip negotiation, nosniff, genuine 404 response |
| `playwright.config.ts`, `tests/portfolio.spec.ts`, `src/site.test.mjs` | Browser, axe, export and content regressions |
| `scripts/verify-configured-seo.mjs` | Test-origin SEO build checks and automatic local-build restoration |
| `scripts/measure-browser.mjs`, `scripts/audit.mjs` | Actual browser measurement and optional future Lighthouse runner |
| `package.json`, `package-lock.json`, `.gitignore` | Dependency lock, commands and private/generated-file exclusions |
| `README.md`, `docs/content-readiness.md`, `docs/performance-results.json`, this report | Editing, validation, readiness and measurement handover |

## Dependencies

Added Fontsource variable-font packages for DM Sans and Space Grotesk, both 5.3.0. Development tools added: Playwright Test 1.63.0, axe Playwright 4.13.0, and Sharp 0.35.4. The lockfile records the installed versions.

Lighthouse is **not installed or declared as a working dependency**. Versions 13.4.1, 12.8.2 and 11.0.0 encountered registry connection resets; a final 10.4.0 attempt stalled and was stopped. The working dependency set was reconciled afterward. The optional runner gives an explicit installation instruction rather than inventing results. No analytics, CMS, database, server form provider, GSAP, Lenis, 3D or external-media service was added.

## Content visibility and future editing

The underlying project schema remains reusable. Optional fields render only when marked verified and populated. Draft, hidden and comingSoon fields currently stay off the public page. Empty metrics/galleries and unavailable résumé/social/testimonial material produce no blank cards or empty navigation. Social URLs additionally require valid HTTPS addresses. The centralized missing-content list is `docs/content-readiness.md`.

Add approved content in `src/content.mjs` and `lib/content.ts`; do not rebuild layouts. Add permission-cleared, locally optimized project images with accurate alt text and intrinsic dimensions. Mark readiness only after approval. The existing `outcome` field is the supplied solution narrative, not a measured-results claim.

## SEO and social sharing

Every route has a unique title and description. Centralized Open Graph and X metadata, favicon/application icons, static sitemap and robots output are included. No production domain has been guessed.

With `NEXT_PUBLIC_SITE_URL` unset, the application builds and remains noindex/nofollow, robots disallows crawling, no canonical is emitted, and the sitemap has no URL entries. Absolute share-image URLs are withheld to avoid framework-generated localhost references. With the exact approved HTTPS origin supplied at build time, canonicals, OG/X image URLs, sitemap entries and origin-dependent schema become available.

JSON-LD uses verified Person, ProfilePage and project CreativeWork data. WebSite and internal BreadcrumbList records appear when an origin exists. JSON serialization escapes `<`. No empty or invented personal facts are added.

Configured-origin verification used only the reserved fixture `https://portfolio.example.test`. All seven routes passed canonical, share-file, schema and sitemap checks. The script rebuilt afterward with the origin removed. **The final output is the local noindex build, not the fixture build.**

Share images, all 1200×630:

- `/og/portfolio.png` — 39,085 bytes.
- `/og/plp-estimate-unifier.png` — 27,774 bytes.
- `/og/production-order-crm.png` — 35,683 bytes.
- `/og/aurelis-estate.png` — 26,738 bytes.

All four were generated and visually reviewed locally. Export tests verified dimensions and presence; configured metadata points to valid files. No AI imagery, stock art or fabricated screenshots were used.

Fonts are now emitted locally through `next/font/local`: approximately 22 KB Space Grotesk and 37 KB DM Sans. Builds with installed dependencies require no Google Fonts request. Uncached package installation still requires registry access.

## Contact improvements

The form now has field errors, a focused error summary, accessible status feedback, and local length/email validation. Downloads use `michael-project-brief-YYYY-MM-DD.txt`. Actual browser download contents were checked against current values, including punctuation and line breaks. Changing any field invalidates the prepared brief.

Visitors can copy the email address, copy the prepared brief, download again, or open their email app. Clipboard success and denied-access fallback were exercised. Long briefs avoid an oversized mailto body and explain copy/attachment handling. No message is claimed as sent. The application does not submit or persist form contents.

`lib/submission.ts` defines a future typed adapter only. No Resend, Supabase Edge Function, or other delivery provider is selected/configured. Actual sending in a physical device’s email client remains a manual check.

## Browser, accessibility and visual QA

The complete seven-route layout matrix was tested in headless Microsoft Edge 152.0.4191.66 at 360, 390, 768, 1024 and 1440 pixels, with full-page screenshots: 35 route/width combinations. Screenshot overview sheets were reviewed at all five widths. No document overflow, clipped hero titles, blank testimonial section, broken illustration layout or footer collision was found. Reduced motion was enabled for stable full-page captures; normal-motion navigation was also exercised.

Browser checks cover all routes, archive/project links, About/Contact, 404, native anchors, Back/Forward, mobile menu open/close, Escape, focus return/trapping, verified contact/live links, hidden content, validation, downloaded content, encoded mailto, stale invalidation, clipboard fallback and local-only contact privacy. No uncaught page exceptions occurred in the route matrix.

Axe WCAG 2 A/AA and 2.1 AA scans passed on all seven routes at 390 and 1440 pixels, plus the open menu, invalid form and prepared-brief states. Keyboard checks exercised the skip link, visible focus, menu trap and native disclosure activation. These results are **not a full accessibility certification**.

Browser reduced-motion emulation confirmed: no hero auto-cycle during the observation window, working manual hero controls, native non-smooth scrolling, visible entrance content, accessible final workflow stage and immediate usable route content. Reduced-motion CSS also removes hover transforms and animations. No animation density was added in this phase.

## Actual performance measurements

Lighthouse Performance, Accessibility, Best Practices and SEO scores: **not measured**. The scored audit remains a follow-up because its package could not be installed. Lighthouse TBT and field INP are also unavailable; neither is inferred from another metric.

The fallback uses the actual production export in headless Edge, cold cache, applied CDP throttling and browser PerformanceObservers. Mobile: 390×844, 4× CPU slowdown, 1,600 Kbps download and 150 ms latency. Desktop: 1440×900, 1× CPU, 10,240 Kbps and 40 ms latency. Each capture observes navigation plus eight seconds. These are single lab samples on a shared Windows host, not field measurements or a controlled benchmark series.

Final run after preview compression:

| Page | LCP | FCP | CLS | Observed blocking duration* |
| --- | ---: | ---: | ---: | ---: |
| Home mobile | 2,344 ms | 2,344 ms | 0 | 0 ms |
| Home desktop | 908 ms | 908 ms | 0 | 315 ms |
| PLP project mobile | 1,276 ms | 1,276 ms | 0 | 132 ms |
| Contact mobile | 1,256 ms | 1,256 ms | 0 | 393 ms |

*The sum of long-task duration above 50 ms after FCP during the observation window. This is **not Lighthouse TBT or INP**. Host contention and timing affect it; contact/desktop values remain visible here rather than being hidden.

Inspection found uncompressed preview responses. Gzip reduced observed homepage JavaScript transfer from 652,102 to 202,503 bytes (about 69%). Other sampled pages decreased from 649,475 to 201,087 bytes. This improves transfer, not the underlying parse/runtime size. Future hosting needs equivalent compression. The initial uncompressed LCP samples were 2,596 / 712 / 1,924 / 1,376 ms in the same table order; desktop timing did not improve, so no universal speedup is claimed.

Client/server boundaries and the existing dynamic workflow loader were retained. Existing observer/timer cleanup and reduced-motion safeguards remain. No visual feature was removed to chase a synthetic score. More runtime optimization should follow a working scored profile, not speculation. Summaries and settings are retained in `docs/performance-results.json`; raw local artifacts are in ignored `audit-results/`.

## Security and privacy review

Export scanning found no matching API-key/Windows-user-path patterns and no public source maps. This is a scoped pattern review, not a security certification. External project/social links use appropriate rel attributes. Browser testing recorded no third-party HTTP requests during brief preparation and no cookies, localStorage or sessionStorage entries. Form values stay in component memory or in the user-requested downloaded/copied brief; nothing is sent to analytics or a delivery provider.

`.env.local` was verified ignored; `.env.example` remains trackable. Trace/test/audit artifacts are ignored and must stay local. No private contact material was used in tests; test addresses use reserved domains. No deployment, source upload, tracking, hosted database or external media generation occurred.

## Commands and results

- `npm run typecheck`: passed.
- `npm run build`: passed; seven application routes plus static robots/sitemap and 404 exported.
- `npm test`: eight export/unit regression checks passed.
- `node scripts/verify-configured-seo.mjs`: both builds and all seven configured-origin checks passed; local export restored.
- `node scripts/generate-assets.mjs`: four share images and two PNG icons generated.
- Playwright full suite: all 28 checks passed, including compression negotiation and 404 responses.
- `node scripts/measure-browser.mjs`: both four-page measurements completed, with processes cleaned up.
- `npm run test:all`: passed — TypeScript, production build, eight export/unit checks, and all 28 browser/accessibility checks.
- Lighthouse installation/audit: not completed; repeated ECONNRESET failures and one stopped stalled attempt. No scores claimed.

## Remaining manual checks and next phase

Run a scored Lighthouse audit when registry installation works, then assess runtime long tasks with a trace. Test physical iOS/Android mailto/download handling, Safari/Firefox, real touch devices, and NVDA/VoiceOver navigation. A screen-reader audit, external live-site reachability and real email delivery were not performed. Verify deployed caching, compression, MIME types, security headers and genuine 404 handling only after hosting is explicitly approved.

Remaining content: social URLs, real testimonials and permissions, screenshots, dates, client permissions, evidence-backed outcomes, résumé, optional full professional name and final production origin. Details are centralized in `docs/content-readiness.md`.

Recommended next phase: add approved final content to the readiness system, review the resulting cases/media, complete the remaining scored/device checks, and then decide whether to publish. The site is ready for continued local review; public launch is not complete or authorized.

