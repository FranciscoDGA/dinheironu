import os

articles = {
    'artigos/cobrancas-indevidas.html': ('capa_cobrancas_1786095702613.jpg', 'Cobranças indevidas'),
    'artigos/inflacao-2026.html': ('capa_inflacao_1786095693245.jpg', 'Inflação em 2026'),
    'artigos/investimentos-esg.html': ('capa_esg_1786095711387.jpg', 'Investimentos ESG'),
    'artigos/juros-cartao-2026.html': ('capa_cartao_1786095683400.jpg', 'Juros Cartão'),
    'artigos/novo-desenrola-2026.html': ('capa_desenrola_1786095674743.jpg', 'Novo Desenrola')
}

for path, (img, alt) in articles.items():
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = content.replace('${data.image}', img)
        content = content.replace('${data.altText}', alt)
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {path}")

