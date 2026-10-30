import { t } from './i18n.js';
import { $, esc } from './ui.js';

let data = [];

export async function initSpecies() {
  try {
    const r = await fetch('data/species.json');
    if (!r.ok) throw new Error();
    data = await r.json();
  } catch {
    $('#shark-grid').innerHTML = `<p class="empty" role="alert">${esc(t('err.load'))}</p>`;
    return;
  }
  $('#shark-search').addEventListener('input', renderSpecies);
  $('#shark-filter').addEventListener('change', renderSpecies);
  const grid = $('#shark-grid');
  grid.addEventListener('click', e => { const b = e.target.closest('[data-note]'); if (b) openNote(b.dataset.note); });
  grid.addEventListener('error', e => { if (e.target.tagName === 'IMG') e.target.closest('.photo')?.classList.add('noimg'); }, true);
  renderSpecies();
}

export function renderSpecies() {
  if (!data.length) return;
  const q = $('#shark-search').value.trim().toLowerCase(), h = $('#shark-filter').value;
  const list = data.filter(s => (h === 'all' || s.habitat === h) &&
    [t(`sp.${s.id}.name`), s.sci, t(`sp.${s.id}.tag`), t(`sp.${s.id}.desc`)].join(' ').toLowerCase().includes(q));
  $('#shark-count').textContent = t('sp.count', { n: list.length });
  $('#shark-grid').innerHTML = list.length ? list.map(s => {
    const name = esc(t(`sp.${s.id}.name`)), n = String(data.indexOf(s) + 1).padStart(2, '0');
    return `<article class="card"><div class="photo"><img loading="lazy" decoding="async" src="${esc(s.img)}" alt="${esc(t('sp.photo', { n: name }))}"><span class="badge">${esc(t('sp.badge'))} ${n}</span></div>
<div class="card-body"><div class="sci">${esc(s.sci)}</div><h3>${name}</h3><p>${esc(t(`sp.${s.id}.desc`))}</p>
<div class="card-foot"><span class="tag">${esc(t(`sp.${s.id}.tag`))}</span><button class="ghost-btn" type="button" data-note="${s.id}" aria-label="${esc(t('sp.noteFor', { n: name }))}">${esc(t('sp.note'))}</button></div></div></article>`;
  }).join('') : `<p class="empty">${esc(t('sp.empty'))}</p>`;
}

function openNote(id) {
  const s = data.find(x => x.id === id);
  if (!s) return;
  $('#note-sci').textContent = s.sci;
  $('#note-h').textContent = t(`sp.${id}.name`);
  $('#note-tag').textContent = t(`sp.${id}.tag`);
  $('#note-fact').textContent = t(`sp.${id}.fact`);
  $('#note-dialog').showModal();
}