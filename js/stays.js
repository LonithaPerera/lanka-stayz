import { PROPERTIES, DESTINATIONS } from './data.js';
import { renderChrome, propertyCard, observeNew } from './ui.js';

renderChrome('stays.html');

const $ = (id) => document.getElementById(id);
const chips = $('chips'), results = $('results'), empty = $('empty'), count = $('count');
const typeSel = $('f-type'), guestSel = $('f-guests'), sortSel = $('f-sort');

const params = new URLSearchParams(location.search);
// Dates from the homepage search are passed on to the detail page.
const carry = ['checkin', 'checkout', 'guests']
  .filter((k) => params.get(k))
  .map((k) => `&${k}=${encodeURIComponent(params.get(k))}`)
  .join('');

const state = {
  dest: params.get('dest') || '',
  type: params.get('type') || '',
  guests: params.get('guests') || '',
  sort: params.get('sort') || '',
};

const types = [...new Set(PROPERTIES.map((p) => p.type))].sort();
typeSel.insertAdjacentHTML('beforeend', types.map((t) => `<option>${t}</option>`).join(''));

const destCounts = PROPERTIES.reduce((m, p) => ((m[p.destination] = (m[p.destination] || 0) + 1), m), {});
const chipList = [{ name: '', label: 'All destinations' }, ...DESTINATIONS.filter((d) => destCounts[d.name]).map((d) => ({ name: d.name, label: d.name }))];
chips.innerHTML = chipList
  .map((c) => `<button type="button" class="chip" data-dest="${c.name}" aria-pressed="false">${c.label}</button>`)
  .join('');

function apply() {
  let list = PROPERTIES.filter(
    (p) =>
      (!state.dest || p.destination === state.dest) &&
      (!state.type || p.type === state.type) &&
      (!state.guests || p.guests >= Number(state.guests))
  );
  const sorters = {
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating,
  };
  if (sorters[state.sort]) list = [...list].sort(sorters[state.sort]);

  results.innerHTML = list.map((p, i) => propertyCard(p, i, carry)).join('');
  empty.hidden = list.length > 0;
  count.textContent = list.length
    ? `${list.length} ${list.length === 1 ? 'stay' : 'stays'}${state.dest ? ' in ' + state.dest : ' across Sri Lanka'}`
    : '';
  chips.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.dest === state.dest)));
  typeSel.value = state.type;
  guestSel.value = state.guests;
  sortSel.value = state.sort;
  observeNew();

  // keep the URL shareable without adding history entries
  const q = new URLSearchParams();
  Object.entries(state).forEach(([k, v]) => v && q.set(k, v));
  ['checkin', 'checkout'].forEach((k) => params.get(k) && q.set(k, params.get(k)));
  history.replaceState(null, '', q.toString() ? `?${q}` : location.pathname);
}

chips.addEventListener('click', (e) => {
  const b = e.target.closest('.chip');
  if (b) { state.dest = b.dataset.dest; apply(); }
});
typeSel.addEventListener('change', () => { state.type = typeSel.value; apply(); });
guestSel.addEventListener('change', () => { state.guests = guestSel.value; apply(); });
sortSel.addEventListener('change', () => { state.sort = sortSel.value; apply(); });
const reset = () => { Object.keys(state).forEach((k) => (state[k] = '')); apply(); };
$('reset').addEventListener('click', reset);
$('empty-reset').addEventListener('click', reset);

apply();
