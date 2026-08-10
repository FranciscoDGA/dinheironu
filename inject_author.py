import os
import glob
import re

css_path = 'css/style.css'
css_append = """
/* ==========================================================================
   AUTHOR BLOCK & SOBRE PAGE
   ========================================================================== */
.author-block {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
    margin-bottom: 40px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e2e8f0;
}

.author-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
}

.author-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.author-name {
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--text-dark);
}

.author-desc {
    font-size: 0.9rem;
    color: #64748b;
}

.author-meta {
    font-size: 0.8rem;
    color: #94a3b8;
    margin-top: 4px;
}

/* Sobre Page Specific */
.about-hero {
    background: linear-gradient(135deg, #0f172a, #1e293b);
    padding: 100px 20px;
    text-align: center;
    color: white;
}

.about-section {
    padding: 80px 20px;
    background: #f8fafc;
}

.about-section-white {
    padding: 80px 20px;
    background: #fff;
}

.about-title {
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 48px;
    color: var(--text-dark);
}

.sobre-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}

.sobre-card-icon {
    width: 64px;
    height: 64px;
    background: #f1f5f9;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    font-size: 2rem;
}

.sobre-card-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 12px;
    color: var(--text-dark);
}

.sobre-card-text {
    font-size: 0.95rem;
    color: #64748b;
    line-height: 1.6;
}

.team-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 32px;
    text-align: center;
}

.team-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 16px;
}
"""

with open(css_path, 'r', encoding='utf-8') as f:
    current_css = f.read()

if ".author-block" not in current_css:
    with open(css_path, 'a', encoding='utf-8') as f:
        f.write(css_append)
    print("CSS atualizado.")

# AUTHOR BLOCK INJECTION
author_html = """
      <div class="author-block">
        <img src="images/francisco.jpg" alt="Equipe Dinheiro Nu" class="author-avatar">
        <div class="author-info">
          <span class="author-name">Equipe Dinheiro Nu</span>
          <span class="author-desc">Especialistas em Educação Financeira</span>
          <span class="author-meta">REPLACE_DATE &bull; REPLACE_READ_TIME</span>
        </div>
      </div>
"""

articles = glob.glob('artigos/*.html') + [
    "acoes-dividendos.html", "bitcoin-2026.html", "cartao-black.html", 
    "cdb-liquidez.html", "compra-casa.html", "dicas-mei.html", 
    "economia-supermercado.html", "fim-do-ted.html", "financiamento-veiculo.html", 
    "fundos-imobiliarios.html", "imposto-renda.html", "milhas-aereas.html", 
    "psicologia-dinheiro.html", "renegociacao-banco.html", "reserva-emergencia.html", 
    "tesouro-selic-2026.html", "viver-de-renda.html"
]

for file in articles:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Find the old <p> tag that has "Por Francisco Gomes" or "Leitura:"
        # e.g., <p style="color: #64748b; margin-bottom: 30px;">Por Francisco Gomes • Leitura: 8 min</p>
        # or similar.
        match = re.search(r'<p[^>]*>.*?(?:Leitura:\s*(\d+\s*min)|Por.*?(?:Leitura|Leitura:|•)\s*(\d+\s*min)).*?</p>', content, re.I)
        if match:
            read_time = match.group(1) or match.group(2) or "5 min"
            # Injetar o novo bloco no lugar desse <p>
            new_block = author_html.replace('REPLACE_DATE', '24 de agosto de 2026').replace('REPLACE_READ_TIME', f"{read_time} de leitura")
            
            # Fix relative image path if inside artigos/
            if file.startswith('artigos'):
                new_block = new_block.replace('src="images/', 'src="../images/')
                
            content = content[:match.start()] + new_block + content[match.end():]
            
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Author block injected in {file}")
        else:
            print(f"No match in {file}")

print("Injeção concluída.")
