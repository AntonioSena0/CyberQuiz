(() => {
  'use strict';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.CyberQuiz = window.CyberQuiz || {};
  const App = window.CyberQuiz;
  App.soundOn = App.soundOn !== false;
  App.reduceMotion = prefersReduced;
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  App.toast = (msg, ms = 2600) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), ms);
  };
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, particles = [], glyphs = [];
  const COLORS = ['#00ff88', '#00d4ff', '#7b2cbf', '#c77dff'];
  const GLYPHS = ['0', '1', '◈', '⬡', '⚿', '◉', '+', '×'];
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }
  function count() {
    if (W < 640) return 45;
    if (W < 1100) return 75;
    return 110;
  }
  function seed() {
    particles = Array.from({ length: count() }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.6 + 0.8,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45 - 0.12,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      alpha: Math.random() * 0.55 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.03 + 0.008,
    }));
    glyphs = Array.from({ length: Math.floor(count() / 5) }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vy: Math.random() * 0.35 + 0.12,
      ch: GLYPHS[(Math.random() * GLYPHS.length) | 0],
      size: Math.random() * 10 + 10,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      alpha: Math.random() * 0.22 + 0.08,
    }));
  }
  function step() {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = 'center';
    for (const g of glyphs) {
      g.y += g.vy;
      if (g.y > H + 20) { g.y = -20; g.x = Math.random() * W; }
      ctx.globalAlpha = g.alpha;
      ctx.fillStyle = g.color;
      ctx.font = `${g.size}px monospace`;
      ctx.fillText(g.ch, g.x, g.y);
    }
    ctx.globalAlpha = 1;
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < 130) {
          ctx.globalAlpha = (1 - d / 130) * 0.22;
          ctx.strokeStyle = '#00d4ff';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy; p.pulse += p.pulseSpeed;
      if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
      const glow = p.r + Math.sin(p.pulse) * 1.1;
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur = 12; ctx.shadowColor = p.color;
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(glow, 0.6), 0, Math.PI * 2); ctx.fill();
      if (p.r > 2.2) {
        ctx.shadowBlur = 0; ctx.globalAlpha = p.alpha * 0.5;
        ctx.strokeStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, glow + 5, 0, Math.PI * 2); ctx.stroke();
      }
    }
    ctx.shadowBlur = 0; ctx.globalAlpha = 1;
    if (!App.reduceMotion) requestAnimationFrame(step);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) App._paused = true;
    else if (!App.reduceMotion && App._paused) { App._paused = false; requestAnimationFrame(step); }
  });
  window.addEventListener('resize', () => {
    clearTimeout(window.__rz);
    window.__rz = setTimeout(resize, 150);
  });
  resize();
  if (App.reduceMotion) step();
  else requestAnimationFrame(step);
  const burger = document.getElementById('hamburger');
  const mMenu = document.getElementById('mobile-menu');
  burger?.addEventListener('click', () => {
    const open = mMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  mMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));
  const btnSound = document.getElementById('sound-toggle');
  const iconOn = document.getElementById('sound-icon-on');
  const iconOff = document.getElementById('sound-icon-off');
  function renderSound() {
    iconOn.style.display = App.soundOn ? '' : 'none';
    iconOff.style.display = App.soundOn ? 'none' : '';
    btnSound.setAttribute('aria-pressed', String(App.soundOn));
    btnSound.title = App.soundOn ? 'Som: ligado' : 'Som: desligado';
  }
  btnSound?.addEventListener('click', () => {
    App.soundOn = !App.soundOn;
    renderSound();
    App.toast(App.soundOn ? 'Sons ativados' : 'Sons desativados');
  });
  renderSound();
  App.getBest = () => {
    try { return JSON.parse(localStorage.getItem('cyberquiz_best') || '0'); }
    catch { return 0; }
  };
  App.renderBest = () => {
    const total = App.TOTAL || 12;
    const el = document.getElementById('best-score');
    if (el) el.textContent = `${App.getBest()}/${total}`;
    const sb = document.getElementById('stat-best');
    if (sb) sb.textContent = App.getBest() + '/' + total;
  };
  App.renderBest();
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !['BUTTON', 'A', 'INPUT'].includes(document.activeElement?.tagName)) {
      document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
      window.CyberQuiz.startQuiz?.();
    }
  });
})();
