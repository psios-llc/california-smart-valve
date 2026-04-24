# California Smart Valve — Marketing Site

Static marketing site for **California Smart Valve Inc.** — dual-protection gas safety
valve (earthquake + fire shutoff).

**Live:** https://psios-llc.github.io/california-smart-valve/
**Company phone:** 707 · 296 · 3600
**Purchase inquiries:** james@californiasmartvalve.com

---

## Stack

Plain HTML / CSS / JS. No build step. Hosted on GitHub Pages.

```
website/
├── index.html        Single-page site
├── assets/
│   ├── style.css     All styles (editorial / seismograph aesthetic)
│   ├── script.js     Live seismograph trace + station clock
│   └── favicon.svg
└── SITE_CONTENT.md   Source-of-truth content (extracted from old Replit site)
```

## Local preview

```bash
cd website
python3 -m http.server 8080
# open http://localhost:8080
```

To view on phones/tablets on the same Wi-Fi, use your Mac's LAN IP
(`ipconfig getifaddr en0`) at `http://<ip>:8080`.

## Deploy

Pushes to `main` auto-deploy to GitHub Pages at
`https://psios-llc.github.io/california-smart-valve/`.
