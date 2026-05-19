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
    { href: 'player-types.html', label: 'Spillerprofiler', id: 'player-types' },
    { href: 'problems.html',     label: 'Problemer',      id: 'problems' },
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
    attachSearch(searchInputId, dropdownId);
    initAccordion();
  }

  function attachSearch(inputId, dropdownId) {
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

  function initAccordion() {
    document.querySelectorAll('.tip-card').forEach(function (card) {
      const header = card.querySelector('.tip-header');
      const body = card.querySelector('.tip-body');
      if (!header || !body) return;
      header.style.cursor = 'pointer';
      header.setAttribute('role', 'button');
      header.addEventListener('click', function () {
        card.classList.toggle('open');
      });
    });
  }

  window.TennisNav = { buildNav, attachHeroSearch };
})();
