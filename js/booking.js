// Form validation (shared by the booking and contact forms) and the booking flow.
import { formatLKR } from './data.js';
import { ICONS, linkDates, nightsBetween, prettyDate, todayISO } from './ui.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9][0-9\s-]{7,14}$/; // 0771234567, +94 77 123 4567

// Returns an error message, or '' when the field is valid.
function check(input, form, max) {
  const v = input.value.trim();
  const label = input.dataset.label || 'this field';
  if (input.required && !v) return `Please enter ${label}.`;
  switch (input.name) {
    case 'name': return v.length < 2 ? 'Please enter your full name.' : '';
    case 'email': return EMAIL.test(v) ? '' : 'Enter a valid email address, e.g. name@example.com.';
    case 'phone': return PHONE.test(v) ? '' : 'Enter a valid phone number, e.g. 077 123 4567.';
    case 'checkin': return v < todayISO() ? 'Check-in cannot be in the past.' : '';
    case 'checkout': {
      const cin = form.elements.checkin.value;
      return cin && v <= cin ? 'Check-out must be after check-in.' : '';
    }
    case 'guests': {
      const n = Number(v);
      if (!Number.isInteger(n) || n < 1) return 'At least 1 guest is required.';
      return max && n > max ? `This property sleeps up to ${max} guests.` : '';
    }
    case 'message': return v.length < 10 ? 'Please write at least 10 characters.' : '';
    default: return '';
  }
}

function show(input, msg) {
  const field = input.closest('.field');
  field.classList.toggle('has-error', Boolean(msg));
  field.querySelector('.field__error').textContent = msg;
  input.setAttribute('aria-invalid', msg ? 'true' : 'false');
}

export function attachValidation(form, { max = 0, onValid }) {
  const inputs = [...form.querySelectorAll('.input')];
  inputs.forEach((i) => {
    i.addEventListener('blur', () => show(i, check(i, form, max)));
    i.addEventListener('input', () => i.closest('.field').classList.contains('has-error') && show(i, check(i, form, max)));
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let first = null;
    inputs.forEach((i) => {
      const msg = check(i, form, max);
      show(i, msg);
      if (msg && !first) first = i;
    });
    if (first) return first.focus();
    onValid(Object.fromEntries(new FormData(form)));
  });
}

const field = (id, label, extra, error = true) => `
  <div class="field">
    <label for="${id}">${label} <span class="req" aria-hidden="true">*</span></label>
    ${extra}
    ${error ? '<p class="field__error" id="' + id + '-err" aria-live="polite"></p>' : ''}
  </div>`;

// Opens the booking-request dialog for a property, prefilled from the page.
export function openBooking(dialog, property, defaults = {}) {
  const body = dialog.querySelector('.modal__body');
  body.innerHTML = `
    <form id="booking-form" novalidate>
      <div class="form-grid">
        <div class="full">${field('b-name', 'Guest name', `<input class="input" id="b-name" name="name" required autocomplete="name" data-label="your name" aria-describedby="b-name-err">`)}</div>
        ${field('b-email', 'Email address', `<input class="input" id="b-email" name="email" type="email" required autocomplete="email" data-label="your email address" aria-describedby="b-email-err">`)}
        ${field('b-phone', 'Contact number', `<input class="input" id="b-phone" name="phone" type="tel" required autocomplete="tel" placeholder="077 123 4567" data-label="a contact number" aria-describedby="b-phone-err">`)}
        ${field('b-in', 'Check-in', `<input class="input" id="b-in" name="checkin" type="date" required data-label="a check-in date" aria-describedby="b-in-err">`)}
        ${field('b-out', 'Check-out', `<input class="input" id="b-out" name="checkout" type="date" required data-label="a check-out date" aria-describedby="b-out-err">`)}
        <div class="full">${field('b-guests', 'Number of guests', `<input class="input" id="b-guests" name="guests" type="number" min="1" max="${property.guests}" required data-label="the number of guests" aria-describedby="b-guests-err">`)}</div>
      </div>
      <p class="booking-note">No payment is taken. The Lanka Stayz team will confirm availability by email.</p>
      <button class="btn btn--primary btn--block" type="submit">Submit Booking Request</button>
    </form>`;
  dialog.querySelector('.modal__title').textContent = `Request ${property.name}`;
  dialog.querySelector('.modal__sub').textContent = `${property.destination} · ${formatLKR(property.price)} / night · sleeps ${property.guests}`;

  const form = body.querySelector('form');
  linkDates(form.elements.checkin, form.elements.checkout);
  form.elements.checkin.value = defaults.checkin || '';
  form.elements.checkout.value = defaults.checkout || '';
  form.elements.guests.value = defaults.guests || '';

  attachValidation(form, {
    max: property.guests,
    onValid(data) {
      const nights = nightsBetween(data.checkin, data.checkout);
      const ref = 'LS-' + Math.random().toString(36).slice(2, 8).toUpperCase();
      const booking = { ref, property: property.id, nights, total: nights * property.price, ...data, at: new Date().toISOString() };
      try {
        const all = JSON.parse(localStorage.getItem('lankaStayzRequests') || '[]');
        localStorage.setItem('lankaStayzRequests', JSON.stringify([...all, booking]));
      } catch { /* storage unavailable, the confirmation still shows */ }
      showConfirmation(dialog, property, booking);
    },
  });
  if (!dialog.open) dialog.showModal();
  form.elements.name.focus();
}

function showConfirmation(dialog, property, b) {
  const body = dialog.querySelector('.modal__body');
  body.innerHTML = `
    <div class="confirm" role="status">
      <div class="confirm__badge">${ICONS.check}</div>
      <h3>Request received</h3>
      <p>Thank you, ${b.name.split(' ')[0]}. Your request is recorded, and the team will reply to <strong>${b.email}</strong> to confirm availability within 24 hours.</p>
      <p class="confirm__ref">Reference ${b.ref}</p>
      <dl class="summary">
        <div><dt>Stay</dt><dd>${property.name}</dd></div>
        <div><dt>Dates</dt><dd>${prettyDate(b.checkin)} to ${prettyDate(b.checkout)}</dd></div>
        <div><dt>Guests</dt><dd>${b.guests}</dd></div>
        <div><dt>${b.nights} ${b.nights === 1 ? 'night' : 'nights'}</dt><dd>${formatLKR(b.total)} (estimate)</dd></div>
      </dl>
      <button class="btn btn--primary" type="button" data-close>Done</button>
    </div>`;
  dialog.querySelector('.modal__title').textContent = 'Booking request sent';
  dialog.querySelector('.modal__sub').textContent = 'No payment has been taken.';
  body.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  body.querySelector('[data-close]').focus();
}
