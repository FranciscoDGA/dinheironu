import re

def update_file(filename, search_pattern, replacement):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = re.sub(search_pattern, replacement, content, flags=re.DOTALL)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)

# 1. Update Privacidade
privacidade_html = """<main style="padding-top: 120px; padding-bottom: 80px;">
  <section class="section">
    <div class="container" style="max-width: 900px; margin: 0 auto; background: var(--white); padding: 56px; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); border: 1px solid rgba(15,23,42,.06);">
      
<h1 style="margin-bottom: 32px; font-size: 2.5rem; color: var(--text-dark); font-weight: 800; letter-spacing: -0.02em;">Política de Privacidade e Proteção de Dados (LGPD)</h1>
<p style="margin-bottom: 24px; font-size: 1.1rem; color: var(--text-muted); line-height: 1.7;">A sua privacidade é uma prioridade inegociável para o <strong>Dinheiro Nu</strong>. Temos o compromisso de proteger os seus dados pessoais, respeitar a sua intimidade e ser 100% transparentes sobre como a nossa infraestrutura tecnológica funciona. Esta Política de Privacidade foi elaborada em estrita conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD) e com os mais altos padrões de segurança internacional.</p>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">1. Processamento Local (Calculadoras e Ferramentas)</h3>
<div style="background-color: rgba(16, 185, 129, 0.1); border-left: 4px solid var(--green); padding: 16px 20px; border-radius: 4px; margin-bottom: 24px;">
  <p style="margin: 0; color: #047857; font-weight: 500; line-height: 1.5;"><strong>Atenção: Nós NÃO coletamos os seus dados financeiros.</strong> Todas as calculadoras, simuladores (Desenrola, Rotativo, etc.) e ferramentas interativas disponíveis no Dinheiro Nu operam exclusivamente via processamento local no seu navegador (Client-Side Javascript).<br><br>Qualquer valor monetário, salário ou dívida que você digitar <strong>não é enviado para os nossos servidores, não é armazenado em nenhum banco de dados e não é compartilhado com terceiros</strong>. Tudo fica restrito à memória temporária do seu próprio dispositivo e é deletado assim que você fecha a página.</p>
</div>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">2. Quais dados efetivamente coletamos?</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">O Dinheiro Nu foi projetado com a premissa de minimização de dados. Nós coletamos apenas:</p>
<ul style="margin-bottom: 24px; padding-left: 24px; color: var(--text-muted); line-height: 1.6;">
  <li style="margin-bottom: 8px;"><strong>Dados de Contato:</strong> Coletamos o seu endereço de e-mail exclusivamente quando você opta por preencher o nosso formulário de contato ou assinar a newsletter.</li>
  <li style="margin-bottom: 8px;"><strong>Dados de Navegação (Cookies Anônimos):</strong> Através de ferramentas de Analytics padrão de mercado, processamos métricas não identificáveis (como páginas visitadas, cliques, tipo de navegador) com a finalidade estrita de análise de tráfego, melhoria de infraestrutura e otimização de conteúdo. Não rastreamos a sua identidade.</li>
  <li style="margin-bottom: 8px;"><strong>O que NUNCA coletaremos:</strong> CPF, RG, dados bancários, números de cartão, endereço residencial ou senhas. Jamais entraremos em contato via WhatsApp ou SMS pedindo depósitos.</li>
</ul>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">3. Base Legal e Compartilhamento</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">O tratamento do seu e-mail baseia-se no seu consentimento expresso (Art. 7º, I da LGPD). Nós mantemos seus dados estritamente em nossos servidores criptografados e <strong>em nenhuma hipótese vendemos, comercializamos, permutamos ou repassamos sua base de dados para corretores, bancos, fintechs ou agências de publicidade</strong>.</p>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">4. Seus Direitos sob a LGPD</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">Como titular dos dados, você tem o direito garantido por lei de exercer controle total. A qualquer momento, você pode solicitar a exibição, retificação, bloqueio ou exclusão total dos seus dados de contato dos nossos sistemas. Basta nos enviar um e-mail com a solicitação "Exclusão de Dados".</p>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">5. Contato Institucional</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">Caso tenha qualquer dúvida, requisição ou sugestão sobre nossas práticas de privacidade, contate nosso Encarregado pelo Tratamento de Dados Pessoais (DPO) pelo canal oficial: <strong>privacidade@dinheironu.com.br</strong>.</p>
<p style="margin-top: 40px; font-size: 0.9rem; color: var(--text-muted);"><em>Última atualização e revisão: Agosto de 2026. Documento válido e em vigência.</em></p>

    </div>
  </section>
</main>"""

update_file('privacidade.html', r'<main[^>]*>.*?</main>', privacidade_html)


# 2. Update Termos
termos_html = """<main style="padding-top: 120px; padding-bottom: 80px;">
  <section class="section">
    <div class="container" style="max-width: 900px; margin: 0 auto; background: var(--white); padding: 56px; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); border: 1px solid rgba(15,23,42,.06);">
      
<h1 style="margin-bottom: 32px; font-size: 2.5rem; color: var(--text-dark); font-weight: 800; letter-spacing: -0.02em;">Termos de Uso e Isenção de Responsabilidade</h1>
<p style="margin-bottom: 24px; font-size: 1.1rem; color: var(--text-muted); line-height: 1.7;">Bem-vindo ao <strong>Dinheiro Nu</strong>. Ao acessar e utilizar o nosso site (artigos, ferramentas, simuladores), você expressamente reconhece e concorda com as diretrizes de compliance, limitações de uso e Termos de Uso descritos abaixo.</p>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">1. Isenção de Responsabilidade (Disclaimer)</h3>
<div style="background-color: rgba(239, 68, 68, 0.1); border-left: 4px solid var(--red); padding: 16px 20px; border-radius: 4px; margin-bottom: 24px;">
  <p style="margin: 0; color: #b91c1c; font-weight: 500; line-height: 1.5;"><strong>Aviso Legal Importante: Todo o conteúdo e funcionamento das ferramentas deste portal possui caráter ESTRITAMENTE EDUCACIONAL e INFORMATIVO.</strong><br><br>O Dinheiro Nu não é uma instituição financeira, não é uma corretora de valores e não atua como consultoria de investimentos profissional. Nenhuma informação fornecida neste site deve ser interpretada como aconselhamento financeiro, jurídico, fiscal ou recomendação de compra/venda de qualquer ativo (ações, fundos, criptomoedas, etc). <strong>Todo e qualquer investimento envolve riscos iminentes de perda de capital. Você é total, única e exclusivamente responsável por suas próprias decisões e prejuízos financeiros.</strong></p>
</div>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">2. Ferramentas, Calculadoras e Precisão</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">As ferramentas, simuladores (ex: Desenrola, Juros Compostos, Rotativo) e resultados matemáticos gerados neste site são estimativas baseadas em fórmulas padrão do mercado financeiro e nas taxas informadas no momento da publicação. Elas <strong>não constituem orçamentos válidos, não geram obrigações contratuais e não substituem simulações oficiais feitas pelo seu banco ou instituição de crédito</strong>. Não garantimos precisão absoluta devido à volatilidade diária de impostos, IOF, CET (Custo Efetivo Total) e flutuações macroeconômicas.</p>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">3. Diretrizes de Uso e Conduta</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">O acesso ao nosso conteúdo é livre, mas pautado em regras de boa-fé. É terminantemente proibido:</p>
<ul style="margin-bottom: 24px; padding-left: 24px; color: var(--text-muted); line-height: 1.6;">
  <li style="margin-bottom: 8px;">Realizar ataques, sobrecarga de requisições, engenharia reversa ou tentativas de burlar a segurança dos nossos servidores (DDoS, Scraping abusivo).</li>
  <li style="margin-bottom: 8px;">Copiar a base de código (HTML/JS) das nossas calculadoras para inseri-las em aplicações comerciais de terceiros sem autorização formal e por escrito.</li>
  <li style="margin-bottom: 8px;">Utilizar o nome, logotipo ou publicações do "Dinheiro Nu" para endossar fraudes, pirâmides financeiras ou esquemas ilícitos. Tomaremos medidas legais criminais cabíveis contra infratores.</li>
</ul>

<h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">4. Propriedade Intelectual</h3>
<p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">O acervo literário, código fonte, design e infraestrutura pertencem ao Dinheiro Nu (Lei nº 9.610/1998). O uso acadêmico ou jornalístico de nossos textos e imagens é incentivado, contanto que seja feita a devida e explícita atribuição (hiperlink dofollow) para o conteúdo original.</p>

<p style="margin-top: 40px; font-size: 0.9rem; color: var(--text-muted);"><em>A continuidade da navegação neste domínio atesta a sua ciência e anuência plena com todos os itens supracitados.</em></p>

    </div>
  </section>
</main>"""

update_file('termos.html', r'<main[^>]*>.*?</main>', termos_html)


# 3. Update Cookies
cookies_html = """<main style="padding-top: 120px; padding-bottom: 80px;">
  <section class="section">
    <div class="container" style="max-width: 900px; margin: 0 auto; background: var(--white); padding: 56px; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); border: 1px solid rgba(15,23,42,.06);">
      
      <h1 style="margin-bottom: 32px; font-size: 2.5rem; color: var(--text-dark); font-weight: 800; letter-spacing: -0.02em;">Política de Gestão de Cookies</h1>
      <p style="margin-bottom: 24px; font-size: 1.1rem; color: var(--text-muted); line-height: 1.7;">No <strong>Dinheiro Nu</strong>, a transparência digital é um dos nossos maiores pilares. Esta política explica de forma clara e acessível o que são os cookies e por que os utilizamos, assegurando que o controle sobre o seu navegador fique sempre em suas mãos.</p>

      <h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">1. O Papel dos Cookies na Experiência do Usuário</h3>
      <p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">Cookies são microarquivos criptografados armazenados temporariamente na memória do seu navegador. O Dinheiro Nu <strong>não utiliza cookies para rastrear você fora do nosso site</strong> ou para vender anúncios direcionados massivos. O uso é puramente arquitetural e estatístico:</p>

      <ul style="margin-bottom: 24px; padding-left: 24px; color: var(--text-muted); line-height: 1.6;">
        <li style="margin-bottom: 8px;"><strong>Cookies Essenciais (Estritamente Necessários):</strong> São cruciais para manter a sessão ativa, carregar a barra de busca adequadamente e garantir a segurança do servidor contra acessos bot. Não armazenam dados pessoais.</li>
        <li style="margin-bottom: 8px;"><strong>Cookies Analíticos (Desempenho):</strong> Utilizamos relatórios analíticos agregados e anônimos (ex: Google Analytics) para entender como o site está sendo utilizado. Precisamos saber se o artigo X foi lido por 10 ou 1.000 pessoas para calibrar a relevância do conteúdo futuro, e identificar links quebrados (erros 404). As estatísticas coletadas não individualizam os usuários.</li>
        <li style="margin-bottom: 8px;"><strong>Cookies Funcionais (Local Storage das Ferramentas):</strong> Reforçamos que os valores numéricos inseridos por você nas nossas Ferramentas (Simuladores e Calculadoras) <strong>não utilizam cookies de persistência no servidor</strong>. Eles podem fazer uso temporário de sessões baseadas na RAM do seu navegador para não perder o preenchimento caso você atualize a página.</li>
      </ul>

      <h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">2. O Seu Direito ao Controle</h3>
      <p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">A arquitetura da internet moderna permite que você assuma o comando. Caso se sinta desconfortável com a presença de arquivos temporários, você pode configurar o seu navegador de internet (Chrome, Safari, Firefox, Edge) para bloqueá-los de forma global ou parcial.</p>
      
      <p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;"><em>Aviso Técnico:</em> Ressaltamos que a desabilitação global dos cookies não impedirá a leitura dos nossos artigos educacionais, mas poderá gerar lentidão, causar quebras de formatação no painel de ferramentas e redefinir formulários sem aviso prévio, já que o navegador perderá a capacidade de reter "estado" de funcionamento (sessão).</p>

      <h3 style="margin-top: 32px; margin-bottom: 16px; font-size: 1.5rem; color: var(--text-dark); font-weight: 700;">3. Suporte Legal</h3>
      <p style="margin-bottom: 16px; color: var(--text-muted); line-height: 1.6;">Para questões aprofundadas sobre o ciclo de vida dos cookies, expurgo de registros ou políticas de governança e privacidade correlatas, sinta-se à vontade para enviar um e-mail para a nossa equipe compliance em <strong>privacidade@dinheironu.com.br</strong>.</p>
      
      <p style="margin-top: 40px; font-size: 0.9rem; color: var(--text-muted);"><em>Diretriz documentada e revisada. Dinheiro Nu &copy; 2026.</em></p>
    </div>
  </section>
</main>"""

update_file('cookies.html', r'<main[^>]*>.*?</main>', cookies_html)

print("Legal pages updated successfully!")
