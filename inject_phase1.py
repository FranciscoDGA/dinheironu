import os
import glob
import re

directories = ['.', 'artigos', 'ferramentas']
files = []
for d in directories:
    if os.path.exists(d):
        files.extend(glob.glob(os.path.join(d, '*.html')))

# 1. Update CSS
css_file = 'css/style.css'
css_content = """
/* Market Ticker */
#market-ticker {
  background: #0f172a;
  color: #fff;
  height: 30px;
  display: flex;
  align-items: center;
  overflow: hidden;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  position: relative;
  z-index: 1001;
}
.ticker-move {
  display: flex;
  animation: ticker 25s linear infinite;
}
.ticker-move:hover {
  animation-play-state: paused;
}
.ticker-item {
  margin-right: 40px;
}
.text-green { color: #22c55e; }
.text-red { color: #ef4444; }
@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
"""
with open(css_file, 'a', encoding='utf-8') as f:
    f.write(css_content)

# 2. Inject HTML
count = 0
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    is_root = file.count(os.sep) == 0
    prefix = '' if is_root else '../'
    
    # Check if already injected
    if 'id="market-ticker"' in content:
        continue
        
    # Inject manifest
    manifest_link = f'  <link rel="manifest" href="{prefix}manifest.json" />\n'
    content = content.replace('</head>', f'{manifest_link}</head>')
    
    # Inject ticker HTML right after <body>
    ticker_html = '<div id="market-ticker"></div>\n'
    content = re.sub(r'(<body[^>]*>)', r'\1\n' + ticker_html, content, 1, re.I)
    
    # Inject JS scripts right before </body>
    sw_script = f"""
  <script src="{prefix}js/ticker.js"></script>
  <script>
    if ('serviceWorker' in navigator) {{
      window.addEventListener('load', () => {{
        navigator.serviceWorker.register('{prefix}sw.js');
      }});
    }}
  </script>
"""
    content = content.replace('</body>', f'{sw_script}</body>')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    count += 1

print(f"Phase 1 injected in {count} files.")
