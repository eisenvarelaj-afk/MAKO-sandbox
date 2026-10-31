export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

let timer;
export function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove('show'), 2200);
}

export function initReveal() {
  if (!('IntersectionObserver' in window)) {
    $('.fade-up').forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    if (e.target.id === 'stats-band') {
      $('#stat-fill-1').style.width = '80%';
      $('#stat-marker-2').style.left = '72%';
      $$('.stat-tri').forEach((t, i) => setTimeout(() => t.classList.add('active'), i * 180));
    }
    obs.unobserve(e.target);
  }), { threshold: 0.18 });
  $$('.fade-up').forEach(el => io.observe(el));
}

export function initDialogs() {
  $$('[data-open]').forEach(b => b.addEventListener('click', e => {
    e.preventDefault();
    $('#' + b.dataset.open + '-dialog').showModal();
  }));
  $$('dialog').forEach(d => {
    d.addEventListener('click', e => { if (e.target === d) d.close(); });
    $$('[data-close]', d).forEach(b => b.addEventListener('click', () => d.close()));
  });
}