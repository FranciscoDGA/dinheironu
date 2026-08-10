import re

with open('blog.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all blocks that contain a link to an article and ${data.title}
# Actually, let's just find the hrefs before the ${data.title}
pattern = r'<a href="([^"]+)"[^>]*>\$\{data\.title\}</a>'
matches = re.findall(pattern, content)

for href in matches:
    # Read the target file to get the title
    try:
        with open(href, 'r', encoding='utf-8') as article_file:
            article_content = article_file.read()
            title_match = re.search(r'<title>(.*?)</title>', article_content, re.I)
            if title_match:
                title_text = title_match.group(1).split('|')[0].strip()
                # Replace ${data.title} near this href
                # Also replace the alt attribute corresponding to it
                # We can just do a global replace of ${data.title} if we iterate card by card.
                # Better: replace the specific occurrence.
                
                # To be safe, we can just find the nearest alt="${data.title}" and the innerHTML
                # Let's replace alt="${data.title}" with alt="{title_text}"
                pass
    except Exception as e:
        print(f"Error reading {href}: {e}")

# Alternative approach: Iterate over all ${data.title} by finding the card block
# A simple way is to use a regex that captures the href and the ${data.title}
def replacer(match):
    href = match.group(1)
    try:
        with open(href, 'r', encoding='utf-8') as f:
            t = f.read()
            tm = re.search(r'<title>(.*?)</title>', t, re.I)
            if tm:
                return tm.group(1).split('|')[0].replace(' - Fazendo Dinheiro', '').strip()
    except:
        pass
    return "Leia o artigo completo"

# Fix <h3> links
content = re.sub(r'<a href="([^"]+)"([^>]*)>\$\{data\.title\}</a>', 
                 lambda m: f'<a href="{m.group(1)}"{m.group(2)}>{replacer(m)}</a>', 
                 content)

# Fix alt attributes. We need to match the href in the same card.
# The HTML structure is usually:
# <a href="artigos/xxx.html">
#   <img src="..." alt="${data.title}">
# </a>
# Let's just remove the ${data.title} from alt tags and set a generic alt if it's too complex,
# or we can extract all hrefs and titles in order.
titles_found = []
for href in re.findall(r'<a href="(artigos/[^"]+)"', content):
    try:
        with open(href, 'r', encoding='utf-8') as f:
            tm = re.search(r'<title>(.*?)</title>', f.read(), re.I)
            if tm:
                titles_found.append(tm.group(1).split('|')[0].replace(' - Fazendo Dinheiro', '').strip())
    except:
        pass

# Simple fix for alt="${data.title}"
content = content.replace('alt="${data.title}"', 'alt="Imagem do artigo"')

with open('blog.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("blog.html fixed")
