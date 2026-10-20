# Phase 2 report — Michael’s interactive portfolio

Date: 10 September 2026
Status: Implemented locally; remaining verification limits are recorded below.
Scope: Existing portfolio directory only. No publishing, deployment, upload, external asset retrieval, or hosting workflow was performed during this phase.

## What changed

The approved Next.js architecture, dark palette, typography, routes, semantic homepage order, and honest content placeholders were preserved. This phase adds purposeful motion, more distinctive code-native project illustrations, a six-stage scroll-driven workflow, responsive navigation refinements, and corrected contact information.

The Phase 1 report is retained in `docs/phase-1-report.md`, with the email corrected. The unrelated parent estimate-comparison application was not modified.

## Site and file structure

The seven routes remain `/`, `/work`, `/work/plp-estimate-unifier`, `/work/production-order-crm`, `/work/aurelis-estate`, `/about`, and `/contact`. Unknown URLs render the not-found page. The optional resume remains disabled until verified content is supplied.

Homepage order remains navigation, hero, expertise, selected work, workflow, services, technology ecosystem, about preview, testimonials, contact CTA, and footer.

| File | Change |
| --- | --- |
| `app/page.tsx` | Hero sequence, six-stage workflow integration, service diagrams, and technology disclosures |
| `app/layout.tsx` | Phase 2 stylesheet and Google Fonts preconnect hints |
| `app/phase-two.css` | Motion timing, sticky navigation, project illustrations, workflow layout, responsive refinements, and reduced-motion overrides |
| `components/motion.tsx` | Reusable viewport reveals, grouped headline reveal, and page-level entrance |
| `lib/motion.ts` | Shared timing, easing, stagger, distance, hover, and cycle tokens |
| `components/systems.tsx` | Interactive operational hero flow with visibility-aware cycling |
| `components/workflow.tsx` | Six-stage sticky desktop workflow and vertical mobile presentation |
| `components/workflow-loader.tsx` | Client dynamic-import boundary retaining prerendered workflow HTML |
| `components/project-illustrations.tsx` | Three explicitly illustrative project compositions and four service cues |
| `components/portfolio.tsx` | Project clipping reveals, upgraded visuals, metadata animation, case-study section navigation, and gallery placeholders |
| `components/interactive.tsx` | Raised navigation, mobile focus/scroll handling, enquiry helpers, and page entrances |
| `lib/enquiry.mjs` | Shared text-brief and encoded email-link generation |
| `src/content.mjs` | Correct email, revised service titles, separate Build and Automate stages |
| `src/site.test.mjs` | Expanded regression tests for contact, routes, content, and motion safeguards |
| `README.md` | Corrected contact and current implementation guidance |
| `docs/phase-1-report.md` | Preserved foundation handover with corrected email |
| `report.md` | This Phase 2 report |

Next.js-generated `AGENTS.md` and `CLAUDE.md` were also observed during the build workflow. Their installed-framework guidance was read. They are framework guidance, not product features.

## Dependencies

No dependencies were added. Existing Motion, React, Next.js, TypeScript, and Tailwind CSS were reused. GSAP, ScrollTrigger, Lenis, canvas, WebGL, and 3D libraries were not introduced.

## Motion architecture

`lib/motion.ts` defines shared durations, easing, stagger, travel distance, hover lift/scale, and hero-cycle timing. CSS counterparts are documented in `app/phase-two.css`.

The reusable Reveal component supports vertical fade, left/right directional movement, clipping, masked movement, child staggering, viewport triggering, and one-time or repeatable use. Content renders visibly in the static HTML. JavaScript enhances existing content; failed or disabled animation does not leave the page hidden. The reduced-motion preference is resolved before starting viewport animations.

The App Router retains responsibility for navigation, scroll restoration, and history. A short page-level entrance is keyed by pathname. There is no exit animation, navigation wait, frozen router workaround, or blank transition screen.

### Behavior by section

- Navigation: subtle initial entry, raised background after scrolling, active-route underline, hover/focus underline, and persistent keyboard focus styles.
- Hero: eyebrow, grouped masked headline lines, supporting copy, actions, and system visual enter in a short coordinated sequence. Text is not animated character by character.
- Intelligent system: Input → AI processing → Data → Automation → Business outcome. Every stage exposes its description without hover. Buttons support keyboard selection. The active stage advances on capable desktop devices; a fine SVG signal and line indicate progression. Cycling pauses offscreen, in a hidden tab, during interaction, or when the visitor selects Pause. Mobile and reduced-motion users receive a static cycle with selectable stages.
- Selected work: clipping reveals, small media scaling, project metadata movement, technology hover responses, and animated link arrows. Project spacing/proportions vary rather than forming identical cards.
- PLP: two document columns, structured abstract rows, scope labels, difference indicators, AI analysis/validation bridge, and a report panel. These are editorial illustrations, not actual application screenshots or claims of real verification results.
- Production CRM: a four-column conceptual production flow, staged order tokens, a compact detail panel for payment/artwork/garments/printing/priority/completion, and a restrained hover movement.
- Aurelis: a typographic property presentation with an explicitly illustrative spatial layout. No external imagery was retrieved.
- Workflow: Discover, Architect, Design, Build, Automate, Test and Launch. Native scrolling advances the current stage through IntersectionObserver. Desktop has a sticky visual panel; text remains selectable in normal HTML. Mobile/tablet uses the vertical stage content without the sticky panel.
- Services: custom SVG cues for structured AI output, connected automations, internal tools, and responsive web layouts.
- Technology ecosystem: names stay visible in native details/summary controls; expanding a group explains its role. Automation is emphasized, with n8n, Make, Gumloop, Relay, and Retool retained. Webflow and Framer remain visible under Visual Design.
- Case studies: page entrance, staggered metadata, clipping media reveal, section-navigation strip, refined spacing, clearly labeled missing information, and a more deliberate gallery placeholder.
- Contact and footer: focus and hover affordances with no magnetic movement or changes to hit areas.

## Responsive decisions

Browser layout checks covered 360, 390, 768, 1024, 1440, and 1920 pixels.

- Hero changes to a single column at tablet widths; headline groups can wrap naturally.
- Mobile navigation remains compact and expandable. An observed internal horizontal scrollbar was corrected by containing its decorative background.
- Main content becomes inert while the mobile menu is open; background scrolling is locked and restored on closure.
- Workflow sticky presentation is removed at 800px and below.
- The hero does not auto-cycle on small screens or devices without hover.
- Production illustration stacks its details panel; columns reduce to two on mobile.
- Aurelis uses a vertical layout on small screens.
- Technology groups reduce to one column on the narrowest screens.
- Case-study section links become non-sticky on smaller screens.
- Form controls and primary interactive targets retain comfortable touch dimensions.

All seven routes and the not-found page were checked for document-level overflow across all six widths. None showed horizontal document overflow. Desktop hero, workflow, and mobile-menu screenshots were visually inspected. These are browser viewport checks, not physical-device testing.

## Accessibility work

Semantic landmarks, visible keyboard focus, labeled native form controls, honest status text, and native link navigation are preserved. The hero heading has a complete accessible name; animated visual line groups are hidden from assistive technology to avoid duplication. Workflow text remains in HTML while its redundant sticky diagram is hidden from screen readers. Service cues are decorative SVGs. The illustrative property layout has a concise accessible description.

Mobile menu checks verified first-link focus on opening, Escape closure, focus return to the menu button, background inertness, scroll restoration, and route-selection closure. Keyboard behavior was sampled; a complete manual screen-reader audit was not performed.

Reduced-motion handling is implemented in Motion and CSS: entrances, hover transforms, cycles, and smooth scrolling are disabled or simplified. Code-level regression checks passed. A browser/OS reduced-motion preference toggle was not exercised by the available browser API, so no visual reduced-motion-mode certification is claimed.

Calculated contrast ratios for core color pairs:

| Pair | Contrast |
| --- | --- |
| Warm-white text on charcoal | 15.46:1 |
| Supporting gray on charcoal | 7.29:1 |
| Accent on charcoal | 6.87:1 |
| White on primary blue | 4.58:1 |
| White on hover blue | 5.65:1 |

These calculations cover core tokens, not every rendered pixel, illustration label, or blended background. No formal WCAG certification is claimed.

## Performance considerations

- Static export remains enabled and all requested routes are prerendered.
- The non-critical workflow uses a client dynamic-import boundary, retaining its server-rendered content.
- Scroll-driven state changes happen at stage intersections rather than on every scroll event.
- Timers and observers are cleaned up; hero cycling pauses offscreen and when the tab is hidden.
- Primary motion uses transform and opacity. SVG path progression and small background transitions are limited to small visual areas.
- No large images, external project assets, 3D runtime, or smooth-scroll library was added.
- Font preconnect hints supplement the existing Google Fonts display=swap loading and fallbacks. Fonts are not yet self-hosted.
- Prerendered content, reserved illustration compositions, and stable text areas minimize shift; no measured CLS or performance score is claimed.

## Email correction and enquiry behavior

The correct address is `mikkyade345@gmail.com` throughout visible contact content, mailto links, content configuration, generated brief recipient, tests, documentation, and production export. The phone remains `+234 902 398 3129`.

A regression test rejects the old standalone spelling across authored source, documentation, and generated output, while excluding dependency/build-cache/Git internals. The obsolete spelling is constructed within the test rather than retained as a literal string.

The brief includes the recipient address, visitor details, selected service, project description, and an explicit statement that it has not been sent. The email link encodes the exact brief and correct recipient. Editing the form invalidates the previously prepared brief to avoid emailing stale content.

In-browser checks confirmed required-field validation, successful brief preparation, status text, and the correctly encoded mailto link. Activating that link did not produce an observable external mail-client window in the in-app browser. The browser's download event timed out even though the form prepared its brief and displayed the expected result. Actual file-save completion and external email-client launch therefore remain unverified in this environment. No email was sent.

## Checks and commands

- `npm run typecheck`: passed.
- `npm run build`: passed; seven application routes plus not-found export generated.
- `npm test`: six tests passed again on the final exported build.
- Source/output email regression: passed.
- Browser route coverage: homepage, work archive, all three case studies, about, contact, and unknown URL.
- Browser widths: 360, 390, 768, 1024, 1440, 1920.
- Anchor navigation: expertise target positioned below sticky navigation.
- Scroll workflow: observed active-stage change from Architect to Build; sticky panel remained at its expected top offset.
- History: Back restored the homepage anchor URL; Forward restored About.
- Console inspection: no errors or warnings were returned during the checked routes; no hydration warnings were observed. This is limited to the inspected sessions.
- Local preview server: `node server.mjs`, serving `http://127.0.0.1:5180/`.

No Lighthouse run, physical-device test, full screen-reader audit, or network-throttled benchmark was performed. No such scores or results are claimed.

## Remaining content and limitations

Actual project screenshots, approved gallery media, verified client/year/responsibility/architecture/challenge details, testimonials, social URLs, and optional resume content remain pending. The site continues to label missing information rather than inventing it. There is no server-backed enquiry submission or CMS.

Illustrations are deliberately conceptual. The signature workflow describes Michael's general delivery approach and does not claim unverified project-specific architecture. Native email behavior depends on the visitor's configured email application. Static export requires a rebuild after content changes.

## Recommended Phase 3 scope

1. Add approved imagery and verified case-study content.
2. Test downloads and email handoff in the user's standard browser with a configured mail client.
3. Complete reduced-motion visual testing, screen-reader review, physical-device checks, and measured performance profiling.
4. Refine motion only in response to review findings; avoid increasing animation density by default.
5. Add direct enquiry submission if requested.
6. Consider hosting only after explicit new instructions. The project remains local.

## Final handover verification

The final TypeScript check, production build, and all six tests passed. The repaired mobile menu was checked at 360px: its scroll width and client width were both 320px, with no document overflow. Browser console inspection returned no errors or warnings for that final check. The viewport override was reset and the local homepage was left open for review.
