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

// Função para carregar os personagens do arquivo JSON
async function carregarPersonagens() {
    try {
        const response = await fetch('personagens.json');
        const data = await response.json();
        exibirPersonagens(data.personagens);
    } catch (erro) {
        console.error('Erro ao carregar os personagens:', erro);
        document.getElementById('elenco').innerHTML = '<p class="erro">Erro ao carregar os personagens.</p>';
    }
}

// Função para exibir os personagens na página
function exibirPersonagens(personagens) {
    const container = document.getElementById('elenco');
    
    const personagensHTML = personagens.map(personagem => {
        const tipoIcone = personagem.tipo === 'jogador' ? '👤' : '🎭';
        
        return `
            <div class="personagem-card" onclick="abrirModal(this)" data-personagem='${JSON.stringify(personagem)}'>
                <img src="${personagem.imagem}" alt="${personagem.nome}" class="personagem-imagem" loading="lazy">
                <div class="personagem-tipo" title="${personagem.tipo === 'jogador' ? 'Jogador' : 'NPC'}">${tipoIcone}</div>
                <div class="personagem-info">
                    <h3 class="personagem-nome">${personagem.nome}</h3>
                    <p class="personagem-papel">${personagem.papel}</p>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = personagensHTML;
}

// Função para abrir o modal com detalhes do personagem
function abrirModal(elemento) {
    const personagem = JSON.parse(elemento.dataset.personagem);
    const modal = document.getElementById('personagemModal');
    const modalConteudo = document.getElementById('modalConteudo');

    modalConteudo.innerHTML = `
        <div class="modal-personagem-info">
            <img src="${personagem.imagem}" alt="${personagem.nome}" class="modal-personagem-imagem">
            <div class="modal-personagem-texto">
                <h2>${personagem.nome}</h2>
                <p><strong>Papel:</strong> ${personagem.papel}</p>
                <p>${personagem.descricaoCompleta}</p>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Fechar modal quando clicar no X ou fora do modal
document.querySelector('.fechar-modal').addEventListener('click', () => {
    document.getElementById('personagemModal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('personagemModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Navegação entre seções
document.querySelectorAll('.nav-btn').forEach(botao => {
    botao.addEventListener('click', () => {
        // Atualizar botões
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('ativo'));
        botao.classList.add('ativo');

        // Atualizar seções
        document.querySelectorAll('.secao-conteudo').forEach(secao => secao.classList.remove('ativo'));
        const secaoId = botao.dataset.secao;
        document.getElementById(secaoId).classList.add('ativo');
    });
});

// Carregar conteúdo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    carregarEpisodios();
    carregarPersonagens();
});