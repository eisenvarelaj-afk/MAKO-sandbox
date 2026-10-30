import { t } from './i18n.js';
import { $, toast, esc } from './ui.js';

let data = [];

export async function initPrompts() {
  try {
    const r = await fetch('data/prompts.json');
    if (!r.ok) throw new Error();
    data = await r.json();
  } catch {
    $('#prompt-grid').innerHTML = `<p class="empty" role="alert">${esc(t('err.load'))}</p>`;
    return;
  }
  $('#prompt-search').addEventListener('input', renderPrompts);
  $('#prompt-filter').addEventListener('change', renderPrompts);
  $('#prompt-grid').addEventListener('click', e => {
    const b = e.target.closest('[data-copy]');
    if (b) copy(t(`pr.${b.dataset.copy}.body`));
  });
  renderPrompts();
}

export function renderPrompts() {
  if (!data.length) return;
  const q = $('#prompt-search').value.trim().toLowerCase(), c = $('#prompt-filter').value;
  const list = data.filter(p => (c === 'all' || p.cat === c) &&
    [t(`pr.${p.id}.title`), t(`pr.${p.id}.desc`), t(`pr.${p.id}.body`), t('cat.' + p.cat)].join(' ').toLowerCase().includes(q));
  $('#prompt-total').textContent = t('pr.count', { n: list.length });
  $('#prompt-grid').innerHTML = list.length ? list.map(p => {
    const body = t(`pr.${p.id}.body`);
    return `<article class="card"><div class="card-body"><div class="pcard-top"><span class="sci" style="font:10px var(--mono);letter-spacing:.1em;text-transform:uppercase">${esc(t('cat.' + p.cat))}</span><span class="card-cat">PROMPT / ${String(p.n).padStart(3, '0')}</span></div>
<h3>${esc(t(`pr.${p.id}.title`))}</h3><p>${esc(t(`pr.${p.id}.desc`))}</p>
<div class="preview">${esc(body.slice(0, 120))}…</div>
<div class="card-foot"><button class="copy-btn" type="button" data-copy="${p.id}">${esc(t('pr.copy'))}</button><span class="tag">${esc(t('pr.time', { n: p.min }))}</span></div></div></article>`;
  }).join('') : `<p class="empty">${esc(t('pr.empty'))}</p>`;
}

async function copy(text) {
  try { await navigator.clipboard.writeText(text); toast(t('toast.copied')); }
  catch {
    const a = document.createElement('textarea');
    a.value = text; a.style.cssText = 'position:fixed;opacity:0';
    document.body.append(a); a.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch {}
    a.remove();
    toast(t(ok ? 'toast.copied' : 'toast.fail'));
  }
}