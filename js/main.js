import { initI18n, setLang } from './i18n.js';
import { $$, initReveal, initDialogs } from './ui.js';
import { initNav } from './nav.js';
import { initHero } from './hero.js';
import { initSpecies, renderSpecies } from './species.js';
import { initPrompts, renderPrompts } from './prompts.js';

async function start() {
  initNav();
  initDialogs();
  initHero();
  try { await initI18n(); }
  catch {
    document.body.insertAdjacentHTML('afterbegin', '<p role="alert" style="position:relative;z-index:500;padding:14px;background:#F0524A;color:#fff;text-align:center;font:12px monospace;margin-top:72px">Could not load translations. Serve the site over HTTP (see README). / No se pudieron cargar las traducciones: abre el sitio por HTTP (ver README).</p>');
    return;
  }
  $$('[data-lang]').forEach(b => b.addEventListener('click', async () => {
    await setLang(b.dataset.lang);
    renderSpecies();
    renderPrompts();
  }));
  await Promise.all([initSpecies(), initPrompts()]);
  initReveal();
  // Activar estilos de animación solo cuando la inicialización esencial terminó.
  // Si falla JavaScript, el contenido permanece visible como mejora progresiva.
  document.documentElement.classList.add('js');
}
start();