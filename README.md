# Sombras e Desejos - Pasión de las Pasiones RPG

Este é um site estático que documenta nossa campanha de RPG Pasión de las Pasiones, um jogo de drama e novela. O site exibe os episódios, o contexto da novela e os personagens de nossa campanha em um formato elegante e responsivo.

## Estrutura do Projeto

- <mcfile name="index.html" path="c:\Users\jonna\Documents\sombras-e-desejos\index.html"></mcfile> - Página principal do site
- <mcfile name="style.css" path="c:\Users\jonna\Documents\sombras-e-desejos\style.css"></mcfile> - Estilos e layout da página
- <mcfile name="script.js" path="c:\Users\jonna\Documents\sombras-e-desejos\script.js"></mcfile> - Lógica para carregar e exibir o conteúdo
- <mcfile name="episodios.json" path="c:\Users\jonna\Documents\sombras-e-desejos\episodios.json"></mcfile> - Dados dos episódios da campanha
- <mcfile name="novela.json" path="c:\Users\jonna\Documents\sombras-e-desejos\novela.json"></mcfile> - Contexto e história da novela
- <mcfile name="personagens.json" path="c:\Users\jonna\Documents\sombras-e-desejos\personagens.json"></mcfile> - Dados dos personagens
- <mcfolder name="assets" path="c:\Users\jonna\Documents\sombras-e-desejos\assets"></mcfolder>/ - Pasta para armazenar imagens e vídeos

## Como Adicionar Conteúdo

Para adicionar ou atualizar o conteúdo do site, edite os arquivos JSON correspondentes:

### Episódios (<mcfile name="episodios.json" path="c:\Users\jonna\Documents\sombras-e-desejos\episodios.json"></mcfile>)

Edite o arquivo <mcfile name="episodios.json" path="c:\Users\jonna\Documents\sombras-e-desejos\episodios.json"></mcfile> seguindo a estrutura para cada episódio:

```json
{
  "titulo": "Tí­tulo do Episódio",
  "data": "AAAA-MM-DD",
  "resumo": "Resumo do episódio...",
  "imagens": [
    "assets/imagem1.jpg",
    "assets/imagem2.jpg"
  ],
  "video": "assets/video.mp4" // Opcional: adicione esta linha para incluir um vídeo
}
```

## Hospedagem

Este site está configurado para ser hospedado via GitHub Pages. Para atualizar o conteúdo, basta fazer commit das alterações no repositório.

## Créditos

Feito com ❤️ para Daniela, nossa mestra no RPG Pasión de las Pasiones.