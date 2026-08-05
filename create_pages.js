const fs = require('fs');

const base = fs.readFileSync('sobre.html', 'utf8');
const headNavRegex = /([\s\S]*?)<main/i;
const footerRegex = /(<!-- ═══════════════════════ FOOTER ═══════════════════════ -->[\s\S]*)/;

const headNav = base.match(headNavRegex)[1];
const footer = base.match(footerRegex)[1];

function createPage(filename, title, content) {
  // modify title
  let localHead = headNav.replace(/<title>.*?<\/title>/, `<title>${title} | Dinheiro Nu</title>`);
  
  let mainContent = `
<main style="padding-top: 120px; padding-bottom: 80px;">
  <section class="section">
    <div class="container" style="max-width: 800px; margin: 0 auto; background: var(--white); padding: 40px; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); border: 1px solid rgba(15,23,42,.06);">
      ${content}
    </div>
  </section>
</main>
`;
  
  fs.writeFileSync(filename, localHead + mainContent + footer);
}

// 1. Privacidade / LGPD
createPage('privacidade.html', 'Política de Privacidade e LGPD', `
<h1 style="margin-bottom: 24px; font-size: 2rem; color: var(--text-dark);">Política de Privacidade e LGPD</h1>
<p style="margin-bottom: 16px;">No <strong>Dinheiro Nu</strong>, levamos a sua privacidade a sério. Esta política explica como coletamos, usamos e protegemos seus dados.</p>
<h3 style="margin-top: 24px; margin-bottom: 12px; font-size: 1.25rem;">1. Coleta de Dados</h3>
<p style="margin-bottom: 16px;">Coletamos apenas as informações necessárias para o funcionamento do site e envio de nossa newsletter (seu endereço de e-mail). Não coletamos dados sensíveis como CPF, contas bancárias ou telefones.</p>
<h3 style="margin-top: 24px; margin-bottom: 12px; font-size: 1.25rem;">2. Uso das Informações</h3>
<p style="margin-bottom: 16px;">Seu e-mail será utilizado exclusivamente para o envio de dicas financeiras semanais e avisos de novos artigos. <strong>Nós odiamos spam</strong> tanto quanto você, e não venderemos nem repassaremos sua lista de contatos para terceiros.</p>
<h3 style="margin-top: 24px; margin-bottom: 12px; font-size: 1.25rem;">3. Seus Direitos (LGPD)</h3>
<p style="margin-bottom: 16px;">De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem o direito de solicitar a exclusão do seu e-mail da nossa base de dados a qualquer momento, bastando clicar no link "Cancelar inscrição" no rodapé de qualquer e-mail que enviarmos.</p>
<h3 style="margin-top: 24px; margin-bottom: 12px; font-size: 1.25rem;">4. Segurança</h3>
<p style="margin-bottom: 16px;">Utilizamos protocolos padrão da indústria para garantir a segurança dos dados fornecidos, armazenando-os em plataformas confiáveis e criptografadas.</p>
`);

// 2. Termos e Cookies
createPage('termos.html', 'Termos de Uso e Cookies', `
<h1 style="margin-bottom: 24px; font-size: 2rem; color: var(--text-dark);">Termos de Uso e Política de Cookies</h1>
<p style="margin-bottom: 16px;">Ao acessar o <strong>Dinheiro Nu</strong>, você concorda com nossos termos de uso.</p>
<h3 style="margin-top: 24px; margin-bottom: 12px; font-size: 1.25rem;">1. Conteúdo Informativo</h3>
<p style="margin-bottom: 16px;">Todo o conteúdo e as calculadoras disponibilizadas neste site possuem caráter estritamente educativo e informativo. Nenhuma informação fornecida deve ser interpretada como assessoria de investimentos ou recomendação oficial.</p>
<h3 style="margin-top: 24px; margin-bottom: 12px; font-size: 1.25rem;">2. Uso de Cookies</h3>
<p style="margin-bottom: 16px;">Utilizamos cookies apenas para garantir o funcionamento básico do site e obter métricas anônimas de tráfego (como o Google Analytics), a fim de entender quais artigos são mais lidos. Não usamos cookies invasivos ou de rastreamento cruzado para venda de anúncios diretos.</p>
<h3 style="margin-top: 24px; margin-bottom: 12px; font-size: 1.25rem;">3. Propriedade Intelectual</h3>
<p style="margin-bottom: 16px;">Os textos, ilustrações e ferramentas do site são de propriedade do Dinheiro Nu. A reprodução parcial ou total do conteúdo sem citação e link para a fonte original é proibida.</p>
`);

// 3. Glossário
createPage('glossario.html', 'Glossário Financeiro', `
<h1 style="margin-bottom: 24px; font-size: 2rem; color: var(--text-dark);">Glossário Financeiro</h1>
<p style="margin-bottom: 32px;">O "economês" traduzido para o português claro. Sem enrolação.</p>
<dl style="display: grid; gap: 24px;">
  <div>
    <dt style="font-weight: 700; color: var(--primary); font-size: 1.25rem; margin-bottom: 4px;">CDB (Certificado de Depósito Bancário)</dt>
    <dd style="color: var(--text-muted); line-height: 1.6;">Você empresta dinheiro para o banco, e ele te devolve com juros. É um dos investimentos mais básicos de Renda Fixa.</dd>
  </div>
  <div>
    <dt style="font-weight: 700; color: var(--primary); font-size: 1.25rem; margin-bottom: 4px;">CDI (Certificado de Depósito Interbancário)</dt>
    <dd style="color: var(--text-muted); line-height: 1.6;">Taxa de referência para os investimentos de renda fixa. Quando alguém diz que um CDB rende "100% do CDI", significa que rende quase o mesmo que a Selic.</dd>
  </div>
  <div>
    <dt style="font-weight: 700; color: var(--primary); font-size: 1.25rem; margin-bottom: 4px;">Selic</dt>
    <dd style="color: var(--text-muted); line-height: 1.6;">A taxa básica de juros da economia do Brasil. Se a Selic sobe, a Renda Fixa paga mais.</dd>
  </div>
  <div>
    <dt style="font-weight: 700; color: var(--primary); font-size: 1.25rem; margin-bottom: 4px;">IPCA</dt>
    <dd style="color: var(--text-muted); line-height: 1.6;">É a inflação oficial do país. Investimentos atrelados ao IPCA protegem seu dinheiro de perder o poder de compra.</dd>
  </div>
  <div>
    <dt style="font-weight: 700; color: var(--primary); font-size: 1.25rem; margin-bottom: 4px;">Liquidez</dt>
    <dd style="color: var(--text-muted); line-height: 1.6;">A velocidade com que você consegue transformar um investimento em dinheiro na sua conta. Liquidez diária significa que você pode resgatar no mesmo dia.</dd>
  </div>
  <div>
    <dt style="font-weight: 700; color: var(--primary); font-size: 1.25rem; margin-bottom: 4px;">Juros Compostos</dt>
    <dd style="color: var(--text-muted); line-height: 1.6;">Juros cobrados (ou ganhos) sobre os juros anteriores, gerando o efeito bola de neve. Excelente para quem investe, terrível para quem deve cartão de crédito.</dd>
  </div>
</dl>
`);

// 4. Guia do Iniciante
createPage('guia.html', 'Guia do Iniciante', `
<h1 style="margin-bottom: 24px; font-size: 2rem; color: var(--text-dark);">Guia do Iniciante</h1>
<p style="margin-bottom: 32px; font-size: 1.1rem; line-height: 1.6;">Não sabe por onde começar? Siga este mapa do tesouro financeiro. Leia na ordem para arrumar a casa antes de pensar em multiplicar dinheiro.</p>

<div style="display: flex; flex-direction: column; gap: 32px; position: relative; padding-left: 24px; border-left: 2px solid var(--accent);">
  
  <div style="position: relative;">
    <div style="position: absolute; left: -32px; top: 0; width: 18px; height: 18px; background: var(--accent); border-radius: 50%; border: 4px solid var(--white);"></div>
    <h3 style="color: var(--primary); font-size: 1.25rem; margin-bottom: 8px;">Passo 1: Estanque a sangria (Dívidas)</h3>
    <p style="color: var(--text-muted); margin-bottom: 12px;">Nenhum investimento supera os juros do rotativo do cartão de crédito ou cheque especial.</p>
    <a href="artigos/dividas.html" style="color: var(--primary); font-weight: 600; text-decoration: underline;">Como sair das dívidas →</a>
  </div>

  <div style="position: relative;">
    <div style="position: absolute; left: -32px; top: 0; width: 18px; height: 18px; background: var(--accent); border-radius: 50%; border: 4px solid var(--white);"></div>
    <h3 style="color: var(--primary); font-size: 1.25rem; margin-bottom: 8px;">Passo 2: Monte seu Orçamento</h3>
    <p style="color: var(--text-muted); margin-bottom: 12px;">Descubra para onde seu dinheiro está indo e aplique a regra 50-30-20.</p>
    <a href="artigos/orcamento.html" style="color: var(--primary); font-weight: 600; text-decoration: underline;">5 passos para montar um orçamento →</a>
  </div>

  <div style="position: relative;">
    <div style="position: absolute; left: -32px; top: 0; width: 18px; height: 18px; background: var(--accent); border-radius: 50%; border: 4px solid var(--white);"></div>
    <h3 style="color: var(--primary); font-size: 1.25rem; margin-bottom: 8px;">Passo 3: A Reserva de Emergência</h3>
    <p style="color: var(--text-muted); margin-bottom: 12px;">O colchão de segurança para quando a vida sair do roteiro (desemprego, doenças, consertos do carro).</p>
    <a href="artigos/reserva.html" style="color: var(--primary); font-weight: 600; text-decoration: underline;">Como montar a reserva →</a>
  </div>

  <div style="position: relative;">
    <div style="position: absolute; left: -32px; top: 0; width: 18px; height: 18px; background: var(--accent); border-radius: 50%; border: 4px solid var(--white);"></div>
    <h3 style="color: var(--primary); font-size: 1.25rem; margin-bottom: 8px;">Passo 4: Comece a Investir</h3>
    <p style="color: var(--text-muted); margin-bottom: 12px;">Agora sim! Coloque seu dinheiro para trabalhar para você na Renda Fixa.</p>
    <a href="artigos/investimentos.html" style="color: var(--primary); font-weight: 600; text-decoration: underline;">Melhores investimentos para iniciantes →</a>
  </div>

</div>
`);

console.log("Pages generated!");
