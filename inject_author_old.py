import os
import glob
import re

author_html = """
      <div class="author-block" style="margin-top: 0; padding-bottom: 0; border-bottom: none; margin-bottom: 24px;">
        <img src="../images/francisco.jpg" alt="Equipe Dinheiro Nu" class="author-avatar" style="border: 2px solid rgba(255,255,255,0.2);">
        <div class="author-info">
          <span class="author-name" style="color: white;">Equipe Dinheiro Nu</span>
          <span class="author-desc" style="color: rgba(255,255,255,0.7);">Especialistas em Educação Financeira</span>
          <span class="author-meta" style="color: rgba(255,255,255,0.5);">REPLACE_DATE &bull; REPLACE_READ_TIME</span>
        </div>
      </div>
"""

articles = glob.glob('artigos/*.html')

for file in articles:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # The old articles have:
    # <div class="article-meta">
    #   <span>✍️ Equipe Dinheiro Nu</span>
    #   <span>📅 14 Jul 2026</span>
    #   <span>⏱️ 5 min de leitura</span>
    # </div>
    
    match = re.search(r'<div class="article-meta">.*?<span>📅\s*(.*?)</span>.*?<span>⏱️\s*(.*?)</span>.*?</div>', content, re.I | re.DOTALL)
    
    if match:
        date = match.group(1).strip()
        read_time = match.group(2).strip()
        
        new_block = author_html.replace('REPLACE_DATE', date).replace('REPLACE_READ_TIME', read_time)
        
        content = content[:match.start()] + new_block + content[match.end():]
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Author block injected in {file}")
    else:
        print(f"No match in {file}")

print("Injeção nos antigos concluída.")
