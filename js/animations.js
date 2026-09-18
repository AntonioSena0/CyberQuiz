(() => {
  'use strict';
  const App = (window.CyberQuiz = window.CyberQuiz || {});
  if (typeof window.gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  const reduced = App.reduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FULL = 'Quiz da Segurança Cibernética';
  const tw = document.getElementById('typewriter');
  let ci = 0;
  function type() {
    if (!tw) return;
    if (ci <= FULL.length) {
      tw.textContent = FULL.slice(0, ci);
      ci++;
      setTimeout(type, reduced ? 0 : FULL[ci - 1] === ' ' ? 90 : 45 + Math.random() * 55);
    }
  }
  type();
  if (!reduced) {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.header', { y: -70, opacity: 0, duration: 0.7 })
      .from('.hero-badge', { y: 24, opacity: 0, duration: 0.5 }, '-=0.3')
      .from('.hero-title', { y: 40, opacity: 0, duration: 0.7 }, '-=0.3')
      .from('#hero-subtitle', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.hero-actions', { y: 26, opacity: 0, duration: 0.55 }, '-=0.35')
      .from('.hero-stats .stat', { y: 22, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
      .from('.hero-visual', { x: 60, opacity: 0, scale: 0.94, duration: 0.9 }, '-=0.7')
      .from('.hud-card', { scale: 0.6, opacity: 0, stagger: 0.15, ease: 'back.out(1.8)', duration: 0.5 }, '-=0.5');
  }
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 46, scale: 0.97,
      rotation: i % 2 ? 0.6 : -0.6,
      duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
  const title = document.querySelector('.glitch');
  setInterval(() => {
    if (!title || reduced || document.hidden) return;
    title.classList.add('glitching');
    setTimeout(() => title.classList.remove('glitching'), 180 + Math.random() * 220);
  }, 4200);
  gsap.to('.sat', {
    duration: 2,
    y: -10,
    rotation: 360,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    stagger: 0.3,
  });
  if (!reduced && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width / 2) * 0.18,
          y: (e.clientY - r.top - r.height / 2) * 0.28,
          duration: 0.25, ease: 'power2.out',
        });
      });
      btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1,0.5)' }));
    });
  }
  ScrollTrigger.create({
    start: 40, end: 'max',
    onUpdate: (self) => document.getElementById('header')
      ?.style.setProperty('box-shadow', self.scroll() > 40 ? '0 8px 30px rgba(0,255,136,.12)' : 'none'),
  });
})();
