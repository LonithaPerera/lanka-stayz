import { PROPERTIES, DESTINATIONS } from './data.js';
import { renderChrome, propertyCard, observeNew } from './ui.js';
import { initSearch } from './search.js';

renderChrome('index.html');
initSearch(document.getElementById('search-form'));

document.getElementById('featured-grid').innerHTML = PROPERTIES.slice(0, 6).map((p, i) => propertyCard(p, i)).join('');

const cover = (name) => PROPERTIES.find((p) => p.destination === name)?.cover.small;
document.getElementById('dest-list').innerHTML = DESTINATIONS.slice(0, 6)
  .map((d, i) => `
    <li class="reveal" style="--d:${i * 60}ms">
      <a href="stays.html?dest=${encodeURIComponent(d.name)}">
        <img src="${cover(d.name)}" alt="" loading="lazy" width="600" height="760">
        <span class="dest__txt"><strong>${d.name}</strong><small>${d.blurb}</small></span>
      </a>
    </li>`)
  .join('');

observeNew();
