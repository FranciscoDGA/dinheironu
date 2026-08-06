const fs = require('fs');

let base = fs.readFileSync('index.html', 'utf8');

// Find the parts before the first <section class="hero"> (which is right after </nav>)
// and after the last section (which is right before <footer class="footer">)
const navEndIndex = base.indexOf('</nav>') + 6;
const footerStartIndex = base.indexOf('<footer class="footer">');

const headerPart = base.substring(0, navEndIndex);
const footerPart = base.substring(footerStartIndex);

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

function generate(filename, title, content) {
  let head = headerPart.replace(/<title>.*?<\/title>/, `<title>${title} | Dinheiro Nu</title>`);
  fs.writeFileSync(filename, head + '\n<main>\n' + content + '\n</main>\n' + footerPart);
}

generate('ferramentas.html', 'Ferramentas Financeiras', ferramentasHTML);
generate('sobre.html', 'Sobre Nós', sobreHTML);

console.log("Pages Fixed!");
