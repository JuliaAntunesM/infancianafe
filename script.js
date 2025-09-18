// Mensagem de depuração
console.log('Script iniciado - versão: ' + new Date().toISOString());
console.log('Localização atual:', window.location.href);

// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    console.log('DOM totalmente carregado');

    const grid = document.getElementById('gridNew');
    const empty = document.getElementById('emptyState');
    const yearEl = document.getElementById('year');
    
    // Atualiza o ano no rodapé
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ====== Categorias de cômodos (filtro) ======
    const roomsEl = document.getElementById('roomsList');
    const rooms = [
        { id: 'all',          label: 'Todos os produtos',           img: './Logo.png' },
        { id: 'quarto-casal', label: 'Quarto do Casal', img: './CategoriasImagens/quartocasal.png' },
        { id: 'quarto-bebe',  label: 'Quarto do bebê',  img: './CategoriasImagens/quartobebe.png' },
        { id: 'jardim',       label: 'Jardim',          img: './CategoriasImagens/jardim.png' },
        { id: 'escritorio',   label: 'Escritório',      img: './CategoriasImagens/escritorio.png' },
        { id: 'sala',         label: 'Sala',            img: './CategoriasImagens/sala.png' },
        { id: 'cozinha',      label: 'Cozinha',         img: './CategoriasImagens/cozinha.png' },
        { id: 'banheiro',     label: 'Banheiro',        img: './CategoriasImagens/banheiro.png' },
        { id: 'lavanderia',   label: 'Lavanderia',      img: './CategoriasImagens/lavanderia.png' }
    ];

    let selectedRoom = '';

    function renderRooms() {
        if (!roomsEl) return;
        roomsEl.innerHTML = rooms.map(room => `
            <li class="room-item" role="presentation">
                <button class="room-btn" type="button" role="tab" aria-selected="${room.id === selectedRoom}" data-room="${room.id}">
                    <span class="room-icon" aria-hidden="true">
                        ${room.img ? `<img class=\"room-img\" src=\"${encodeURI(room.img)}\" alt=\"${room.label}\" onerror=\"this.style.display='none'\" />` : `<span class=\"room-all\">${room.label}</span>`}
                    </span>
                    <span class="room-label">${room.label}</span>
                </button>
            </li>
        `).join('');

        // Eventos de clique
        roomsEl.querySelectorAll('.room-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const roomId = btn.getAttribute('data-room');
                // 'Todos' limpa o filtro
                if (roomId === 'all') {
                    selectedRoom = '';
                } else {
                    // toggle: clicar novamente limpa o filtro
                    selectedRoom = (selectedRoom === roomId) ? '' : roomId;
                }
                updateRoomSelection();
                applyFilter();
            });
        });
    }

    function updateRoomSelection() {
        if (!roomsEl) return;
        roomsEl.querySelectorAll('.room-btn').forEach(btn => {
            const roomId = btn.getAttribute('data-room');
            const isSelected = (roomId === selectedRoom) || (roomId === 'all' && selectedRoom === '');
            btn.setAttribute('aria-selected', String(isSelected));
        });
    }

    function applyFilter() {
        if (!selectedRoom) {
            renderProducts(products);
            return;
        }
        const filtered = products.filter(p => p.room === selectedRoom);
        renderProducts(filtered);
        if (filtered.length === 0) {
            showEmptyState('Nenhum produto nesta categoria ainda.');
        }
    }

    // Dados dos produtos (usando exatamente os nomes dos arquivos e links fornecidos)
    const products = [
        // Quarto do Bebê
        {
            id: 'abajur-cavalinho-bebe',
            title: 'Abajur de Cavalinho para quarto de bebê',
            price: 0,
            category: 'Decoração',
            room: 'quarto-bebe',
            image: './fotodosprodutos/Abajur de Cavalinho para quarto de bebê.jpg',
            url: 'https://s.shopee.com.br/1LWThYyOCC'
        },
        {
            id: 'kit-arandelas-quarto',
            title: 'Kit 2 Arandelas Parede Reta Globo Jabuticaba Dourado Fosco',
            price: 0,
            category: 'Iluminação',
            room: 'quarto-casal',
            image: './fotodosprodutos/kit 2 Arandela Parede Reta Globo Jabuticaba Dourado Fosco Quartos.jpg',
            url: 'https://s.shopee.com.br/2ViR7hF08J'
        },
        {
            id: 'cabeceira-casal-ripado',
            title: 'Cabeceira Quarto Casal em Ripado',
            price: 0,
            category: 'Móveis',
            room: 'quarto-casal',
            image: './fotodosprodutos/Cabeceira Quarto Casal em Ripado.jpg',
            url: 'https://s.shopee.com.br/2qLHVed5qz'
        },
        {
            id: 'cabeceira-casal-linho',
            title: 'Cabeceira de Cama Box Casal Tecido Linho',
            price: 0,
            category: 'Móveis',
            room: 'quarto-casal',
            image: './fotodosprodutos/Cabeceira de Cama Box Casal Tecido Linho.jpg',
            url: 'https://s.shopee.com.br/1qSkKGve0f'
        },
        {
            id: 'comoda-amendoa',
            title: 'Cômoda Amêndoa',
            price: 0,
            category: 'Móveis',
            room: 'quarto-casal',
            image: './fotodosprodutos/Cômoda Amêndoa.jpg',
            url: 'https://s.shopee.com.br/1Vptv3d0PQ'
        },
        {
            id: 'mesa-cabeceira-retro',
            title: 'Mesa de Cabeceira estilo Retrô',
            price: 0,
            category: 'Móveis',
            room: 'quarto-casal',
            image: './fotodosprodutos/Mesa de Cabeceira estilo Retrô.jpg',
            url: 'https://s.shopee.com.br/10tdKD3gwN'
        },
        // Sala
        {
            id: 'conjunto-mesa-cadeiras',
            title: 'Conjunto Mesa Lins 4 Cadeiras Freijó',
            price: 0,
            category: 'Móveis',
            room: 'sala',
            image: './fotodosprodutos/Conjunto Mesa Lins 4 Cadeiras Freijó.jpg',
            url: 'https://s.shopee.com.br/7pjxSchJTX'
        },
        {
            id: 'vaso-planta-monaco',
            title: 'Vaso para planta Mônaco, cilíndrico com pé em madeira design moderno',
            price: 0,
            category: 'Decoração',
            room: 'sala',
            image: './fotodosprodutos/Vaso para planta Mônaco, cilíndrico com pé em madeira design moderno.jpg',
            url: 'https://s.shopee.com.br/5L2cV252Ux'
        },
        // Cozinha
        {
            id: 'kit-formas-antiaderente',
            title: 'Kit 3 Formas com Fundo Removível Antiaderente',
            price: 0,
            category: 'Utilidades Domésticas',
            room: 'cozinha',
            image: './fotodosprodutos/Kit 3 Formas com Fundo Removível Antiaderente.jpg',
            url: '#'
        },
        {
            id: 'kit-almofadas-macrame',
            title: 'Kit de Almofadas Coroa Caramelo Macramê Artesanal',
            price: 0,
            category: 'Decoração',
            room: 'sala',
            image: './fotodosprodutos/Kit de Almofadas Coroa Caramelo Macrame Artesanal.jpg',
            url: '#'
        },
        {
            id: 'pote-hermetico-vidro',
            title: 'Pote Hermético Vidro Cozinha',
            price: 0,
            category: 'Utilidades Domésticas',
            room: 'cozinha',
            image: './fotodosprodutos/Pote Hermético Vidro Cozinha.jpg',
            url: '#'
        },
        {
            id: 'potes-hermeticos-electrolux',
            title: 'Potes Herméticos Electrolux de Plástico Cinza Retangular com 12 Unidades',
            price: 0,
            category: 'Utilidades Domésticas',
            room: 'cozinha',
            image: './fotodosprodutos/Potes Herméticos Electrolux de Plástico Cinza Retangular com 12 Unidades.jpg',
            url: '#'
        },
        {
            id: 'conjunto-potes-hermeticos',
            title: 'Conjunto de Potes Herméticos em Acrílico Cristal com Trava e Design Empilhável',
            price: 0,
            category: 'Utilidades Domésticas',
            room: 'cozinha',
            image: './fotodosprodutos/Conjunto de  Potes Herméticos em Acrílico Cristal com Trava e Design Empilhável.jpg',
            url: '#'
        },
        {
            id: 'boleira-bambu',
            title: 'Boleira com Cúpula e Pé Natural Bambu',
            price: 0,
            category: 'Utilidades Domésticas',
            room: 'cozinha',
            image: './fotodosprodutos/Boleira com Cúpula e Pé Natural Bambu.jpg',
            url: '#'
        },
        // Produtos existentes (mantidos com os links atualizados)
        {
            id: 'abajur-laco-quarto-bebe',
            title: 'Abajur De Laço Para Quarto de Bebê',
            price: 0,
            category: 'Decoração',
            room: 'quarto-bebe',
            image: './fotodosprodutos/Abajur De Laço Para Quarto de Bebê.jpg',
            url: 'https://s.shopee.com.br/qaD6R9wYj'
        },
        {
            id: 'air-fryer-mondial',
            title: 'Air Fryer Forno Oven Mondial',
            price: 0,
            category: 'Eletrodomésticos',
            room: 'cozinha',
            image: './fotodosprodutos/Air Fryer Forno Oven Mondial.jpg',
            url: 'https://s.shopee.com.br/5ffSqEAYXA'
        },
        {
            id: 'aparelho-jantar-cha-oxford',
            title: 'Aparelho de Jantar e Chá 20 Peças Oxford Unni Tropicano',
            price: 0,
            category: 'Louças',
            room: 'cozinha',
            image: './fotodosprodutos/Aparelho de Jantar e Chá 20 Peças Oxford Unni Tropicano.jpg',
            url: 'https://s.shopee.com.br/6VEZqFm3tx'
        },
        {
            id: 'cesto-roupa-suja-bambu',
            title: 'Cesto de Roupa Suja de Bambu',
            price: 0,
            category: 'Organização',
            room: 'lavanderia',
            image: './fotodosprodutos/Cesto de Roupa Suja de Bambu.jpg',
            url: 'https://s.shopee.com.br/2qLHSr3Noc'
        },
        {
            id: 'conjunto-quarto',
            title: 'Conjunto de Quarto com Guarda-roupa e Cômoda',
            price: 0,
            category: 'Móveis',
            room: 'quarto-casal',
            image: './fotodosprodutos/Conjunto de Quarto com Guarda-roupa e Cômoda.jpg',
            url: 'https://s.shopee.com.br/4VTVLxs6Yb'
        },
        {
            id: 'dossel-borboletas-bebe',
            title: 'Dossel de Borboletas Com Mosqueteiro Para Quarto de Bebe',
            price: 0,
            category: 'Decoração',
            room: 'quarto-bebe',
            image: './fotodosprodutos/Dossel de Borboletas Com Mosqueteiro Para Quarto de Bebe.jpg',
            url: 'https://s.shopee.com.br/1g9K5oAoJ6'
        },
        {
            id: 'kit-pratos-porcelana-maresia',
            title: 'Kit Pratos de Porcelana Maresia',
            price: 0,
            category: 'Louças',
            room: 'cozinha',
            image: './fotodosprodutos/Kit Pratos de Porcelana Maresia.jpg',
            url: 'https://s.shopee.com.br/7pjxQovPgc'
        },
        {
            id: 'mixer-philco-pro-max',
            title: 'Mixer Philco Pro Max',
            price: 0,
            category: 'Eletroportáteis',
            room: 'cozinha',
            image: './fotodosprodutos/Mixer Philco Pro Max.jpg',
            url: 'https://s.shopee.com.br/8KgE1Ngk68'
        },
        {
            id: 'quarto-bebe-rosa',
            title: 'Quarto de bebê completo rosa',
            price: 0,
            category: 'Móveis',
            room: 'quarto-bebe',
            image: './fotodosprodutos/Quarto de bebê completo rosa.jpg',
            url: 'https://s.shopee.com.br/5ffSr3XbmI'
        },
        {
            id: 'sala-estar-completa',
            title: 'Sala de Estar Completa',
            price: 0,
            category: 'Móveis',
            room: 'sala',
            image: './fotodosprodutos/Sala de Estar Completa.jpg',
            url: 'https://s.shopee.com.br/1BD3UJrzwu'
        },
        {
            id: 'kit-toalhas-iniciais',
            title: 'Kit Toalhas de Banho e Rosto Bordadas com Iniciais',
            price: 0,
            category: 'Cama, Mesa e Banho',
            room: 'banheiro',
            image: './fotodosprodutos/Kit Toalhas de Banho e Rosto Bordadas com Iniciais.jpg',
            url: 'https://s.shopee.com.br/5ffSg4N3g7?share_channel_code=1'
        },
        {
            id: 'kit-cafe-manha-bambu',
            title: 'Kit Café da Manhã Bambu',
            price: 0,
            category: 'Utilidades Domésticas',
            room: 'cozinha',
            image: './fotodosprodutos/Kit Café da Manhã Bambu .jpg',
            url: 'https://s.shopee.com.br/7Knggd9wcI'
        },
        {
            id: 'jogo-panelas',
            title: 'Jogo de Panelas',
            price: 0,
            category: 'Cozinha',
            room: 'cozinha',
            image: './fotodosprodutos/Jogo de Panelas.jpg',
            url: 'https://s.shopee.com.br/6prQ6cSpAl'
        },
        {
            id: 'descanso-panelas',
            title: 'Descanso de Panelas',
            price: 0,
            category: 'Cozinha',
            room: 'cozinha',
            image: './fotodosprodutos/Descanso de Panelas .jpg',
            url: 'https://s.shopee.com.br/6fXzuR4EEn'
        },
        {
            id: 'rack-tv-75',
            title: 'Rack para TV até 75 Polegadas',
            price: 0,
            category: 'Móveis',
            room: 'sala',
            image: './fotodosprodutos/Rack para TV até 75 Polegadas.jpg',
            url: 'https://s.shopee.com.br/6Kv9W3hq6y'
        },
        {
            id: 'jogo-talheres-dourados',
            title: 'Jogo de talheres dourados',
            price: 0,
            category: 'Cozinha',
            room: 'cozinha',
            image: './fotodosprodutos/Jogo de talheres dourados.jpg',
            url: 'https://s.shopee.com.br/5AjC8AAfyO'
        },
        {
            id: 'kit-cobre-leito-queen',
            title: 'Kit Cobre Leito Queen',
            price: 0,
            category: 'Cama, Mesa e Banho',
            room: 'quarto-casal',
            image: './fotodosprodutos/Kit Cobre Leito Queen.jpg',
            url: 'https://s.shopee.com.br/5AjC8AAfyO'
        },
        // ——— Novos itens adicionados automaticamente ———
        {
            id: 'abajur-chao-tripe-sala',
            title: 'Abajur De Chão Tripé Luminária De Piso Para Sala',
            price: 0,
            category: 'Iluminação',
            room: 'sala',
            image: './fotodosprodutos/Abajur De Chão Tripé Luminária De Piso Para Sala.jpg',
            url: '#'
        },
        {
            id: 'conjunto-estantes-livros',
            title: 'Conjunto Estantes para Livros',
            price: 0,
            category: 'Móveis',
            room: 'escritorio',
            image: './fotodosprodutos/Conjunto Estantes para Livros.jpg',
            url: '#'
        },
        {
            id: 'jogo-banheiro-kit-lavabo-porcelana',
            title: 'Jogo Banheiro Kit Lavabo Porcelana',
            price: 0,
            category: 'Utilidades Domésticas',
            room: 'banheiro',
            image: './fotodosprodutos/Jogo Banheiro Kit Lavabo Porcelana.jpg',
            url: '#'
        },
        {
            id: 'jogo-panelas-pecas-ceramica-granito',
            title: 'Jogo de Panelas Peças Indução Gás Cerâmica Granito Antiaderente',
            price: 0,
            category: 'Cozinha',
            room: 'cozinha',
            image: './fotodosprodutos/Jogo de Panelas Peças Indução Gás Conjunto de Panelas Revestido em Cerâmica Granito Antiaderente Frigideira Caçarola.jpg',
            url: '#'
        },
        {
            id: 'kit-2-mesas-cabeceira-dourado',
            title: 'Kit 2 Mesas de Cabeceira Dourado',
            price: 0,
            category: 'Móveis',
            room: 'quarto-casal',
            image: './fotodosprodutos/Kit 2 Mesas de Cabeceira Dourado.jpg',
            url: '#'
        },
        {
            id: 'mesa-para-computador-escrivaninha',
            title: 'Mesa Para Computador Escrivaninha',
            price: 0,
            category: 'Móveis',
            room: 'escritorio',
            image: './fotodosprodutos/Mesa Para Computador Escrivaninha.jpg',
            url: '#'
        },
        {
            id: 'mop-flat-lava-seca-electrolux',
            title: 'Mop Flat Lava e Seca com Refil Extra de Microfibra Electrolux ORIGINAL',
            price: 0,
            category: 'Utilidades Domésticas',
            room: 'lavanderia',
            image: './fotodosprodutos/Mop Flat Lava e Seca com Refil Extra de Microfibra Electrolux ORIGINAL.jpg',
            url: '#'
        },
        {
            id: 'cobre-leito-casal-super-soft',
            title: 'Cobre Leito Casal Colcha Super Soft',
            price: 0,
            category: 'Cama, Mesa e Banho',
            room: 'quarto-casal',
            image: './fotodosprodutos/Cobre Leito Casal Colcha Super Soft.jpg',
            url: '#'
        },
        {
            id: 'guarda-roupa-casal-espelho',
            title: 'Guarda-Roupa Casal com Espelho',
            price: 0,
            category: 'Móveis',
            room: 'quarto-casal',
            image: './fotodosprodutos/Guarda-Roupa Casal com Espelho.jpg',
            url: '#'
        }
    ];

    // Renderiza categorias e produtos imediatamente
    renderRooms();
    if (products && products.length > 0) {
        renderProducts(products);
    } else {
        showEmptyState();
    }

    // Função para renderizar os produtos
    function renderProducts(products) {
        if (!grid) return;
        
        if (!products || products.length === 0) {
            showEmptyState('Nenhum produto encontrado.');
            return;
        }
        
        if (empty) empty.hidden = true;
        
        grid.innerHTML = products.map(product => {
            console.log(`Carregando produto: ${product.title}`);
            console.log(`Caminho da imagem: ${product.image}`);
            
            return `
            <article class="card">
                <img src="${encodeURI(product.image)}" 
                     alt="${escapeHtml(product.title)}"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Q5ZDlkOSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHg9IjMiIHk9IjMiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgcng9IjIiIHJ5PSIyIj48L3JlY3Q+PGNpcmNsZSBjeD0iOC41IiBjeT0iOC41IiByPSIxLjUiPjwvY2lyY2xlPjxwb2x5bGluZSBwb2ludHM9IjIxIDE1IDE2IDEwIDUgMjEiPjwvcG9seWxpbmU+PC9zdmc+'; this.alt='Imagem não carregada'; console.error('Erro ao carregar imagem:', '${escapeHtml(product.image)}')" />
                <div class="info">
                    <h4 class="title">${escapeHtml(product.title)}</h4>
                    <a class="buy" 
                       href="${escapeHtml(product.url)}" 
                       target="_blank" 
                       rel="noopener noreferrer">
                        Comprar
                    </a>
                </div>
            </article>`;
        }).join('');
    }

    // Mostra mensagem de lista vazia
    function showEmptyState(message = 'Nenhum produto disponível no momento.') {
        if (empty) {
            empty.hidden = false;
            empty.querySelector('p').textContent = message;
        }
    }

    // Função auxiliar para escapar HTML
    function escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .toString()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});


