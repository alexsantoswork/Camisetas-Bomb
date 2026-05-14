// // Sua URL de implantação do Apps Script (mantida)
// const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyFMf7HONHKm5sytSdTUFUUbWVjhHc0iNZXbXN-Jcites9reWB3p99bGjwqGFoxdpIZ2Q/exec'; 

// const form = document.getElementById('cadastroForm');
// const finalizarPedidoBtn = document.getElementById('finalizarPedidoBtn');

// // 1. Encontra a tag <a> que envolve o botão para obter o link de pagamento.
// const linkPagamento = finalizarPedidoBtn.closest('a');

// // 2. Obtém o URL de pagamento para usar no redirecionamento.
// const PAGAMENTO_URL = linkPagamento ? linkPagamento.href : ''; 


// form.addEventListener('submit', function(event) {
//     event.preventDefault(); // Impede o envio padrão do navegador

//     if (!PAGAMENTO_URL) {
//         alert('Erro: URL de pagamento não encontrada.');
//         return; // Sai da função se não houver URL
//     }

//     // Desabilita o botão para evitar cliques duplicados
//     finalizarPedidoBtn.disabled = true;
//     finalizarPedidoBtn.textContent = 'Aguarde...'; // Feedback visual

//     // =================================================================
//     // >>> CORREÇÃO PARA O SAFARI: Tenta abrir a nova janela AQUI. <<<
//     // =================================================================
//     let novaJanela = window.open(PAGAMENTO_URL, '_blank');
    
//     // Verifica se a janela foi bloqueada (navegadores antigos ou falha)
//     if (!novaJanela || novaJanela.closed || typeof novaJanela.closed == 'undefined') {
//         alert('⚠️ O navegador bloqueou o pop-up de pagamento. Por favor, desabilite o bloqueador de pop-ups para este site e tente novamente.');
//         finalizarPedidoBtn.disabled = false;
//         finalizarPedidoBtn.textContent = 'Comprar';
//         return; // Interrompe o processo se o pop-up foi bloqueado
//     }
    
//     // Captura todos os dados do formulário
//     const formData = new FormData(form);

//     // Envia a requisição POST para o Google Apps Script
//     fetch(SCRIPT_URL, {
//         method: 'POST',
//         body: formData 
//     })
//     .then(response => {
//         if (!response.ok) {
//             // Se houver erro de rede/servidor no Apps Script
//             throw new Error(`Erro de rede ou Apps Script: Status ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Verifica se o Apps Script retornou sucesso
//         if (data.result === "success") {
//             // SUCESSO: Como a janela já está aberta, apenas finaliza o formulário.
//             form.reset(); 
//             finalizarPedidoBtn.textContent = 'Pedido Realizado'; 
            
//             // Opcional: Se quiser redirecionar o *usuário* na aba original
//             // setTimeout(() => window.location.href = './agradecimento.html', 2000); 

//         } else {
//             // FALHA: Se o script retornar um erro de validação (ex: campo faltando)
//             // Fecha a aba de pagamento que foi aberta imediatamente.
//             if (novaJanela && !novaJanela.closed) {
//                 novaJanela.close();
//             }
//             alert(`⚠️ Falha ao processar o pedido: ${data.message}`);
//             form.reset(); 
//             finalizarPedidoBtn.disabled = false;
//             finalizarPedidoBtn.textContent = 'Comprar';
//         }
//     })
//     .catch(error => {
//         console.error('Erro geral de envio:', error);
//         // Fecha a aba de pagamento que foi aberta
//         if (novaJanela && !novaJanela.closed) {
//             novaJanela.close();
//         }
//         alert('❌ Ocorreu um erro ao salvar o pedido. Tente novamente.');
//     })
//     .finally(() => {
//         // Se a operação terminou com sucesso, evitamos reabilitar o botão.
//         if (finalizarPedidoBtn.textContent !== 'Pedido Realizado') {
//             finalizarPedidoBtn.disabled = false;
//             finalizarPedidoBtn.textContent = 'Comprar';
//         }
//     });
// });








const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyFMf7HONHKm5sytSdTUFUUbWVjhHc0iNZXbXN-Jcites9reWB3p99bGjwqGFoxdpIZ2Q/exec'; 

const form = document.getElementById('cadastroForm');
const finalizarPedidoBtn = document.getElementById('finalizarPedidoBtn');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o redirecionamento e o refresh

    // 1. Coleta os dados para o Carrinho (LocalStorage)
    const item = {
        id: Date.now(),
        nome: document.getElementById('produto').value,
        preco: parseFloat(document.getElementById('produto-preco').value),
        tamanho: document.querySelector('input[name="modelo"]:checked').value,
        imagem: document.getElementById('produto-imagem').value,
        quantidade: 1
    };

    // 2. Feedback visual no botão
    finalizarPedidoBtn.disabled = true;
    const textoOriginal = finalizarPedidoBtn.textContent;
    finalizarPedidoBtn.textContent = 'Adicionando...';

    // 3. Salva no Google Sheets (para você não perder o lead/contato)
    const formData = new FormData(form);
    
    fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData 
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === "success") {
            // SUCESSO: Adiciona ao carrinho local e mostra a notificação no topo
            adicionarAoCarrinho(item); 
            form.reset();
        } else {
            alert(`Erro ao registrar interesse: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        // Mesmo se o Google Sheets falhar, adicionamos ao carrinho para não perder a venda
        adicionarAoCarrinho(item);
    })
    .finally(() => {
        finalizarPedidoBtn.disabled = false;
        finalizarPedidoBtn.textContent = textoOriginal;
    });
});

// Funções de Apoio
function adicionarAoCarrinho(item) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho-bomb')) || [];
    const index = carrinho.findIndex(i => i.nome === item.nome && i.tamanho === item.tamanho);

    if (index > -1) {
        carrinho[index].quantidade += 1;
    } else {
        carrinho.push(item);
    }

    localStorage.setItem('carrinho-bomb', JSON.stringify(carrinho));
    mostrarNotificacao(); // Aquela função que faz a barra descer no topo
}

function mostrarNotificacao() {
    const toast = document.getElementById('toast-sucesso');
    if(toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}