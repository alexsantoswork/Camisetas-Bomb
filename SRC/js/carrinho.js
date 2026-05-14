/**
 * CARRINHO.JS - Camisetas Bomb
 * Responsável por gerenciar o LocalStorage, contador e adição de produtos.
 * O preço é capturado do campo hidden 'produto-preco'.
 */

// 1. CONFIGURAÇÕES TÉCNICAS
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyFMf7HONHKm5sytSdTUFUUbWVjhHc0iNZXbXN-Jcites9reWB3p99bGjwqGFoxdpIZ2Q/exec'; 

// 2. FUNÇÃO GLOBAL: Atualizar o contador visual da sacola
window.atualizarContadorVisual = function() {
    const contadorElemento = document.getElementById('carrinho-contador');
    
    if (!contadorElemento) return;

    const carrinho = JSON.parse(localStorage.getItem('carrinho-bomb')) || [];
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    
    contadorElemento.textContent = totalItens;
    contadorElemento.style.display = totalItens > 0 ? 'flex' : 'none';
};

// 3. FUNÇÃO: Mostrar notificação no topo (Toast)
function mostrarNotificacao() {
    const toast = document.getElementById('toast-sucesso');
    if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// 4. LÓGICA DO FORMULÁRIO DE PRODUTO
const formProduto = document.getElementById('cadastroForm');
const btnComprar = document.getElementById('finalizarPedidoBtn');

if (formProduto) {
    formProduto.addEventListener('submit', function(event) {
        // 1. Pega os valores para validação
        const corSelecionada = document.getElementById('cor').value;
        const qtdInput = document.getElementById('quantidade').value;
        const tamanhoChecked = document.querySelector('input[name="modelo"]:checked');

        // 2. VALIDAÇÃO: Se não escolheu cor, quantidade ou tamanho, para aqui.
        if (!corSelecionada || !qtdInput || qtdInput <= 0 || !tamanhoChecked) {
            event.preventDefault();
            alert("Por favor, selecione o tamanho, a cor e uma quantidade válida.");
            return;
        }

        event.preventDefault(); // Segue com o envio normal

        if (btnComprar) {
            btnComprar.disabled = true;
            btnComprar.textContent = 'Adicionando...';
        }

        // Captura o preço do INPUT HIDDEN (Valor fixo do produto)
        const precoBase = parseFloat(document.getElementById('produto-preco').value);
        const qtdSelecionada = parseInt(qtdInput) || 1;

        // Coleta os dados do produto
        const novoItem = {
            id: Date.now(),
            nome: document.getElementById('produto').value,
            preco: precoBase, 
            tamanho: tamanhoChecked.value,
            cor: corSelecionada,
            imagem: document.getElementById('produto-imagem').value,
            quantidade: qtdSelecionada
        };

        const formData = new FormData(formProduto);
        
        fetch(SCRIPT_URL, {
            method: 'POST',
            body: formData 
        })
        .then(() => {
            let carrinho = JSON.parse(localStorage.getItem('carrinho-bomb')) || [];

            // Verifica se o mesmo produto (Nome + Tamanho + Cor) já existe
            const itemExistente = carrinho.find(item => 
                item.nome === novoItem.nome && 
                item.tamanho === novoItem.tamanho &&
                item.cor === novoItem.cor
            );

            if (itemExistente) {
                itemExistente.quantidade += qtdSelecionada;
            } else {
                carrinho.push(novoItem);
            }

            localStorage.setItem('carrinho-bomb', JSON.stringify(carrinho));

            window.atualizarContadorVisual();
            mostrarNotificacao();
            formProduto.reset();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao registrar no sistema, mas o item foi salvo no seu carrinho local.');
        })
        .finally(() => {
            if (btnComprar) {
                btnComprar.disabled = false;
                btnComprar.textContent = 'Adicionar a sacola';
            }
        });
    });
}

// --- GATILHOS DE ATUALIZAÇÃO ---

document.addEventListener('DOMContentLoaded', window.atualizarContadorVisual);
window.onload = window.atualizarContadorVisual;
window.onfocus = window.atualizarContadorVisual;

window.addEventListener('storage', (event) => {
    if (event.key === 'carrinho-bomb') {
        window.atualizarContadorVisual();
    }
});