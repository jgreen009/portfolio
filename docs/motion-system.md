# Motion system and maintenance

## Hierarchy

Signature moments are the operational hero, coordinated project presentation, and six-stage delivery workflow. Supporting motion covers navigation, services, tool disclosures, portrait framing, galleries and page entrances. Micro-interactions provide button, link, tag, input and copy feedback.

## Shared controls

lib/motion.ts is the source of truth for timing, standard and expressive easing, spring response, stagger, reveal distance, hover response, four-pixel magnetic range, depth range, scroll interpolation and reduced-motion values. Its CSS variable object is applied in the root layout. Existing CSS defaults remain a fallback.

lib/use-motion-activity.ts provides viewport, foreground, pointer-capability and reduced-motion state. It starts with enhancement disabled until capability detection resolves. Its boundary IntersectionObserver remains available to detect re-entry; internal timers and animation work suspend outside that boundary. Visibility and media-query listeners are removed on unmount.

## Behavior contracts

- The primary action moves its inner content by at most four pixels per axis, keeping its link hit area fixed. Pointer leave/cancel resets both spring values immediately. Touch, coarse pointers and reduced motion remain static.
- Depth surfaces use at most one pixel of translation per axis from the shared two-pixel range. They never rotate the complete visual or replace the cursor.
- Hero cycling runs only on a visible, foreground, fine-pointer desktop. Manual selection grants an eight-second pause; focus or pointer engagement keeps the controls stable. Explicit Pause lasts until Resume. All five stages remain semantic buttons and the diagram remains fully rendered in reduced motion.
- Project reveals are finite and stagger category, title, description, visual, tools and links. Each illustration is explicitly conceptual. The editorial status demonstration takes four steps and stops. Screenshots are not altered into simulated live interfaces.
- Workflow progress changes at stage intersections, not on every scroll event. SVG nodes and connections rearrange between six states. Mobile uses a normal vertical timeline; reduced motion changes state without interpolation.
- Page entrances have no exit wait, loading mask or custom navigation interception. Next.js retains history and scrolling ownership.
- Case-section indication follows the last section whose start has crossed the reading band. Native anchors retain browser behavior and focus semantics.
- Galleries keep ordinary links to the original-resolution assets, with no dialog state or extra viewer dependency.

## Motion budget

There are no perpetually looping ambient CSS animations. Hero signals and pulses are finite per cycle; the glow settles once. Project and workflow movements are finite. Internal timers are cleaned up when offscreen, hidden or reduced motion is enabled. CSS transitions may complete their short response, but no continuous background task is attached to them.

Content is visible in server-rendered HTML. Motion begins from a readable partial-opacity state, never a persistent opacity-zero class. Reduced-motion CSS clears reveal transforms and masks while preserving the intentional headshot crop. Disabled-JavaScript mobile navigation is exposed through a noscript fallback.

## Verification

The Playwright tests cover lifecycle suspension through a controlled hidden-document event, actual browser reduced-motion emulation, fine-pointer bounds, touch navigation, disabled JavaScript, workflow stages, route indicators, image decoding and portrait geometry. The hidden-document test checks the handler contract rather than claiming an OS-level background-tab audit. Current executed totals and measurements belong in report.md.

## Local content rules

Current routes are /work/key-tapper/ and /work/capy-custom-pc/. Historical reports retain old route names for provenance. No old route redirect is needed for this unpublished site. External live URLs are unchanged. Clients, dates, outcomes, testimonials and unavailable engineering narratives are not inferred from motion or screenshot examples.

## Click and scroll refinements

Primary CTA content compresses to 0.97 with the shared spring while held by pointer or Enter; cancellation, blur and pointer leave restore it. The outer link stays fixed and navigation is never delayed. Reduced motion disables the compression.

Selecting a hero stage replays its finite signal, marker pulse and output reveal, including repeated selection. Automatic cycling retains its pause and visibility contracts.

ReadingProgress uses Motion scroll values and a spring to interpolate a decorative two-pixel line, without React render updates for every scroll event. Native smooth anchor scrolling remains enabled; native wheel/touch/keyboard behavior is preserved. A stable scrollbar gutter avoids viewport-width jumps. Reduced motion hides the indicator and makes anchors immediate. No Lenis, GSAP or new dependencies were added.
