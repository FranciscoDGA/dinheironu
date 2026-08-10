import os
import glob
import re

directories = ['.', 'artigos', 'ferramentas', 'js', 'css']

# The logo HTML replacement:
old_logo = '<span class="logo-text">Dinheiro<span class="logo-accent">Nu</span></span>'
new_logo = '<span class="logo-text">Fazendo<span class="logo-accent">Dinheiro</span></span>'

count = 0

for d in directories:
    if not os.path.exists(d): continue
    
    # Process HTML, JS, CSS, TXT
    files = []
    for ext in ['*.html', '*.js', '*.css', '*.txt']:
        files.extend(glob.glob(os.path.join(d, ext)))
        
    for file in files:
        # Ignore our python scripts or the vercel configs if they pop up
        if file.endswith('.py') or 'node_modules' in file:
            continue
            
        try:
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            original_content = content
            
            # 1. Replace logo HTML explicitly to keep the span tags intact
            content = content.replace(old_logo, new_logo)
            # Just in case there's whitespace variations:
            content = re.sub(r'<span class="logo-text">\s*Dinheiro\s*<span class="logo-accent">\s*Nu\s*</span>\s*</span>', new_logo, content, flags=re.I)
            
            # 2. General brand replacements
            # Do Dinheiro Nu -> Fazendo Dinheiro
            content = content.replace('Dinheiro Nu', 'Fazendo Dinheiro')
            # Do dinheironu -> fazendodinheiro (for URLs, domains, emails)
            content = content.replace('dinheironu', 'fazendodinheiro')
            # Do DinheiroNu -> FazendoDinheiro
            content = content.replace('DinheiroNu', 'FazendoDinheiro')
            
            # Write if modified
            if content != original_content:
                with open(file, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1
                
        except Exception as e:
            print(f"Error processing {file}: {e}")

print(f"Substituição de marca aplicada em {count} arquivos.")
