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
            .map(imagem => `<img src="${imagem}" alt="Imagem do episódio" loading="lazy" onclick="abrirModalImagem('${imagem}')">`)
            .join('');

        return `
            <article class="episodio">
                <h2>${episodio.titulo}</h2>
                <div class="data">${dataFormatada}</div>
                <div class="resumo">${episodio.resumo}</div>
                <div class="galeria-container">
                    <button class="galeria-toggle" onclick="toggleGaleria(this)">
                        <span class="toggle-texto">Mostrar imagens</span>
                        <span class="toggle-icone">▼</span>
                    </button>
                    <div class="galeria">${galeriaHTML}</div>
                </div>
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
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
    container.style.gap = '20px';
    container.style.padding = '20px';
    container.style.maxWidth = '1200px';
    container.style.margin = '0 auto';
    
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
document.querySelectorAll('.fechar-modal').forEach(botao => {
    botao.addEventListener('click', () => {
        document.getElementById('personagemModal').style.display = 'none';
        document.getElementById('imagemModal').style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    const modais = [document.getElementById('personagemModal'), document.getElementById('imagemModal')];
    modais.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Função para abrir o modal de imagem
function abrirModalImagem(imagemSrc) {
    const modal = document.getElementById('imagemModal');
    const modalImagem = document.getElementById('imagemModalConteudo');
    modalImagem.src = imagemSrc;
    modal.style.display = 'block';
}

// Função para alternar a visibilidade da galeria
function toggleGaleria(botao) {
    const galeria = botao.nextElementSibling;
    const toggleTexto = botao.querySelector('.toggle-texto');
    const toggleIcone = botao.querySelector('.toggle-icone');
    
    if (galeria.classList.contains('expandida')) {
        galeria.classList.remove('expandida');
        toggleTexto.textContent = 'Mostrar imagens';
        toggleIcone.textContent = '▼';
    } else {
        galeria.classList.add('expandida');
        toggleTexto.textContent = 'Ocultar imagens';
        toggleIcone.textContent = '▲';
    }
}

// Função para limpar o conteúdo de todas as seções
function limparConteudoSecoes() {
    document.getElementById('episodios').innerHTML = '';
    document.getElementById('elenco').innerHTML = '';
    document.getElementById('contexto').innerHTML = '';
}

// Navegação entre seções
document.querySelectorAll('.nav-btn').forEach(botao => {
    botao.addEventListener('click', (evento) => {
        // Prevenir comportamento padrão de rolagem
        evento.preventDefault();
        
        // Atualizar botões
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('ativo'));
        botao.classList.add('ativo');

        // Limpar conteúdo de todas as seções
        limparConteudoSecoes();

        // Atualizar seções
        document.querySelectorAll('.secao-conteudo').forEach(secao => {
            secao.classList.remove('ativo');
            secao.style.display = 'none';
        });

        const secaoId = botao.dataset.secao;
        const secaoAtual = document.getElementById(secaoId);
        secaoAtual.classList.add('ativo');
        secaoAtual.style.display = 'block';

        // Manter a posição atual da página
        const posicaoAtual = window.scrollY;
        
        // Carregar conteúdo específico da seção
        switch(secaoId) {
            case 'episodios':
                carregarEpisodios();
                break;
            case 'elenco':
                carregarPersonagens();
                break;
            case 'contexto':
                carregarContexto();
                break;
        }
        
        // Restaurar a posição da página após o carregamento do conteúdo
        setTimeout(() => {
            window.scrollTo(0, posicaoAtual);
        }, 10);
    });
});

// Função para carregar o contexto da novela do arquivo JSON
async function carregarContexto() {
    try {
        const response = await fetch('novela.json');
        const data = await response.json();
        exibirContexto(data.contexto_novela[0]);
    } catch (erro) {
        console.error('Erro ao carregar o contexto:', erro);
        document.getElementById('contexto').innerHTML = '<p class="erro">Erro ao carregar o contexto da novela.</p>';
    }
}

// Função para exibir o contexto na página
function exibirContexto(contexto) {
    const container = document.getElementById('contexto');
    const contextosHTML = Object.entries(contexto)
        .filter(([chave]) => chave.startsWith('contexto'))
        .map(([_, texto]) => `<p class="contexto-paragrafo">${texto}</p>`)
        .join('');

    container.innerHTML = `
        <div class="contexto-card">
            ${contextosHTML}
        </div>
    `;
}

// Carregar conteúdo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Limpar conteúdo de todas as seções
    limparConteudoSecoes();

    // Ocultar todas as seções
    document.querySelectorAll('.secao-conteudo').forEach(secao => {
        secao.classList.remove('ativo');
        secao.style.display = 'none';
    });

    // Identificar qual seção está ativa inicialmente
    const secaoAtiva = document.querySelector('.nav-btn.ativo');
    const secaoId = secaoAtiva ? secaoAtiva.dataset.secao : 'episodios';

    // Ativar e exibir a seção inicial
    const secaoInicial = document.getElementById(secaoId);
    secaoInicial.classList.add('ativo');
    secaoInicial.style.display = 'block';

    // Salvar a posição atual da página
    const posicaoInicial = window.scrollY;
    
    // Carregar apenas o conteúdo da seção ativa
    switch(secaoId) {
        case 'episodios':
            carregarEpisodios();
            break;
        case 'elenco':
            carregarPersonagens();
            break;
        case 'contexto':
            carregarContexto();
            break;
    }
    
    // Restaurar a posição da página após o carregamento do conteúdo
    setTimeout(() => {
        window.scrollTo(0, posicaoInicial);
    }, 10);
});

// Adicione no início do arquivo
document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrossel();
});

function inicializarCarrossel() {
    const carouselInner = document.querySelector('.carousel-inner');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    let currentIndex = 0;
    
    // Array com os caminhos das imagens
    const imagens = [
        'assets/banner.svg',
        'assets/banner01.jpeg',
        'assets/banner02.jpeg'
        // Adicione mais imagens conforme necessário
    ];
    
    // Criar elementos de imagem
    imagens.forEach(src => {
        const div = document.createElement('div');
        div.className = 'carousel-item';
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Imagem do carrossel';
        div.appendChild(img);
        carouselInner.appendChild(div);
    });
    
    // Configurar controles
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imagens.length) % imagens.length;
        atualizarCarrossel();
    });
    
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imagens.length;
        atualizarCarrossel();
    });
    
    // Função para atualizar a posição do carrossel
    function atualizarCarrossel() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    // Rotação automática
    setInterval(() => {
        currentIndex = (currentIndex + 1) % imagens.length;
        atualizarCarrossel();
    }, 5000); // Troca a cada 5 segundos
}