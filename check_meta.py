import os
import glob
import re

directories = ['.', 'artigos', 'ferramentas']
files = []
for d in directories:
    if os.path.exists(d):
        files.extend(glob.glob(os.path.join(d, '*.html')))

missing_title = []
missing_desc = []
missing_charset = []
missing_viewport = []

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if '<title>' not in content and '<title ' not in content:
        missing_title.append(file)
    if 'name="description"' not in content:
        missing_desc.append(file)
    if 'charset=' not in content:
        missing_charset.append(file)
    if 'name="viewport"' not in content:
        missing_viewport.append(file)

print(f"Total files: {len(files)}")
print(f"Missing Title: {len(missing_title)}")
print(f"Missing Desc: {len(missing_desc)}")
print(f"Missing Charset: {len(missing_charset)}")
print(f"Missing Viewport: {len(missing_viewport)}")
