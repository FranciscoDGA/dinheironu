with open('css/style.css', 'r', encoding='utf-8') as f:
    content = f.read()

bad_block = """.related-article-desc {
    font-size: 0.85rem;
    gap: 24px;
    margin-top: 40px;
}"""

good_block = """.related-article-desc {
    font-size: 0.85rem;
    color: #64748b;
    line-height: 1.4;
    margin-bottom: 16px;
}

.newsletter-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-family: inherit;
    margin-bottom: 12px;
    font-size: 0.9rem;
}

/* Recommended Tools */
.recommended-tools {
    background: #f8fafc;
    padding: 60px 0;
    margin-top: 60px;
    border-top: 1px solid #e2e8f0;
}

.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 40px;
}"""

content = content.replace(bad_block, good_block)

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("CSS Fixed")
