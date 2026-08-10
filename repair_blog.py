import os
import glob
import re

# Read index.html for header/footer
with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Extract header and footer
head_match = re.search(r'([\s\S]*?)<section class="hero"', index_html, re.I)
footer_match = re.search(r'(<!-- ═══════════════════════ FOOTER ═══════════════════════ -->[\s\S]*)', index_html, re.I)

head = head_match.group(1) if head_match else ""
footer = footer_match.group(1) if footer_match else ""

# Update title
head = re.sub(r'<title>.*?</title>', '<title>Blog - Dinheiro Nu</title>', head)
head = head.replace('href="index.html#recentes"', 'href="blog.html"')

# Gather all articles
all_articles = []

# 1. From artigos/
for file in glob.glob('artigos/*.html'):
    all_articles.append({'path': file, 'link': file.replace('\\', '/')})

# 2. From root (the 17 new ones)
root_articles = [
    "acoes-dividendos.html", "bitcoin-2026.html", "cartao-black.html", 
    "cdb-liquidez.html", "compra-casa.html", "dicas-mei.html", 
    "economia-supermercado.html", "fim-do-ted.html", "financiamento-veiculo.html", 
    "fundos-imobiliarios.html", "imposto-renda.html", "milhas-aereas.html", 
    "psicologia-dinheiro.html", "renegociacao-banco.html", "reserva-emergencia.html", 
    "tesouro-selic-2026.html", "viver-de-renda.html"
]

for file in root_articles:
    if os.path.exists(file):
        all_articles.append({'path': file, 'link': file})

cards_html = ""

for item in all_articles:
    try:
        with open(item['path'], 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Extract title
        title_match = re.search(r'<h1[^>]*>([\s\S]*?)</h1>', content, re.I)
        title = title_match.group(1).strip() if title_match else "Artigo Financeiro"
        
        # Extract category
        # If it's a new article, it has <span style="color: var(--primary); font-weight: 700;">{cat}</span>
        # If it's an old one in artigos/, we might not have a clear category span.
        cat_match = re.search(r'<span[^>]*color:[^>]*>([^<]+)</span>', content, re.I)
        cat = cat_match.group(1).strip() if cat_match else "Finanças"
        if len(cat) > 20: cat = "Finanças"
        
        # Extract image
        img_match = re.search(r'<img[^>]*src="([^"]+)"', content, re.I)
        # Fix image path logic depending on where the article is
        img_src = img_match.group(1) if img_match else "images/investimentos.jpg"
        if not img_src.startswith('http') and item['path'].startswith('artigos'):
            # It's an old article, its img src is likely relative to 'artigos' (e.g. '../images/...')
            # But we are in root (blog.html), so we need to map to 'images/...'
            img_src = img_src.replace('../', '')
            
        cards_html += f"""
        <article class="tool-card" style="border-top: 4px solid var(--primary); padding:24px;">
          <div style="width:100%; height:180px; overflow:hidden; border-radius:8px; margin-bottom:16px;">
            <img src="{img_src}" alt="{title}" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <span style="background: rgba(37,99,235,0.1); color: var(--primary); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">{cat}</span>
          <h3 style="margin: 12px 0; font-size: 1.25rem;"><a href="{item['link']}" style="color:inherit; text-decoration:none;">{title}</a></h3>
          <a href="{item['link']}" style="color: var(--primary); font-weight: 600; text-decoration: none; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 4px; margin-top:8px;">Ler artigo &rarr;</a>
        </article>
        """
    except Exception as e:
        print(f"Error parsing {item['path']}: {e}")


blog_html = f"""{head}
  <main>
    <section class="page-hero" style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 120px 20px 60px; text-align: center; color: white;">
      <div class="container">
        <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 16px;">Blog Dinheiro Nu</h1>
        <p style="font-size: 1.1rem; max-width: 700px; margin: 0 auto; color:#cbd5e1;">Todos os nossos 50 artigos e guias para transformar sua vida financeira de uma vez por todas.</p>
      </div>
    </section>

    <section class="section" style="padding-top: 60px; background:#f8fafc;">
      <div class="container">
        <div class="articles-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 32px;">
            {cards_html}
        </div>
      </div>
    </section>
  </main>
{footer}
"""

with open('blog.html', 'w', encoding='utf-8') as f:
    f.write(blog_html)

print(f"Repaired blog.html with {len(all_articles)} articles!")
