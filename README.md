# Sombras e Desejos - Pasión de las Pasiones RPG

Este é um site estático que documenta nossa campanha de RPG Pasión de las Pasiones, um jogo de drama e novela. O site exibe os episódios de nossa campanha em um formato elegante e responsivo.

## Estrutura do Projeto

- `index.html` - Página principal do site
- `style.css` - Estilos e layout da página
- `script.js` - Lógica para carregar e exibir os episódios
- `episodios.json` - Dados dos episódios da campanha
- `/assets/` - Pasta para armazenar as imagens dos episódios

## Como Adicionar Novos Episódios

Para adicionar novos episódios à campanha, edite o arquivo `episodios.json` seguindo a estrutura:

```json
{
  "episodios": [
    {
      "titulo": "Título do Episódio",
      "data": "AAAA-MM-DD",
      "resumo": "Resumo do episódio...",
      "imagens": [
        "assets/imagem1.jpg",
        "assets/imagem2.jpg"
      ]
    }
  ]
}
```

## Hospedagem

Este site está configurado para ser hospedado via GitHub Pages. Para atualizar o conteúdo, basta fazer commit das alterações no repositório.

## Créditos

Feito com amor para Daniela, nossa mestra no RPG Pasión de las Pasiones.