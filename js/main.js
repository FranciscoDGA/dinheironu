/* ═══════════════════════════════════════════════════════
   FAZENDO DINHEIRO — JavaScript Principal
   ═══════════════════════════════════════════════════════ */

/* ── Navbar: scroll effect + active link ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (navbar || scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }

    const sections = document.querySelectorAll('section[id]');
    if (sections.length && navLinks.length) {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id') || '';
        }
      });
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          link.classList.toggle('active', href === `#${current}`);
        }
      });
    }
  }, { passive: true });
}

/* ── Mobile menu ── */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinksEl = document.getElementById('navLinks');

if (mobileMenuBtn && navLinksEl) {
  mobileMenuBtn.setAttribute('aria-expanded', 'false');

  const closeMobileMenu = () => {
    mobileMenuBtn.classList.remove('open');
    navLinksEl.classList.remove('mobile-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  };

  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('mobile-open');
    mobileMenuBtn.classList.toggle('open', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinksEl.classList.contains('mobile-open')) {
      closeMobileMenu();
      mobileMenuBtn.focus();
    }
  });
}

/* ── Reveal animations on scroll ── */
const revealEls = document.querySelectorAll(
  '.article-card, .tool-card, .value-item, .sobre-stat, .section-header'
);
if (revealEls.length && 'IntersectionObserver' in window) {
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
}

/* ── Helpers numéricos e de erro ── */
function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function parseNumericInput(id, fallbackZero = false) {
  const el = document.getElementById(id);
  if (!el) return NaN;
  const raw = String(el.value || '').trim().replace(',', '.');
  if (!raw) return fallbackZero ? 0 : NaN;
  const num = Number(raw);
  return Number.isFinite(num) ? num : NaN;
}

function showInlineError(errorId, resultId, message, focusId) {
  const errEl = document.getElementById(errorId);
  const resEl = document.getElementById(resultId);
  if (resEl) resEl.style.display = 'none';
  if (errEl) {
    errEl.textContent = message;
    errEl.hidden = false;
  }
  if (focusId) {
    shakeInput(focusId);
    const focusEl = document.getElementById(focusId);
    if (focusEl) focusEl.focus();
  }
}

function clearInlineError(errorId) {
  const errEl = document.getElementById(errorId);
  if (errEl) {
    errEl.textContent = '';
    errEl.hidden = true;
  }
}

/* ══════════════════════════════════════════════════════
   TOOL 1 (HOME): Calculadora de Juros Compostos
══════════════════════════════════════════════════════ */
function calcularJuros() {
  const capital = parseNumericInput('juros-capital', true);
  const taxaPct = parseNumericInput('juros-taxa', false);
  const mesesRaw = parseNumericInput('juros-meses', false);
  const aporte = parseNumericInput('juros-aporte', true);

  if (Number.isNaN(capital) || capital < 0 || capital > 1e12) {
    showInlineError('error-juros', 'result-juros', 'Informe um capital inicial válido (zero ou positivo até R$ 1 trilhão).', 'juros-capital');
    return;
  }
  if (Number.isNaN(aporte) || aporte < 0 || aporte > 1e12) {
    showInlineError('error-juros', 'result-juros', 'Informe um aporte mensal válido (zero ou positivo).', 'juros-aporte');
    return;
  }
  if (capital === 0 && aporte === 0) {
    showInlineError('error-juros', 'result-juros', 'Informe um capital inicial ou aporte mensal maior que zero.', 'juros-capital');
    return;
  }
  if (Number.isNaN(taxaPct) || taxaPct < 0 || taxaPct > 100) {
    showInlineError('error-juros', 'result-juros', 'Informe uma taxa mensal entre 0% e 100%.', 'juros-taxa');
    return;
  }
  if (Number.isNaN(mesesRaw) || !Number.isInteger(mesesRaw) || mesesRaw < 1 || mesesRaw > 1200) {
    showInlineError('error-juros', 'result-juros', 'Informe um período inteiro entre 1 e 1.200 meses.', 'juros-meses');
    return;
  }

  const meses = mesesRaw;
  const taxa = taxaPct / 100;
  let montante;
  if (taxa === 0) {
    montante = capital + (aporte * meses);
  } else {
    const fator = Math.pow(1 + taxa, meses);
    montante = capital * fator + aporte * ((fator - 1) / taxa);
  }

  if (!Number.isFinite(montante)) {
    showInlineError('error-juros', 'result-juros', 'Os valores informados excedem o limite de cálculo. Reduza o prazo ou a taxa.', 'juros-meses');
    return;
  }

  const investido = capital + (aporte * meses);
  const rendimento = montante - investido;

  clearInlineError('error-juros');
  document.getElementById('res-investido').textContent = formatBRL(investido);
  document.getElementById('res-rendimento').textContent = formatBRL(rendimento);
  document.getElementById('res-montante').textContent = formatBRL(montante);

  const resultEl = document.getElementById('result-juros');
  resultEl.style.display = 'block';
}

/* ══════════════════════════════════════════════════════
   TOOL 2 (HOME): Controle de Gastos — Regra 50/30/20
══════════════════════════════════════════════════════ */
function calcularGastos() {
  const renda = parseNumericInput('gastos-renda', false);

  if (Number.isNaN(renda) || renda <= 0 || renda > 1e12) {
    showInlineError('error-gastos', 'result-gastos', 'Informe uma renda líquida mensal positiva.', 'gastos-renda');
    return;
  }

  const necessidades = Math.round(renda * 0.50 * 100) / 100;
  const lazer = Math.round(renda * 0.30 * 100) / 100;
  const poupanca = Math.round((renda - necessidades - lazer) * 100) / 100;

  clearInlineError('error-gastos');
  document.getElementById('res-necessidades').textContent = formatBRL(necessidades);
  document.getElementById('res-lazer').textContent = formatBRL(lazer);
  document.getElementById('res-poupanca').textContent = formatBRL(poupanca);

  const resultEl = document.getElementById('result-gastos');
  resultEl.style.display = 'block';
}

/* ══════════════════════════════════════════════════════
   TOOL 3 (HOME): Calculadora de Financiamento (Price)
══════════════════════════════════════════════════════ */
function calcularFinanciamento() {
  const valor = parseNumericInput('fin-valor', false);
  const entrada = parseNumericInput('fin-entrada', true);
  const taxaPct = parseNumericInput('fin-taxa', false);
  const mesesRaw = parseNumericInput('fin-meses', false);

  if (Number.isNaN(valor) || valor <= 0 || valor > 1e12) {
    showInlineError('error-financiamento', 'result-financiamento', 'Informe o valor do bem maior que zero.', 'fin-valor');
    return;
  }
  if (Number.isNaN(entrada) || entrada < 0 || entrada >= valor) {
    showInlineError('error-financiamento', 'result-financiamento', 'A entrada deve ser maior ou igual a zero e menor que o valor do bem.', 'fin-entrada');
    return;
  }
  if (Number.isNaN(taxaPct) || taxaPct < 0 || taxaPct > 50) {
    showInlineError('error-financiamento', 'result-financiamento', 'Informe uma taxa mensal válida entre 0% e 50%.', 'fin-taxa');
    return;
  }
  if (Number.isNaN(mesesRaw) || !Number.isInteger(mesesRaw) || mesesRaw < 1 || mesesRaw > 600) {
    showInlineError('error-financiamento', 'result-financiamento', 'Informe um prazo inteiro entre 1 e 600 meses.', 'fin-meses');
    return;
  }

  const principal = valor - entrada;
  const meses = mesesRaw;
  const taxa = taxaPct / 100;
  const parcela = taxa === 0
    ? principal / meses
    : (principal * taxa) / (1 - Math.pow(1 + taxa, -meses));

  if (!Number.isFinite(parcela)) {
    showInlineError('error-financiamento', 'result-financiamento', 'Não foi possível calcular com os parâmetros informados.', 'fin-taxa');
    return;
  }

  const totalPagar = parcela * meses + entrada;
  const jurosTotais = Math.max(0, totalPagar - valor);

  clearInlineError('error-financiamento');
  document.getElementById('res-parcela').textContent = formatBRL(parcela);
  document.getElementById('res-total-fin').textContent = formatBRL(totalPagar);
  document.getElementById('res-juros-fin').textContent = formatBRL(jurosTotais);

  const resultEl = document.getElementById('result-financiamento');
  resultEl.style.display = 'block';
}

/* ── Shake animation for invalid inputs ── */
function shakeInput(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = 'var(--red)';
  el.style.animation = 'none';
  void el.offsetHeight;
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => {
    el.style.borderColor = '';
    el.style.animation = '';
  }, 600);
}

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
      e.preventDefault();
      const btn = input.closest('.tool-form').querySelector('.tool-btn');
      if (btn) btn.click();
    }
  });
});

/* ── Desabilita qualquer envio legado de newsletter sem serviço configurado ── */
function handleNewsletter(e) {
  if (e && e.preventDefault) e.preventDefault();
}
function handleSidebarNewsletter() {
  return false;
}

/* ── Smooth hover on article cards ── */
document.querySelectorAll('.article-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.willChange = 'transform';
  });
  card.addEventListener('mouseleave', function () {
    this.style.willChange = 'auto';
  });
});

/* ── Lazy load images with fade ── */
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
if (lazyImages.length && 'IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (!img.complete) {
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.4s ease';
          img.addEventListener('load', () => { img.style.opacity = '1'; }, { once: true });
          img.addEventListener('error', () => { img.style.opacity = '1'; }, { once: true });
        }
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imageObserver.observe(img));
}

/* ── Aviso de Privacidade e Recursos Essenciais ── */
document.addEventListener('DOMContentLoaded', () => {
  const storageKey = 'fazendodinheiro_privacy_notice';
  if (!localStorage.getItem(storageKey)) {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Aviso de privacidade e armazenamento local');

    const msg = document.createElement('p');
    msg.append('Utilizamos apenas recursos técnicos essenciais no navegador (preferência deste aviso e cache local). Não usamos cookies de publicidade ou analytics de terceiros no momento. Consulte ');

    const linkPriv = document.createElement('a');
    linkPriv.href = '/privacidade.html';
    linkPriv.textContent = 'Privacidade';
    msg.appendChild(linkPriv);
    msg.append(' e ');

    const linkCookies = document.createElement('a');
    linkCookies.href = '/cookies.html';
    linkCookies.textContent = 'Cookies';
    msg.appendChild(linkCookies);
    msg.append('.');

    const actions = document.createElement('div');
    actions.className = 'cookie-actions';

    const btnEssential = document.createElement('button');
    btnEssential.type = 'button';
    btnEssential.className = 'cookie-btn cookie-btn--secondary';
    btnEssential.textContent = 'Apenas essenciais';

    const btnOk = document.createElement('button');
    btnOk.type = 'button';
    btnOk.className = 'cookie-btn';
    btnOk.id = 'accept-cookies';
    btnOk.textContent = 'Entendi e fechar';

    const dismiss = (mode) => {
      try {
        localStorage.setItem(storageKey, mode);
      } catch (_) {
        // Ignora indisponibilidade de storage privado
      }
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 350);
    };

    btnEssential.addEventListener('click', () => dismiss('essential'));
    btnOk.addEventListener('click', () => dismiss('acknowledged'));

    actions.appendChild(btnEssential);
    actions.appendChild(btnOk);
    banner.appendChild(msg);
    banner.appendChild(actions);
    document.body.appendChild(banner);

    setTimeout(() => banner.classList.add('show'), 400);
  }
});

/* ── Move search bar to mobile menu on small screens ── */
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.navbar .search-form');
  const navLinksContainer = document.getElementById('navLinks');
  const navContainer = document.querySelector('.nav-container');
  if (searchForm && navLinksContainer && navContainer) {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaChange = (e) => {
      if (e.matches) {
        if (searchForm.parentElement !== navLinksContainer) {
          navLinksContainer.appendChild(searchForm);
        }
      } else if (searchForm.parentElement !== navContainer) {
        navContainer.appendChild(searchForm);
      }
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }
    handleMediaChange(mediaQuery);
  }
});
