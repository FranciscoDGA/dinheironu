/* ═══════════════════════════════════════════════════════
   DINHEIRO NU — JavaScript
   ═══════════════════════════════════════════════════════ */

/* ── Navbar: scroll effect + active link ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  // Navbar shadow on scroll
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Scroll-to-top button
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);

  // Active nav link based on section
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

/* ── Mobile menu ── */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinksEl = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('open');
  navLinksEl.classList.toggle('mobile-open');
});

// Close mobile menu when a link is clicked
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('open');
    navLinksEl.classList.remove('mobile-open');
  });
});

/* ── Reveal animations on scroll ── */
const revealEls = document.querySelectorAll(
  '.article-card, .tool-card, .value-item, .sobre-stat, .section-header'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Helper: format currency ── */
function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* ══════════════════════════════════════════════════════
   TOOL 1: Calculadora de Juros Compostos
══════════════════════════════════════════════════════ */
function calcularJuros() {
  const capital  = parseFloat(document.getElementById('juros-capital').value) || 0;
  const taxa     = parseFloat(document.getElementById('juros-taxa').value) / 100 || 0;
  const meses    = parseInt(document.getElementById('juros-meses').value) || 0;
  const aporte   = parseFloat(document.getElementById('juros-aporte').value) || 0;

  if (meses <= 0 || taxa <= 0) {
    shakeInput('juros-taxa');
    shakeInput('juros-meses');
    return;
  }

  // M = C*(1+i)^n + PMT * ((1+i)^n - 1) / i
  const fator      = Math.pow(1 + taxa, meses);
  const montante   = capital * fator + (taxa > 0 ? aporte * (fator - 1) / taxa : aporte * meses);
  const investido  = capital + (aporte * meses);
  const rendimento = montante - investido;

  document.getElementById('res-investido').textContent  = formatBRL(investido);
  document.getElementById('res-rendimento').textContent = formatBRL(rendimento);
  document.getElementById('res-montante').textContent   = formatBRL(montante);

  const resultEl = document.getElementById('result-juros');
  resultEl.style.display = 'block';
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ══════════════════════════════════════════════════════
   TOOL 2: Controle de Gastos — Regra 50/30/20
══════════════════════════════════════════════════════ */
function calcularGastos() {
  const renda = parseFloat(document.getElementById('gastos-renda').value) || 0;

  if (renda <= 0) {
    shakeInput('gastos-renda');
    return;
  }

  const necessidades = renda * 0.50;
  const lazer        = renda * 0.30;
  const poupanca     = renda * 0.20;

  document.getElementById('res-necessidades').textContent = formatBRL(necessidades);
  document.getElementById('res-lazer').textContent        = formatBRL(lazer);
  document.getElementById('res-poupanca').textContent     = formatBRL(poupanca);

  const resultEl = document.getElementById('result-gastos');
  resultEl.style.display = 'block';
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ══════════════════════════════════════════════════════
   TOOL 3: Calculadora de Financiamento (Price)
══════════════════════════════════════════════════════ */
function calcularFinanciamento() {
  const valor   = parseFloat(document.getElementById('fin-valor').value)   || 0;
  const entrada = parseFloat(document.getElementById('fin-entrada').value)  || 0;
  const taxa    = parseFloat(document.getElementById('fin-taxa').value) / 100 || 0;
  const meses   = parseInt(document.getElementById('fin-meses').value)     || 0;

  if (valor <= 0 || meses <= 0 || taxa <= 0) {
    shakeInput('fin-taxa');
    shakeInput('fin-meses');
    return;
  }

  const principal = valor - entrada;
  if (principal <= 0) {
    alert('A entrada não pode ser maior ou igual ao valor do bem.');
    return;
  }

  // Tabela Price: PMT = PV * i / (1 - (1+i)^-n)
  const parcela    = principal * taxa / (1 - Math.pow(1 + taxa, -meses));
  const totalPagar = parcela * meses + entrada;
  const jurosTotais = totalPagar - valor;

  document.getElementById('res-parcela').textContent    = formatBRL(parcela);
  document.getElementById('res-total-fin').textContent  = formatBRL(totalPagar);
  document.getElementById('res-juros-fin').textContent  = formatBRL(jurosTotais);

  const resultEl = document.getElementById('result-financiamento');
  resultEl.style.display = 'block';
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ── Shake animation for invalid inputs ── */
function shakeInput(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = 'var(--red)';
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => {
    el.style.borderColor = '';
    el.style.animation = '';
  }, 600);
}

// Add shake keyframe via JS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-6px); }
    40%       { transform: translateX(6px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);

/* ── Allow pressing Enter in tool inputs ── */
document.querySelectorAll('.tool-form input').forEach(input => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const btn = input.closest('.tool-form').querySelector('.tool-btn');
      if (btn) btn.click();
    }
  });
});

/* ══════════════════════════════════════════════════════
   Newsletter
══════════════════════════════════════════════════════ */
function handleNewsletter(e) {
  e.preventDefault();
  const btn      = document.getElementById('newsletter-submit-btn');
  const btnText  = document.getElementById('newsletter-btn-text');
  const success  = document.getElementById('newsletterSuccess');
  const form     = document.getElementById('newsletterForm');

  // Loading state
  btn.disabled = true;
  btnText.textContent = 'Inscrevendo...';

  // Simulate async operation
  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'flex';
  }, 1200);
}

/* ── Smooth hover on article cards ── */
document.querySelectorAll('.article-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.willChange = 'transform';
  });
  card.addEventListener('mouseleave', function() {
    this.style.willChange = 'auto';
  });
});

/* ── Lazy load images with fade ── */
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      img.onload = () => { img.style.opacity = '1'; };
      if (img.complete) img.style.opacity = '1';
      imageObserver.unobserve(img);
    }
  });
});
lazyImages.forEach(img => imageObserver.observe(img));

console.log('%c💰 Dinheiro Nu', 'font-size:24px;font-weight:800;color:#f59e0b;');
console.log('%cFinanças sem enrolação.', 'font-size:14px;color:#64748b;');


// Cookie Consent Banner (LGPD)
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('dinheironu_cookie_consent')) {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    // Find absolute path to privacidade.html based on current location
    const inArtigos = window.location.pathname.includes('/artigos/');
    const privLink = inArtigos ? '../privacidade.html' : 'privacidade.html';
    
    banner.innerHTML = `
      <p>Este site usa cookies de análise para garantir que você obtenha a melhor experiência. Ao continuar navegando, você concorda com a nossa <a href="${privLink}">Política de Privacidade</a>.</p>
      <button class="cookie-btn" id="accept-cookies">Concordar e Fechar</button>
    `;
    document.body.appendChild(banner);
    
    // trigger animation
    setTimeout(() => banner.classList.add('show'), 500);
    
    document.getElementById('accept-cookies').addEventListener('click', () => {
      localStorage.setItem('dinheironu_cookie_consent', 'true');
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 400);
    });
  }
});
