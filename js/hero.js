import { $, $$ } from './ui.js';

// Hero: el menú y el texto NO dependen del vídeo. Si el vídeo falla, tarda o el usuario
// prefiere menos movimiento / ahorro de datos, se muestra el fondo estático.
export function initHero() {
  const hero = $('#hero'), video = $('#hero-video'), gauge = $('#depth-gauge');
  const marker = $('#depth-marker'), readout = $('#depth-readout');
  const REVEAL_AT = 5;
  let done = false;

  const reveal = () => {
    if (done) return;
    done = true;
    hero.classList.add('is-revealed', 'bite');
    gauge.classList.add('locked');
    marker.style.top = '100%';
    readout.textContent = '200m';
    setTimeout(() => hero.classList.remove('bite'), 650);
  };
  const reset = () => {
    done = false;
    hero.classList.remove('is-revealed');
    gauge.classList.remove('locked');
    marker.style.top = '0%';
    readout.textContent = '000m';
  };

  $$('.dock-thumb img').forEach(i => {
    i.addEventListener('error', () => i.remove());
    if (i.complete && !i.naturalWidth) i.remove();
  });

  const still = matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData;
  if (still) {
    video.remove();
    requestAnimationFrame(reveal);
  } else {
    video.src = video.dataset.src;
    video.addEventListener('timeupdate', () => {
      if (done) return;
      const p = Math.min(1, video.currentTime / REVEAL_AT);
      readout.textContent = String(Math.round(p * 200)).padStart(3, '0') + 'm';
      marker.style.top = p * 100 + '%';
      if (p >= 1) reveal();
    });
    video.addEventListener('ended', reveal);
    video.addEventListener('error', () => { video.hidden = true; reveal(); });
    video.play().catch(reveal);
    setTimeout(reveal, 6000);
  }

  $('#replay-btn').addEventListener('click', () => {
    reset();
    if (video.isConnected && !video.hidden) { video.currentTime = 0; video.play().catch(reveal); }
    else setTimeout(reveal, 500);
  });
}