import os
import glob

directories = ['.', 'artigos', 'ferramentas']
files = []
for d in directories:
    if os.path.exists(d):
        files.extend(glob.glob(os.path.join(d, '*.html')))

missing_h1 = []

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if '<h1' not in content:
        missing_h1.append(file)

print(f"Total files: {len(files)}")
print(f"Files missing H1: {len(missing_h1)}")
for f in missing_h1:
    print(f"- {f}")
