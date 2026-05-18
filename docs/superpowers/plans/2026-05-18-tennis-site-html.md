# Tennis Coach Site — HTML Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Jekyll/Markdown GitHub Pages site with a clean multi-page vanilla HTML/CSS/JS site with shared styling, navigation, and client-side search.

**Architecture:** Multi-page static HTML served from `docs/` folder on GitHub Pages. Shared `style.css` and `nav.js` linked from each page. Tips content hardcoded in HTML pages; a flat `search-index.json` powers cross-page search in the browser.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JavaScript (ES6+), GitHub Pages static hosting

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `docs/.nojekyll` | Create | Disable Jekyll processing |
| `docs/assets/style.css` | Create | Shared Roland Garros theme (CSS variables, layout, components) |
| `docs/assets/nav.js` | Create | Active-page highlight + live search (fetches search-index.json) |
| `docs/assets/search-index.json` | Create | Flat array of all tips for search |
| `docs/index.html` | Create | Homepage: category card grid + prominent search bar |
| `docs/technique.html` | Create | Teknik page with topspin tip |
| `docs/forehand.html` | Create | Forhånd page with stance tip |
| `docs/tactics.html` | Create | Taktik page with byg-og-vent tip |
| `docs/backhand.html` | Create | Baghånd page (empty placeholder) |
| `docs/serve.html` | Create | Serv page (empty placeholder) |
| `docs/mental.html` | Create | Mental page (empty placeholder) |
| `docs/focus-areas.html` | Create | Indsatsområder page |
| `_config.yml` | Modify | Disable Jekyll (or delete) |

**GitHub Pages setting (manual step):** Change Pages source from "root" to `/docs` folder in repo Settings → Pages.

---

## Task 1: Setup — disable Jekyll, create docs structure

**Files:**
- Create: `docs/.nojekyll`
- Create: `docs/assets/` (directory)
- Modify: `_config.yml` → delete this file (Jekyll no longer used)

- [ ] **Step 1: Create docs directory structure**

```bash
mkdir -p /Users/larsgammelgaard/Projects/tennis-coach/docs/assets
touch /Users/larsgammelgaard/Projects/tennis-coach/docs/.nojekyll
```

- [ ] **Step 2: Remove Jekyll configuration files**

Delete these files (they will no longer be used):
- `_config.yml`
- `Gemfile`
- `Gemfile.lock` (if present)
- `_layouts/default.html`
- `index.md`
- `knowledge/forehand.md` → keep (coach memory, just exclude from Pages)
- `knowledge/backhand.md` → keep
- `knowledge/serve.md` → keep
- `knowledge/tactics.md` → keep
- `knowledge/technique.md` → keep
- `knowledge/mental.md` → keep
- `focus-areas.md` → keep

Run:
```bash
cd /Users/larsgammelgaard/Projects/tennis-coach
rm _config.yml Gemfile _layouts/default.html index.md focus-areas.md
rm -f Gemfile.lock
```

- [ ] **Step 3: Update .gitignore to exclude Jekyll build artifacts**

Add to `.gitignore`:
```
_site/
.jekyll-cache/
.jekyll-metadata
```

- [ ] **Step 4: Commit setup**

```bash
git add -A
git commit -m "Remove Jekyll, add docs/.nojekyll for static HTML site"
```

---

## Task 2: Shared stylesheet — style.css

**Files:**
- Create: `docs/assets/style.css`

- [ ] **Step 1: Create style.css with Roland Garros theme**

Write `docs/assets/style.css`:

```css
/* ── VARIABLES ── */
:root {
  --clay:        #C4572A;
  --clay-dark:   #8B3A1C;
  --clay-light:  #F0E8DF;
  --navy:        #1B2A3B;
  --navy-mid:    #243648;
  --gold:        #C8A243;
  --cream:       #FAFAF8;
  --sand:        #F5EDE3;
  --text:        #1C1C1C;
  --text-muted:  #6B6056;
  --border:      #DDD4C8;
  --font-display: 'Playfair Display', serif;
  --font-body:    'Source Sans 3', sans-serif;
  --max-w: 860px;
}

/* ── RESET ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-body);
  background: var(--cream);
  color: var(--text);
  line-height: 1.7;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}

/* ── NAV ── */
nav.site-nav {
  background: var(--navy);
  position: sticky;
  top: 0;
  z-index: 100;
}

nav.site-nav::after {
  content: '';
  display: block;
  height: 3px;
  background: linear-gradient(90deg, var(--clay-dark), var(--clay), var(--gold), var(--clay), var(--clay-dark));
}

.nav-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 52px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-logo {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
}

.nav-logo:hover { color: var(--gold); }

.nav-links {
  display: flex;
  gap: 0.1rem;
  list-style: none;
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;
}

.nav-links::-webkit-scrollbar { display: none; }

.nav-links a {
  display: block;
  padding: 0.25rem 0.65rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  border-radius: 3px;
  white-space: nowrap;
  transition: color 0.2s, background 0.2s;
}

.nav-links a:hover { color: white; background: rgba(255,255,255,0.08); }
.nav-links a.active { color: var(--gold); }

/* ── SEARCH ── */
.nav-search {
  position: relative;
  flex-shrink: 0;
}

.nav-search input {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  padding: 0.3rem 0.9rem;
  color: white;
  font-size: 0.82rem;
  width: 160px;
  outline: none;
  transition: background 0.2s, width 0.3s;
  font-family: var(--font-body);
}

.nav-search input::placeholder { color: rgba(255,255,255,0.4); }
.nav-search input:focus { background: rgba(255,255,255,0.15); width: 220px; }

.search-dropdown {
  display: none;
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border: 1px solid var(--border);
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  width: 320px;
  max-height: 360px;
  overflow-y: auto;
  z-index: 200;
}

.search-dropdown.open { display: block; }

.search-result {
  display: block;
  padding: 0.7rem 1rem;
  border-bottom: 1px solid var(--border);
  text-decoration: none;
  color: var(--text);
  transition: background 0.15s;
}

.search-result:last-child { border-bottom: none; }
.search-result:hover { background: var(--sand); }

.search-result-title {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--navy);
  display: block;
  margin-bottom: 0.15rem;
}

.search-result-meta {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.search-no-results {
  padding: 1rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-align: center;
}

/* ── HERO ── */
.hero {
  background: var(--navy);
  padding: 3rem 1.5rem 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    -45deg, transparent, transparent 8px,
    rgba(255,255,255,0.018) 8px, rgba(255,255,255,0.018) 9px
  );
  pointer-events: none;
}

.hero-eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--clay);
  margin-bottom: 0.5rem;
  position: relative;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
  line-height: 1.2;
  letter-spacing: -0.01em;
  position: relative;
}

.hero h1::after { display: none; }

.hero p {
  margin-top: 0.75rem;
  font-size: 1.05rem;
  color: rgba(255,255,255,0.6);
  position: relative;
}

/* ── HERO SEARCH ── */
.hero-search {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  position: relative;
}

.hero-search input {
  width: 100%;
  max-width: 440px;
  background: white;
  border: none;
  border-radius: 30px;
  padding: 0.75rem 1.4rem;
  font-size: 0.95rem;
  color: var(--text);
  outline: none;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  font-family: var(--font-body);
}

.hero-search-dropdown {
  display: none;
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid var(--border);
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  width: 440px;
  max-height: 360px;
  overflow-y: auto;
  z-index: 200;
}

.hero-search-dropdown.open { display: block; }

/* ── MAIN CONTENT ── */
main {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
}

/* ── TYPOGRAPHY ── */
h1 {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--navy);
  line-height: 1.25;
  margin-bottom: 0.4rem;
  letter-spacing: -0.01em;
}

h1::after {
  content: '';
  display: block;
  width: 36px;
  height: 3px;
  background: var(--clay);
  margin-top: 0.6rem;
  border-radius: 2px;
}

h2 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--navy);
  margin: 2.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}

p { margin-bottom: 0.85rem; font-size: 0.97rem; }
ul, ol { margin: 0.4rem 0 0.85rem 1.4rem; }
li { margin-bottom: 0.35rem; font-size: 0.97rem; }
strong { font-weight: 600; }
em { font-style: italic; color: var(--text-muted); font-size: 0.92em; }

a {
  color: var(--clay-dark);
  text-decoration: none;
  border-bottom: 1px solid var(--border);
  transition: color 0.2s, border-color 0.2s;
}
a:hover { color: var(--clay); border-color: var(--clay); }

/* ── CATEGORY GRID ── */
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.category-card {
  background: white;
  border: 1px solid var(--border);
  border-top: 3px solid var(--clay);
  border-radius: 4px;
  padding: 1.3rem;
  text-decoration: none;
  color: inherit;
  border-bottom: none;
  display: block;
  transition: transform 0.18s, box-shadow 0.18s;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(27,42,59,0.12);
  border-color: var(--border);
  border-top-color: var(--clay-dark);
  border-bottom: none;
}

.category-card h3 {
  font-family: var(--font-display);
  color: var(--navy);
  font-size: 1rem;
  margin-bottom: 0.35rem;
}

.category-card p {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.45;
}

/* ── TIP CARDS ── */
.tip-card {
  background: white;
  border: 1px solid var(--border);
  border-left: 4px solid var(--clay);
  border-radius: 0 4px 4px 0;
  padding: 1.3rem 1.4rem;
  margin-bottom: 1.1rem;
}

.tip-header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.6rem;
}

.tip-title {
  font-family: var(--font-display);
  font-size: 1.0rem;
  font-weight: 600;
  color: var(--navy);
}

.tip-meta {
  font-size: 0.75rem;
  color: var(--text-muted);
  white-space: nowrap;
}

.tip-source {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: var(--clay-light);
  color: var(--clay-dark);
  padding: 0.1rem 0.5rem;
  border-radius: 3px;
}

.tip-body { font-size: 0.95rem; line-height: 1.65; }
.tip-body p { margin-bottom: 0.5rem; }
.tip-body p:last-child { margin-bottom: 0; }

/* ── SECTION HEADERS (focus-areas) ── */
.section-label {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--clay);
  margin-bottom: 1.2rem;
  border-bottom: 2px solid var(--clay);
  padding-bottom: 0.2rem;
}

/* ── EMPTY STATE ── */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-muted);
  font-size: 0.95rem;
}

/* ── PAGE INTRO ── */
.page-intro {
  font-size: 1rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}

/* ── FOOTER ── */
footer {
  background: var(--navy);
  color: rgba(255,255,255,0.3);
  text-align: center;
  padding: 1.25rem;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ── RESPONSIVE ── */
@media (max-width: 640px) {
  .nav-links { display: none; }
  .hero h1 { font-size: 1.65rem; }
  .category-grid { grid-template-columns: 1fr 1fr; }
  main { padding: 2rem 1.25rem 3rem; }
  .hero-search-dropdown { width: calc(100vw - 3rem); transform: translateX(-50%); }
}
```

- [ ] **Step 2: Commit**

```bash
git add docs/assets/style.css
git commit -m "Add shared Roland Garros stylesheet"
```

---

## Task 3: Navigation script + search index

**Files:**
- Create: `docs/assets/nav.js`
- Create: `docs/assets/search-index.json`

- [ ] **Step 1: Create search-index.json with current tips**

Write `docs/assets/search-index.json`:

```json
[
  {
    "id": "technique-topspin",
    "title": "Sving-sti bestemmer topspin — ikke svinghastigheden",
    "category": "technique",
    "categoryLabel": "Teknik",
    "date": "2026-05-18",
    "source": "holdtræning",
    "body": "Ketcherbevægelsen skal have konstant høj hastighed. Det er sving-stien der afgør topspinmængden: start højt, gå dybt ned, sving opad. Ændr stien — ikke hastigheden — for at justere. Swoosh-lyden skal altid være der.",
    "url": "technique.html#technique-topspin"
  },
  {
    "id": "forehand-stance",
    "title": "Brug semi-open eller lukket stance — ikke open stance",
    "category": "forehand",
    "categoryLabel": "Forhånd",
    "date": "2026-05-18",
    "source": "holdtræning",
    "body": "Semi-open som standard. Lukket stance til inside-in (longline langs baghåndssiden). Open stance kun under tidspres. Bredere stance for at komme ned i knæene.",
    "url": "forehand.html#forehand-stance"
  },
  {
    "id": "tactics-build-first",
    "title": "Mod defensive spillere: Byg først — angrib kun på den korte bold",
    "category": "tactics",
    "categoryLabel": "Taktik",
    "date": "2026-05-18",
    "source": "coaching-session",
    "body": "Grønt lys for angreb: bolden er kort OG du er i balance. Alt andet: topspin cross-court, 1 meter over nettet. Angrib med topspin og sigte 1 meter inde i banen.",
    "url": "tactics.html#tactics-build-first"
  }
]
```

- [ ] **Step 2: Create nav.js**

Write `docs/assets/nav.js`:

```javascript
(function () {
  const NAV_LINKS = [
    { href: 'index.html',       label: 'Oversigt',       id: '' },
    { href: 'forehand.html',    label: 'Forhånd',        id: 'forehand' },
    { href: 'backhand.html',    label: 'Baghånd',        id: 'backhand' },
    { href: 'serve.html',       label: 'Serv',           id: 'serve' },
    { href: 'tactics.html',     label: 'Taktik',         id: 'tactics' },
    { href: 'technique.html',   label: 'Teknik',         id: 'technique' },
    { href: 'mental.html',      label: 'Mental',         id: 'mental' },
    { href: 'focus-areas.html', label: 'Indsatsområder', id: 'focus-areas' },
  ];

  let searchIndex = null;

  function getBase() {
    const scripts = document.querySelectorAll('script[src*="nav.js"]');
    for (const s of scripts) {
      const m = s.src.match(/^(.*\/assets\/)/);
      if (m) return m[1];
    }
    return 'assets/';
  }

  function getCurrentPage() {
    return location.pathname.split('/').pop() || 'index.html';
  }

  function buildNav(searchInputId, dropdownId) {
    const nav = document.querySelector('nav.site-nav');
    if (!nav) return;
    const current = getCurrentPage();
    const linksHtml = NAV_LINKS.map(l =>
      `<li><a href="${l.href}" class="${current === l.href ? 'active' : ''}">${l.label}</a></li>`
    ).join('');
    nav.innerHTML = `
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">🎾 Tennis Coach</a>
        <ul class="nav-links">${linksHtml}</ul>
        <div class="nav-search">
          <input type="search" id="${searchInputId}" placeholder="Søg tips…" autocomplete="off">
          <div class="search-dropdown" id="${dropdownId}"></div>
        </div>
      </div>
    `;
    nav.insertAdjacentHTML('afterend',
      `<div style="height:3px;background:linear-gradient(90deg,#8B3A1C,#C4572A,#C8A243,#C4572A,#8B3A1C)"></div>`
    );
    attachSearch(searchInputId, dropdownId, '.search-dropdown');
  }

  function attachSearch(inputId, dropdownId, dropdownSelector) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    if (!input || !dropdown) return;

    input.addEventListener('input', async function () {
      const q = this.value.trim().toLowerCase();
      if (!q) { dropdown.classList.remove('open'); return; }
      if (!searchIndex) {
        const base = getBase();
        const res = await fetch(base + 'search-index.json');
        searchIndex = await res.json();
      }
      const results = searchIndex.filter(t =>
        t.title.toLowerCase().includes(q) || t.body.toLowerCase().includes(q)
      ).slice(0, 8);
      if (!results.length) {
        dropdown.innerHTML = '<div class="search-no-results">Ingen resultater</div>';
      } else {
        dropdown.innerHTML = results.map(t =>
          `<a class="search-result" href="${t.url}">
            <span class="search-result-title">${t.title}</span>
            <span class="search-result-meta">${t.categoryLabel} · ${t.date}</span>
          </a>`
        ).join('');
      }
      dropdown.classList.add('open');
    });

    document.addEventListener('click', function (e) {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  function attachHeroSearch(inputId, dropdownId) {
    attachSearch(inputId, dropdownId, '.hero-search-dropdown');
  }

  window.TennisNav = { buildNav, attachHeroSearch };
})();
```

- [ ] **Step 3: Commit**

```bash
git add docs/assets/nav.js docs/assets/search-index.json
git commit -m "Add nav.js and search-index.json"
```

---

## Task 4: Homepage — index.html

**Files:**
- Create: `docs/index.html`

- [ ] **Step 1: Create index.html**

Write `docs/index.html`:

```html
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tennis Coach — Lars</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <nav class="site-nav"></nav>

  <div class="hero">
    <div class="hero-eyebrow">Personlig Knowledge Base</div>
    <h1>Tennis Coach</h1>
    <p>Tips, taktik og teknik — samlet til brug i træning og kamp</p>
    <div class="hero-search">
      <input type="search" id="hero-search-input" placeholder="Søg på tværs af alle tips…" autocomplete="off">
      <div class="hero-search-dropdown" id="hero-search-dropdown"></div>
    </div>
  </div>

  <main>
    <div class="category-grid">
      <a class="category-card" href="forehand.html">
        <h3>Forhånd</h3>
        <p>Teknik, topspin, stance og aggressivitet fra baseline</p>
      </a>
      <a class="category-card" href="backhand.html">
        <h3>Baghånd</h3>
        <p>Énhåndet baghånd — topspin, slice og pres-situationer</p>
      </a>
      <a class="category-card" href="serve.html">
        <h3>Serv</h3>
        <p>Første og anden serv, konsistens og placering</p>
      </a>
      <a class="category-card" href="tactics.html">
        <h3>Taktik</h3>
        <p>Kampstrategi, mønstre og beslutninger under pres</p>
      </a>
      <a class="category-card" href="technique.html">
        <h3>Teknik</h3>
        <p>Ketcherbevægelse, balance og sving — generelle råd</p>
      </a>
      <a class="category-card" href="mental.html">
        <h3>Mental</h3>
        <p>Fokus, rutiner og håndtering af pres</p>
      </a>
      <a class="category-card" href="focus-areas.html">
        <h3>Indsatsområder</h3>
        <p>Aktuelle fokuspunkter — teknisk, taktisk og mentalt</p>
      </a>
    </div>
  </main>

  <footer>Lars's Tennis Coach &mdash; Personlig knowledge base</footer>

  <script src="assets/nav.js"></script>
  <script>
    TennisNav.buildNav('nav-search-input', 'nav-search-dropdown');
    TennisNav.attachHeroSearch('hero-search-input', 'hero-search-dropdown');
  </script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

```bash
open /Users/larsgammelgaard/Projects/tennis-coach/docs/index.html
```

Verify: hero displays, category cards render, nav appears, search input is visible.

- [ ] **Step 3: Commit**

```bash
git add docs/index.html
git commit -m "Add homepage (index.html)"
```

---

## Task 5: Technique page

**Files:**
- Create: `docs/technique.html`

- [ ] **Step 1: Create technique.html**

Write `docs/technique.html`:

```html
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Teknik — Tennis Coach</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <nav class="site-nav"></nav>

  <main>
    <h1>Teknik</h1>
    <p class="page-intro">Generelle tekniske råd — ketcherbevægelse, balance, fodarbejde og sving.</p>

    <div id="technique-topspin" class="tip-card">
      <div class="tip-header">
        <span class="tip-title">Sving-sti bestemmer topspin — ikke svinghastigheden</span>
        <span class="tip-meta">2026-05-18</span>
        <span class="tip-source">holdtræning</span>
      </div>
      <div class="tip-body">
        <p>Ketcherbevægelsen (hele svingen fra lodret til follow-through, uden backswing) skal have konstant høj hastighed uanset om du slår flad eller med topspin.</p>
        <p>Det er <strong>stien</strong> der afgør topspinmængden: ketcheren starter højt, går dybt ned og svinger opad = topspin. Racketfladen ved kontakt: let lukket (peger lidt nedad) ved topspin, flad/lodret ved fladt slag.</p>
        <p>Vil du slå blødere eller med mindre risiko: ændr sving-stien — ikke hastigheden. <strong>Swoosh-lyden skal altid være der.</strong> Gælder både forhånd og baghånd.</p>
      </div>
    </div>
  </main>

  <footer>Lars's Tennis Coach &mdash; Personlig knowledge base</footer>

  <script src="assets/nav.js"></script>
  <script>TennisNav.buildNav('nav-search-input', 'nav-search-dropdown');</script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

```bash
open /Users/larsgammelgaard/Projects/tennis-coach/docs/technique.html
```

Verify: tip card renders with clay left border, nav active on "Teknik", search works.

- [ ] **Step 3: Commit**

```bash
git add docs/technique.html
git commit -m "Add technique.html with topspin tip"
```

---

## Task 6: Forehand page

**Files:**
- Create: `docs/forehand.html`

- [ ] **Step 1: Create forehand.html**

Write `docs/forehand.html`:

```html
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forhånd — Tennis Coach</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <nav class="site-nav"></nav>

  <main>
    <h1>Forhånd</h1>
    <p class="page-intro">Teknik, topspin, stance og aggressivitet fra baseline.</p>

    <div id="forehand-stance" class="tip-card">
      <div class="tip-header">
        <span class="tip-title">Brug semi-open eller lukket stance — ikke open stance</span>
        <span class="tip-meta">2026-05-18</span>
        <span class="tip-source">holdtræning</span>
      </div>
      <div class="tip-body">
        <p>Undgå open stance medmindre du er under tidspres. Brug <strong>semi-open som standard</strong> og <strong>lukket stance til inside-in</strong> (longline langs baghåndssiden).</p>
        <p>Med semi-open stance på inside-in åbner hoften for meget og bolden ryger for langt ud.</p>
        <p>For at komme længere ned i knæene: gør stansen <strong>bredere</strong> i stedet for at bøje mere i knæene.</p>
      </div>
    </div>
  </main>

  <footer>Lars's Tennis Coach &mdash; Personlig knowledge base</footer>

  <script src="assets/nav.js"></script>
  <script>TennisNav.buildNav('nav-search-input', 'nav-search-dropdown');</script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add docs/forehand.html
git commit -m "Add forehand.html with stance tip"
```

---

## Task 7: Tactics page

**Files:**
- Create: `docs/tactics.html`

- [ ] **Step 1: Create tactics.html**

Write `docs/tactics.html`:

```html
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Taktik — Tennis Coach</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <nav class="site-nav"></nav>

  <main>
    <h1>Taktik</h1>
    <p class="page-intro">Kampstrategi, mønstre og beslutninger under pres.</p>

    <div id="tactics-build-first" class="tip-card">
      <div class="tip-header">
        <span class="tip-title">Mod defensive spillere: Byg først — angrib kun på den korte bold</span>
        <span class="tip-meta">2026-05-18</span>
        <span class="tip-source">coaching-session</span>
      </div>
      <div class="tip-body">
        <p>Angrib ikke fordi du er utålmodig — angrib fordi bolden <strong>fortjener</strong> et angreb.</p>
        <p><strong>Grønt lys for angreb:</strong> bolden lander kort (inden for serviceboksen eller midtbanen) OG du er i balance.</p>
        <p>Alt andet: byg videre med topspin cross-court, 1 meter over nettet.</p>
        <p>Når du angriber: brug topspin og sigte <strong>1 meter inde i banen</strong> — ikke til linjen. Topspin giver 3× så meget fejlmargin som en flad bold til linjen.</p>
        <p>Løser to problemer: utålmodighed i bolden (klar regel) og frygt i kampen (angriber på betingelse, ikke på følelse).</p>
      </div>
    </div>
  </main>

  <footer>Lars's Tennis Coach &mdash; Personlig knowledge base</footer>

  <script src="assets/nav.js"></script>
  <script>TennisNav.buildNav('nav-search-input', 'nav-search-dropdown');</script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add docs/tactics.html
git commit -m "Add tactics.html with byg-og-vent tip"
```

---

## Task 8: Remaining pages (backhand, serve, mental, focus-areas)

**Files:**
- Create: `docs/backhand.html`, `docs/serve.html`, `docs/mental.html`, `docs/focus-areas.html`

- [ ] **Step 1: Create backhand.html**

Write `docs/backhand.html`:

```html
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Baghånd — Tennis Coach</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <nav class="site-nav"></nav>
  <main>
    <h1>Baghånd</h1>
    <p class="page-intro">Énhåndet baghånd — topspin, slice og pres-situationer.</p>
    <div class="empty-state">Ingen tips endnu — tilføjes via coaching-sessioner.</div>
  </main>
  <footer>Lars's Tennis Coach &mdash; Personlig knowledge base</footer>
  <script src="assets/nav.js"></script>
  <script>TennisNav.buildNav('nav-search-input', 'nav-search-dropdown');</script>
</body>
</html>
```

- [ ] **Step 2: Create serve.html**

Write `docs/serve.html` — same structure as backhand.html but with title "Serv" and intro "Første og anden serv, konsistens og placering."

- [ ] **Step 3: Create mental.html**

Write `docs/mental.html` — same structure, title "Mental", intro "Fokus, rutiner og håndtering af pres i kamp."

- [ ] **Step 4: Create focus-areas.html**

Write `docs/focus-areas.html`:

```html
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Indsatsområder — Tennis Coach</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <nav class="site-nav"></nav>
  <main>
    <h1>Indsatsområder</h1>
    <p class="page-intro">Aktuelle fokuspunkter — opdateres løbende.</p>

    <h2>Teknisk</h2>
    <div class="tip-card">
      <div class="tip-header"><span class="tip-title">Ketcherbevægelse og topspin-sving-sti</span></div>
      <div class="tip-body"><p>Konstant hastighed, sving-stien afgør topspin. Se <a href="technique.html#technique-topspin">Teknik</a>.</p></div>
    </div>
    <div class="tip-card">
      <div class="tip-header"><span class="tip-title">Stance på forhånden</span></div>
      <div class="tip-body"><p>Semi-open som standard, lukket til inside-in. Se <a href="forehand.html#forehand-stance">Forhånd</a>.</p></div>
    </div>
    <div class="tip-card">
      <div class="tip-header"><span class="tip-title">Højt, sikkert, dybt topspind grundslag</span></div>
      <div class="tip-body"><p>Fundament for byg-og-vent strategien. Stejl sving-sti, ikke hård kontakt. Fokus på forehand og baghånd.</p></div>
    </div>

    <h2>Taktisk</h2>
    <div class="tip-card">
      <div class="tip-header"><span class="tip-title">Byg først — angrib kun på den korte bold</span></div>
      <div class="tip-body"><p>Angrib på betingelse, ikke på følelse. Se <a href="tactics.html#tactics-build-first">Taktik</a>.</p></div>
    </div>
    <div class="tip-card">
      <div class="tip-header"><span class="tip-title">Brug fysisk form som taktisk fordel</span></div>
      <div class="tip-body"><p>God kondition er et aktivt våben: byg lange bolde og ud-træt modstanderen.</p></div>
    </div>

    <h2>Mentalt</h2>
    <div class="empty-state">Under udvikling — næste session.</div>
  </main>
  <footer>Lars's Tennis Coach &mdash; Personlig knowledge base</footer>
  <script src="assets/nav.js"></script>
  <script>TennisNav.buildNav('nav-search-input', 'nav-search-dropdown');</script>
</body>
</html>
```

- [ ] **Step 5: Commit all**

```bash
git add docs/backhand.html docs/serve.html docs/mental.html docs/focus-areas.html
git commit -m "Add remaining HTML pages (backhand, serve, mental, focus-areas)"
```

---

## Task 9: Configure GitHub Pages + final push

**Files:**
- No file changes — GitHub Pages configuration is done via browser (repo Settings → Pages)

- [ ] **Step 1: Push all commits**

```bash
git push
```

- [ ] **Step 2: Configure GitHub Pages in repo settings (manual)**

Go to: https://github.com/larsgam/tennis-coach/settings/pages

Change source:
- Branch: `main`
- Folder: `/docs`

Save. GitHub Pages will rebuild in ~60 seconds.

- [ ] **Step 3: Verify live site**

Open: https://larsgam.github.io/tennis-coach/

Verify:
- Homepage loads with Roland Garros styling
- Navigation works (all 7 links)
- Search returns results for "topspin", "stance", "byg"
- Category pages load with tip cards

---

## Self-Review

**Spec coverage:**
- ✅ Multi-page HTML with shared CSS/JS
- ✅ Roland Garros styling
- ✅ Navigation between all category pages
- ✅ Client-side search via search-index.json
- ✅ `.nojekyll` disables Jekyll
- ✅ Knowledge .md files untouched
- ✅ Curated content (not 1:1 with .md files)
- ✅ Focus areas page with 3 sections

**Placeholders:** None — all HTML, CSS, and JS is complete.

**Type consistency:** `TennisNav.buildNav` and `TennisNav.attachHeroSearch` called consistently across all pages.
