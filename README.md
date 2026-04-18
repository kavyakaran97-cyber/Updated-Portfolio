# Kaviyakavi Baskaran — Portfolio Site

A 3-page editorial portfolio built in plain HTML/CSS/JS — no build step, no framework, no CMS. Open `index.html` in a browser, host it anywhere static (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

---

## Files

```
.
├── index.html       # Homepage — hero, video, case studies, experience, skills, testimonials, speaking, CTA
├── about.html       # About page — bio, philosophy, PLG vs SLG, narrative
├── work.html        # Proof of Work — categorized artifacts with PDF/Notion/one-pager links
├── styles.css       # All design tokens & components (one stylesheet)
├── script.js        # Reveal-on-scroll, work filter chips, marquee pause
└── README.md        # This file
```

---

## Design system (so you can edit safely)

- **Palette:** warm paper cream (`#F4EFE6`) base, deep ink (`#1A1614`) text, terracotta (`#B8563A`) accent, forest (`#2A3F3A`) secondary.
- **Type:** Fraunces (serif display, italic for emphasis) + Instrument Sans (body) + JetBrains Mono (labels).
- **All colors live in `:root` at the top of `styles.css`.** Change one variable, update the whole site.

---

## Placeholders to swap (search the codebase for `PLACEHOLDER`)

### High priority
| What | Where | Notes |
|---|---|---|
| **Video intro** | `index.html` → `.video-card` | Replace the `<div class="video-placeholder">…</div>` with a Loom or YouTube `<iframe>`. |
| **Portrait photo** | `about.html` → `.about-portrait` | Replace the `<div class="about-portrait">` with `<img src="…" alt="…" />` of your headshot. |
| **3 testimonials** | `index.html` → `.testi-grid` | Three `[Testimonial quote placeholder]` blocks with avatar initial, name, title. |
| **Resume PDF** | All 3 pages | Currently links to `/kaviyakavi-baskaran-resume.pdf`. Drop the file into your site root with that exact name (or update the `href`s). |
| **Calendly link** | `index.html` & `work.html` → `https://calendly.com/PLACEHOLDER` | Swap for your real Calendly URL. |
| **LinkedIn / YouTube / Medium** | All 3 footers | Currently `href="#"` — swap with real URLs. |

### Speaking section
- `index.html` → `.speaking-list` has 3 `[Talk title placeholder]` rows. Swap with real talks/podcasts/panels, or remove the section entirely if you'd rather not have it.

### Proof of Work artifacts
- `work.html` has 24 work tiles, all currently `href="#"` (which is why each shows the orange "PLACEHOLDER" ribbon).
- For each tile, change `href="#"` to point to the actual PDF / Notion link / Google Doc / Loom URL.
- Once you do, the orange ribbon disappears automatically (it's tied to `[href="#"]` in CSS).

---

## Two CTAs in the header (as requested)
- **Primary** — "Talk to me" → opens `mailto:kavyakaran97@gmail.com?subject=Let's%20talk`
- **Secondary** — "Resume ↓" → downloads `/kaviyakavi-baskaran-resume.pdf`

Both also appear in the footer and at the end of every page.

---

## What I made up vs. what you gave me

To make the site feel finished rather than skeletal, I wrote light, plausible descriptions for the 24 work tiles on `work.html` (e.g. "Homepage messaging rework — Prudent AI", "Win/Loss interview template & findings", etc.). **Please review these and rewrite to match what's actually in your linked artifacts.** I drew them from the categories in your portfolio zip + the metrics you shared, but they're suggestions, not facts. The metrics on the homepage and case studies are all from what you sent — those are real.

I also wrote the "Off the clock" section on `about.html` based on your English Lit background. If that overshares or undershares, swap freely.

---

## To run locally

Just open `index.html` in a browser. That's it. No npm, no build, no server needed.

If you want a quick local server (recommended for testing the resume download):
```
python3 -m http.server 8000
```
Then open http://localhost:8000

---

## To deploy

- **Netlify / Vercel:** drag the folder into the dashboard. Done.
- **GitHub Pages:** push to a repo, enable Pages on the `main` branch.
- **Cloudflare Pages:** connect the repo, no build command needed.

---

## Positioning statement note

I went with this on the homepage hero:

> **Audience first, theory second.**
> *I'm Kaviyakavi — a product marketer shaping positioning, messaging, and GTM motions that start with customers, not frameworks. 6+ years across PLG (Animaker) and SLG (Prudent AI) — so products don't just launch, they land.*

Feel free to swap. The line lives in `index.html` inside the `.hero-content` div. Two other variants are in the chat thread above if you want to A/B yourself.
