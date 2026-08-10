import sys

with open("fix_blog_ui.js", "r", encoding="utf-8") as f:
    content = f.read()

# Replace all \` with `
content = content.replace("\\`", "`")

with open("fix_blog_ui.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed!")
