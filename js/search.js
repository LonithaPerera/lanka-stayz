// Hero search: validates dates, then hands the query to the listings page via URL params.
import { DESTINATIONS } from './data.js';
import { linkDates, todayISO, addDays } from './ui.js';

export function initSearch(form, { redirect = true } = {}) {
  const dest = form.elements.dest;
  dest.insertAdjacentHTML(
    'beforeend',
    DESTINATIONS.map((d) => `<option value="${d.name}">${d.name}</option>`).join('')
  );
  const checkIn = form.elements.checkin;
  const checkOut = form.elements.checkout;
  linkDates(checkIn, checkOut);

  const params = new URLSearchParams(location.search);
  if (params.get('dest')) dest.value = params.get('dest');
  checkIn.value = params.get('checkin') || '';
  checkOut.value = params.get('checkout') || '';
  if (params.get('guests')) form.elements.guests.value = params.get('guests');

  const error = form.querySelector('.search__error');
  form.addEventListener('submit', (e) => {
    const cin = checkIn.value, cout = checkOut.value;
    let msg = '';
    if (cin && cin < todayISO()) msg = 'Check-in cannot be in the past.';
    else if (cin && cout && cout <= cin) msg = 'Check-out must be after check-in.';
    else if (cin && !cout) checkOut.value = addDays(cin, 1);
    if (error) error.textContent = msg;
    if (msg) return e.preventDefault();
    if (!redirect) e.preventDefault();
  });
}
