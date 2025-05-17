// Função para carregar os episódios do arquivo JSON
async function carregarEpisodios() {
    try {
        const response = await fetch('episodios.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        exibirEpisodios(data.episodios);
    } catch (erro) {
        console.error('Erro ao carregar os episódios:', erro);
        document.getElementById('episodios').innerHTML = '<p class="alert alert-danger">Erro ao carregar os episódios.</p>';
    }
}

// Função para exibir os episódios na página usando Bootstrap
function exibirEpisodios(episodios) {
    const container = document.getElementById('episodios');
    container.innerHTML = ''; // Limpa o spinner/mensagem de erro

    // Ordenar episódios por data (mais recente primeiro)
    episodios.sort((a, b) => new Date(b.data) - new Date(a.data));

    const episodiosHTML = episodios.map((episodio, index) => {
        const data = new Date(episodio.data);
        const dataFormatada = data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC' // Adicionado para evitar problemas de fuso horário
        });

        // Criar galeria de imagens com Bootstrap Collapse e Grid
        const galeriaId = `galeria-${index}`;
        const galeriaHTML = episodio.imagens && episodio.imagens.length > 0
            ? `
                <div class="mt-3">
                    <button class="btn btn-outline-danger btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#${galeriaId}" aria-expanded="false" aria-controls="${galeriaId}">
                        Mostrar/Ocultar Imagens (${episodio.imagens.length})
                    </button>
                    <div class="collapse mt-2" id="${galeriaId}">
                        <div class="row g-2">
                            ${episodio.imagens.map(imagem => `
                                <div class="col-6 col-md-4 col-lg-3">
                                    <img src="${imagem}" alt="Imagem do episódio ${episodio.titulo}" loading="lazy" class="img-fluid rounded galeria-img" onclick="abrirModalImagem('${imagem}')">
                                </div>`).join('')}
                        </div>
                    </div>
                </div>`
            : '<p class="text-muted mt-2"><em>Nenhuma imagem para este episódio.</em></p>'; // Mensagem se não houver imagens

        // Adiciona o v�deo se existir
        let videoHTML = '';
        if (episodio.video) {
            if (episodio.video.includes('youtube') || episodio.video.includes('vimeo')) {
                videoHTML = `
                    <div class="episodio-video mt-3">
                        <div class="ratio ratio-16x9">
                            <iframe src="${episodio.video}" title="V�deo do epis�dio" allowfullscreen></iframe>
                        </div>
                    </div>
                `;
            } else {
                videoHTML = `
                    <div class="episodio-video mt-3">
                        <video controls class="w-100" style="max-height:400px;">
                            <source src="${episodio.video}">
                            Seu navegador n�o suporta v�deo.
                        </video>
                    </div>
                `;
            }
        }
        return `
            <div class="card mb-4 episodio-card">
                <div class="card-body">
                    <h2 class="card-title h4 episodio-titulo">${episodio.titulo}</h2>
                    <div class="card-subtitle mb-2 text-muted episodio-data">${dataFormatada}</div>
                    <p class="card-text">${episodio.resumo}</p>
                    ${videoHTML}
                    ${galeriaHTML}
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = episodiosHTML || '<p>Nenhum episódio encontrado.</p>'; // Mensagem se não houver episódios
}

// Função para carregar os personagens do arquivo JSON
async function carregarPersonagens() {
    try {
        const response = await fetch('personagens.json');
         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        exibirPersonagens(data.personagens);
    } catch (erro) {
        console.error('Erro ao carregar os personagens:', erro);
        document.getElementById('elenco').innerHTML = '<p class="alert alert-danger">Erro ao carregar os personagens.</p>';
    }
}

// Função para exibir os personagens na página usando Bootstrap Cards e Grid
function exibirPersonagens(personagens) {
    const container = document.getElementById('elenco');
    container.innerHTML = ''; // Limpa o spinner/mensagem de erro

    // Usar row e col do Bootstrap para o grid
    const personagensHTML = personagens.map(personagem => {
        const tipoIcone = personagem.tipo === 'jogador' ? '👤' : '🎭';
        const tipoTitle = personagem.tipo === 'jogador' ? 'Jogador' : 'NPC';

        // Usar data attributes do Bootstrap para abrir o modal
        return `
            <div class="col">
                <div class="card h-100 card-personagem"
                     data-bs-toggle="modal"
                     data-bs-target="#personagemModal"
                     data-personagem='${JSON.stringify(personagem)}'>
                    <img src="${personagem.imagem}" alt="${personagem.nome}" class="card-img-top" style="height: 300px; object-fit: cover;" loading="lazy">
                    <div class="personagem-tipo-icone" title="${tipoTitle}">${tipoIcone}</div>
                    <div class="card-body">
                        <h3 class="card-title h5" style="color: var(--cor-primaria);">${personagem.nome}</h3>
                        <p class="card-text text-muted"><em>${personagem.papel}</em></p>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Adiciona a estrutura de grid do Bootstrap
    container.innerHTML = `<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">${personagensHTML}</div>`;
}

// Função para configurar o conteúdo do modal de personagem ANTES de ele ser exibido
const personagemModal = document.getElementById('personagemModal');
const modalConteudo = document.getElementById('modalConteudo');
const modalTitle = document.getElementById('personagemModalLabel');

personagemModal.addEventListener('show.bs.modal', function (event) {
    // Botão que acionou o modal
    const card = event.relatedTarget;
    // Extrair informações dos atributos data-*
    const personagem = JSON.parse(card.getAttribute('data-personagem'));

    // Atualizar o conteúdo do modal
    modalTitle.textContent = personagem.nome;
    modalConteudo.innerHTML = `
        <div class="row g-3">
            <div class="col-md-4">
                <img src="${personagem.imagem}" alt="${personagem.nome}" class="img-fluid rounded">
            </div>
            <div class="col-md-8">
                <p><strong>Papel:</strong> ${personagem.papel}</p>
                <p>${personagem.descricaoCompleta || '<em>Descrição não disponível.</em>'}</p>
            </div>
        </div>
    `;
});


// Função para abrir o modal de imagem (usando o modal Bootstrap existente)
function abrirModalImagem(imagemSrc) {
    const modalImagem = document.getElementById('imagemModalConteudo');
    modalImagem.src = imagemSrc;
    const imgModal = new bootstrap.Modal(document.getElementById('imagemModal'));
    imgModal.show();
}

// Remover a função toggleGaleria, pois o Bootstrap Collapse cuida disso

// Função para carregar o contexto da novela do arquivo JSON
async function carregarContexto() {
    try {
        const response = await fetch('novela.json');
         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        // Assumindo que contexto_novela é um array e queremos o primeiro item
        if (data.contexto_novela && data.contexto_novela.length > 0) {
             exibirContexto(data.contexto_novela[0]);
        } else {
             throw new Error("Formato inesperado no arquivo novela.json");
        }
    } catch (erro) {
        console.error('Erro ao carregar o contexto:', erro);
        document.getElementById('contexto').innerHTML = '<p class="alert alert-danger">Erro ao carregar o contexto da novela.</p>';
    }
}

// Função para exibir o contexto na página usando Bootstrap Card
function exibirContexto(contexto) {
    const container = document.getElementById('contexto');
    container.innerHTML = ''; // Limpa o spinner/mensagem de erro

    // Filtra chaves que começam com 'contexto' e junta os parágrafos
    const contextosHTML = Object.entries(contexto)
        .filter(([chave]) => chave.startsWith('contexto'))
        .map(([_, texto]) => `<p class="card-text">${texto}</p>`)
        .join('');

    container.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title h4" style="color: var(--cor-primaria);">Contexto da Novela</h2>
                ${contextosHTML || '<p><em>Contexto não disponível.</em></p>'}
            </div>
        </div>
    `;
}

// Inicialização e Navegação entre seções usando Bootstrap Tabs/Pills
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o carrossel do banner
    inicializarCarrosselBanner();

    const triggerTabList = [].slice.call(document.querySelectorAll('#pills-tab button'));
    let initialTabTrigger = document.querySelector('#pills-tab button.active'); // Pega a aba ativa inicial do HTML

    // Função para carregar conteúdo da aba
    function carregarConteudoAba(tabId) {
        switch(tabId) {
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
    }

    // Carrega o conteúdo da aba inicial
    if (initialTabTrigger) {
        const initialTabId = initialTabTrigger.getAttribute('data-bs-target').substring(1); // Remove o '#'
        carregarConteudoAba(initialTabId);
    } else {
        // Se nenhuma aba estiver ativa por padrão, carrega a primeira (ou a que você preferir)
        const firstTab = document.querySelector('#pills-tab button');
        if (firstTab) {
            firstTab.classList.add('active'); // Ativa a primeira aba visualmente
            const firstTabId = firstTab.getAttribute('data-bs-target').substring(1);
            document.getElementById(firstTabId).classList.add('show', 'active'); // Mostra o conteúdo da primeira aba
            carregarConteudoAba(firstTabId);
        }
    }


    // Adiciona listeners para carregar conteúdo quando uma aba é mostrada
    triggerTabList.forEach(function (triggerEl) {
        const tabTrigger = new bootstrap.Tab(triggerEl);

        triggerEl.addEventListener('shown.bs.tab', function (event) {
            // event.target // newly activated tab
            // event.relatedTarget // previous active tab
            const currentTabId = event.target.getAttribute('data-bs-target').substring(1);
            carregarConteudoAba(currentTabId);
        });
    });
});

// Função para inicializar o carrossel do Banner com Bootstrap
function inicializarCarrosselBanner() {
    const carouselInner = document.querySelector('#bannerCarousel .carousel-inner');
    carouselInner.innerHTML = ''; // Limpa qualquer conteúdo estático

    const imagens = [
        'assets/banner.svg',
        'assets/banner01.jpeg',
        'assets/banner02.jpeg'
        // Adicione mais imagens conforme necessário
    ];

    imagens.forEach((src, index) => {
        const div = document.createElement('div');
        // Adiciona 'active' ao primeiro item
        div.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        const img = document.createElement('img');
        img.src = src;
        img.className = 'd-block w-100';
        img.style.objectFit = 'cover';
        img.style.maxHeight = '400px'; // Garante que a imagem não ultrapasse a altura do carrossel
        img.alt = `Banner ${index + 1}`;
        div.appendChild(img);
        carouselInner.appendChild(div);
    });

    // O Bootstrap JS cuida do resto (controles, rotação automática se data-bs-ride="carousel")
}

// Remover a função inicializarCarrossel antiga, pois foi substituída por inicializarCarrosselBanner
// Remover a função limparConteudoSecoes, pois o carregamento por aba já faz isso
// Remover os event listeners de clique nos botões de navegação antigos
// Remover os event listeners de clique para fechar modal (Bootstrap cuida disso)