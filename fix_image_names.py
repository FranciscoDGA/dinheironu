import os
import glob

replacements = {
    "images/generic_budget.jpg": "images/generic_budget_1786097090086.jpg",
    "images/generic_growth.jpg": "images/generic_growth_1786097107466.jpg",
    "images/generic_investments.jpg": "images/generic_investments_1786097081421.jpg",
    "images/generic_planning.jpg": "images/generic_planning_1786097116238.jpg",
    "images/generic_savings.jpg": "images/generic_savings_1786097098999.jpg",
    "images/generic_stocks.jpg": "images/generic_stocks_1786097125940.jpg"
}

# The 17 root articles
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
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        modified = False
        for old, new in replacements.items():
            if old in content:
                content = content.replace(old, new)
                modified = True
                
        if modified:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed images in {file}")

print("Done fixing article files!")
