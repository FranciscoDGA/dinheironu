const fs = require('fs');

function updatePage(filename, title, content) {
  let base = fs.readFileSync(filename, 'utf8');
  // Find everything between <main...> and </main>
  const mainRegex = /(<main[^>]*>)([\s\S]*?)(<\/main>)/i;
  
  let newMainContent = `
  <section class="section">
    <div class="container" style="max-width: 900px; margin: 0 auto; background: var(--white); padding: 56px; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); border: 1px solid rgba(15,23,42,.06);">
      ${content}
    </div>
  </section>
`;
  
  let newHtml = base.replace(mainRegex, `$1\n${newMainContent}\n$3`);
  fs.writeFileSync(filename, newHtml);
}

// 1. Privacidade / LGPD
updatePage('privacidade.html', 'Política de Privacidade e LGPD', `
<h1 style="margin-bottom: 32px; font-size: 2.5rem; color: var(--text-dark); font-weight: 800; letter-spacing: -0.02em;">Política de Privacidade e Proteção de Dados (LGPD)</h1>
<p style="margin-bottom: 24px; font-size: 1.1rem; color: var(--text-muted); line-height: 1.7;">A sua privacidade é uma prioridade para o <strong>Dinheiro Nu</strong>. Temos o compromisso de proteger os seus dados pessoais e de ser transparentes sobre como os utilizamos. Esta Política de Privacidade foi elaborada em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).</p>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">1. Quais dados coletamos?</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">O Dinheiro Nu foi criado para ser o mais anônimo e seguro possível. Nós coletamos apenas as informações estritamente necessárias para fornecer a você o melhor conteúdo financeiro:</p>
<ul style="margin-bottom: 24px; padding-left: 24px; color: var(--text-muted); line-height: 1.6;">
  <li style="margin-bottom: 8px;"><strong>Dados de Contato:</strong> Coletamos o seu endereço de e-mail exclusivamente quando você opta voluntariamente por assinar a nossa newsletter.</li>
  <li style="margin-bottom: 8px;"><strong>Dados de Navegação (Cookies Anônimos):</strong> Coletamos dados estatísticos não identificáveis (como páginas visitadas, tempo gasto no site e tipo de dispositivo) através do Google Analytics, com o único objetivo de melhorar a usabilidade do site. Não rastreamos a sua identidade.</li>
  <li style="margin-bottom: 8px;"><strong>O que NÃO coletamos:</strong> O Dinheiro Nu nunca solicitará o seu CPF, RG, dados bancários, número de cartão de crédito, endereço físico ou senhas. Se você receber um e-mail em nosso nome pedindo essas informações, denuncie imediatamente.</li>
</ul>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">2. Como utilizamos os seus dados?</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">O seu e-mail será utilizado exclusivamente para enviar a você o nosso boletim informativo semanal contendo dicas de educação financeira, novos artigos publicados no blog e comunicados importantes sobre as ferramentas do site. Nós temos tolerância zero com spam e não vendemos, alugamos ou repassamos sua lista de contatos para corretores, bancos, ou quaisquer empresas terceiras.</p>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">3. Seus Direitos sob a LGPD</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">Como titular dos dados, você tem o direito garantido pela lei brasileira de exercer controle sobre as suas informações. A qualquer momento, você pode:</p>
<ul style="margin-bottom: 24px; padding-left: 24px; color: var(--text-muted); line-height: 1.6;">
  <li style="margin-bottom: 8px;"><strong>Solicitar acesso:</strong> Você pode pedir para saber quais dados temos vinculados ao seu e-mail.</li>
  <li style="margin-bottom: 8px;"><strong>Revogar consentimento:</strong> Você pode clicar no link "Cancelar Inscrição" (Unsubscribe) presente no rodapé de qualquer e-mail enviado por nós. Isso removerá instantaneamente seu e-mail do nosso sistema de envios.</li>
  <li style="margin-bottom: 8px;"><strong>Solicitar exclusão definitiva:</strong> Você pode nos contatar para exigir a exclusão imediata e permanente de qualquer registro do seu e-mail em nossos servidores.</li>
</ul>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">4. Segurança das Informações</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">Implementamos medidas rigorosas de segurança técnica e organizacional para proteger os seus dados contra acessos não autorizados, perdas, destruição ou alteração. Todos os dados são processados por sistemas providos de criptografia (HTTPS/TLS) e servidores de alta segurança.</p>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">5. Contato do Encarregado de Dados (DPO)</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">Caso tenha qualquer dúvida, preocupação ou solicitação referente ao tratamento dos seus dados pessoais, por favor, entre em contato através do e-mail: <strong>privacidade@dinheironu.com.br</strong>.</p>
<p style="margin-top: 40px; font-size: 0.9rem; color: var(--text-muted);"><em>Última atualização: 05 de Agosto de 2026.</em></p>
`);

// 2. Termos e Cookies
updatePage('termos.html', 'Termos de Uso e Cookies', `
<h1 style="margin-bottom: 32px; font-size: 2.5rem; color: var(--text-dark); font-weight: 800; letter-spacing: -0.02em;">Termos de Uso e Política de Cookies</h1>
<p style="margin-bottom: 24px; font-size: 1.1rem; color: var(--text-muted); line-height: 1.7;">Bem-vindo ao <strong>Dinheiro Nu</strong>. Ao acessar e utilizar o nosso site, você concorda expressamente com os Termos e Condições de Uso descritos abaixo. Leia com atenção, pois estes termos protegem tanto os seus direitos quanto os nossos.</p>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">1. Natureza do Conteúdo (Aviso Legal Importante)</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">O Dinheiro Nu é um portal dedicado exclusivamente à <strong>educação financeira e democratização da informação</strong>. Todo o conteúdo, incluindo artigos, textos, tabelas, calculadoras e simuladores, possui caráter estritamente educativo e informativo.</p>
<div style="background-color: rgba(245, 158, 11, 0.1); border-left: 4px solid var(--gold); padding: 16px 20px; border-radius: 4px; margin-bottom: 24px;">
  <p style="margin: 0; color: #925f05; font-weight: 500; line-height: 1.5;"><strong>Atenção:</strong> Nenhuma informação fornecida neste site deve ser interpretada como assessoria financeira profissional, recomendação de compra ou venda de ativos, consultoria de investimentos ou indicação de corretoras. As simulações feitas em nossas ferramentas não configuram promessa de rentabilidade futura. Todo investimento envolve riscos, e você é inteiramente responsável por suas decisões financeiras.</p>
</div>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">2. Política de Cookies</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">Cookies são pequenos arquivos de texto armazenados no seu navegador que ajudam a melhorar a sua experiência no site. Nós utilizamos os cookies com transparência e apenas para as seguintes finalidades:</p>
<ul style="margin-bottom: 24px; padding-left: 24px; color: var(--text-muted); line-height: 1.6;">
  <li style="margin-bottom: 8px;"><strong>Cookies Essenciais:</strong> Necessários para que as calculadoras financeiras funcionem no seu navegador sem perder os dados que você digitou enquanto navega pela página.</li>
  <li style="margin-bottom: 8px;"><strong>Cookies Analíticos:</strong> Utilizamos o Google Analytics de forma anônima para saber quantos visitantes temos, quais artigos são mais lidos e de que região do Brasil eles vêm. Isso nos ajuda a produzir conteúdos melhores.</li>
  <li style="margin-bottom: 8px;">Nós <strong>não</strong> utilizamos cookies de rastreamento agressivo (cross-site tracking) para vender anúncios ou perseguir você pela internet.</li>
</ul>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">Você pode desativar o uso de cookies a qualquer momento nas configurações do seu próprio navegador. O site continuará funcionando perfeitamente, embora o preenchimento automático das calculadoras possa ser afetado.</p>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">3. Propriedade Intelectual e Direitos Autorais</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">Todo o material presente no Dinheiro Nu (artigos, textos estruturados, design visual, identidade gráfica, logotipos, imagens geradas e lógica das calculadoras) é propriedade exclusiva do site e está protegido pela Lei de Direitos Autorais (Lei nº 9.610/1998).</p>
<p style="margin-bottom: 24px; color: var(--text-muted); line-height: 1.6;"><strong>O que é permitido:</strong> Compartilhar nossos links nas redes sociais, enviar artigos para amigos via WhatsApp, citar trechos curtos em trabalhos acadêmicos ou em outros blogs, <em>desde que acompanhados obrigatoriamente de um link direto e claro para a página original</em>.</p>
<p style="margin-bottom: 24px; color: var(--text-muted); line-height: 1.6;"><strong>O que é proibido:</strong> Copiar textos integrais, clonar as calculadoras ou usar a marca Dinheiro Nu para obter vantagens comerciais sem a nossa autorização expressa por escrito.</p>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">4. Isenção de Garantias</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">Esforçamo-nos para manter todo o conteúdo rigorosamente atualizado, especialmente no tocante às taxas de juros (Selic, CDI) e regras fiscais. No entanto, a economia é dinâmica e as informações podem mudar. O Dinheiro Nu não garante a precisão absoluta e em tempo real dos dados, e não se responsabiliza por eventuais perdas financeiras decorrentes do uso das informações aqui contidas.</p>

<p style="margin-top: 40px; font-size: 0.9rem; color: var(--text-muted);"><em>Última atualização: 05 de Agosto de 2026.</em></p>
`);

// 3. Glossário
updatePage('glossario.html', 'Glossário Financeiro', `
<h1 style="margin-bottom: 32px; font-size: 2.5rem; color: var(--text-dark); font-weight: 800; letter-spacing: -0.02em;">O Glossário Dinheiro Nu</h1>
<p style="margin-bottom: 40px; font-size: 1.15rem; color: var(--text-muted); line-height: 1.7;">No mercado financeiro, as instituições adoram criar siglas difíceis para fazer você achar que investir é algo complicado e que você precisa da ajuda deles. Nossa missão aqui é quebrar esse muro. Abaixo, traduzimos o "economês" para o português claro, honesto e sem enrolação. Consulte sempre que encontrar um termo estranho por aí.</p>

<div style="display: grid; gap: 32px; padding-bottom: 40px;">
  
  <div style="border-bottom: 1px solid rgba(15,23,42,.08); padding-bottom: 24px;">
    <h3 style="font-weight: 800; color: var(--primary); font-size: 1.5rem; margin-bottom: 12px; display: flex; align-items: center; gap: 12px;">CDB <span style="font-size: 1rem; color: var(--text-muted); font-weight: 400;">(Certificado de Depósito Bancário)</span></h3>
    <p style="color: var(--text-muted); line-height: 1.7; font-size: 1.05rem;">Em vez de pedir dinheiro emprestado ao banco (e pagar juros altíssimos), aqui é você quem empresta dinheiro para o banco. O banco pega o seu dinheiro, empresta para outra pessoa mais caro, e depois te devolve com uma pequena recompensa (os juros). É o investimento mais comum e seguro da Renda Fixa, sendo coberto pelo FGC.</p>
  </div>

  <div style="border-bottom: 1px solid rgba(15,23,42,.08); padding-bottom: 24px;">
    <h3 style="font-weight: 800; color: var(--primary); font-size: 1.5rem; margin-bottom: 12px; display: flex; align-items: center; gap: 12px;">CDI <span style="font-size: 1rem; color: var(--text-muted); font-weight: 400;">(Certificado de Depósito Interbancário)</span></h3>
    <p style="color: var(--text-muted); line-height: 1.7; font-size: 1.05rem;">É a taxa de juros que os bancos cobram quando emprestam dinheiro uns para os outros de um dia para o outro. Para nós, reles mortais, o CDI funciona como a "régua" de rendimento da renda fixa. A regra de ouro do iniciante é procurar investimentos que paguem no mínimo <strong>100% do CDI</strong>. Hoje em dia, a poupança perde feio para ele.</p>
  </div>

  <div style="border-bottom: 1px solid rgba(15,23,42,.08); padding-bottom: 24px;">
    <h3 style="font-weight: 800; color: var(--primary); font-size: 1.5rem; margin-bottom: 12px;">Taxa Selic</h3>
    <p style="color: var(--text-muted); line-height: 1.7; font-size: 1.05rem;">É a taxa básica de juros da economia brasileira, definida pelo Banco Central. Pense nela como a "taxa-mãe" que influencia todas as outras taxas do país. Se a Selic sobe, os empréstimos e financiamentos ficam mais caros, mas em compensação, os seus investimentos em Renda Fixa passam a render muito mais. O valor da Selic e do CDI caminham praticamente juntos.</p>
  </div>

  <div style="border-bottom: 1px solid rgba(15,23,42,.08); padding-bottom: 24px;">
    <h3 style="font-weight: 800; color: var(--primary); font-size: 1.5rem; margin-bottom: 12px;">IPCA <span style="font-size: 1rem; color: var(--text-muted); font-weight: 400;">(Índice Nacional de Preços ao Consumidor Amplo)</span></h3>
    <p style="color: var(--text-muted); line-height: 1.7; font-size: 1.05rem;">É o nome oficial da <strong>inflação</strong> no Brasil. É o índice que mede o quanto as coisas (arroz, gasolina, aluguel) ficaram mais caras. O grande objetivo de qualquer investimento é render mais do que o IPCA; caso contrário, seu dinheiro está, na prática, perdendo o poder de compra. Títulos chamados de "IPCA+" garantem que seu dinheiro vencerá a inflação.</p>
  </div>

  <div style="border-bottom: 1px solid rgba(15,23,42,.08); padding-bottom: 24px;">
    <h3 style="font-weight: 800; color: var(--primary); font-size: 1.5rem; margin-bottom: 12px;">Liquidez</h3>
    <p style="color: var(--text-muted); line-height: 1.7; font-size: 1.05rem;">É a velocidade com que você consegue transformar um investimento de volta em dinheiro vivo na sua conta, sem sofrer grandes perdas. Uma aplicação com <strong>Liquidez Diária</strong> significa que você pode sacar o dinheiro a qualquer momento (ideal para Reserva de Emergência). Já um CDB com vencimento para 2 anos tem baixa liquidez: você só verá o dinheiro no final do prazo.</p>
  </div>
  
  <div style="border-bottom: 1px solid rgba(15,23,42,.08); padding-bottom: 24px;">
    <h3 style="font-weight: 800; color: var(--primary); font-size: 1.5rem; margin-bottom: 12px;">Juros Compostos</h3>
    <p style="color: var(--text-muted); line-height: 1.7; font-size: 1.05rem;">O grande milagre da matemática financeira. São juros sendo cobrados (ou ganhos) sobre os juros acumulados dos meses anteriores, criando um efeito "bola de neve". É maravilhoso se o dinheiro estiver investido ao seu favor (seu patrimônio decola com o passar dos anos), mas é brutalmente destrutivo quando a bola de neve está girando contra você (em uma dívida de rotativo de cartão de crédito).</p>
  </div>
  
  <div style="border-bottom: 1px solid rgba(15,23,42,.08); padding-bottom: 24px;">
    <h3 style="font-weight: 800; color: var(--primary); font-size: 1.5rem; margin-bottom: 12px;">FGC <span style="font-size: 1rem; color: var(--text-muted); font-weight: 400;">(Fundo Garantidor de Créditos)</span></h3>
    <p style="color: var(--text-muted); line-height: 1.7; font-size: 1.05rem;">Um "seguro" gratuito para pequenos investidores. Se você investe em CDB, LCI, LCA ou até na poupança e o banco quebrar, o FGC devolve o seu dinheiro. O limite de proteção é de R$ 250 mil por banco e por CPF. Graças ao FGC, investir em bancos menores não é um bicho de sete cabeças.</p>
  </div>
  
  <div>
    <h3 style="font-weight: 800; color: var(--primary); font-size: 1.5rem; margin-bottom: 12px;">Tesouro Direto</h3>
    <p style="color: var(--text-muted); line-height: 1.7; font-size: 1.05rem;">É um programa do Governo Federal que permite que você empreste dinheiro diretamente para o país em troca de juros. É considerado o investimento mais seguro do Brasil, pois é garantido pelo Tesouro Nacional. Uma excelente porta de entrada para quem quer sair da Poupança, sendo o <em>Tesouro Selic</em> a modalidade mais recomendada para iniciantes.</p>
  </div>

</div>
`);

// 4. Guia do Iniciante
updatePage('guia.html', 'Guia do Iniciante', `
<h1 style="margin-bottom: 24px; font-size: 2.5rem; color: var(--text-dark); font-weight: 800; letter-spacing: -0.02em;">O Grande Guia do Iniciante</h1>
<p style="margin-bottom: 12px; font-size: 1.2rem; color: var(--text-muted); line-height: 1.7;">Se você acabou de descobrir o Dinheiro Nu e está confuso sobre por onde começar, este guia foi desenhado exatamente para você.</p>
<p style="margin-bottom: 48px; font-size: 1.1rem; color: var(--text-muted); line-height: 1.7;">A organização financeira não tem segredo, mas ela exige uma <strong>ordem cronológica</strong>. Não adianta querer começar a investir na bolsa se você não tem o controle do que gasta hoje. Siga rigorosamente este mapa do tesouro abaixo. Leia um passo de cada vez, arrume a casa e então avance para o próximo nível.</p>

<div style="display: flex; flex-direction: column; gap: 40px; position: relative; padding-left: 32px; border-left: 3px solid rgba(37,99,235,0.2);">
  
  <div style="position: relative;">
    <div style="position: absolute; left: -46px; top: 0; width: 26px; height: 26px; background: var(--primary); border-radius: 50%; border: 4px solid var(--white); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.9rem;">1</div>
    <span style="display: inline-block; background: rgba(239, 68, 68, 0.1); color: #b91c1c; padding: 4px 12px; border-radius: 100px; font-size: 0.85rem; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Fase 1: Sobrevivência</span>
    <h3 style="color: var(--text-dark); font-size: 1.75rem; margin-bottom: 16px; font-weight: 800;">Estanque a sangria (As Dívidas)</h3>
    <p style="color: var(--text-muted); margin-bottom: 16px; line-height: 1.7; font-size: 1.05rem;">A primeira lei da riqueza é: não tente investir enquanto o banco estiver corroendo o seu dinheiro com os juros do rotativo. Os juros de um cartão de crédito no Brasil ou cheque especial podem bater 400% ao ano. Nenhum investimento lícito rende isso. Seu primeiro grande projeto financeiro tem que ser zerar dívidas caras.</p>
    <a href="artigos/dividas.html" style="display: inline-flex; align-items: center; gap: 8px; color: var(--primary); font-weight: 700; font-size: 1.05rem; padding: 10px 0; transition: gap 0.2s;">
      Como sair das dívidas com o método bola de neve
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
    </a>
  </div>

  <div style="position: relative;">
    <div style="position: absolute; left: -46px; top: 0; width: 26px; height: 26px; background: var(--primary); border-radius: 50%; border: 4px solid var(--white); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.9rem;">2</div>
    <span style="display: inline-block; background: rgba(245, 158, 11, 0.1); color: #925f05; padding: 4px 12px; border-radius: 100px; font-size: 0.85rem; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Fase 2: Consciência</span>
    <h3 style="color: var(--text-dark); font-size: 1.75rem; margin-bottom: 16px; font-weight: 800;">Assuma o Controle (O Orçamento)</h3>
    <p style="color: var(--text-muted); margin-bottom: 16px; line-height: 1.7; font-size: 1.05rem;">Você não pode gerenciar aquilo que não enxerga. Muitas pessoas ganham bem, mas vivem endividadas porque não sabem para onde o dinheiro está indo, perdendo-se em gastos invisíveis. A regra 50-30-20 é o sistema mais eficiente e equilibrado para organizar o seu custo de vida, garantir lazer e ainda permitir que você poupe.</p>
    <a href="artigos/orcamento.html" style="display: inline-flex; align-items: center; gap: 8px; color: var(--primary); font-weight: 700; font-size: 1.05rem; padding: 10px 0; transition: gap 0.2s;">
      Como montar um orçamento imbatível
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
    </a>
  </div>

  <div style="position: relative;">
    <div style="position: absolute; left: -46px; top: 0; width: 26px; height: 26px; background: var(--primary); border-radius: 50%; border: 4px solid var(--white); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.9rem;">3</div>
    <span style="display: inline-block; background: rgba(59, 130, 246, 0.1); color: #1e40af; padding: 4px 12px; border-radius: 100px; font-size: 0.85rem; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Fase 3: Proteção</span>
    <h3 style="color: var(--text-dark); font-size: 1.75rem; margin-bottom: 16px; font-weight: 800;">A Reserva de Emergência</h3>
    <p style="color: var(--text-muted); margin-bottom: 16px; line-height: 1.7; font-size: 1.05rem;">A vida acontece. Carros quebram, geladeiras param de gelar, problemas de saúde aparecem ou demissões ocorrem. A Reserva de Emergência (equivalente a 6 meses das suas despesas) é o que separa um imprevisto contornável de um mergulho em um poço de endividamento. É a base da sua tranquilidade.</p>
    <a href="artigos/reserva.html" style="display: inline-flex; align-items: center; gap: 8px; color: var(--primary); font-weight: 700; font-size: 1.05rem; padding: 10px 0; transition: gap 0.2s;">
      Aprenda a montar e calcular a sua reserva
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
    </a>
  </div>

  <div style="position: relative;">
    <div style="position: absolute; left: -46px; top: 0; width: 26px; height: 26px; background: var(--primary); border-radius: 50%; border: 4px solid var(--white); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.9rem;">4</div>
    <span style="display: inline-block; background: rgba(16, 185, 129, 0.1); color: #047857; padding: 4px 12px; border-radius: 100px; font-size: 0.85rem; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Fase 4: Multiplicação</span>
    <h3 style="color: var(--text-dark); font-size: 1.75rem; margin-bottom: 16px; font-weight: 800;">Comece a Investir</h3>
    <p style="color: var(--text-muted); margin-bottom: 16px; line-height: 1.7; font-size: 1.05rem;">Com a casa arrumada, agora é a hora de você fazer com que o dinheiro trabalhe para você através dos juros compostos. Abandone de vez o medo de corretoras de investimentos, dê adeus à velha poupança, e conheça opções altamente rentáveis e com baixíssimo risco na Renda Fixa Brasileira.</p>
    <a href="artigos/investimentos.html" style="display: inline-flex; align-items: center; gap: 8px; color: var(--primary); font-weight: 700; font-size: 1.05rem; padding: 10px 0; transition: gap 0.2s;">
      O roteiro de investimentos iniciais
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
    </a>
  </div>

</div>
`);

console.log("Pages expanded!");
