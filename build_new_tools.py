import os

# --- 1. BUILD THE 3 NEW TOOLS ---
tools_html = {}

head = """<!DOCTYPE html>
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
    <a href="../termos.html" style="color:#fff; margin:0 10px;">Termos</a> |
    <a href="../cookies.html" style="color:#fff; margin:0 10px;">Cookies</a>
    <p style="margin-top:20px; color:#94a3b8;">&copy; 2026 Dinheiro Nu. Todos os direitos reservados.</p>
  </footer>
"""

tools_html['juros-compostos.html'] = {
    'title': 'Calculadora de Juros Compostos',
    'body': """
    <header class="tool-hero">
      <h1>Juros Compostos</h1>
      <p>Descubra o poder da bola de neve a seu favor no longo prazo.</p>
    </header>
    <main class="tool-container">
      <div class="form-group">
        <label>Valor Inicial (R$)</label>
        <input type="number" id="valorInicial" placeholder="Ex: 1000" value="0">
      </div>
      <div class="form-group">
        <label>Aporte Mensal (R$)</label>
        <input type="number" id="aporteMensal" placeholder="Ex: 500">
      </div>
      <div class="form-group">
        <label>Taxa de Juros Mensal (%)</label>
        <input type="number" id="taxa" placeholder="Ex: 1">
      </div>
      <div class="form-group">
        <label>Período (Meses)</label>
        <input type="number" id="periodo" placeholder="Ex: 120">
      </div>
      <button class="btn" onclick="calcularJuros()">Simular</button>
      
      <div class="result-box" id="resultado" style="text-align:left;">
        <h3 style="color:#0f172a; margin-top:0;">Montante Final:</h3>
        <div class="result-value" id="montanteFinal" style="color:#10b981; font-size:1.8rem; margin:8px 0 24px;">R$ 0,00</div>
        
        <p style="margin:0 0 8px; color:#475569;">Valor Investido: <strong id="valorInvestido">R$ 0,00</strong></p>
        <p style="margin:0 0 0; color:#475569;">Total em Juros: <strong id="totalJuros" style="color:#f59e0b;">R$ 0,00</strong></p>
      </div>
    </main>
    <script>
      function calcularJuros() {
        const principal = parseFloat(document.getElementById('valorInicial').value) || 0;
        const pmt = parseFloat(document.getElementById('aporteMensal').value) || 0;
        const i = parseFloat(document.getElementById('taxa').value) / 100;
        const n = parseInt(document.getElementById('periodo').value);
        const box = document.getElementById('resultado');
        
        if(isNaN(i) || isNaN(n) || n <= 0) {
          box.style.display = 'block'; box.className = 'result-box error';
          box.innerHTML = 'Preencha Taxa e Período corretamente.'; return;
        }
        
        // FV = P(1+i)^n + PMT [ ( (1+i)^n - 1 ) / i ]
        const fv = principal * Math.pow(1 + i, n) + pmt * ( (Math.pow(1 + i, n) - 1) / i );
        const investido = principal + (pmt * n);
        const jurosTotais = fv - investido;
        
        box.style.display = 'block'; box.className = 'result-box';
        document.getElementById('montanteFinal').innerText = fv.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        document.getElementById('valorInvestido').innerText = investido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        document.getElementById('totalJuros').innerText = jurosTotais.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
      }
    </script>
    """
}

tools_html['financiamento.html'] = {
    'title': 'Simulador de Financiamento',
    'body': """
    <header class="tool-hero">
      <h1>Simulador de Financiamento (PRICE)</h1>
      <p>Calcule a parcela do seu carro ou casa e descubra os juros escondidos.</p>
    </header>
    <main class="tool-container">
      <div class="form-group">
        <label>Valor Financiado (R$) - Excluindo a entrada</label>
        <input type="number" id="valorFin" placeholder="Ex: 50000">
      </div>
      <div class="form-group">
        <label>Taxa de Juros ao Mês (%)</label>
        <input type="number" id="taxaMes" placeholder="Ex: 1.5">
      </div>
      <div class="form-group">
        <label>Número de Parcelas</label>
        <input type="number" id="numParcelas" placeholder="Ex: 60">
      </div>
      <button class="btn" onclick="calcularPrice()">Simular</button>
      
      <div class="result-box" id="resultado" style="text-align:left;">
        <h3 style="color:#0f172a; margin-top:0;">Valor da Parcela Fixa:</h3>
        <div class="result-value" id="valorParcela" style="color:#ef4444; font-size:1.8rem; margin:8px 0 24px;">R$ 0,00</div>
        
        <p style="margin:0 0 8px; color:#475569;">Montante Total Pago: <strong id="totalPago">R$ 0,00</strong></p>
        <p style="margin:0 0 0; color:#475569;">Só de Juros para o Banco: <strong id="totalJurosBanco" style="color:#f59e0b;">R$ 0,00</strong></p>
      </div>
    </main>
    <script>
      function calcularPrice() {
        const pv = parseFloat(document.getElementById('valorFin').value);
        const i = parseFloat(document.getElementById('taxaMes').value) / 100;
        const n = parseInt(document.getElementById('numParcelas').value);
        const box = document.getElementById('resultado');
        
        if(isNaN(pv) || isNaN(i) || isNaN(n) || n <= 0) {
          box.style.display = 'block'; box.className = 'result-box error';
          box.innerHTML = 'Preencha os valores corretamente.'; return;
        }
        
        const pmt = (pv * i) / (1 - Math.pow(1 + i, -n));
        const total = pmt * n;
        const juros = total - pv;
        
        box.style.display = 'block'; box.className = 'result-box';
        document.getElementById('valorParcela').innerText = pmt.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        document.getElementById('totalPago').innerText = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        document.getElementById('totalJurosBanco').innerText = juros.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
      }
    </script>
    """
}

tools_html['controle-50-30-20.html'] = {
    'title': 'Calculadora Regra 50-30-20',
    'body': """
    <header class="tool-hero">
      <h1>Regra de Orçamento 50-30-20</h1>
      <p>A divisão perfeita do seu salário para manter as contas no azul.</p>
    </header>
    <main class="tool-container">
      <div class="form-group">
        <label>Qual é o seu Salário Líquido? (R$)</label>
        <input type="number" id="salarioLiquido" placeholder="Ex: 4000">
      </div>
      <button class="btn" onclick="calcular503020()">Dividir Meu Orçamento</button>
      
      <div class="result-box" id="resultado" style="text-align:left;">
        <div style="margin-bottom:16px;">
            <p style="margin:0; font-weight:600; color:#334155;">50% - Necessidades (Moradia, Alimentação, Saúde)</p>
            <div class="result-value" id="val50" style="color:#ef4444; font-size:1.5rem; margin:4px 0 0;">R$ 0,00</div>
        </div>
        <div style="margin-bottom:16px;">
            <p style="margin:0; font-weight:600; color:#334155;">30% - Desejos (Lazer, Compras, Streaming)</p>
            <div class="result-value" id="val30" style="color:#f59e0b; font-size:1.5rem; margin:4px 0 0;">R$ 0,00</div>
        </div>
        <div>
            <p style="margin:0; font-weight:600; color:#334155;">20% - Investimentos (Poupança, Reserva, Renda Variável)</p>
            <div class="result-value" id="val20" style="color:#10b981; font-size:1.5rem; margin:4px 0 0;">R$ 0,00</div>
        </div>
      </div>
    </main>
    <script>
      function calcular503020() {
        const sal = parseFloat(document.getElementById('salarioLiquido').value);
        const box = document.getElementById('resultado');
        
        if(isNaN(sal) || sal <= 0) {
          box.style.display = 'block'; box.className = 'result-box error';
          box.innerHTML = 'Preencha seu salário corretamente.'; return;
        }
        
        box.style.display = 'block'; box.className = 'result-box';
        document.getElementById('val50').innerText = (sal * 0.5).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        document.getElementById('val30').innerText = (sal * 0.3).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        document.getElementById('val20').innerText = (sal * 0.2).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
      }
    </script>
    """
}

for name, data in tools_html.items():
    html = head.replace('{title}', data['title']) + nav + data['body'] + footer + "</body></html>"
    with open(f"ferramentas/{name}", "w", encoding="utf-8") as f:
        f.write(html)

print("3 extra tools created!")
