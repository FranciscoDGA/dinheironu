import re

def update_file(filename, search_pattern, replacement):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content = re.sub(search_pattern, replacement, content, flags=re.DOTALL)
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)

# Fix Rotativo
rotativo_html = """<main class="tool-container">
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
        <p style="margin:0; font-size:0.85rem; color:#64748b;">(Projeção baseada na média de 430% ao ano do cartão)</p>
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
        
        // Regra antiga (Média do BC: 430% a.a = ~14.8% a.m)
        let montanteAntigo = original * Math.pow(1.148, meses || 1);
        
        // Nova regra: Max = original * 2
        let montanteNovo = original * Math.pow(1.148, meses || 1); 
        if(montanteNovo > original * 2) {
            montanteNovo = original * 2;
        }
        
        box.style.display = 'block'; box.className = 'result-box';
        document.getElementById('valorAntigo').innerText = montanteAntigo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        document.getElementById('valorNovo').innerText = montanteNovo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
      }
    </script>"""

update_file('ferramentas/rotativo.html', r'<main class="tool-container">.*?</script>', rotativo_html)

# Fix Troca de Divida
troca_html = """<main class="tool-container">
      <div class="form-group">
        <label>Valor da Dívida Atual (R$)</label>
        <input type="number" id="valorDivida" placeholder="Ex: 8000">
      </div>
      <div class="form-group">
        <label>Taxa de Juros Atual (% ao mês) - Cartão/Cheque</label>
        <input type="number" id="taxaAtual" placeholder="Ex: 14" value="14">
      </div>
      <div class="form-group">
        <label>Taxa do Empréstimo Novo (% ao mês)</label>
        <input type="number" id="taxaNova" placeholder="Ex: 3" value="3">
      </div>
      <div class="form-group">
        <label>Meses para Pagar (Prazo)</label>
        <input type="number" id="prazo" placeholder="Ex: 24" value="12">
      </div>
      <button class="btn" onclick="calcularTroca()">Simular Troca</button>
      
      <div class="result-box" id="resultado">
        <h3 style="color:#0f172a; margin:0;">Economia Total (Juros não pagos):</h3>
        <div class="result-value" id="valorEconomia">R$ 0,00</div>
        <p style="color:#475569; margin:0;" id="comparacaoMensal">Parcela cai de X para Y.</p>
      </div>
    </main>
    <script>
      function calcularTroca() {
        const valor = parseFloat(document.getElementById('valorDivida').value);
        const tAtual = parseFloat(document.getElementById('taxaAtual').value) / 100;
        const tNova = parseFloat(document.getElementById('taxaNova').value) / 100;
        const prazo = parseInt(document.getElementById('prazo').value);
        const box = document.getElementById('resultado');
        
        if(isNaN(valor) || isNaN(tAtual) || isNaN(tNova) || isNaN(prazo) || prazo <= 0) {
          box.style.display = 'block'; box.className = 'result-box error';
          box.innerHTML = 'Preencha todos os campos corretamente.'; return;
        }
        
        // Cálculo de Parcela (Tabela Price)
        const pmtAtual = (valor * tAtual) / (1 - Math.pow(1 + tAtual, -prazo));
        const pmtNovo = (valor * tNova) / (1 - Math.pow(1 + tNova, -prazo));
        
        const totalAtual = pmtAtual * prazo;
        const totalNovo = pmtNovo * prazo;
        const economia = totalAtual - totalNovo;
        
        box.style.display = 'block'; box.className = 'result-box';
        document.getElementById('valorEconomia').innerText = economia.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        document.getElementById('comparacaoMensal').innerText = `A sua parcela mensal cairia de ${pmtAtual.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} para ${pmtNovo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}!`;
      }
    </script>"""

update_file('ferramentas/troca-divida.html', r'<main class="tool-container">.*?</script>', troca_html)

print("Calculators logic fixed!")
