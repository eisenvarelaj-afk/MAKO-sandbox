// Sistema de traducciones: i18n/<lang>.json. El inglés es el idioma base y el respaldo de claves ausentes.
const KEY = 'mako-lang';
export const LANGS = ['en', 'es'];
let base = {}, cur = {}, lang = 'en';

const load = async l => {
  const r = await fetch(`i18n/${l}.json`);
  if (!r.ok) throw new Error(l);
  return r.json();
};

export const getLang = () => lang;
export const t = (k, v = {}) => String(cur[k] ?? base[k] ?? k).replace(/\{(\w+)\}/g, (_, x) => v[x] ?? '');

export async function initI18n() {
  base = await load('en');
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch {}
  const guess = (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
  await setLang(LANGS.includes(saved) ? saved : guess);
}

export async function setLang(l) {
  try { cur = l === 'en' ? base : await load(l); } catch { cur = base; l = 'en'; }
  lang = l;
  try { localStorage.setItem(KEY, l); } catch {}
  const d = document;
  d.documentElement.lang = l;
  d.title = t('meta.title');
  d.querySelector('meta[name=description]').content = t('meta.desc');
  [['og:title', 'meta.title'], ['og:description', 'meta.desc']].forEach(([p, k]) =>
    d.querySelector(`meta[property="${p}"]`)?.setAttribute('content', t(k)));
  d.querySelectorAll('[data-i18n]').forEach(e => { e.textContent = t(e.dataset.i18n); });
  d.querySelectorAll('[data-i18n-html]').forEach(e => { e.innerHTML = t(e.dataset.i18nHtml); });
  d.querySelectorAll('[data-i18n-attr]').forEach(e => e.dataset.i18nAttr.split(';').forEach(p => {
    const [a, k] = p.split(':');
    e.setAttribute(a, t(k));
  }));
  d.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
}