import { getProperty, AMENITY_LABELS, formatLKR, PROPERTIES } from './data.js';
import { renderChrome, ICONS, iconFor, linkDates, nightsBetween, propertyCard, observeNew } from './ui.js';
import { openBooking } from './booking.js';

renderChrome('stays.html');

const root = document.getElementById('property-root');
const params = new URLSearchParams(location.search);
const p = getProperty(params.get('id'));

if (!p) {
  document.title = 'Stay not found | Lanka Stayz';
  root.innerHTML = `
    <div class="empty">
      <h1>We could not find that stay</h1>
      <p>The link may be old. Browse the current list instead.</p>
      <a class="btn btn--primary" href="stays.html">Explore stays</a>
    </div>`;
} else {
  render();
}

function render() {
  document.title = `${p.name}, ${p.destination} | Lanka Stayz`;
  document.querySelector('meta[name="description"]').content = p.tagline;

  const alts = ['exterior view', 'living area', 'bedroom', 'outdoor space'];
  const similar = PROPERTIES.filter((x) => x.id !== p.id && x.destination !== p.destination).slice(0, 3);

  root.innerHTML = `
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="stays.html">Explore Stays</a><span aria-hidden="true">/</span>
      <a href="stays.html?dest=${encodeURIComponent(p.destination)}">${p.destination}</a><span aria-hidden="true">/</span>
      <span aria-current="page">${p.name}</span>
    </nav>

    <header class="prop-head">
      <div>
        <p class="card__loc">${ICONS.pin}${p.area}</p>
        <h1>${p.name}</h1>
        <p class="prop-head__tag">${p.tagline}</p>
      </div>
      <p class="rating">${ICONS.star}<strong>${p.rating.toFixed(1)}</strong> <span>(${p.reviews} reviews)</span></p>
    </header>

    <div class="gallery" id="gallery">
      ${p.images.map((src, i) => `
        <button type="button" class="gallery__item gallery__item--${i}" data-i="${i}" aria-label="Open photo ${i + 1} of ${p.images.length}">
          <img src="${src}" alt="${p.name}, ${alts[i]}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} width="1200" height="800">
        </button>`).join('')}
    </div>

    <div class="prop-layout">
      <div class="prop-main">
        <ul class="facts" aria-label="Property facts">
          <li>${ICONS.users}<span><strong>${p.guests}</strong> guests max</span></li>
          <li>${ICONS.bed}<span><strong>${p.bedrooms}</strong> ${p.bedrooms === 1 ? 'bedroom' : 'bedrooms'}</span></li>
          <li>${ICONS.bath}<span><strong>${p.bathrooms}</strong> ${p.bathrooms === 1 ? 'bathroom' : 'bathrooms'}</span></li>
          <li>${ICONS.pin}<span>${p.type}</span></li>
        </ul>

        <section aria-labelledby="about-h">
          <h2 id="about-h">About this stay</h2>
          <p class="lead">${p.description}</p>
        </section>

        <section aria-labelledby="amen-h">
          <h2 id="amen-h">What this place offers</h2>
          <ul class="amenities">
            ${p.amenities.map((a) => `<li>${iconFor(a)}<span>${AMENITY_LABELS[a]}</span></li>`).join('')}
          </ul>
        </section>

        <section aria-labelledby="rules-h">
          <h2 id="rules-h">Good to know</h2>
          <dl class="rules">
            <div><dt>Check-in</dt><dd>From 2:00 pm</dd></div>
            <div><dt>Check-out</dt><dd>By 11:00 am</dd></div>
            <div><dt>Cancellation</dt><dd>Free up to 7 days before arrival</dd></div>
          </dl>
        </section>
      </div>

      <aside class="book-card" aria-labelledby="book-h">
        <p class="price"><strong>${formatLKR(p.price)}</strong><span> / night</span></p>
        <h2 id="book-h" class="visually-hidden">Check your dates</h2>
        <form id="quote" novalidate>
          <div class="form-grid">
            <div class="field"><label for="q-in">Check-in</label><input class="input" id="q-in" type="date"></div>
            <div class="field"><label for="q-out">Check-out</label><input class="input" id="q-out" type="date"></div>
          </div>
          <p class="quote" id="quote-out" aria-live="polite">Pick your dates for an estimate.</p>
          <button class="btn btn--primary btn--block" type="button" id="book-btn">Request Booking</button>
        </form>
        <p class="booking-note">Sleeps up to ${p.guests}. You will not be charged yet.</p>
      </aside>
    </div>

    ${similar.length ? `
    <section class="similar" aria-labelledby="sim-h">
      <h2 id="sim-h">You might also like</h2>
      <div class="grid">${similar.map((s, i) => propertyCard(s, i)).join('')}</div>
    </section>` : ''}`;

  setupQuote();
  setupLightbox();
  observeNew();
}

function setupQuote() {
  const inEl = document.getElementById('q-in');
  const outEl = document.getElementById('q-out');
  const out = document.getElementById('quote-out');
  linkDates(inEl, outEl);
  inEl.value = params.get('checkin') || '';
  outEl.value = params.get('checkout') || '';

  const update = () => {
    const n = inEl.value && outEl.value ? nightsBetween(inEl.value, outEl.value) : 0;
    out.textContent = n > 0
      ? `${n} ${n === 1 ? 'night' : 'nights'} x ${formatLKR(p.price)} = ${formatLKR(n * p.price)}`
      : 'Pick your dates for an estimate.';
  };
  ['change', 'input'].forEach((ev) => { inEl.addEventListener(ev, update); outEl.addEventListener(ev, update); });
  update();

  const dialog = document.getElementById('booking-dialog');
  dialog.querySelector('.modal__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); }); // backdrop click
  document.getElementById('book-btn').addEventListener('click', () =>
    openBooking(dialog, p, {
      checkin: inEl.value,
      checkout: outEl.value,
      guests: Math.min(Number(params.get('guests')) || 2, p.guests),
    })
  );
}

function setupLightbox() {
  const box = document.getElementById('lightbox');
  const img = box.querySelector('img');
  let idx = 0;
  const show = (i) => {
    idx = (i + p.images.length) % p.images.length;
    img.src = p.images[idx];
    img.alt = `${p.name}, photo ${idx + 1} of ${p.images.length}`;
  };
  document.getElementById('gallery').addEventListener('click', (e) => {
    const b = e.target.closest('.gallery__item');
    if (!b) return;
    show(Number(b.dataset.i));
    box.showModal();
  });
  box.querySelector('.lightbox__close').addEventListener('click', () => box.close());
  box.querySelector('.lightbox__prev').addEventListener('click', () => show(idx - 1));
  box.querySelector('.lightbox__next').addEventListener('click', () => show(idx + 1));
  box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
}
