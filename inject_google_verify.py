import os
import glob

directories = ['.', 'artigos', 'ferramentas']
files = []
for d in directories:
    if os.path.exists(d):
        files.extend(glob.glob(os.path.join(d, '*.html')))

verify_tag = '<meta name="google-site-verification" content="qH9gltE4Lk1p5ONSBCSMwkXGR9eqixIDruwOJLPqlZQ" />\n'
count = 0

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'google-site-verification' not in content:
        # Inject right before </head>
        content = content.replace('</head>', f'  {verify_tag}</head>')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
        print(f"Injected into {file}")

print(f"Google verification tag injected in {count} files.")
