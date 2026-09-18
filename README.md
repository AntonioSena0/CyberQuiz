# CyberQuiz — Quiz da Segurança Cibernética

Site completo, interativo e cheio de animações usando **apenas HTML, CSS e JavaScript puro** + **GSAP via CDN** + **HTML5 Canvas**.

Teste seus conhecimentos sobre golpes, senhas, links e proteção no dia a dia em 12 perguntas com dicas, timer, sons, confete e ranking local.

## Recursos implementados

- **Hero 100% viewport**: canvas de partículas/conexões (dados e segurança), título com typewriter, gradiente animado (azul escuro + roxo + verde neon), botão com hover scale + glow.
- **Aprenda**: seção educativa com 6 guias (senhas, códigos, links, WhatsApp/Pix, Wi-Fi, privacidade) que caem no quiz.
- **Quiz de 12 perguntas** com fade-in + slide, 4 alternativas (hover animado), dica explicativa ("Por quê?") após cada resposta, feedback verde/vermelho, barra de progresso 0–100%, contador, transição com GSAP Timeline e **confete ao acertar**.
- **Resultado** com fogos/partículas no canvas, pontuação em destaque, mensagem por faixa (0–5 / 6–9 / 10–12), botões Refazer e Compartilhar.
- **GSAP**: ScrollTrigger nas seções, Timelines, fade/slide/scale/rotation/opacity, partícula em loop (`gsap.to` + `repeat:-1` + `yoyo`), hovers magnéticos.
- **Extras**: ranking em `localStorage`, timer de 15s, sons via Web Audio API (sem arquivos), acessibilidade (contraste, foco visível, `aria-live`, teclado 1–4, `prefers-reduced-motion`), SEO básico, responsivo mobile-first.

## ⌨️ Atalhos

| Tecla | Ação |
|---|---|
| `Enter` | Ir para o quiz e começar |
| `1`–`4` | Responder alternativa |
| `Tab` | Navegar com foco visível |

## 🎨 Paleta e fontes

- `#0a0a0a` fundo • `#00ff88` verde neon • `#00d4ff` ciano • `#7b2cbf` roxo
- Fontes: **Orbitron** (títulos) + **Rajdhani** (texto) via Google Fonts
- CDN GSAP: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js` (+ ScrollTrigger)
