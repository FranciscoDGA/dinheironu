with open('blog.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the 5 specific broken titles
replacements = {
    '<a href="artigos/cobrancas-indevidas.html" style="color:inherit; text-decoration:none;">${data.title}</a>': '<a href="artigos/cobrancas-indevidas.html" style="color:inherit; text-decoration:none;">Cobranças Indevidas: Como Recorrer e Ser Indenizado</a>',
    '<a href="artigos/inflacao-2026.html" style="color:inherit; text-decoration:none;">${data.title}</a>': '<a href="artigos/inflacao-2026.html" style="color:inherit; text-decoration:none;">Inflação em 2026: Projeções e Como Proteger seu Bolso</a>',
    '<a href="artigos/investimentos-esg.html" style="color:inherit; text-decoration:none;">${data.title}</a>': '<a href="artigos/investimentos-esg.html" style="color:inherit; text-decoration:none;">Investimentos ESG: O que são e por que estão bombando</a>',
    '<a href="artigos/juros-cartao-2026.html" style="color:inherit; text-decoration:none;">${data.title}</a>': '<a href="artigos/juros-cartao-2026.html" style="color:inherit; text-decoration:none;">Juros do Cartão de Crédito em 2026: O Que Mudou e Como Evitar Armadilhas</a>',
    '<a href="artigos/novo-desenrola-2026.html" style="color:inherit; text-decoration:none;">${data.title}</a>': '<a href="artigos/novo-desenrola-2026.html" style="color:inherit; text-decoration:none;">Novo Desenrola 2026: Tudo o Que Você Precisa Saber Para Limpar o Nome</a>'
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open('blog.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("blog.html fully fixed.")
