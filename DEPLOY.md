# Deploy checklist

Everything in this folder goes into the **root** of your GitHub repo (the same
level as your current index.html). Vercel rebuilds automatically on push.

## Files in this bundle
index.html · about.html · work.html · styles.css · site.js
kaviya-portrait.jpg · kaviya-about.jpg
logo-animaker.png · logo-prudent-ai.png · logo-wipm.png
newsroom-1.jpg … newsroom-4.jpg
assets/ — 10 PDFs + thumbnails, and assets/repositioning/slide-01…07.jpg

index.html, about.html and work.html replace the versions already in the repo.

## Two files you already have — do NOT delete them
- kaviyakavi-baskaran-resume.pdf   (nav button + resume links)
- food-1.jpg … food-9.jpg          (cooking rail on the About page)

Both are referenced by the new pages and already live in your repo. They aren't
in this bundle, so leave them where they are.

## Steps
1. Upload / drag these files into the repo root, keeping the assets/ folder structure
2. Commit
3. Wait ~30s for Vercel, then hard-refresh (Cmd+Shift+R)

## Check after deploy
- Loader reads "Hey, glad you're here" and lifts away
- 👋 and 🙌 emoji render (they show as boxes only in headless test browsers)
- About: cooking photos load, hovering the bars swaps the role
- Proof of work: deck carousel arrows work, PDFs open in a new tab
- Newsroom cards open LinkedIn and Substack

## If something 404s
Check the file landed in the right folder — the PDFs must be inside assets/,
and the deck slides inside assets/repositioning/.
