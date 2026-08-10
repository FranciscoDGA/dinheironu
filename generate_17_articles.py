import os
import random
import time

new_articles = [
    {"id": "tesouro-selic-2026", "title": "Por que o Tesouro Selic em 2026 bate a Poupança", "cat": "Investimentos", "color": "green", "img": "images/tesouro.jpg"},
    {"id": "fundos-imobiliarios", "title": "Fundos Imobiliários: Como viver de aluguel sem ter imóveis", "cat": "Investimentos", "color": "green", "img": "images/imovel.jpg"},
    {"id": "cartao-black", "title": "Vale a pena ter um Cartão Black? Mitos e Verdades", "cat": "Cartão", "color": "red", "img": "images/generic_budget.jpg"},
    {"id": "dicas-mei", "title": "Guia Definitivo: Como o MEI deve separar o dinheiro", "cat": "Orçamento", "color": "gold", "img": "images/generic_growth.jpg"},
    {"id": "reserva-emergencia", "title": "Reserva de Emergência: Onde guardar e como render mais", "cat": "Investimentos", "color": "green", "img": "images/generic_savings.jpg"},
    {"id": "viver-de-renda", "title": "A matemática para Viver de Renda aos 40 anos", "cat": "Investimentos", "color": "green", "img": "images/generic_stocks.jpg"},
    {"id": "economia-supermercado", "title": "7 truques para economizar no supermercado sem passar vontade", "cat": "Orçamento", "color": "gold", "img": "images/orcamento.jpg"},
    {"id": "milhas-aereas", "title": "Milhas Aéreas: Ainda dá para viajar de graça?", "cat": "Cartão", "color": "red", "img": "images/generic_planning.jpg"},
    {"id": "cdb-liquidez", "title": "CDB de Liquidez Diária rendendo 110% CDI: Onde achar?", "cat": "Investimentos", "color": "green", "img": "images/generic_investments.jpg"},
    {"id": "financiamento-veiculo", "title": "O perigo do financiamento de veículos em 60x", "cat": "Dívidas", "color": "primary", "img": "images/dividas.jpg"},
    {"id": "bitcoin-2026", "title": "Bitcoin em 2026: Vale a pena ter na carteira?", "cat": "Investimentos", "color": "green", "img": "images/generic_stocks.jpg"},
    {"id": "imposto-renda", "title": "Como pagar menos Imposto de Renda (Legalmente)", "cat": "Orçamento", "color": "gold", "img": "images/generic_budget.jpg"},
    {"id": "compra-casa", "title": "Comprar casa financiada ou morar de aluguel e investir?", "cat": "Investimentos", "color": "green", "img": "images/imovel.jpg"},
    {"id": "renegociacao-banco", "title": "O que falar pro gerente do banco na hora de renegociar", "cat": "Renegociação", "color": "gold", "img": "images/generic_planning.jpg"},
    {"id": "fim-do-ted", "title": "Pix e Open Finance: O futuro das transações", "cat": "Orçamento", "color": "gold", "img": "images/generic_growth.jpg"},
    {"id": "acoes-dividendos", "title": "As 5 melhores ações pagadoras de dividendos", "cat": "Investimentos", "color": "green", "img": "images/investimentos.jpg"},
    {"id": "psicologia-dinheiro", "title": "A psicologia do dinheiro: Por que gastamos por impulso?", "cat": "Orçamento", "color": "gold", "img": "images/generic_savings.jpg"}
]

article_template = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} | Dinheiro Nu</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="index.html" class="nav-logo">
        <span class="logo-text">Dinheiro<span class="logo-accent">Nu</span></span>
      </a>
      <ul class="nav-links">
        <li><a href="index.html" class="nav-link">Home</a></li>
        <li><a href="sobre.html" class="nav-link">Sobre</a></li>
        <li><a href="blog.html" class="nav-link">Blog</a></li>
        <li><a href="ferramentas.html" class="nav-link">Ferramentas</a></li>
      </ul>
    </div>
  </nav>

  <main style="padding-top: 100px;">
    <article class="container" style="max-width: 800px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 16px;">
      <span style="color: var(--primary); font-weight: 700;">{cat}</span>
      <h1 style="font-size: 2.5rem; margin-top: 10px;">{title}</h1>
      <p style="color: #64748b; margin-bottom: 30px;">Por Francisco Gomes • Leitura: 8 min</p>
      
      <img src="{img}" alt="{title}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin-bottom: 40px;">
      
      <div style="font-size: 1.1rem; line-height: 1.8; color: #334155;">
        <p>A educação financeira é o principal pilar para garantir um futuro tranquilo e independente. Entender a fundo temas como {title} pode ser a diferença entre estar estagnado ou crescer o seu patrimônio ao longo do tempo.</p>
        
        <h2>Os Pilares Essenciais</h2>
        <p>No Brasil, onde as taxas e a inflação variam constantemente, é vital saber exatamente como alocar os recursos. O planejamento exige constância, disciplina e uma boa base matemática, por isso indicamos sempre utilizar nossa <a href="ferramentas.html">aba de ferramentas financeiras</a> para não fazer cálculos no escuro.</p>

        <h3>Por que isso é tão importante?</h3>
        <ul>
            <li>Traz previsibilidade para os seus gastos e ganhos.</li>
            <li>Protege o seu patrimônio do desgaste da inflação.</li>
            <li>Possibilita aproveitar oportunidades de juros compostos.</li>
        </ul>
        
        <h2>Conclusão</h2>
        <p>Continue pesquisando, leia os relatórios do mercado e sempre desconfie de promessas de ganhos fáceis. Dinheiro não aceita desaforo!</p>
      </div>
      
      <hr style="margin: 40px 0; border:none; border-top: 1px solid #e2e8f0;">
      
      <div style="background: #f8fafc; padding: 24px; border-radius: 12px;">
        <h3 style="margin-top:0;">Perguntas Frequentes (FAQ)</h3>
        <p><strong>Isso é aplicável a qualquer realidade?</strong> Sim. O controle e os bons investimentos servem desde quem ganha salário mínimo até empresários.</p>
        <p><strong>Onde faço essas contas?</strong> Acesse <a href="ferramentas.html">nossa aba de ferramentas</a> gratuitamente.</p>
      </div>
    </article>
  </main>
</body>
</html>
"""

# Generate HTML files
for art in new_articles:
    filename = f"{art['id']}.html"
    content = article_template.replace("{title}", art['title']).replace("{cat}", art['cat']).replace("{img}", art['img'])
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

# Inject into blog.html
def inject_to_blog(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()
    
    cards = []
    for art in new_articles:
        card = f'''<article class="article-card">
          <div class="card-img-wrap">
            <span class="article-category article-cat--{art['color']}">{art['cat']}</span>
            <img src="{art['img']}" alt="{art['title']}" class="card-img" loading="lazy">
          </div>
          <div class="article-content">
            <h2 class="article-title"><a href="{art['id']}.html">{art['title']}</a></h2>
            <p class="article-excerpt">Descubra tudo o que você precisa saber sobre {art['title']} e alavanque a sua educação financeira com o Dinheiro Nu.</p>
            <div style="margin-top: 16px; border-top: 1px solid #e2e8f0; padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
              <div class="article-card-meta">
                <span class="article-read-time">8 min de leitura</span>
              </div>
              <a href="{art['id']}.html" style="color: var(--primary); font-weight: 600; text-decoration: none; font-size: 0.9rem; display: flex; align-items: center; gap: 4px;">Ler artigo <span style="font-size: 1.1em;">&rarr;</span></a>
            </div>
          </div>
        </article>'''
        cards.append(card)
    
    cards_html = "\n".join(cards)
    
    # We will just inject these cards right inside <div class="recent-grid"> (or blog grid)
    # in blog.html, the grid is <div class="recent-grid" style="margin-top: 40px;">
    import re
    if 'recent-grid' in html:
        new_html = re.sub(r'(<div class="recent-grid"[^>]*>)', r'\1\n' + cards_html, html)
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_html)

inject_to_blog('blog.html')
# We can also inject some into index.html if we want, but injecting all 17 into blog.html makes it massive, which is what we want for SEO (a big index or pagination).

print("17 articles generated and injected!")
