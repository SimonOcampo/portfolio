# Portfolio polish verification

Verified October 26, 2026 against a local Next.js production build. The website is ready for review locally; this pass does not publish it.

## Changes

- Essential home content renders immediately. Short CSS character entrances replace the delayed reveal and repeated floating animations. The home bundle no longer includes the animation library.
- The Pokémon gym theme, compact navigation, requested project order, single résumé menu, and optional battle remain. Professional section headings, tighter screenshot framing, and mobile spacing improve scanning.
- Education, primary experience, and curated skill groups match the supplied software and AI résumés. GPA is 3.82; Dexter describes the ContractIQ demo and supported engineering details. All roles appear together, ordered by end date from newest to oldest.
- Image sizing matches the grid. Case studies load the selected image and preload only the next image after it finishes loading. Video uses `preload="none"`. Battle code and assets load on demand.
- Local font subsets preserve the typography while reducing font bytes. Animated home and team sprites and cinematic battle effects are enabled by default as requested; the explicit battle effects toggle remains available. Gallery controls and desktop navigation provide 44px targets.
- Both résumé PDFs are byte-for-byte identical to the supplied documents.

## Follow-up animation and presentation changes

Restored animated Swampert and team sprites, added trainer idle motion and pointer response, restored cinematic battle animations, removed additional-experience labels, and restored experience order by end date. The AI Document Assistant card uses a centered crop of its wide diagram; its case study retains the complete diagram.

## Production mobile Lighthouse

These measurements precede the follow-up animation restoration and should not be treated as a fresh performance audit of that revision. Three cold mobile Lighthouse 13.5.0 runs before and after, using its default mobile simulation and the same local machine. Values below are medians. Local development-server measurements were not used.

| Metric | Before | After | Target |
| --- | ---: | ---: | ---: |
| Performance | 91 | 96 | ≥90 |
| Accessibility | 100 | 100 | ≥95 |
| Largest contentful paint | 3.476s | 2.823s | ≤2.5s |
| Cumulative layout shift | 0 | 0.00364 | ≤0.1 |
| Total blocking time | 53ms | 31ms | ≤200ms |

Initial script transfer fell from 203.8 KiB to 140.0 KiB, and total initial transfer from 444.3 KiB to 322.1 KiB in representative cold runs. Paint time improved by approximately 19%, but **the 2.5-second LCP target is not met** under the mobile simulation. These are laboratory measurements, not real-user Core Web Vitals or an INP measurement.

## Browser and build coverage

- All four sections at 320×740, 390×844, 430×932, 768×1024, 1440×900, and 844×390; also 200% text sizing. Checked scrolling, horizontal overflow, visible touch targets, and mobile menu placement.
- Both résumé PDFs open in new tabs. Escape and outside-click dismissal work. Case-study dialogs contain keyboard focus and return focus to their trigger. Gallery navigation and expanded skills work.
- Direct hashes and browser back/forward navigation work. All seven project dialogs expose the expected HTTPS destinations, and all referenced project media files exist.
- Battle selection, cancellation, completion, effects switching, skipping, returning, session restoration, and replay checked. No battle sprite assets requested on the initial home visit.
- Automated WCAG A/AA scans cover mobile and desktop sections, résumé menu, case-study dialog, team selection, and battle states. No violations found in the checked states. This is not a full manual accessibility certification.
- Lint, TypeScript, and production build pass. Browser checks found no runtime errors.

## Sharing and deployment

The live `https://simonocampo.com` page was reachable, but its existing Open Graph image URL pointed to `http://localhost:3000`. The local code now defaults metadata to the verified public domain and includes its canonical URL. An explicitly configured `NEXT_PUBLIC_SITE_URL` still overrides that default. Deploy this version and check the deployed metadata before sharing the updated site; no production settings were changed remotely.

The browser checks used Chromium. A physical iPhone/Safari smoke check and production field measurements remain useful follow-up checks; they were not performed here.
