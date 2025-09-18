# LarComDeus

Vitrine mobile-first de itens para casa. Cada card é clicável e abre o link do produto.

## Arquivos
- `index.html`: estrutura da página
- `styles.css`: estilos responsivos
- `products.json`: dados dos produtos (imagem, preço, categoria, link)
- `script.js`: busca os dados e renderiza os cards

## Como rodar localmente (Windows PowerShell)
O `products.json` é carregado via `fetch`, então é preciso um servidor local.

```powershell
cd C:\LarComDeus
python -m http.server 8080
```
Acesse: `http://localhost:8080`

Alternativa com Node.js:
```powershell
npx serve . -l 8080 --single
```

## Personalização
- Edite `products.json` para alterar produtos, imagens e links.
- Ajuste cores e layout em `styles.css`.
