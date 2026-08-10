with open('css/style.css', 'r', encoding='utf-8') as f:
    content = f.read()

ticker_bad = """#market-ticker {
  position: fixed;
  top: 0; left: 0; right: 0;
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
}"""
ticker_good = """#market-ticker {
  position: fixed;
  top: 0; left: 0; right: 0;
  background: #0f172a;
  color: #fff;
  height: 30px;
  display: flex;
  align-items: center;
  overflow: hidden;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  z-index: 1001;
}"""
content = content.replace(ticker_bad, ticker_good)

placeholder_bad = ".card-img-placeholder  { opacity: 0.6; }"
placeholder_good = ".card-img-placeholder  { opacity: 0.6; height: 200px; width: 100%; display: block; border-top-left-radius: inherit; border-top-right-radius: inherit; }"
content = content.replace(placeholder_bad, placeholder_good)

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("CSS Fixed 2")
