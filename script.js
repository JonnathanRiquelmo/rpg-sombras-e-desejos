// Função para carregar os episódios do arquivo JSON
async function carregarEpisodios() {
    try {
        const response = await fetch('episodios.json');
        const data = await response.json();
        exibirEpisodios(data.episodios);
    } catch (erro) {
        console.error('Erro ao carregar os episódios:', erro);
        document.getElementById('episodios').innerHTML = '<p class="erro">Erro ao carregar os episódios.</p>';
    }
}

// Função para exibir os episódios na página
function exibirEpisodios(episodios) {
    const container = document.getElementById('episodios');
    
    // Ordenar episódios por data (mais recente primeiro)
    episodios.sort((a, b) => new Date(b.data) - new Date(a.data));

    const episodiosHTML = episodios.map(episodio => {
        // Formatar a data para o padrão brasileiro
        const data = new Date(episodio.data);
        const dataFormatada = data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Criar galeria de imagens
        const galeriaHTML = episodio.imagens
            .map(imagem => `<img src="${imagem}" alt="Imagem do episódio" loading="lazy">`)
            .join('');

        return `
            <article class="episodio">
                <h2>${episodio.titulo}</h2>
                <div class="data">${dataFormatada}</div>
                <div class="resumo">${episodio.resumo}</div>
                <div class="galeria">${galeriaHTML}</div>
            </article>
        `;
    }).join('');

    container.innerHTML = episodiosHTML;
}

// Carregar episódios quando a página carregar
document.addEventListener('DOMContentLoaded', carregarEpisodios);