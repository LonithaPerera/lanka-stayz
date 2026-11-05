// Shared UI: site header/footer, icons, property card, date helpers, reveal.
import { formatLKR } from './data.js';

const svg = (d, extra = '') =>
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;

export const ICONS = {
  pin: svg('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>'),
  users: svg('<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.5-3.6 3-5.5 6-5.5s5.5 1.9 6 5.5"/><path d="M16 5.2a3.2 3.2 0 0 1 0 5.8M18 14.8c1.8.7 3 2.4 3.3 5.2"/>'),
  bed: svg('<path d="M3 18V7M3 14h18v4M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5"/><circle cx="7" cy="11" r="1.6"/>'),
  bath: svg('<path d="M4 12h16v2.5A4.5 4.5 0 0 1 15.5 19h-7A4.5 4.5 0 0 1 4 14.5V12zM6 12V6.5A2.5 2.5 0 0 1 8.5 4c1 0 1.8.5 2.2 1.2M7 19l-1 2M17 19l1 2"/>'),
  star: svg('<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8z"/>'),
  wifi: svg('<path d="M3 9.5a14 14 0 0 1 18 0M6 13a9 9 0 0 1 12 0M9 16.5a4.5 4.5 0 0 1 6 0"/><circle cx="12" cy="19.5" r=".6" fill="currentColor"/>'),
  pool: svg('<path d="M8 4v10M15 4v10M8 7h7M8 11h7M3 18c1.5 0 1.5 1.2 3 1.2S7.5 18 9 18s1.5 1.2 3 1.2S13.5 18 15 18s1.5 1.2 3 1.2S19.5 18 21 18"/>'),
  ac: svg('<rect x="3" y="5" width="18" height="7" rx="1.5"/><path d="M7 15.5c0 1.5-1 1.5-1 3M12 15.5c0 1.5-1 1.5-1 3M17 15.5c0 1.5-1 1.5-1 3M7 8.5h6"/>'),
  parking: svg('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9.5 16.5V8h3.2a2.6 2.6 0 0 1 0 5.2H9.5"/>'),
  breakfast: svg('<path d="M5 10h11v4a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5v-4zM16 11h1.5a2 2 0 0 1 0 4H16M8 3.5c0 1.2-1 1.2-1 2.4M12 3.5c0 1.2-1 1.2-1 2.4"/>'),
  kitchen: svg('<path d="M7 3v7a2 2 0 0 0 2 2v9M11 3v7M7 6h4M17 21V3c-2 1.5-3 4-3 7v3h3"/>'),
  garden: svg('<path d="M12 21v-9M12 12c-4 0-6-2.600-6-6 4 0 6 2 6 6zM12 14c0-3 2-5 6-5 0 3.500-2.500 5-6 5z"/>'),
  beach: svg('<path d="M3 20h18M12 20V9M5 9.500C6 5.500 9 4 12 4s6 1.500 7 5.500c-2-1.500-4.500-1-7 0-2.500-1-5-1.500-7 0z"/>'),
  fireplace: svg('<path d="M12 4c.5 3-3 4.500-3 8a3 3 0 0 0 6 0c0-1.300-.5-2-1-3 2 .800 4 2.500 4 5.500A6 6 0 0 1 6 14.500C6 9.500 11 8 12 4zM4 21h16"/>'),
  gym: svg('<path d="M3 10v4M6 8v8M18 8v8M21 10v4M6 12h12"/>'),
  phone: svg('<path d="M5 4h3.500l1.500 4-2 1.500a11 11 0 0 0 6.500 6.500L16 14l4 1.500V19a2 2 0 0 1-2 2C10.800 21 3 13.200 3 6a2 2 0 0 1 2-2z"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.500 7 8.500 6.500L20.500 7"/>'),
  check: svg('<path d="m5 12.500 4.500 4.500L19 7.500"/>'),
  close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
  arrow: svg('<path d="M4 12h15M13 6l6 6-6 6"/>'),
  calendar: svg('<rect x="3.500" y="5" width="17" height="15.500" rx="2"/><path d="M3.500 10h17M8 3v4M16 3v4"/>'),
};

export const iconFor = (key) => ICONS[key] || ICONS.check;

const LOGO = `
<svg class="logo__mark" viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
  <circle cx="16" cy="11" r="6" fill="var(--cinnamon)"/>
  <path d="M2 27 16 16l14 11z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <path d="M2 27h28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const NAV = [
  ['index.html', 'Home'],
  ['stays.html', 'Explore Stays'],
  ['about.html', 'About Us'],
  ['contact.html', 'Contact'],
];

export function renderChrome(active) {
  const header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML = `
      <div class="wrap site-header__bar">
        <a class="logo" href="index.html" aria-label="Lanka Stayz home">${LOGO}<span>Lanka Stayz</span></a>
        <button class="nav-toggle" aria-expanded="false" aria-controls="primary-nav">
          <span class="visually-hidden">Menu</span><i></i><i></i><i></i>
        </button>
        <nav id="primary-nav" class="nav" aria-label="Primary">
          ${NAV.map(([href, label]) =>
            `<a href="${href}"${href === active ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
        </nav>
      </div>`;
    const toggle = header.querySelector('.nav-toggle');
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('is-open')) toggle.click();
    });
  }

  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="wrap site-footer__grid">
        <div>
          <a class="logo logo--light" href="index.html">${LOGO}<span>Lanka Stayz</span></a>
          <p class="site-footer__about">Handpicked villas, holiday homes and boutique hotels across Sri Lanka, from the hill country to the southern coast.</p>
        </div>
        <div>
          <h2 class="footer-title">Explore</h2>
          <ul>${NAV.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul>
        </div>
        <div>
          <h2 class="footer-title">Get in touch</h2>
          <ul class="contact-list">
            <li>${ICONS.pin}<span>No. 24, Galle Road, Colombo 03, Sri Lanka</span></li>
            <li>${ICONS.phone}<a href="tel:+94744141037">074 414 1037</a></li>
            <li>${ICONS.mail}<a href="mailto:lankastayz@gmail.com">lankastayz@gmail.com</a></li>
          </ul>
        </div>
        <div>
          <h2 class="footer-title">Follow</h2>
          <ul class="social">
            <li><a href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook</a></li>
            <li><a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://www.youtube.com/" target="_blank" rel="noopener">YouTube</a></li>
            <li><a href="https://www.tiktok.com/" target="_blank" rel="noopener">TikTok</a></li>
          </ul>
        </div>
      </div>
      <div class="wrap site-footer__base">
        <p>&copy; ${new Date().getFullYear()} Lanka Stayz. Sample website, all properties are fictional.</p>
      </div>`;
  }
  initReveal();
}

export function propertyCard(p, i = 0, qs = '') {
  const href = `property.html?id=${p.id}${qs}`;
  return `
  <article class="card reveal" style="--d:${(i % 3) * 80}ms">
    <a class="card__media" href="${href}" tabindex="-1" aria-hidden="true">
      <img src="${p.images[0]}" alt="" loading="lazy" width="800" height="600">
      <span class="card__type">${p.type}</span>
    </a>
    <div class="card__body">
      <p class="card__loc">${ICONS.pin}${p.destination}</p>
      <h3><a href="${href}">${p.name}</a></h3>
      <ul class="card__meta">
        <li>${ICONS.users}Up to ${p.guests} guests</li>
        <li>${ICONS.star}${p.rating.toFixed(1)}</li>
      </ul>
      <div class="card__foot">
        <p class="price"><strong>${formatLKR(p.price)}</strong><span> / night</span></p>
        <a class="btn btn--ghost btn--sm" href="${href}">View Details<span class="visually-hidden"> for ${p.name}</span></a>
      </div>
    </div>
  </article>`;
}

// ---- dates -------------------------------------------------------------
export const toISO = (d) => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
};
export const todayISO = () => toISO(new Date());
export const addDays = (iso, n) => {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return toISO(d);
};
export const nightsBetween = (a, b) =>
  Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);
export const prettyDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

// Keeps a check-in / check-out pair consistent: no past dates, out is after in.
export function linkDates(inEl, outEl) {
  const today = todayISO();
  inEl.min = today;
  outEl.min = addDays(today, 1);
  inEl.addEventListener('change', () => {
    if (!inEl.value) return;
    outEl.min = addDays(inEl.value, 1);
    if (!outEl.value || outEl.value <= inEl.value) outEl.value = addDays(inEl.value, 1);
  });
}

function initReveal() {
  document.documentElement.classList.add('js');
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) return els.forEach((el) => el.classList.add('is-in'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach((el) => io.observe(el));
}
export const observeNew = initReveal;
