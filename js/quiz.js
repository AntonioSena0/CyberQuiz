(() => {
  'use strict';
  const App = (window.CyberQuiz = window.CyberQuiz || {});
  const TIME_PER_Q = 15;
  const QUESTIONS = [
    { cat: 'SENHAS', q: 'Qual é a forma mais segura de lidar com senhas?', options: ['Usar a mesma senha fácil em todos os sites para não esquecer', 'Usar data de nascimento e nome do time, que são fáceis de lembrar', 'Dividir a senha com alguém da família para alguém lembrar por você', 'Criar senhas diferentes para os serviços importantes e guardar em um gerenciador de senhas'], correct: 3, tip: 'Se uma conta vazar e você usa a mesma senha em tudo, o golpista entra em todas. Senhas únicas + verificação em duas etapas resolvem isso.' },
    { cat: 'CÓDIGOS', q: 'Você recebe um código de verificação que não pediu. O que fazer?', options: ['Apagar e não fazer nada, deve ter sido engano', 'Passar o código para quem ligar dizendo ser do suporte', 'Nunca compartilhar o código, trocar a senha e conferir a verificação em duas etapas', 'Postar o código nas redes para alertar os amigos'], correct: 2, tip: 'Código que você não pediu significa que alguém tentou entrar na sua conta. Suporte de verdade nunca pede código por telefone.' },
    { cat: 'GOLPES', q: 'Chega a mensagem: "Sua conta será bloqueada! Clique aqui agora". Como agir?', options: ['Clicar rápido antes que a conta seja bloqueada', 'Conferir o remetente, não clicar e entrar no app oficial digitando o endereço', 'Encaminhar para os contatos clicarem e testarem', 'Responder a mensagem com CPF e senha para confirmar os dados'], correct: 1, tip: 'Golpistas usam pressa e medo para você clicar sem pensar. Na dúvida, nunca use o link recebido: abra o app oficial.' },
    { cat: 'WHATSAPP', q: 'Um parente com número novo pede dinheiro urgente no WhatsApp. O que fazer?', options: ['Transferir na hora para ajudar, emergência não espera', 'Pedir a senha do banco dele para conferir se é verdade', 'Enviar o comprovante junto com foto dos seus documentos', 'Ligar por voz ou vídeo para o número antigo da pessoa antes de mandar qualquer valor'], correct: 3, tip: 'Se passar por parente é um dos golpes mais comuns. Uma ligação de vídeo de 30 segundos evita o prejuízo.' },
    { cat: 'COMPRAS', q: 'Uma loja desconhecida vende um produto pela metade do preço, só com Pix antecipado. O que é mais seguro?', options: ['Pagar correndo antes que a oferta acabe', 'Desconfiar, pesquisar a reputação e preferir pagamento com proteção', 'Pagar e mandar o comprovante junto com foto do documento', 'Informar os dados do cartão no chat da loja para garantir'], correct: 1, tip: 'Preço impossível + pressa + Pix antecipado é o roteiro clássico de loja falsa. Oferta boa de verdade aceita pagamento seguro.' },
    { cat: 'WI-FI', q: 'Você precisa resolver algo do banco usando o Wi-Fi grátis do shopping. O que fazer?', options: ['Entrar no banco normalmente, Wi-Fi grátis é seguro', 'Pedir a senha do Wi-Fi para estranhos e continuar usando', 'Tirar a senha de bloqueio do celular para conectar mais rápido', 'Evitar o banco em rede aberta e usar os dados móveis para o urgente'], correct: 3, tip: 'Em rede aberta, outras pessoas podem espionar o que trafega. Banco e compras ficam para os dados móveis ou a rede de casa.' },
    { cat: 'REDES SOCIAIS', q: 'O que é mais seguro ao usar redes sociais?', options: ['Postar a viagem em tempo real com a localização ativada', 'Postar fotos de documentos e cartões para mostrar conquistas', 'Não expor endereço, rotina e documentos, e ajustar a privacidade do perfil', 'Aceitar todo mundo que seguir para ganhar seguidores'], correct: 2, tip: 'Criminosos montam sua rotina com o que você posta: onde mora, quando viaja, onde os filhos estudam. Menos exposição, mais segurança.' },
    { cat: 'APLICATIVOS', q: 'Um joguinho grátis pede acesso aos contatos, fotos e mensagens. O que fazer?', options: ['Aceitar tudo para jogar logo', 'Informar a senha do e-mail para liberar o jogo', 'Compartilhar o jogo com todos os contatos para ganhar bônus', 'Desconfiar, negar permissões exageradas e baixar apps só das lojas oficiais'], correct: 3, tip: 'Jogo não precisa de SMS nem de contatos. Permissão exagerada é coleta de dados ou golpe. Use só Play Store ou App Store.' },
    { cat: 'CELULAR', q: 'Por que manter o celular atualizado e com backup ativado?', options: ['Atualizações corrigem falhas que golpistas exploram e o backup protege fotos e arquivos', 'Só para mudar a aparência do sistema', 'Atualizar serve para deixar o celular mais lento', 'Backup serve para ver os arquivos das outras pessoas'], correct: 0, tip: 'Muitos golpes entram por falhas já corrigidas em atualizações. E se perder o aparelho, o backup e o bloqueio remoto salvam seus dados.' },
    { cat: 'GOLPES', q: 'Alguém liga dizendo ser do banco e pede sua senha para "cancelar uma fraude". O que fazer?', options: ['Passar a senha, afinal é o próprio banco ligando', 'Instalar o aplicativo que ele mandar para ele acessar seu celular', 'Desligar, ligar você mesmo para o número oficial e nunca passar senhas', 'Passar só metade da senha para testar se é verdade'], correct: 2, tip: 'Banco nunca pede senha por telefone nem manda instalar nada. O número de quem liga pode ser falsificado: desligue e ligue você.' },
    { cat: 'BOLETOS', q: 'Chega um boleto por e-mail com valor diferente do esperado. O que fazer?', options: ['Pagar na hora para não ter juros', 'Pagar primeiro e reclamar depois', 'Repassar o boleto para amigos dividirem o valor', 'Conferir beneficiário e código, e confirmar no app oficial da empresa'], correct: 3, tip: 'Boletos falsos mantêm a aparência da empresa, mas trocam quem recebe o dinheiro. Conferir o beneficiário leva 1 minuto.' },
    { cat: 'CELULAR', q: 'Seu celular foi perdido ou roubado. Qual a primeira atitude?', options: ['Esperar alguém devolver sem fazer nada', 'Tentar localizar e bloquear pelo serviço oficial, avisar a operadora e trocar as senhas importantes', 'Mandar mensagem oferecendo a senha para quem encontrou', 'Comprar outro aparelho e cadastrar as mesmas senhas fracas'], correct: 1, tip: 'Conta Google e Apple permitem localizar, bloquear e apagar o aparelho à distância. Agir rápido impede o uso das suas contas.' },
  ];
  const TOTAL = QUESTIONS.length;
  App.TOTAL = TOTAL;
  const $ = (id) => document.getElementById(id);
  const intro = $('quiz-intro'), body = $('quiz-body'), result = $('result');
  const qCat = $('q-category'), qText = $('q-text'), optsBox = $('options');
  const counter = $('q-counter'), pct = $('progress-pct'), fill = $('progress-fill'), progressAria = $('progress-aria');
  const timerNum = $('timer-num'), timerStroke = $('timer-stroke'), timerFill = $('timer-fill');
  const timerBar = document.querySelector('.timer-bar');
  const scoreLive = $('score-live'), pop = $('feedback-pop'), qTip = $('q-tip');
  let current = 0, score = 0, locked = false;
  let timeLeft = TIME_PER_Q, timerId = null;
  const hasGsap = () => typeof window.gsap !== 'undefined';
  let audioCtx = null;
  function tone(freq, dur = 0.15, type = 'sine', vol = 0.18, when = 0) {
    if (!App.soundOn) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const t = audioCtx.currentTime + when;
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(t); o.stop(t + dur);
    } catch {}
  }
  const sfx = {
    click: () => tone(600, 0.07, 'square', 0.08),
    correct: () => { tone(523, 0.12, 'sine', 0.2); tone(659, 0.12, 'sine', 0.2, 0.1); tone(784, 0.22, 'sine', 0.22, 0.2); },
    wrong: () => { tone(220, 0.2, 'sawtooth', 0.14); tone(150, 0.3, 'sawtooth', 0.14, 0.12); },
    tick: () => tone(880, 0.05, 'square', 0.05),
    fanfare: () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, 0.18, 'triangle', 0.2, i * 0.13)),
  };
  const fx = $('fx-canvas');
  const fctx = fx.getContext('2d');
  let FW = 0, FH = 0, parts = [], fxRunning = false, celebration = false;
  function fxResize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    FW = window.innerWidth; FH = window.innerHeight;
    fx.width = FW * dpr; fx.height = FH * dpr;
    fx.style.width = FW + 'px'; fx.style.height = FH + 'px';
    fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', fxResize);
  fxResize();
  const CONF_COLORS = ['#00ff88', '#00d4ff', '#7b2cbf', '#ffbe0b', '#ff4d6d', '#ffffff'];
  function burst(x, y, n = 70) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, sp = Math.random() * 6 + 2;
      parts.push({
        type: 'conf', x, y,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2,
        w: Math.random() * 7 + 4, h: Math.random() * 5 + 3,
        rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
        color: CONF_COLORS[(Math.random() * CONF_COLORS.length) | 0],
        life: 1, decay: Math.random() * 0.012 + 0.008,
      });
    }
    runFx();
  }
  function rocket() {
    parts.push({
      type: 'rocket', x: Math.random() * FW * 0.8 + FW * 0.1, y: FH + 10,
      vx: (Math.random() - 0.5) * 1.5, vy: -(Math.random() * 3 + 8),
      color: CONF_COLORS[(Math.random() * CONF_COLORS.length) | 0], life: 1,
    });
    runFx();
  }
  function explode(x, y, color) {
    for (let i = 0; i < 60; i++) {
      const a = Math.random() * Math.PI * 2, sp = Math.random() * 5 + 1.5;
      parts.push({
        type: 'star', x, y,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        r: Math.random() * 2.5 + 1, color, life: 1,
        decay: Math.random() * 0.015 + 0.01,
      });
    }
  }
  function runFx() {
    if (fxRunning) return;
    fxRunning = true;
    requestAnimationFrame(fxLoop);
  }
  function fxLoop() {
    fctx.clearRect(0, 0, FW, FH);
    parts = parts.filter(p => p.life > 0 && p.y < FH + 40);
    for (const p of parts) {
      if (p.type === 'rocket') {
        p.x += p.vx; p.y += p.vy; p.vy += 0.08;
        fctx.fillStyle = p.color; fctx.shadowBlur = 10; fctx.shadowColor = p.color;
        fctx.beginPath(); fctx.arc(p.x, p.y, 3, 0, Math.PI * 2); fctx.fill();
        fctx.shadowBlur = 0;
        if (p.vy > -1.5) { p.life = 0; explode(p.x, p.y, p.color); tone(200 + Math.random() * 600, 0.3, 'sine', 0.06); }
      } else if (p.type === 'conf') {
        p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.vx *= 0.99; p.rot += p.vr; p.life -= p.decay;
        fctx.save(); fctx.globalAlpha = Math.max(p.life, 0);
        fctx.translate(p.x, p.y); fctx.rotate(p.rot);
        fctx.fillStyle = p.color; fctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        fctx.restore();
      } else {
        p.x += p.vx; p.y += p.vy; p.vx *= 0.985; p.vy *= 0.985; p.vy += 0.03; p.life -= p.decay;
        fctx.globalAlpha = Math.max(p.life, 0);
        fctx.fillStyle = p.color; fctx.shadowBlur = 8; fctx.shadowColor = p.color;
        fctx.beginPath(); fctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); fctx.fill();
        fctx.shadowBlur = 0; fctx.globalAlpha = 1;
      }
    }
    if (celebration && Math.random() < 0.06 && parts.length < 600) rocket();
    if (parts.length || celebration) requestAnimationFrame(fxLoop);
    else { fxRunning = false; fctx.clearRect(0, 0, FW, FH); }
  }
  function setProgress() {
    const done = current;
    const percent = Math.round((done / TOTAL) * 100);
    if (hasGsap()) gsap.to(fill, { width: percent + '%', duration: 0.6, ease: 'power2.out' });
    else fill.style.width = percent + '%';
    pct.textContent = percent + '%';
    counter.textContent = `${Math.min(current + 1, TOTAL)}/${TOTAL}`;
    progressAria.setAttribute('aria-valuenow', String(percent));
  }
  function startQuiz() {
    sfx.click();
    current = 0; score = 0; celebration = false;
    scoreLive.textContent = '0';
    intro.hidden = true; result.hidden = true; body.hidden = false;
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (hasGsap()) {
      gsap.timeline()
        .fromTo('#quiz-shell', { scale: 0.96, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.6)' });
    }
    renderQuestion();
  }
  App.startQuiz = startQuiz;
  function renderQuestion() {
    locked = false;
    const item = QUESTIONS[current];
    setProgress();
    qCat.textContent = item.cat;
    qText.textContent = `${current + 1}. ${item.q}`;
    optsBox.innerHTML = '';
    qTip.hidden = true;
    qTip.className = 'q-tip';
    const letters = ['A', 'B', 'C', 'D'];
    item.options.forEach((text, i) => {
      const b = document.createElement('button');
      b.className = 'opt';
      b.innerHTML = `<span class="key">${letters[i]}</span><span>${text}</span>`;
      b.setAttribute('aria-label', `${letters[i]}: ${text}`);
      b.addEventListener('click', (e) => answer(i, e));
      b.addEventListener('mouseenter', () => { if (!locked && hasGsap()) gsap.to(b, { x: 4, duration: 0.15 }); });
      b.addEventListener('mouseleave', () => { if (!locked && hasGsap()) gsap.to(b, { x: 0, duration: 0.15 }); });
      optsBox.appendChild(b);
    });
    if (hasGsap()) {
      gsap.timeline()
        .fromTo([qCat, qText], { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out' })
        .fromTo('.opt', { opacity: 0, y: 26, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.07, ease: 'back.out(1.5)' }, '-=0.2');
    }
    startTimer();
  }
  function startTimer() {
    stopTimer();
    timeLeft = TIME_PER_Q;
    drawTimer();
    timerId = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 5 && timeLeft > 0) sfx.tick();
      drawTimer();
      if (timeLeft <= 0) { stopTimer(); answer(-1); }
    }, 1000);
  }
  function stopTimer() { if (timerId) clearInterval(timerId); timerId = null; }
  function drawTimer() {
    timerNum.textContent = Math.max(timeLeft, 0);
    const C = 113;
    timerStroke.style.strokeDashoffset = String(C * (1 - Math.max(timeLeft, 0) / TIME_PER_Q));
    timerStroke.style.stroke = timeLeft <= 5 ? '#ff4d6d' : '#00ff88';
    timerFill.style.width = (Math.max(timeLeft, 0) / TIME_PER_Q * 100) + '%';
    timerBar.classList.toggle('danger', timeLeft <= 5);
  }
  function showPop(text, good) {
    pop.textContent = text;
    pop.className = 'feedback-pop ' + (good ? 'good' : 'bad');
    if (hasGsap()) {
      gsap.timeline()
        .to(pop, { opacity: 1, scale: 1.15, duration: 0.22, ease: 'back.out(2)' })
        .to(pop, { opacity: 0, scale: 0.8, duration: 0.35, delay: 0.55 });
    } else {
      pop.style.opacity = 1;
      setTimeout(() => (pop.style.opacity = 0), 800);
    }
  }
  function answer(i, ev) {
    if (locked) return;
    locked = true;
    stopTimer();
    const item = QUESTIONS[current];
    const btns = [...optsBox.children];
    const hit = i === item.correct;
    btns.forEach((b, idx) => {
      b.disabled = true;
      if (idx === item.correct) b.classList.add('correct');
      else if (idx === i) b.classList.add('wrong');
      else b.classList.add('dim');
    });
    if (hit) {
      score++;
      scoreLive.textContent = String(score);
      sfx.correct();
      showPop('✔ CORRETO!', true);      const shell = document.getElementById('quiz-shell').getBoundingClientRect();
      const x = ev?.clientX || shell.left + shell.width / 2;
      const y = ev?.clientY || shell.top + 150;
      burst(x, y, 80);
      if (hasGsap()) gsap.fromTo(btns[item.correct], { scale: 1 }, { scale: 1.04, yoyo: true, repeat: 1, duration: 0.15 });
    } else {
      sfx.wrong();
      showPop(i === -1 ? '⏱ TEMPO ESGOTADO!' : '✘ ERRADO!', false);
      if (hasGsap() && i >= 0) gsap.fromTo(btns[i], { x: 0 }, { x: -8, duration: 0.07, repeat: 5, yoyo: true, clearProps: 'x' });
    }
    qTip.innerHTML = `<strong>Por quê?</strong> ${item.tip}`;
    qTip.className = 'q-tip ' + (hit ? 'good' : 'bad');
    qTip.hidden = false;
    if (hasGsap()) gsap.fromTo(qTip, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    setTimeout(() => {
      const go = () => {
        current++;
        if (current < TOTAL) renderQuestion();
        else finish();
      };
      if (hasGsap()) {
        gsap.timeline({ onComplete: go })
          .to([qText, optsBox, qTip], { opacity: 0, x: 40, duration: 0.28, ease: 'power2.in', stagger: 0.05 })
          .set([qText, optsBox, qTip], { clearProps: 'all' });
      } else go();
    }, 2800);
  }
  function levelOf(s) {
    if (s <= 5) return { icon: 'bi bi-book-fill', level: 'INICIANTE', msg: 'Precisa estudar mais sobre segurança! Releia a seção Aprenda e tente de novo.' };
    if (s <= 9) return { icon: 'bi bi-shield-fill', level: 'INTERMEDIÁRIO', msg: 'Bom trabalho, mas pode melhorar! Revise as dicas e busque os 10 pontos.' };
    return { icon: 'bi bi-trophy-fill', level: 'EXPERT EM SEGURANÇA', msg: 'Excelente! Você é um expert em segurança!' };
  }
  function finish() {
    body.hidden = true;
    result.hidden = false;
    fill.style.width = '100%'; pct.textContent = '100%';
    counter.textContent = `${TOTAL}/${TOTAL}`;
    progressAria.setAttribute('aria-valuenow', '100');
    const { icon, level, msg } = levelOf(score);
    $('medal-icon').className = icon;
    $('final-score').textContent = `${score}/${TOTAL}`;
    $('final-level').textContent = level;
    $('final-msg').textContent = msg;
    const filled = Math.round((score / TOTAL) * 5);
    $('final-stars').textContent = '★'.repeat(filled) + '☆'.repeat(5 - filled);
    if (score >= 7) sfx.fanfare(); else sfx.wrong();
    celebration = true;
    for (let k = 0; k < 4; k++) setTimeout(rocket, k * 350);
    const r = result.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + 120, 120);
    setTimeout(() => { celebration = false; }, 9000);
    if (hasGsap()) {
      gsap.timeline()
        .fromTo(result, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' })
        .fromTo('.result-score', { scale: 0.4, rotation: -8 }, { scale: 1, rotation: 0, duration: 0.7, ease: 'elastic.out(1,0.5)' }, '-=0.2')
        .fromTo('#medal', { y: -30, rotation: -15 }, { y: 0, rotation: 0, duration: 0.6, ease: 'bounce.out' }, '-=0.5');
    }
    saveScore();
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function saveScore() {
    try {
      const best = App.getBest?.() || 0;
      if (score > best) {
        localStorage.setItem('cyberquiz_best', JSON.stringify(score));
        App.toast(`Novo recorde: ${score}/${TOTAL}!`);
      }
      const hist = JSON.parse(localStorage.getItem('cyberquiz_history') || '[]');
      hist.unshift({ score, total: TOTAL, date: new Date().toLocaleString('pt-BR'), level: levelOf(score).level });
      localStorage.setItem('cyberquiz_history', JSON.stringify(hist.slice(0, 8)));
    } catch {}
    App.renderBest?.();
    renderHistory();
  }
  function renderHistory() {
    const list = $('history-list');
    if (!list) return;
    let hist = [];
    try { hist = JSON.parse(localStorage.getItem('cyberquiz_history') || '[]'); } catch { hist = []; }
    const games = $('stat-games'), avg = $('stat-avg');
    if (games) games.textContent = String(hist.length);
    if (avg) avg.textContent = hist.length ? (hist.reduce((a, h) => a + h.score, 0) / hist.length).toFixed(1) + '/' + TOTAL : '—';
    if (!hist.length) { list.innerHTML = '<li class="empty"><i class="bi bi-controller"></i> Nenhuma tentativa ainda. Jogue!</li>'; return; }
    list.innerHTML = '';
    hist.forEach(h => {
      const li = document.createElement('li');
      li.className = h.score >= 10 ? 'good' : h.score >= 6 ? 'mid' : 'bad';
      li.innerHTML = `<span><strong>${h.score}/${h.total}</strong> • ${h.level}</span><small>${h.date}</small>`;
      list.appendChild(li);
    });
  }
  $('btn-start')?.addEventListener('click', startQuiz);
  $('btn-start-2')?.addEventListener('click', startQuiz);
  $('btn-retry')?.addEventListener('click', () => { sfx.click(); startQuiz(); });
  $('btn-share')?.addEventListener('click', async () => {
    sfx.click();
    const text = `Fiz ${score}/${TOTAL} no CyberQuiz — Quiz da Segurança Cibernética! Consegue me superar?`;
    const note = $('share-note');
    try {
      if (navigator.share) { await navigator.share({ title: 'CyberQuiz', text, url: location.href }); note.textContent = 'Compartilhado! Boa sorte para seus amigos.'; }
      else if (navigator.clipboard) { await navigator.clipboard.writeText(text + ' ' + location.href); note.textContent = 'Resultado copiado! Cole onde quiser.'; }
      else { note.textContent = text; }
    } catch { note.textContent = ''; }
    setTimeout(() => { note.textContent = ''; }, 4000);
  });
  $('btn-clear')?.addEventListener('click', () => {
    localStorage.removeItem('cyberquiz_history');
    localStorage.setItem('cyberquiz_best', '0');
    App.renderBest?.(); renderHistory();
    App.toast('Histórico apagado');
  });
  document.addEventListener('keydown', (e) => {
    if (body.hidden || locked) return;
    const n = { 1: 0, 2: 1, 3: 2, 4: 3 }[e.key];
    if (n !== undefined) {
      const btn = optsBox.children[n];
      if (btn) { btn.focus(); btn.click(); }
    }
  });
  renderHistory();
})();
