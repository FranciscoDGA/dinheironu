const fs = require('fs');
const path = require('path');

const artigosDir = 'artigos';

// Helper to find the actual image names since they have timestamps
const imagesDir = 'images';
let capaDesenrola = 'capa_desenrola.jpg';
let capaCartao = 'capa_cartao.jpg';
let capaInflacao = 'capa_inflacao.jpg';
let capaCobrancas = 'capa_cobrancas.jpg';
let capaEsg = 'capa_esg.jpg';

try {
  const imgs = fs.readdirSync(imagesDir);
  const findImg = (prefix) => imgs.find(img => img.startsWith(prefix) && img.endsWith('.jpg')) || prefix + '.jpg';
  capaDesenrola = findImg('capa_desenrola');
  capaCartao = findImg('capa_cartao');
  capaInflacao = findImg('capa_inflacao');
  capaCobrancas = findImg('capa_cobrancas');
  capaEsg = findImg('capa_esg');
} catch(e) {}

const template = (data) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="description" content="\${data.metaDescription}"/>
  <title>\${data.title} | Fazendo Dinheiro</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="../css/style.css"/>
  <style>
    .article-hero { padding: 120px 0 60px; background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); }
    .article-hero-inner { max-width: 800px; margin: 0 auto; padding: 0 24px; }
    .article-category { display: inline-block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 14px; border-radius: 9999px; margin-bottom: 20px; background: #f59e0b; color: #0f172a; }
    .article-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; color: #fff; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 20px; }
    .article-meta { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; font-size: 0.85rem; color: rgba(255,255,255,.55); margin-bottom: 32px; }
    .article-summary { font-size: 1.1rem; color: rgba(255,255,255,.75); line-height: 1.7; border-left: 3px solid #f59e0b; padding-left: 20px; margin-top: 24px; }
    .article-featured-img { width: 100%; max-width: 800px; margin: 0 auto; display: block; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,.3); transform: translateY(40px); }
    .article-body-wrap { max-width: 800px; margin: 0 auto; padding: 80px 24px 96px; }
    .article-content { font-size: 1.05rem; line-height: 1.85; color: #334155; }
    .article-content h2 { font-family: 'Playfair Display', serif; font-size: 1.7rem; font-weight: 800; color: #0f172a; margin: 48px 0 18px; letter-spacing: -0.02em; line-height: 1.2; }
    .article-content h3 { font-size: 1.15rem; font-weight: 700; color: #0f172a; margin: 32px 0 12px; }
    .article-content p { margin-bottom: 20px; }
    .article-content ul { margin: 0 0 20px 24px; display: flex; flex-direction: column; gap: 10px; }
    .faq-section { background: #f8faff; padding: 24px; border-radius: 8px; margin-top: 40px; border: 1px solid #e2e8f0; }
    .faq-section h3 { margin-top: 0; color: #0f172a; font-weight: 800; }
    .eeat-box { display: flex; gap: 16px; align-items: center; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 40px; }
    .eeat-box img { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; }
    .internal-link-box { background-color: var(--bg-light); border-left: 4px solid var(--primary); padding: 16px; margin: 32px 0; border-radius: 4px; }
  </style>
</head>
<body>
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="../index.html" class="nav-logo" id="nav-logo-link">
        <span class="logo-text">Fazendo<span class="logo-accent">Dinheiro</span></span>
      </a>
      <ul class="nav-links" id="navLinks">
        <li><a href="../index.html" class="nav-link">Home</a></li>
        <li><a href="../sobre.html" class="nav-link">Sobre</a></li>
        <li><a href="../blog.html" class="nav-link">Blog</a></li>
        <li><a href="../ferramentas.html" class="nav-link">Ferramentas</a></li>
        <li><a href="../contato.html">Contato</a></li>
      </ul>
    </div>
  </nav>

  <article>
    <header class="article-hero">
      <div class="article-hero-inner">
        <span class="article-category">\${data.category}</span>
        <h1 class="article-title">\${data.title}</h1>
        <div class="article-meta">
          <span>Por Francisco Gomes</span>
          <span>Atualizado em 2026</span>
          <span>\${data.readTime}</span>
        </div>
        <p class="article-summary">\${data.summary}</p>
      </div>
    </header>

    <img src="../images/\${data.image}" alt="\${data.altText}" class="article-featured-img"/>

    <div class="article-body-wrap">
      <div class="article-content">
        \${data.content}
        
        <div class="internal-link-box">
          <strong>Recomendado para você:</strong> <a href="\${data.internalLinkUrl}" style="color: var(--primary); font-weight: 600; text-decoration: none;">\${data.internalLinkText}</a>
        </div>

        <div class="faq-section">
          <h3>Perguntas Frequentes (FAQ)</h3>
          \${data.faqs}
        </div>

        <div class="eeat-box">
          <img src="../images/francisco.jpg" alt="Francisco Gomes, Editor Chefe">
          <div>
            <h4 style="margin:0 0 4px 0; font-size:1.1rem;">Escrito por Francisco Gomes</h4>
            <p style="margin:0; font-size:0.9rem; color:#64748b;">Especialista em finanças pessoais e renegociação. Analista de mercado certificado (CNPI), focado em democratizar o acesso à educação financeira no Brasil.</p>
          </div>
        </div>

      </div>
    </div>
  </article>

  <footer class="footer" id="footer">
    <!-- Sera substituido pelo script de footer -->
  </footer>
</body>
</html>`;

const articlesData = [
  {
    filename: 'novo-desenrola-2026.html',
    category: 'Renegociação',
    title: 'Como negociar dívidas com o Novo Desenrola Brasil 2026: Guia prático',
    metaDescription: 'Saiba como o Novo Desenrola Brasil (MP 1.355/2026) pode ajudar você a quitar dívidas com até 90% de desconto. Aprenda a usar o simulador oficial.',
    readTime: '8 min de leitura',
    summary: 'A renegociação de dívidas atingiu um novo patamar em 2026. Entenda as regras do Novo Desenrola Brasil e como garantir os descontos.',
    image: capaDesenrola,
    altText: 'Ilustração de pessoa apertando mãos com gerente de banco negociando dívidas',
    internalLinkUrl: 'dividas.html',
    internalLinkText: 'Como sair das dívidas com o método bola de neve',
    content: `
      <h2>O que muda com a MP 1.355/2026?</h2>
      <p>O Novo Desenrola Brasil, lançado sob a nova Medida Provisória em 2026, foca em perdoar juros abusivos cobrados por bancos em dívidas de até 10 salários mínimos. O governo atua como garantidor, forçando as instituições financeiras a oferecerem <strong>descontos de até 90%</strong> no valor total devido.</p>
      
      <h2>Como negociar dívidas na plataforma oficial</h2>
      <p>O primeiro passo é acessar o portal gov.br com a sua conta Ouro ou Prata. Lá, você encontrará a aba "Novo Desenrola 2026".</p>
      <ul>
        <li>Verifique todas as dívidas listadas sob o seu CPF.</li>
        <li>Simule as opções de parcelamento em até 60 meses.</li>
        <li>Evite intermediários! Negocie sempre pela plataforma oficial para evitar fraudes.</li>
      </ul>
      <p>Você pode consultar a <a href="https://www.gov.br/pt-br/servicos/renegociar-dividas-no-programa-desenrola-brasil" target="_blank" rel="noopener noreferrer">página oficial do Governo Federal</a> para detalhes técnicos sobre elegibilidade.</p>
      
      <h2>Cálculo de Economia</h2>
      <p>Se você tem uma dívida de cartão de crédito de R$ 10.000, e os juros acumularam o saldo para R$ 45.000, o programa permite que você pague o valor original (R$ 10.000) com um pequeno reajuste, muitas vezes quitando tudo por menos de R$ 12.000. Isso é um alívio imediato para as famílias e para a economia como um todo.</p>
    `,
    faqs: `
      <p><strong>1. Quem pode participar do Novo Desenrola 2026?</strong><br>Pessoas físicas com renda de até 3 salários mínimos ou inscritas no CadÚnico.</p>
      <p><strong>2. Dívidas de faculdade entram?</strong><br>Sim, o FIES e outras dívidas educacionais foram incluídas na nova MP.</p>
    `
  },
  {
    filename: 'juros-cartao-2026.html',
    category: 'Cartão de Crédito',
    title: 'Cartão de crédito em 2026: Como evitar os 400% de juros do rotativo',
    metaDescription: 'Saiba como escapar dos 400% de juros do rotativo do cartão de crédito em 2026. Conheça a Lei 14.836 e alternativas de crédito mais baratas.',
    readTime: '10 min de leitura',
    summary: 'Os juros do cartão de crédito continuam sendo o maior vilão do orçamento familiar. Entenda como a lei do limite de 100% de juros funciona na prática.',
    image: capaCartao,
    altText: 'Ilustração 3D de cartão de crédito cortado ao meio com juros altos',
    internalLinkUrl: 'orcamento.html',
    internalLinkText: 'Como montar um orçamento para não depender do cartão',
    content: `
      <h2>A Armadilha dos 400% ao Ano</h2>
      <p>Mesmo com as regulações recentes, cair no rotativo do cartão de crédito significa ver a sua dívida quadruplicar em 12 meses. O rotativo do cartão é o crédito mais caro do mundo. Se você pagar apenas o valor mínimo da fatura, o saldo remanescente sofre a incidência de juros compostos brutais.</p>
      
      <h2>O Limite de Juros: A Lei 14.836</h2>
      <p>A Lei aprovada determina que o total cobrado em juros no rotativo não pode ultrapassar o valor original da dívida (100%). Ou seja, se você deve R$ 1.000, o máximo que o banco pode te cobrar de juros e multas é R$ 1.000, totalizando uma dívida de R$ 2.000. No entanto, mesmo limitado, pagar o dobro do que você consumiu é uma perda financeira severa.</p>
      
      <h2>Alternativas Mais Baratas</h2>
      <ul>
        <li><strong>Empréstimo Pessoal:</strong> Troque a dívida cara por uma barata. O empréstimo pessoal tem juros médios de 4% a 6% ao mês.</li>
        <li><strong>Crédito Consignado:</strong> Se você for servidor público, aposentado ou trabalhar com carteira assinada, as taxas são menores que 2% ao mês.</li>
      </ul>
      <p>Leia o boletim do <a href="https://www.bcb.gov.br/" target="_blank" rel="noopener noreferrer">Banco Central do Brasil</a> para consultar a tabela atualizada de juros médios por instituição.</p>
    `,
    faqs: `
      <p><strong>1. Posso parcelar a fatura do cartão em 24 vezes?</strong><br>Pode, mas os juros do parcelamento também são altíssimos. É preferível pegar um empréstimo externo para quitar a fatura à vista.</p>
      <p><strong>2. O banco pode me forçar a usar o rotativo?</strong><br>Não. Após 30 dias no rotativo, o banco é obrigado a oferecer um parcelamento com juros menores.</p>
    `
  },
  {
    filename: 'inflacao-2026.html',
    category: 'Economia',
    title: 'Inflação em alta: 7 estratégias para proteger seu dinheiro em 2026',
    metaDescription: 'A inflação corrói seu poder de compra. Aprenda 7 estratégias práticas e descubra investimentos que superam a inflação em 2026.',
    readTime: '9 min de leitura',
    summary: 'Com a inflação persistente, deixar dinheiro parado é perder riqueza. Descubra os ativos que blindam o seu patrimônio do aumento do custo de vida.',
    image: capaInflacao,
    altText: 'Ilustração de carrinho de compras vazio e gráfico de inflação em alta',
    internalLinkUrl: 'tesouro.html',
    internalLinkText: 'Como investir no Tesouro Direto com segurança',
    content: `
      <h2>O Impacto do Custo de Vida em 2026</h2>
      <p>Pesquisas recentes indicam que 70% das famílias brasileiras enfrentam enormes desafios com o custo de vida. A inflação (IPCA) não afeta apenas a ida ao supermercado; ela destrói o rendimento real dos seus investimentos. Se a poupança rende 6% ao ano e a inflação é de 5%, seu ganho real foi de apenas 1%.</p>
      
      <h2>Estratégia 1: Tesouro IPCA+</h2>
      <p>A ferramenta número um contra a inflação é o Tesouro IPCA+. Este título do governo garante pagar a taxa de inflação do período MAIS uma taxa fixa (por exemplo, IPCA + 6%). Dessa forma, você tem a garantia matemática de que seu dinheiro não perderá poder de compra, não importa o que aconteça na economia.</p>
      
      <h2>Estratégia 2: Ativos Reais e Fundos Imobiliários</h2>
      <p>Historicamente, o mercado imobiliário repassa a inflação nos aluguéis. Investir em Fundos de Investimentos Imobiliários (FIIs) atrelados a "papéis" corrigidos pela inflação ou "tijolos" (imóveis físicos) é uma forma inteligente de obter renda passiva protegida. A <a href="https://www.b3.com.br/pt_br/" target="_blank" rel="noopener noreferrer">B3 (Bolsa de Valores Brasileira)</a> possui diversos fundos acessíveis com valores baixos.</p>
    `,
    faqs: `
      <p><strong>1. É arriscado investir no Tesouro IPCA+?</strong><br>É o investimento mais seguro do país. O único risco ocorre se você precisar vender o título antes da data de vencimento (marcação a mercado).</p>
      <p><strong>2. A poupança protege da inflação?</strong><br>Quase nunca. Na maioria dos últimos anos, a inflação superou o rendimento da poupança.</p>
    `
  },
  {
    filename: 'cobrancas-indevidas.html',
    category: 'Direitos do Consumidor',
    title: 'Cobranças indevidas no banco? Saiba como recuperar seu dinheiro',
    metaDescription: 'Bancos cobrando taxas indevidas? Saiba como reclamar no Banco Central e exigir a devolução em dobro do seu dinheiro segundo o CDC.',
    readTime: '7 min de leitura',
    summary: 'Tarifas ocultas e seguros não solicitados estão no topo das reclamações. Aprenda como acionar seus direitos e ter o dinheiro de volta.',
    image: capaCobrancas,
    altText: 'Pessoa reclamando de taxas no extrato bancário pelo tablet',
    internalLinkUrl: 'cartao.html',
    internalLinkText: 'Cartão de Crédito: Aliado ou Vilão?',
    content: `
      <h2>O Topo das Reclamações no Banco Central</h2>
      <p>Você olha o extrato e vê "Tarifa de Manutenção de Conta" ou "Seguro Cartão Protegido" que você nunca contratou. Esses pequenos valores, debitados mensalmente, geram bilhões para os bancos de forma indevida. O consumidor tem o direito de questionar qualquer cobrança desconhecida.</p>
      
      <h2>A Regra da Devolução em Dobro</h2>
      <p>O Código de Defesa do Consumidor (CDC) é claro no seu Artigo 42: o consumidor cobrado em quantia indevida tem direito à repetição do indébito, ou seja, à <strong>devolução em dobro</strong> do que pagou em excesso, acrescido de correção monetária e juros. Para que o banco seja isento dessa penalidade, ele precisa provar que houve engano justificável (o que é muito raro em sistemas automatizados).</p>
      
      <h2>Passo a Passo para Reclamar</h2>
      <ol>
        <li>Anote os protocolos de atendimento no SAC do seu banco pedindo o estorno.</li>
        <li>Se o banco negar ou não resolver em 5 dias, registre uma queixa no <a href="https://www.consumidor.gov.br/" target="_blank" rel="noopener noreferrer">Consumidor.gov.br</a>.</li>
        <li>Abra uma denúncia diretamente no site do Banco Central. Isso afeta o rating da instituição.</li>
      </ol>
    `,
    faqs: `
      <p><strong>1. Qual o prazo para eu pedir o dinheiro de volta?</strong><br>Você pode contestar cobranças indevidas referentes aos últimos 5 anos.</p>
      <p><strong>2. Posso cancelar uma conta tarifa zero?</strong><br>Sim, o Banco Central obriga todos os bancos a oferecerem o pacote de "Serviços Essenciais", que é 100% gratuito.</p>
    `
  },
  {
    filename: 'investimentos-esg.html',
    category: 'Investimentos',
    title: 'Investimentos ESG: Como ganhar dinheiro alinhado aos seus valores',
    metaDescription: 'Invista de forma ética! Saiba o que é ESG, como funciona no Brasil em 2026 e quais fundos verdes oferecem rentabilidade com impacto social.',
    readTime: '8 min de leitura',
    summary: 'Lucro e sustentabilidade andam juntos. Entenda por que grandes investidores estão migrando para empresas ESG e como você pode participar.',
    image: capaEsg,
    altText: 'Cidade verde sustentável surgindo de moedas, conceito ESG',
    internalLinkUrl: 'investimentos.html',
    internalLinkText: 'Guia definitivo de investimentos para iniciantes',
    content: `
      <h2>O Que Significa ESG?</h2>
      <p>ESG vem do inglês (Environmental, Social, and Governance). Trata-se de investir em empresas que respeitam o meio ambiente, promovem impacto social positivo e possuem governança corporativa transparente e livre de corrupção. Em 2026, empresas sem compromisso ESG perdem acesso a linhas de crédito e despencam na bolsa de valores.</p>
      
      <h2>Como Encontrar CDBs Verdes e Fundos ESG</h2>
      <p>Para quem busca Renda Fixa, bancos e cooperativas oferecem os CDBs Sociais ou Verdes, onde o dinheiro captado é usado exclusivamente para financiar projetos de energia limpa ou agricultura sustentável. Na Renda Variável, há dezenas de fundos e ETFs (como o ISE - Índice de Sustentabilidade Empresarial) negociados na bolsa.</p>
      
      <h2>Rentabilidade vs. Impacto</h2>
      <p>Muitos iniciantes acham que investir com ética significa ganhar menos dinheiro. Os dados mostram o oposto. Empresas sustentáveis possuem menos passivos ambientais (risco de multas milionárias) e atraem e retêm talentos com mais facilidade. Você pode ler os relatórios de sustentabilidade publicados pela <a href="https://www.anbima.com.br/" target="_blank" rel="noopener noreferrer">ANBIMA</a> para analisar as métricas de retorno dos fundos ESG brasileiros.</p>
    `,
    faqs: `
      <p><strong>1. Qualquer empresa que diz ser "verde" é ESG?</strong><br>Não. Muitas praticam o "greenwashing" (lavagem verde). É fundamental verificar selos e auditorias independentes.</p>
      <p><strong>2. Quanto preciso para investir num fundo ESG?</strong><br>Hoje em dia, com menos de R$ 50 já é possível adquirir cotas de ETFs focados em ESG através de sua corretora.</p>
    `
  }
];

articlesData.forEach(data => {
  const filePath = path.join(artigosDir, data.filename);
  fs.writeFileSync(filePath, template(data));
});

console.log('5 novos artigos gerados!');
