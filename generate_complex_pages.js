const fs = require('fs');

// 1. CSS for the new layouts
const css = `
/* ══════════════════════════════════════════════════════
   PÁGINAS COMPLEXAS: FERRAMENTAS & SOBRE
══════════════════════════════════════════════════════ */
/* Hero Banners */
.page-hero {
  background: linear-gradient(135deg, var(--blue), var(--primary));
  padding: 80px 20px 100px;
  text-align: center;
  color: white;
  border-radius: 0 0 40px 40px;
  margin-bottom: -40px;
}
.page-hero h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}
.page-hero p {
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 32px;
  opacity: 0.9;
  line-height: 1.6;
}
.hero-stats {
  display: flex;
  justify-content: center;
  gap: 16px;
}
.stat-box {
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  padding: 16px 24px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.2);
}
.stat-box h3 {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 4px;
}
.stat-box span {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.9;
}

/* Filters & Search */
.tools-filter-wrapper {
  max-width: 900px;
  margin: 0 auto 48px;
  background: var(--white);
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  position: relative;
  z-index: 10;
}
.search-input {
  width: 100%;
  padding: 16px 24px;
  background: var(--bg-light);
  border: 1px solid rgba(15,23,42,.1);
  border-radius: 12px;
  font-size: 1.05rem;
  margin-bottom: 20px;
  color: var(--text-dark);
}
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
.chip {
  padding: 8px 16px;
  background: var(--white);
  border: 1px solid rgba(15,23,42,.15);
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
}
.chip.active, .chip:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

/* Advanced Grids */
.section-title-center {
  text-align: center;
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 48px;
}
.grid-2 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
.grid-3 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
.grid-4 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (min-width: 768px) {
  .grid-2 { grid-template-columns: 1fr 1fr; }
  .grid-3 { grid-template-columns: 1fr 1fr 1fr; }
  .grid-4 { grid-template-columns: 1fr 1fr 1fr 1fr; gap: 24px; }
}

/* Icon Cards */
.icon-card {
  background: var(--white);
  padding: 32px;
  border-radius: 20px;
  border: 1px solid rgba(15,23,42,.06);
  box-shadow: var(--shadow-sm);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}
.icon-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}
.card-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  background: rgba(37,99,235,0.08);
  color: var(--primary);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-card h4 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 12px;
}
.icon-card p {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* Horizontal Feature Card */
.feature-card {
  display: flex;
  align-items: center;
  gap: 32px;
  background: var(--white);
  padding: 40px;
  border-radius: 24px;
  border: 1px solid rgba(15,23,42,.06);
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
}
.feature-card-content { flex: 1; }
.feature-card-icon {
  width: 120px; height: 120px;
  flex-shrink: 0;
  background: rgba(245,158,11,0.1);
  color: var(--gold);
  border-radius: 24px;
  display: flex; align-items: center; justify-content: center;
}
@media (max-width: 768px) {
  .feature-card { flex-direction: column; text-align: center; }
}

/* CTA Block */
.cta-block {
  background: var(--navy-900);
  color: white;
  padding: 48px;
  border-radius: 24px;
  text-align: center;
  margin-top: 64px;
}
.cta-block h2 { margin-bottom: 16px; font-weight: 800; }
.cta-block p { color: rgba(255,255,255,0.7); margin-bottom: 32px; }
.cta-btns { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
.btn-outline {
  padding: 12px 24px;
  border: 2px solid rgba(255,255,255,0.2);
  color: white;
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: all 0.2s;
}
.btn-outline:hover { background: white; color: var(--navy-900); }

/* Avatar Card */
.avatar-card { text-align: center; padding: 24px; }
.avatar-img {
  width: 80px; height: 80px;
  background: var(--bg-light);
  border-radius: 50%;
  margin: 0 auto 16px;
  display: flex; align-items: center; justify-content: center;
  font-size: 2rem;
}
`;
fs.appendFileSync('css/style.css', '\n' + css);

// Helper to wrap content with nav/footer
function generatePage(filename, title, contentHTML) {
  let base = fs.readFileSync('index.html', 'utf8');
  base = base.replace(/<title>.*?<\/title>/, `<title>${title} | Dinheiro Nu</title>`);
  
  // Remove hero, replace everything inside <main>
  const mainRegex = /(<main[^>]*>)([\s\S]*?)(<\/main>)/i;
  base = base.replace(mainRegex, `$1\n${contentHTML}\n$3`);
  
  fs.writeFileSync(filename, base);
}

// 2. FERRAMENTAS.HTML
const ferramentasHTML = `
  <div class="page-hero">
    <div class="container">
      <h1>Ferramentas Financeiras Gratuitas</h1>
      <p>Calculadoras e simuladores práticos para você organizar seu orçamento, planejar investimentos e sair das dívidas. Tudo 100% gratuito e sem cadastro.</p>
      <div class="hero-stats">
        <div class="stat-box"><h3>3</h3><span>Ferramentas</span></div>
        <div class="stat-box"><h3>4</h3><span>Categorias</span></div>
        <div class="stat-box"><h3>100%</h3><span>Grátis</span></div>
      </div>
    </div>
  </div>

  <section class="section" style="padding-top: 0;">
    <div class="container">
      
      <div class="tools-filter-wrapper">
        <input type="text" class="search-input" placeholder="🔍 Buscar ferramenta...">
        <div class="filter-chips">
          <button class="chip active">Todas</button>
          <button class="chip">Investimentos</button>
          <button class="chip">Dívidas</button>
          <button class="chip">Orçamento</button>
        </div>
      </div>

      <h2 class="section-title-center" style="margin-bottom: 32px;">Ferramentas Disponíveis</h2>
      <p style="text-align: center; color: var(--text-muted); margin-top: -20px; margin-bottom: 48px;">Explore nosso catálogo de calculadoras financeiras.</p>

      <div class="grid-3" style="margin-bottom: 80px;">
        <!-- Card 1 -->
        <a href="index.html#ferramentas" class="tool-card" style="text-decoration: none; color: inherit; display: block; border-top: 4px solid var(--primary);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
            <h3 class="tool-title" style="margin:0;">Juros Compostos</h3>
            <span style="background: rgba(37,99,235,0.1); color: var(--primary); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">Investimento</span>
          </div>
          <p class="tool-desc">Descubra o poder da bola de neve a seu favor. Simule quanto seu dinheiro pode render ao longo dos anos.</p>
        </a>

        <!-- Card 2 -->
        <a href="index.html#ferramentas" class="tool-card" style="text-decoration: none; color: inherit; display: block; border-top: 4px solid var(--red);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
            <h3 class="tool-title" style="margin:0;">Simulador de Financiamento</h3>
            <span style="background: rgba(239,68,68,0.1); color: var(--red); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">Dívidas</span>
          </div>
          <p class="tool-desc">Vai comprar casa ou carro? Calcule o valor real das parcelas com a tabela Price e SAC antes de assinar contratos.</p>
        </a>

        <!-- Card 3 -->
        <a href="index.html#ferramentas" class="tool-card" style="text-decoration: none; color: inherit; display: block; border-top: 4px solid var(--gold);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
            <h3 class="tool-title" style="margin:0;">Controle 50-30-20</h3>
            <span style="background: rgba(245,158,11,0.1); color: var(--gold); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">Orçamento</span>
          </div>
          <p class="tool-desc">A regra de ouro da divisão de salário. Descubra exatamente o limite que você pode gastar em cada área da sua vida.</p>
        </a>
      </div>

      <div style="background: var(--bg-light); border-radius: 32px; padding: 64px 40px; margin-bottom: 80px;">
        <h2 class="section-title-center">Por que usar nossas ferramentas?</h2>
        <div class="grid-4">
          <div class="icon-card" style="box-shadow: none; border: none; background: transparent;">
            <div class="card-icon"><span style="font-size: 2rem;">🎯</span></div>
            <h4>Precisão</h4>
            <p>Algoritmos testados e atualizados com as regras do mercado.</p>
          </div>
          <div class="icon-card" style="box-shadow: none; border: none; background: transparent;">
            <div class="card-icon"><span style="font-size: 2rem;">⚡</span></div>
            <h4>Agilidade</h4>
            <p>Resultados instantâneos na sua tela, sem planilhas chatas.</p>
          </div>
          <div class="icon-card" style="box-shadow: none; border: none; background: transparent;">
            <div class="card-icon"><span style="font-size: 2rem;">🆓</span></div>
            <h4>Gratuito</h4>
            <p>Nunca cobraremos por essas ferramentas fundamentais.</p>
          </div>
          <div class="icon-card" style="box-shadow: none; border: none; background: transparent;">
            <div class="card-icon"><span style="font-size: 2rem;">🔒</span></div>
            <h4>Segurança</h4>
            <p>Não salvamos nenhum dos seus dados financeiros.</p>
          </div>
        </div>
      </div>

    </div>
  </section>
`;

generatePage('ferramentas.html', 'Ferramentas Financeiras', ferramentasHTML);

// 3. SOBRE.HTML
const sobreHTML = `
  <div class="page-hero" style="background: var(--bg-light); color: var(--text-dark);">
    <div class="container">
      <h1 style="color: var(--text-dark);">Sobre o Dinheiro Nu</h1>
      <p style="color: var(--text-muted);">Educação financeira transparente, sem jargões e feita para o brasileiro.</p>
    </div>
  </div>

  <section class="section" style="padding-top: 80px;">
    <div class="container">
      
      <!-- Nossa Missão -->
      <div class="feature-card">
        <div class="feature-card-content">
          <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 16px; color: var(--text-dark);">Nossa Missão</h2>
          <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 16px;">O Dinheiro Nu nasceu com uma missão clara: democratizar a educação financeira no Brasil, quebrando o mito de que investir ou organizar dinheiro é para poucos, ricos ou matemáticos.</p>
          <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.7;">Acreditamos que todo mundo merece entender como o próprio dinheiro funciona, ter acesso a ferramentas práticas e não depender de gerentes de banco querendo bater meta.</p>
        </div>
        <div class="feature-card-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>
        </div>
      </div>

      <!-- Valores -->
      <h2 class="section-title-center" style="margin-top: 80px; margin-bottom: 40px;">Nossos Valores</h2>
      <div class="grid-4" style="margin-bottom: 80px;">
        <div class="icon-card">
          <div class="card-icon" style="background: rgba(37,99,235,0.1); color: var(--blue);">📖</div>
          <h4>Simplicidade</h4>
          <p>O economês traduzido. Falamos a língua da vida real.</p>
        </div>
        <div class="icon-card">
          <div class="card-icon" style="background: rgba(16,185,129,0.1); color: var(--green);">⚖️</div>
          <h4>Transparência</h4>
          <p>Análises isentas. Não somos patrocinados por corretoras ou bancos.</p>
        </div>
        <div class="icon-card">
          <div class="card-icon" style="background: rgba(245,158,11,0.1); color: var(--gold);">🛠️</div>
          <h4>Praticidade</h4>
          <p>Conteúdo focado na ação: artigos com calculadoras e exemplos reais.</p>
        </div>
        <div class="icon-card">
          <div class="card-icon" style="background: rgba(239,68,68,0.1); color: var(--red);">🇧🇷</div>
          <h4>Foco no Brasil</h4>
          <p>Dicas que funcionam na realidade da nossa inflação e economia.</p>
        </div>
      </div>

      <!-- Equipe -->
      <h2 class="section-title-center" style="margin-bottom: 40px;">Nossa Equipe</h2>
      <p style="text-align: center; color: var(--text-muted); margin-top: -24px; margin-bottom: 48px; max-width: 600px; margin-left: auto; margin-right: auto;">Um grupo de redatores, analistas e desenvolvedores unidos pelo mesmo propósito: facilitar a sua vida financeira.</p>
      
      <div class="grid-3" style="margin-bottom: 80px;">
        <div class="avatar-card">
          <div class="avatar-img">👨‍💼</div>
          <h4 style="font-size: 1.1rem; color: var(--text-dark);">Francisco Gomes</h4>
          <p style="color: var(--primary); font-weight: 600; font-size: 0.9rem; margin-bottom: 8px;">Editor Chefe</p>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Especialista em finanças pessoais, traduzindo o mercado para você.</p>
        </div>
        <div class="avatar-card">
          <div class="avatar-img">👩‍💻</div>
          <h4 style="font-size: 1.1rem; color: var(--text-dark);">Equipe de Tech</h4>
          <p style="color: var(--primary); font-weight: 600; font-size: 0.9rem; margin-bottom: 8px;">Desenvolvedores</p>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Criadores das calculadoras precisas e ferramentas interativas.</p>
        </div>
        <div class="avatar-card">
          <div class="avatar-img">🧑‍🏫</div>
          <h4 style="font-size: 1.1rem; color: var(--text-dark);">Comunidade</h4>
          <p style="color: var(--primary); font-weight: 600; font-size: 0.9rem; margin-bottom: 8px;">Leitores Ativos</p>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Milhares de brasileiros que contribuem com dúvidas e ideias diárias.</p>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta-block">
        <h2>Faça Parte da Nossa Jornada</h2>
        <p>Junte-se a milhares de leitores que já transformaram a forma como lidam com o dinheiro.</p>
        <div class="cta-btns">
          <a href="index.html#recentes" class="btn btn-primary">Ler Artigos</a>
          <a href="ferramentas.html" class="btn btn-outline" style="border: 2px solid white; color: white;">Ver Ferramentas</a>
        </div>
      </div>

    </div>
  </section>
`;

generatePage('sobre.html', 'Sobre Nós', sobreHTML);

console.log("Pages Ferramentas and Sobre generated successfully!");
