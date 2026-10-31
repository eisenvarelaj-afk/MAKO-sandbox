import { $, $$ } from './ui.js';

export function initNav() {
  const nav = $('#nav'), burger = $('#burger'), header = $('.site-header');
  const set = open => { nav.classList.toggle('open', open); burger.setAttribute('aria-expanded', String(open)); };
  burger.addEventListener('click', () => set(!nav.classList.contains('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { set(false); burger.focus(); }
  });
  const desktop = matchMedia('(min-width:981px)');
  if (desktop.addEventListener) desktop.addEventListener('change', () => set(false));
  else desktop.addListener(() => set(false));
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const links = $$('a', nav);
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => a.hash === '#' + e.target.id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(a => { const s = $(a.hash); if (s) io.observe(s); });
}