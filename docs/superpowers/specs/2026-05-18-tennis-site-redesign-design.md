# Design Spec: Tennis Coach Site Redesign

**Date:** 2026-05-18
**Status:** Approved

---

## Overview

Replace the current Jekyll/Markdown-based GitHub Pages site with a clean multi-page vanilla HTML/CSS/JS site. The `.md` knowledge files remain unchanged — they are the coach's memory. The HTML site is a separately curated, visually polished frontend.

---

## Goals

- Search across all tips (client-side, no server required)
- Filter by category via navigation
- Roland Garros visual style (terracotta, navy, Playfair Display)
- Reusable as a template for future similar sites
- No build step, no framework, no dependencies — push and it works

---

## Non-Goals

- Not a 1:1 mirror of the `.md` files — content is curated
- No user accounts, login, or backend
- No CMS — I (the coach/AI) update the HTML and JSON directly

---

## File Structure

```
docs/tennis/
  index.html              Homepage: category cards + search bar
  forehand.html           Forehand tips
  backhand.html           Backhand tips
  serve.html              Serve tips
  tactics.html            Tactics tips
  technique.html          General technique tips
  mental.html             Mental game tips
  focus-areas.html        Active focus areas (technical, tactical, mental)
  assets/
    style.css             Shared Roland Garros styling (CSS variables)
    nav.js                Shared navigation component + search logic
    search-index.json     All tips as flat JSON array for search
```

The current Jekyll files (`_layouts/`, `_config.yml`, `Gemfile`, `index.md`, `knowledge/*.md`) remain untouched.

---

## Navigation

- Sticky top nav on all pages
- Logo/site title links to `index.html`
- Links to all 6 knowledge categories + focus areas
- Active page highlighted
- Search input in nav — triggers live search across `search-index.json`

---

## Pages

### index.html
- Hero section with site title
- Category card grid (one card per section)
- Search bar (same as nav search, more prominent)

### Category pages (forehand, backhand, etc.)
- Page title with clay accent underline
- Tip cards: title, date, source tag, body text
- Content curated from corresponding `.md` file — not necessarily identical

### focus-areas.html
- Three sections: Teknisk, Taktisk, Mentalt
- Each section lists active focus points as cards

---

## Search

- `search-index.json` is a flat array of tip objects:
  ```json
  [
    {
      "id": "technique-topspin",
      "title": "Sving-sti bestemmer topspin",
      "category": "technique",
      "date": "2026-05-18",
      "source": "holdtræning",
      "body": "Ketcherbevægelsen skal...",
      "url": "technique.html#topspin"
    }
  ]
  ```
- `nav.js` fetches this file once, caches in memory, filters on keyup
- Results shown as a dropdown below the search input
- Clicking a result navigates to the correct page + anchor

---

## Styling

Shared `style.css` defines all CSS variables and component classes. No inline styles in HTML pages.

**Color palette:**
- `--clay: #C4572A` — primary accent
- `--clay-dark: #8B3A1C`
- `--clay-light: #F0E8DF`
- `--navy: #1B2A3B` — nav background, headings
- `--gold: #C8A243` — highlight accent
- `--cream: #FAFAF8` — page background
- `--sand: #F5EDE3` — section backgrounds

**Typography:**
- Headings: Playfair Display (Google Fonts)
- Body: Source Sans 3 (Google Fonts)

---

## Maintenance

When a new tip is added during a coaching session:
1. Add tip HTML to the relevant category `.html` page
2. Add entry to `search-index.json`
3. The `.md` knowledge file is updated as always (coach memory)

---

## Reuse as Template

The `assets/` folder (style.css + nav.js) is the reusable core. A new site inherits these files and only needs new HTML pages and a new `search-index.json`.
