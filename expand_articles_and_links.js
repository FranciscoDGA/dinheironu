const fs = require('fs');
const path = require('path');

const artigosToExpand = ['reserva.html', 'investimentos.html', 'cartao.html', 'tesouro.html', 'dividas.html'];
const artigosDir = 'artigos';

const extraContent = `
<h2 style="margin-top: 40px; font-size: 1.8rem; font-weight: 800;">Aprofundando: Análise Completa e Estratégias Avançadas</h2>
<p style="margin-bottom: 16px; font-size: 1.1rem; line-height: 1.8; color: var(--text-muted);">
  Para atingirmos a excelência financeira, não basta apenas entender a teoria básica. É preciso mergulhar fundo nas nuances do mercado, compreender como as variáveis macroeconômicas impactam o seu bolso diariamente e estruturar um plano à prova de falhas. Quando falamos em planejamento financeiro de longo prazo, a disciplina e a consistência são mais importantes do que o valor inicial investido. O efeito dos juros compostos, ao longo de anos e décadas, transforma aportes modestos em um patrimônio sólido.
</p>
<p style="margin-bottom: 16px; font-size: 1.1rem; line-height: 1.8; color: var(--text-muted);">
  Um dos maiores erros cometidos por investidores iniciantes é a busca incessante por rentabilidades milagrosas no curto prazo. A verdadeira construção de riqueza exige paciência. É fundamental diversificar a carteira de investimentos, equilibrando ativos de renda fixa, que oferecem segurança e previsibilidade, com ativos de renda variável, que possuem maior potencial de valorização, porém com mais volatilidade. A alocação de ativos deve sempre respeitar o seu perfil de investidor e os seus objetivos de vida.
</p>
<p style="margin-bottom: 16px; font-size: 1.1rem; line-height: 1.8; color: var(--text-muted);">
  Além disso, a gestão de riscos é um pilar não negociável. Ter uma reserva de emergência bem estruturada, contratada em ativos de altíssima liquidez (como o Tesouro Selic ou CDBs de liquidez diária rendendo 100% do CDI), garante que você não precisará resgatar investimentos de longo prazo com prejuízo em caso de imprevistos. A inflação também é um inimigo silencioso que corrói o poder de compra; portanto, buscar investimentos que superem o IPCA é obrigatório para a manutenção do padrão de vida no futuro.
</p>
<p style="margin-bottom: 16px; font-size: 1.1rem; line-height: 1.8; color: var(--text-muted);">
  Educação financeira é um processo contínuo. O mercado muda, novas oportunidades surgem e a economia passa por ciclos de expansão e recessão. Manter-se informado, ler relatórios de mercado, acompanhar a taxa Selic e entender como as decisões do Banco Central afetam os juros são atitudes que separam os investidores de sucesso daqueles que apenas seguem a manada. A sua jornada financeira é pessoal, mas as regras do jogo do dinheiro são universais. Aplique-as com rigor e colha os frutos da liberdade financeira.
</p>
`;

// Expand the 5 articles
artigosToExpand.forEach(f => {
  const filePath = path.join(artigosDir, f);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Inject before the end of the main content or before the footer
    // Usually there is a closing div or article tag. We'll find the last <p> inside the article content and append there.
    // A simpler way is to replace the closing </article> or </div> before the footer.
    if (content.includes('</article>')) {
      content = content.replace('</article>', extraContent + '\n</article>');
    } else {
      content = content.replace('</main>', extraContent + '\n</main>');
    }
    fs.writeFileSync(filePath, content);
  }
});

console.log("5 artigos expandidos com sucesso.");

// Add Internal Linking to all articles
const allFiles = fs.readdirSync(artigosDir).filter(f => f.endsWith('.html'));

allFiles.forEach(f => {
  const filePath = path.join(artigosDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('Leia também')) {
    // Pick a random article to link to
    const otherFiles = allFiles.filter(other => other !== f);
    const linkTarget = otherFiles[Math.floor(Math.random() * otherFiles.length)];
    const linkTitle = linkTarget.replace('.html', '').replace(/-/g, ' ').toUpperCase();
    
    const internalLinkHtml = `
<div style="background-color: var(--bg-light); border-left: 4px solid var(--primary); padding: 16px; margin: 32px 0; border-radius: 4px;">
  <strong>Leia também:</strong> <a href="${linkTarget}" style="color: var(--primary); font-weight: 600; text-decoration: none;">Descubra mais sobre ${linkTitle} clicando aqui</a>
</div>
`;
    // Insert after the first paragraph in the article body (heuristically after the first </p>)
    const articleHeroEnd = content.indexOf('article-hero-inner');
    if (articleHeroEnd !== -1) {
      const firstP = content.indexOf('</p>', articleHeroEnd);
      if (firstP !== -1) {
        const p1 = content.slice(0, firstP + 4);
        const p2 = content.slice(firstP + 4);
        fs.writeFileSync(filePath, p1 + internalLinkHtml + p2);
      }
    }
  }
});

console.log("Internal links adicionados a todos os artigos.");
