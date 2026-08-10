import os
import glob
import re

directories = ['.', 'artigos', 'ferramentas']
files = []
for d in directories:
    if os.path.exists(d):
        files.extend(glob.glob(os.path.join(d, '*.html')))

count = 0
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'name="description"' not in content:
        # Extract title
        title_match = re.search(r'<title>(.*?)</title>', content, re.I)
        if title_match:
            title_text = title_match.group(1).replace(' | Fazendo Dinheiro', '').replace(' | Guia Completo [2026] - Fazendo Dinheiro', '').strip()
            
            description = f"Tudo sobre {title_text}. Aprenda como organizar suas finanças, investir melhor e conquistar sua liberdade financeira de forma simples, no portal Fazendo Dinheiro."
            
            meta_tag = f'\n  <meta name="description" content="{description}" />'
            
            # Inject after viewport or charset
            if '<meta name="viewport"' in content:
                content = content.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0" />', 
                                          f'<meta name="viewport" content="width=device-width, initial-scale=1.0" />{meta_tag}')
            elif '<title>' in content:
                content = content.replace('<title>', f'{meta_tag.strip()}\n  <title>')
                
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
            print(f"Injected description into {file}")

print(f"Total files updated: {count}")
