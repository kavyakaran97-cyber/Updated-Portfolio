# Portfolio v2 — handoff

Paste this into a new chat to pick up where we left off.

## What this is
A rebuild of my portfolio (replacing kaviyakavi-baskaran-pmm.vercel.app). Three pages, static HTML/CSS/JS, deployed by dropping files into my GitHub repo — Vercel auto-rebuilds. Files live in `Job search/portfolio-v2/`.

## Files
```
index.html      Home
about.html      About me
work.html       Proof of work
styles.css      Shared stylesheet — all three pages
site.js         Shared behaviour — every hook is optional/guarded
kaviya-portrait.jpg     hero photo
kaviya-about.jpg        about photo (yellow outfit)
logo-animaker.png       transparent, background knocked out
logo-prudent-ai.png     transparent, background knocked out
logo-wipm.png           WIPM badge
newsroom-1..4 (.jpg)    newsroom card images
assets/                 7 PDFs + first-page thumbnails
assets/repositioning/   slide-01..07.jpg (the case study deck)
```
Also needed in the repo root: `kaviyakavi-baskaran-resume.pdf` and `food-1.jpg`–`food-9.jpg` (cooking photos, already in my existing repo — they 404 locally, that's expected).

## Design system
- Palette: pistachio `#dfe0cc`, laurel `#adb080`, berry `#d292a8`, dark plum `#653b40`, paper `#f7f6ec`, cream `#fcfbf4`
- Type: **Outfit** 700/800 headings, **DM Sans** body, **Space Mono** labels/eyebrows, **Caveat** for handwritten emphasis
- Emphasised words inside headings (`<em>`) render in Caveat, not italics
- Easing: `cubic-bezier(.16,1,.3,1)` for reveals; `--ease` var for hovers
- Nav is a floating pill: Home / About me / **Proof of work** (highlighted laurel pill) + "View my resume" button

## Home (index.html)
- Loader: "Hey, glad you're here" rises word by word, then lifts away
- Hero: "Hi, I'm Kaviyakavi 👋" (waving emoji animates), one description line, a hook line with a berry rule, single lowercase CTA **work with me**
- Scrapbook collage: taped polaroid, three mono pills, Chennai tag, berry testimonial card ("Her Aura's 10/10!" — Ranganayaki, my former manager) with an animated 🙌
- Section 01 by the numbers — 4 stat cards with count-up
- Section 02 featured work — three case cards in a sticky stack with folder tabs
- Section 03 testimonials — three taped index cards
- Section 04 Newsroom — 4 cards (WIPM city lead w/ logo badge, speaking gigs, LinkedIn, PMM Sandbox), all linked out
- Section 05 CTA — "Let's connect" + lowercase mail link

## About (about.html)
- Hero: "Not sure if I'm the right fit for your team? / Let me ask you…" + three numbered "what if" cards + the answer in beats + ✨ CTA
- **Experience = a hover bar chart.** Four wide bars, content inside each: GLOCOM 60%, Animaker 74%, Prudent AI 88%, "Still climbing" 100% (dashed berry). Hover a bar to bring it forward; Prudent AI is the resting state. Logos sit on cream plates and light up. Each bar has one highlight in a tinted block that gets a shine sweep + ✦ on activate. Axis labels are year ranges. Colour ramp: 10% / 16% / 23% plum, berry for the fourth.
- Off the clock: scrolling polaroid rail of cooking photos
- CTA: single "Let's connect"

## Proof of work (work.html)
Five studies, in this order. No index/grid section at the top (removed).
1. **Positioning & messaging** — opens with the 7-slide case study deck as a carousel (‹ › buttons, "1 / 7", keyboard arrows, swipe, Open as PDF), then Context, The shift (before/after), What I did, Results
2. **Sales enablement** — Context, Customer-facing collaterals (5 PDFs), Internal-facing collaterals (2 PDFs), Results
3. **Pipeline generation**
4. **Product pages & video scripts**
5. **Content & everything else** — links to my Google Drive folder

PDFs render as cards with a thumbnail of page one, opening in a new tab.

## Rules I've been working to
- Only prospect-facing collateral goes public. Internal battlecards, talktracks, buying-committee docs, customer lists and the KT handover stay off the site.
- Mobile is audited, not assumed: no horizontal overflow at 375/390/412/820px, nothing under 10.5px, tap targets 40px+.

## Known gotchas (already solved — don't reintroduce)
- `IntersectionObserver` measures **clipped** geometry: an element that starts at `clip-path: inset(0 0 100% 0)` never reports as intersecting, so it can never earn the class that unclips it. Animate opacity/transform on the observed element, put the clip on a child.
- `getBoundingClientRect()` on a bar mid `scaleY` animation reports its top at the baseline. Use `offsetTop`/`offsetHeight` for anything measuring bar positions.
- `<svg>` is a replaced element — `top` + `bottom` won't stretch it. Set height explicitly.
- `margin-inline: auto` on a grid item stops it stretching; with only absolutely-positioned children it collapses to zero width.

## Open items
- Deploy: copy all files + `assets/` into the repo root, commit, push to `main`
- The old `about.html` / `work.html` in the live repo get replaced by these
