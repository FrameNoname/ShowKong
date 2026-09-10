# Figma frontend refresh

Reference: Project_ShowKong, file `8URP7GdOec9q7VkCV2NjnS`.

Updated Home, Explore Projects, Find Team, Team Detail, Feed, and the shared
post/join forms. Added Sponsored Challenge and Dashboard. The Showcase source,
shared stylesheet, shared shell, and authentication implementation are unchanged.
Refreshed pages use a separate stylesheet and the existing Vanilla JS/Vite stack.

## Preview

Run `npm run dev` from the repository root.

- `/`: landing page
- `/pages/explore-projects.html`: search, categories, sorting and project details
- `/pages/find-team.html`: role search and filters
- `/pages/team-detail.html?team=SheetQuest`: team details
- `/pages/feed.html`: community feed and post modal
- `/pages/post.html`: standalone form sharing the same composer
- `/pages/sponsored-challenge.html`: challenge filters and detail dialogs
- `/pages/dashboard.html`: projects, activity, requests, feedback and deadlines

Dashboard is accessible through the profile avatar or the mobile menu.
The mobile menu also exposes the post form.

## Data boundaries

This is a frontend implementation using the sample content from Figma. Existing
Supabase sign-in gates remain on Feed, Post, Find Team and Team Detail.
No new database schema, API, payment, submission or messaging integration is added.

Posts (including attached images), text drafts, join requests, feedback messages,
follow/interest toggles and dashboard demo actions are stored in this browser's
localStorage. They are explicitly labelled as local and are not sent to other
members. Drafts retain text but not image attachments. Storage failures leave
the form intact and show an error. Attachments accept up to four PNG/JPG files,
at most 10 MB each; the browser's total storage quota may impose a lower limit.

Challenge rewards, organizations and dates are sample data. The displayed reward
total is computed from the four cards (78,000 baht), and dashboard pending counts
are computed from the actual sample requests, feedback and deadlines.

## Assets

Original Figma SVG exports are committed in `public/design/`; their provenance is
recorded in `scripts/figma-assets.json`. Export links expire, but the site uses the
committed files. Anuphan weights 400–700 are hosted locally in `public/fonts/`,
alongside the SIL Open Font License, so Thai typography does not depend on Google
Fonts being reachable. These fonts apply only to the refreshed pages.

## Verification

`npm run build` verifies all Vite multi-page entry points.

`node scripts/frontend-smoke.mjs` runs browser checks against a running server
using an installed Playwright package and headless Microsoft Edge. Set
`SHOWKONG_PLAYWRIGHT` to an absolute Playwright package path if it is not in this
project, `SHOWKONG_BASE_URL` to override localhost:5173, and
`SHOWKONG_QA_OUTPUT` to select a screenshot output directory.

The browser check covers nine routes at 1440, 1024, 768, 390 and 320 pixels,
missing images, local fonts, horizontal overflow, console errors, search and
filters, join request persistence, dashboard counts, draft restoration, image
attachment, escaped post content, post persistence, modal dismissal and mobile
Dashboard navigation. Showcase is loaded for regression checks, but is not
modified by this refresh.
