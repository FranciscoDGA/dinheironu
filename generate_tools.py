import os

os.makedirs('ferramentas', exist_ok=True)

nav = """
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="../index.html" class="nav-logo" id="nav-logo-link">
        <span class="logo-text">Dinheiro<span class="logo-accent">Nu</span></span>
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
"""

footer = """
  <footer class="footer" id="footer" style="margin-top:80px; padding:40px; background:#0f172a; color:#fff; text-align:center;">
    <a href="../index.html" style="color:#fff; margin:0 10px;">Home</a> | 
    <a href="../sobre.html" style="color:#fff; margin:0 10px;">Sobre</a> | 
    <a href="../cookies.html" style="color:#fff; margin:0 10px;">Cookies</a>
    <p style="margin-top:20px; color:#94a3b8;">&copy; 2026 Dinheiro Nu. Todos os direitos reservados.</p>
  </footer>
"""

head = """
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>{title} | Dinheiro Nu</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="../css/style.css"/>
  <style>
    body { background: #f8fafc; }
    .tool-hero { padding: 120px 20px 60px; background: linear-gradient(135deg, #0f172a, #1e3a5f); color: #fff; text-align: center; }
    .tool-hero h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; }
    .tool-container { max-width: 600px; margin: -40px auto 60px; background: #fff; border-radius: 16px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); position: relative; }
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; font-weight: 600; margin-bottom: 8px; color: #334155; }
    .form-group input, .form-group select { width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 1rem; outline: none; }
    .btn { display: block; width: 100%; padding: 14px; background: #f59e0b; color: #0f172a; font-weight: 700; font-size: 1.1rem; border: none; border-radius: 8px; cursor: pointer; transition: 0.2s; }
    .btn:hover { background: #d97706; }
    .result-box { display: none; margin-top: 32px; padding: 24px; border-radius: 8px; background: #f0fdf4; border: 1px solid #bbf7d0; text-align: center; }
    .result-box.error { background: #fff1f2; border-color: #fecdd3; }
    .result-value { font-size: 2.5rem; font-weight: 800; color: #166534; margin: 16px 0; }
  </style>
</head>
<body>
"""

tools = {}

tools['desenrola.html'] = {
    'title': 'Simulador Novo Desenrola Brasil 2026',
    'body': """
    <header class="tool-hero">
      <h1>Simulador Novo Desenrola</h1>
      <p>Descubra quanto você pode economizar na renegociação (Lei 14.836)</p>
    </header>
    <main class="tool-container">
      <div class="form-group">
        <label>Valor Original da Dívida (R$)</label>
        <input type="number" id="valorOriginal" placeholder="Ex: 5000">
      </div>
      <div class="form-group">
        <label>Meses em Atraso</label>
        <input type="number" id="mesesAtraso" placeholder="Ex: 12">
      </div>
      <button class="btn" onclick="calcularDesenrola()">Simular Desconto</button>
      
      <div class="result-box" id="resultado">
        <h3 style="color:#0f172a; margin:0;">Você pode quitar tudo por até:</h3>
        <div class="result-value" id="valorFinal">R$ 0,00</div>
        <p style="color:#475569; margin:0;" id="economiaTexto"></p>
      </div>
    </main>
    <script>
      function calcularDesenrola() {
        const original = parseFloat(document.getElementById('valorOriginal').value);
        const meses = parseInt(document.getElementById('mesesAtraso').value);
        const box = document.getElementById('resultado');
        
        if(isNaN(original) || isNaN(meses) || original <= 0) {
          box.style.display = 'block'; box.className = 'result-box error';
          box.innerHTML = 'Preencha os valores corretamente.'; return;
        }
        
        let jurosBancarios = original * Math.pow(1.1, meses); 
        let desconto = jurosBancarios * 0.90; // 90% de desconto nos juros
        let valorPago = original + ((jurosBancarios - original) * 0.10);
        if(valorPago > original * 2) valorPago = original * 2; // Teto de 100%
        
        box.style.display = 'block'; box.className = 'result-box';
        document.getElementById('valorFinal').innerText = valorPago.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        document.getElementById('economiaTexto').innerText = `Dívida bancária simulada: ${jurosBancarios.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} (Economia de mais de 80%!)`;
      }
    </script>
    """
}

tools['rotativo.html'] = {
    'title': 'Calculadora Teto do Rotativo',
    'body': """
    <header class="tool-hero">
      <h1>Teto do Rotativo (Lei 14.836)</h1>
      <p>Veja a diferença da sua dívida antes e depois da nova lei limitadora.</p>
    </header>
    <main class="tool-container">
      <div class="form-group">
        <label>Valor da Fatura Atrasada (R$)</label>
        <input type="number" id="valorFatura" placeholder="Ex: 2000">
      </div>
      <div class="form-group">
        <label>Tempo de Atraso (Meses)</label>
        <input type="number" id="mesesAtraso" placeholder="Ex: 12">
      </div>
      <button class="btn" onclick="calcularRotativo()">Comparar</button>
      
      <div class="result-box" id="resultado" style="text-align:left;">
        <h3 style="color:#0f172a; margin-top:0;">Dívida pela REGRA ANTIGA:</h3>
        <div class="result-value" id="valorAntigo" style="color:#ef4444; font-size:1.8rem; margin:8px 0 24px;">R$ 0,00</div>
        
        <h3 style="color:#0f172a; margin-top:0;">Dívida pela NOVA LEI (Teto 100%):</h3>
        <div class="result-value" id="valorNovo" style="color:#10b981; font-size:1.8rem; margin:8px 0 0;">R$ 0,00</div>
        <p style="margin-top:16px; font-weight:600; color:#334155;">O banco NUNCA poderá cobrar mais que o dobro do valor original!</p>
      </div>
    </main>
    <script>
      function calcularRotativo() {
        const original = parseFloat(document.getElementById('valorFatura').value);
        const meses = parseInt(document.getElementById('mesesAtraso').value);
        const box = document.getElementById('resultado');
        
        if(isNaN(original) || original <= 0) {
          box.style.display = 'block'; box.className = 'result-box error';
          box.innerHTML = 'Preencha o valor da fatura.'; return;
        }
        
        // Regra antiga (400% a.a = ~14.3% a.m)
        let montanteAntigo = original * Math.pow(1.143, meses || 12);
        
        // Nova regra: Max = original * 2
        let montanteNovo = original * 2;
        if(meses && meses < 6) montanteNovo = original * Math.pow(1.143, meses); // Se for poucos meses, não atingiu o teto
        if(montanteNovo > original * 2) montanteNovo = original * 2;
        
        box.style.display = 'block'; box.className = 'result-box';
        document.getElementById('valorAntigo').innerText = montanteAntigo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        document.getElementById('valorNovo').innerText = montanteNovo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
      }
    </script>
    """
}

tools['troca-divida.html'] = {
    'title': 'Simulador de Troca de Dívida',
    'body': """
    <header class="tool-hero">
      <h1>Troca de Dívida Inteligente</h1>
      <p>Compare se vale a pena pegar um empréstimo para quitar seu cartão/cheque especial.</p>
    </header>
    <main class="tool-container">
      <div class="form-group">
        <label>Valor da Dívida Atual (R$)</label>
        <input type="number" id="valorDivida" placeholder="Ex: 8000">
      </div>
      <div class="form-group">
        <label>Taxa de Juros Atual (% ao mês) - Cartão</label>
        <input type="number" id="taxaAtual" placeholder="Ex: 14" value="14">
      </div>
      <div class="form-group">
        <label>Taxa do Empréstimo Novo (% ao mês)</label>
        <input type="number" id="taxaNova" placeholder="Ex: 3" value="3">
      </div>
      <button class="btn" onclick="calcularTroca()">Simular Troca</button>
      
      <div class="result-box" id="resultado">
        <h3 style="color:#0f172a; margin:0;">Economia Estimada em 1 Ano:</h3>
        <div class="result-value" id="valorEconomia">R$ 0,00</div>
        <p style="color:#475569; margin:0;">Essa é a quantia que você deixaria de dar para o banco.</p>
      </div>
    </main>
    <script>
      function calcularTroca() {
        const valor = parseFloat(document.getElementById('valorDivida').value);
        const tAtual = parseFloat(document.getElementById('taxaAtual').value) / 100;
        const tNova = parseFloat(document.getElementById('taxaNova').value) / 100;
        const box = document.getElementById('resultado');
        
        if(isNaN(valor) || isNaN(tAtual) || isNaN(tNova)) {
          box.style.display = 'block'; box.className = 'result-box error';
          box.innerHTML = 'Preencha todos os campos.'; return;
        }
        
        let jurosAtual = valor * Math.pow(1 + tAtual, 12) - valor;
        let jurosNovo = valor * Math.pow(1 + tNova, 12) - valor;
        let economia = jurosAtual - jurosNovo;
        
        box.style.display = 'block'; box.className = 'result-box';
        document.getElementById('valorEconomia').innerText = economia.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
      }
    </script>
    """
}

tools['salario-variavel.html'] = {
    'title': 'Orçamento para Autônomos (Salário Variável)',
    'body': """
    <header class="tool-hero">
      <h1>Calculadora do Salário Variável</h1>
      <p>Descubra seu "Padrão de Vida Seguro" baseado na sua média de ganhos.</p>
    </header>
    <main class="tool-container">
      <div class="form-group">
        <label>Qual foi seu PIOR mês de ganhos? (R$)</label>
        <input type="number" id="piorMes" placeholder="Ex: 2000">
      </div>
      <div class="form-group">
        <label>Qual foi seu MELHOR mês de ganhos? (R$)</label>
        <input type="number" id="melhorMes" placeholder="Ex: 8000">
      </div>
      <button class="btn" onclick="calcularOrcamento()">Definir Orçamento</button>
      
      <div class="result-box" id="resultado" style="text-align:left;">
        <p style="margin:0 0 8px;">O seu Custo de Vida Fixo NÃO deve passar de:</p>
        <div class="result-value" id="tetoFixo" style="margin:0 0 24px;">R$ 0,00</div>
        
        <p style="margin:0 0 8px;">Nos meses de alta, guarde para a "Caixinha":</p>
        <div class="result-value" id="valorGuarda" style="margin:0 0 0; color:#2563eb; font-size:1.8rem;">R$ 0,00</div>
      </div>
    </main>
    <script>
      function calcularOrcamento() {
        const pior = parseFloat(document.getElementById('piorMes').value);
        const melhor = parseFloat(document.getElementById('melhorMes').value);
        const box = document.getElementById('resultado');
        
        if(isNaN(pior) || isNaN(melhor) || pior > melhor) {
          box.style.display = 'block'; box.className = 'result-box error';
          box.innerHTML = 'Preencha os valores corretamente.'; return;
        }
        
        // Regra do autônomo: Despesa fixa <= Pior Mês
        const teto = pior * 0.9; 
        const media = (pior + melhor) / 2;
        const excedente = melhor - media; // Guarda o excedente da média nos meses bons
        
        box.style.display = 'block'; box.className = 'result-box';
        document.getElementById('tetoFixo').innerText = teto.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        document.getElementById('valorGuarda').innerText = excedente.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
      }
    </script>
    """
}

tools['esg.html'] = {
    'title': 'Termômetro ESG',
    'body': """
    <header class="tool-hero">
      <h1>Minha Empresa é Sustentável? (Termômetro ESG)</h1>
      <p>Responda 3 perguntas para medir a nota ESG.</p>
    </header>
    <main class="tool-container">
      <div class="form-group">
        <label>1. A empresa adota energia limpa ou recicla resíduos? (E)</label>
        <select id="q1">
          <option value="0">Não / Desconhecido</option>
          <option value="1">Parcialmente</option>
          <option value="2">Sim, metas públicas ativas</option>
        </select>
      </div>
      <div class="form-group">
        <label>2. Existe igualdade de gênero/raça e impacto na comunidade? (S)</label>
        <select id="q2">
          <option value="0">Não / Desconhecido</option>
          <option value="1">Parcialmente</option>
          <option value="2">Sim, políticas ativas</option>
        </select>
      </div>
      <div class="form-group">
        <label>3. A diretoria é transparente e possui canal de denúncias? (G)</label>
        <select id="q3">
          <option value="0">Não / Desconhecido</option>
          <option value="1">Parcialmente</option>
          <option value="2">Sim, totalmente transparente</option>
        </select>
      </div>
      <button class="btn" onclick="calcularESG()">Medir Nível ESG</button>
      
      <div class="result-box" id="resultado">
        <h3 style="color:#0f172a; margin:0;">Nível de Maturidade ESG:</h3>
        <div class="result-value" id="notaEsg">Baixo</div>
        <div style="height:10px; background:#e2e8f0; border-radius:5px; margin-top:16px; overflow:hidden;">
          <div id="barraEsg" style="height:100%; width:0%; background:#f59e0b; transition:0.5s;"></div>
        </div>
      </div>
    </main>
    <script>
      function calcularESG() {
        const s1 = parseInt(document.getElementById('q1').value);
        const s2 = parseInt(document.getElementById('q2').value);
        const s3 = parseInt(document.getElementById('q3').value);
        const total = s1 + s2 + s3; // Max 6
        const box = document.getElementById('resultado');
        
        let label = 'Baixo (Alerta Vermelho)'; let color = '#ef4444'; let perc = (total/6)*100;
        if(total >= 3) { label = 'Intermediário (Em Transição)'; color = '#f59e0b'; }
        if(total >= 5) { label = 'Alto (Selo Verde ESG)'; color = '#10b981'; }
        
        box.style.display = 'block'; box.className = 'result-box';
        document.getElementById('notaEsg').innerText = label;
        document.getElementById('notaEsg').style.color = color;
        document.getElementById('barraEsg').style.width = perc + '%';
        document.getElementById('barraEsg').style.background = color;
      }
    </script>
    """
}

tools['renda-passiva.html'] = {
    'title': 'Calculadora de Renda Passiva',
    'body': """
    <header class="tool-hero">
      <h1>Calculadora "Adeus, Chefe!"</h1>
      <p>Quanto você precisa ter investido para viver de renda.</p>
    </header>
    <main class="tool-container">
      <div class="form-group">
        <label>Qual renda mensal você deseja no futuro? (R$)</label>
        <input type="number" id="rendaDesejada" placeholder="Ex: 5000">
      </div>
      <div class="form-group">
        <label>Rentabilidade real esperada (% ao ano acima da inflação)</label>
        <input type="number" id="jurosReal" placeholder="Ex: 4" value="4">
      </div>
      <button class="btn" onclick="calcularFire()">Descobrir Meu Número</button>
      
      <div class="result-box" id="resultado">
        <h3 style="color:#0f172a; margin:0;">Você precisa acumular:</h3>
        <div class="result-value" id="numeroFire">R$ 0,00</div>
        <p style="color:#475569; margin:0;">Regra dos 4% baseada no Movimento FIRE (Financial Independence, Retire Early).</p>
      </div>
    </main>
    <script>
      function calcularFire() {
        const renda = parseFloat(document.getElementById('rendaDesejada').value);
        const juros = parseFloat(document.getElementById('jurosReal').value) / 100;
        const box = document.getElementById('resultado');
        
        if(isNaN(renda) || isNaN(juros) || juros <= 0) {
          box.style.display = 'block'; box.className = 'result-box error';
          box.innerHTML = 'Preencha os valores corretamente.'; return;
        }
        
        // Renda anual
        const anual = renda * 12;
        // Montante necessário = Anual / Juros
        const montante = anual / juros;
        
        box.style.display = 'block'; box.className = 'result-box';
        document.getElementById('numeroFire').innerText = montante.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
      }
    </script>
    """
}

for name, data in tools.items():
    html = head.replace('{title}', data['title']) + nav + data['body'] + footer + "</body></html>"
    with open(f"ferramentas/{name}", "w", encoding="utf-8") as f:
        f.write(html)

print("6 ferramentas criadas!")
