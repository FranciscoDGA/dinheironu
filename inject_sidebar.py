import os
import glob
import re

# 1. Update CSS
css_path = 'css/style.css'
css_append = """
/* ==========================================================================
   ARTICLE LAYOUT (Sidebar + Recommended Tools)
   ========================================================================== */
.article-layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 40px;
    align-items: start;
    padding-top: 40px;
}

.article-main {
    min-width: 0; /* Prevents grid blowout */
}

.article-box {
    background: #fff;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}

.article-sidebar {
    position: sticky;
    top: 100px;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.sidebar-widget {
    background: #f8fafc;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e2e8f0;
}

.sidebar-widget-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 16px;
    color: var(--text-dark);
}

.related-article-link {
    display: block;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--primary);
    text-decoration: none;
    line-height: 1.4;
    margin-bottom: 6px;
}

.related-article-link:hover {
    text-decoration: underline;
}

.related-article-desc {
    font-size: 0.85rem;
    color: #64748b;
    line-height: 1.4;
    margin-bottom: 16px;
}

.newsletter-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-family: inherit;
    margin-bottom: 12px;
    font-size: 0.9rem;
}

.newsletter-btn {
    width: 100%;
    background: var(--primary);
    color: #fff;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
}

.newsletter-btn:hover {
    background: #1e40af;
}

/* Recommended Tools */
.recommended-tools {
    background: #f8fafc;
    padding: 60px 0;
    margin-top: 60px;
    border-top: 1px solid #e2e8f0;
}

.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 40px;
}

@media (max-width: 992px) {
    .article-layout {
        grid-template-columns: 1fr;
    }
    .article-sidebar {
        position: static;
    }
    .article-box {
        padding: 24px;
    }
}
"""

with open(css_path, 'r', encoding='utf-8') as f:
    current_css = f.read()

if ".article-layout" not in current_css:
    with open(css_path, 'a', encoding='utf-8') as f:
        f.write(css_append)
    print("Updated CSS.")


# 2. Sidebar HTML Template
sidebar_html = """
      <aside class="article-sidebar">
        <!-- Related Articles -->
        <div class="sidebar-widget">
            <h3 class="sidebar-widget-title">Artigos Relacionados</h3>
            
            <a href="acoes-dividendos.html" class="related-article-link">5 estratégias para investir em ações e receber dividendos hoje</a>
            <p class="related-article-desc">Descubra as táticas infalíveis para montar uma carteira focada em dividendos e viver de renda passiva.</p>
            
            <a href="psicologia-dinheiro.html" class="related-article-link">Por que gastamos por impulso? A psicologia do dinheiro</a>
            <p class="related-article-desc">Entenda o comportamento oculto que faz seu saldo zerar e aprenda a controlar suas emoções e suas finanças.</p>
            
            <a href="imovel.html" class="related-article-link">Comprar casa ou morar de aluguel? O cálculo definitivo</a>
            <p class="related-article-desc">Fizemos as contas para provar de uma vez por todas o que é mais vantajoso no Brasil hoje.</p>
        </div>

        <!-- Newsletter -->
        <div class="sidebar-widget" style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); border-color: #bbf7d0;">
            <h3 class="sidebar-widget-title">Receba Dicas de Ouro</h3>
            <p style="font-size: 0.85rem; color: #166534; margin-bottom: 16px;">Junte-se a milhares de pessoas e receba nossos guias práticos sobre finanças pessoais semanalmente.</p>
            <form onsubmit="event.preventDefault(); alert('Inscrito com sucesso!');">
                <input type="email" placeholder="Seu melhor e-mail" class="newsletter-input" required>
                <button type="submit" class="newsletter-btn" style="background: #16a34a;">Inscrever-se Grátis</button>
            </form>
        </div>
      </aside>
"""

# Recommended tools section (before </body>)
tools_section_html = """
  <section class="recommended-tools">
    <div class="container">
      <div style="text-align: center;">
        <h2 style="font-size: 2rem; color: var(--text-dark); margin-bottom: 10px;">Ferramentas Recomendadas</h2>
        <p style="color: #64748b; font-size: 1.1rem;">As calculadoras mais utilizadas pelos nossos leitores para organizar a vida financeira.</p>
      </div>
      
      <div class="tools-grid">
        <article class="tool-card">
          <div class="tool-card-header">
            <h3 class="tool-card-title">Calculadora de Juros Compostos</h3>
            <span class="tool-badge" style="background: var(--blue);">Popular</span>
          </div>
          <p class="tool-card-desc">Simule a mágica dos juros compostos ao longo dos anos. Descubra quanto dinheiro você terá investindo um valor mensalmente.</p>
          <a href="ferramentas/juros-compostos.html" class="tool-card-btn">Acessar Ferramenta &rarr;</a>
        </article>

        <article class="tool-card">
          <div class="tool-card-header">
            <h3 class="tool-card-title">Simulador de Financiamento</h3>
            <span class="tool-badge" style="background: #eab308;">Essencial</span>
          </div>
          <p class="tool-card-desc">Vai comprar casa ou carro? Simule as parcelas SAC ou Price e veja quanto pagará de juros ao banco antes de assinar.</p>
          <a href="ferramentas/financiamento.html" class="tool-card-btn">Acessar Ferramenta &rarr;</a>
        </article>

        <article class="tool-card">
          <div class="tool-card-header">
            <h3 class="tool-card-title">Regra 50-30-20 (Orçamento)</h3>
            <span class="tool-badge" style="background: #16a34a;">Novo</span>
          </div>
          <p class="tool-card-desc">Descubra exatamente quanto você deve destinar para gastos fixos, lazer e investimentos baseado no seu salário limpo.</p>
          <a href="ferramentas/regra-50-30-20.html" class="tool-card-btn">Acessar Ferramenta &rarr;</a>
        </article>
      </div>
      
      <div style="text-align: center; margin-top: 40px;">
        <a href="ferramentas.html" class="btn btn-secondary" style="background: #1e293b; color: white;">Ver Todas as Ferramentas</a>
      </div>
    </div>
  </section>
"""

# Gather articles
articles = glob.glob('artigos/*.html') + [
    "acoes-dividendos.html", "bitcoin-2026.html", "cartao-black.html", 
    "cdb-liquidez.html", "compra-casa.html", "dicas-mei.html", 
    "economia-supermercado.html", "fim-do-ted.html", "financiamento-veiculo.html", 
    "fundos-imobiliarios.html", "imposto-renda.html", "milhas-aereas.html", 
    "psicologia-dinheiro.html", "renegociacao-banco.html", "reserva-emergencia.html", 
    "tesouro-selic-2026.html", "viver-de-renda.html"
]

count = 0
for file in articles:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        # If already modified, skip
        if "article-layout" in content:
            continue
            
        # We need to wrap the contents of <article> inside a <main class="article-main"><article class="article-box">
        # 1. Find <main ...> and replace with <main style="padding-top: 100px; padding-bottom: 60px; background: #f8fafc;"><div class="container article-layout"><main class="article-main">
        # Note: some have <main style="padding-top: 100px;"> or just <main>
        content = re.sub(r'<main[^>]*>', r'<main style="padding-top: 100px; padding-bottom: 60px; background: #f1f5f9;">\n  <div class="container article-layout">\n    <div class="article-main">', content, 1)

        # 2. Replace <article ...> with <article class="article-box">
        content = re.sub(r'<article[^>]*>', r'<article class="article-box">', content, 1)
        
        # 3. Find </article> and append </article></div> + sidebar + </div> (close container article-layout)
        # Note: we need to find the very FIRST </article> inside <main> and append there.
        # But there shouldn't be multiple </article> in these templates except the main one.
        content = content.replace('</article>', f'</article>\n    </div> <!-- close article-main -->\n{sidebar_html}\n  </div> <!-- close article-layout -->', 1)
        
        # 4. Find </main> and append tools section BEFORE it
        content = content.replace('</main>', f'</main>\n{tools_section_html}', 1)
        
        # In case some links inside the sidebar need correct paths (if in artigos/ folder)
        if file.startswith('artigos'):
            # The sidebar links point to root HTML files. So we prepend '../' to the hrefs.
            modified_sidebar = sidebar_html.replace('href="', 'href="../')
            modified_tools = tools_section_html.replace('href="', 'href="../')
            # But wait, we already injected them as strings! Let's just fix the whole content instead.
            # No, that might break other links. Let's just do a specific replacement.
            # I'll just run a post-process on the content for 'artigos/' files.
            pass # Actually, the simplest is to fix the links just in those blocks!
            
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
            
        # Post-process for `artigos/` relative paths
        if file.startswith('artigos'):
            with open(file, 'r', encoding='utf-8') as f:
                c = f.read()
            c = c.replace('href="acoes-dividendos.html"', 'href="../acoes-dividendos.html"')
            c = c.replace('href="psicologia-dinheiro.html"', 'href="../psicologia-dinheiro.html"')
            c = c.replace('href="imovel.html"', 'href="../imovel.html"')
            c = c.replace('href="ferramentas.html"', 'href="../ferramentas.html"')
            c = c.replace('href="ferramentas/', 'href="../ferramentas/')
            with open(file, 'w', encoding='utf-8') as f:
                f.write(c)
                
        count += 1

print(f"Injected sidebar and tools into {count} articles.")
