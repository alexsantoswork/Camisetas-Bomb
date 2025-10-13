// // Sua URL de implantação do Apps Script (mantida)
// const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbySnkURJipmh2iLd23Vppy1eHk6kqC8Yf5QblMjqN6Mm50nn8tOTeuUNJ21_PQkuTHxfg/exec'; 

// const form = document.getElementById('cadastroForm');
// const finalizarPedidoBtn = document.getElementById('finalizarPedidoBtn');

// // 1. Encontra a tag <a> que envolve o botão para obter o link de pagamento.
// const linkPagamento = finalizarPedidoBtn.closest('a');

// // 2. Obtém o URL de pagamento para usar no redirecionamento.
// const PAGAMENTO_URL = linkPagamento ? linkPagamento.href : ''; 


// form.addEventListener('submit', function(event) {
//     event.preventDefault(); // Impede o envio padrão do navegador

//     // Desabilita o botão para evitar cliques duplicados
//     finalizarPedidoBtn.disabled = true;
//     finalizarPedidoBtn.textContent = 'Comprando...'; // Feedback visual

//     // Captura todos os dados do formulário
//     const formData = new FormData(form);

//     // Envia a requisição POST para o Google Apps Script
//     fetch(SCRIPT_URL, {
//         method: 'POST',
//         body: formData 
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`Erro de rede ou Apps Script: Status ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Verifica se o Apps Script retornou sucesso
//         if (data.result === "success") {
            
//             // SUCESSO: Abre o link de pagamento em uma nova aba.
//             if (PAGAMENTO_URL) {
//                 // A navegação (abertura da nova aba) ocorre aqui.
//                 window.open(PAGAMENTO_URL, '_blank');
                
//                 // Opcional: Limpa o formulário na página original após o sucesso
//                 form.reset(); 
                
//                 // Opcional: Dá um feedback visual na página original
//                 finalizarPedidoBtn.textContent = 'Pedido Realizado'; 
                
//             } else {
//                 alert('Erro: URL de pagamento não encontrada.');
//                 form.reset(); 
//             }
            
//         } else {
//             // FALHA: Se o script retornar um erro (ex: campo obrigatório faltando)
//             alert(`⚠️ Falha ao processar o pedido: ${data.message}`);
//             form.reset(); 
//         }
//     })
//     .catch(error => {
//         console.error('Erro geral de envio:', error);
//         alert('❌ Ocorreu um erro ao salvar o pedido. Tente novamente.');
//     })
//     .finally(() => {
//         // Este bloco será executado apenas se houver falha no fetch/catch
//         if (finalizarPedidoBtn.textContent.includes('Enviando...')) {
//              finalizarPedidoBtn.disabled = false;
//              finalizarPedidoBtn.textContent = 'Comprar';
//         }
//     });
// });






// Sua URL de implantação do Apps Script (mantida)
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyFMf7HONHKm5sytSdTUFUUbWVjhHc0iNZXbXN-Jcites9reWB3p99bGjwqGFoxdpIZ2Q/exec'; 

const form = document.getElementById('cadastroForm');
const finalizarPedidoBtn = document.getElementById('finalizarPedidoBtn');

// 1. Encontra a tag <a> que envolve o botão para obter o link de pagamento.
const linkPagamento = finalizarPedidoBtn.closest('a');

// 2. Obtém o URL de pagamento para usar no redirecionamento.
const PAGAMENTO_URL = linkPagamento ? linkPagamento.href : ''; 


form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do navegador

    if (!PAGAMENTO_URL) {
        alert('Erro: URL de pagamento não encontrada.');
        return; // Sai da função se não houver URL
    }

    // Desabilita o botão para evitar cliques duplicados
    finalizarPedidoBtn.disabled = true;
    finalizarPedidoBtn.textContent = 'Aguarde...'; // Feedback visual

    // =================================================================
    // >>> CORREÇÃO PARA O SAFARI: Tenta abrir a nova janela AQUI. <<<
    // =================================================================
    let novaJanela = window.open(PAGAMENTO_URL, '_blank');
    
    // Verifica se a janela foi bloqueada (navegadores antigos ou falha)
    if (!novaJanela || novaJanela.closed || typeof novaJanela.closed == 'undefined') {
        alert('⚠️ O navegador bloqueou o pop-up de pagamento. Por favor, desabilite o bloqueador de pop-ups para este site e tente novamente.');
        finalizarPedidoBtn.disabled = false;
        finalizarPedidoBtn.textContent = 'Comprar';
        return; // Interrompe o processo se o pop-up foi bloqueado
    }
    
    // Captura todos os dados do formulário
    const formData = new FormData(form);

    // Envia a requisição POST para o Google Apps Script
    fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData 
    })
    .then(response => {
        if (!response.ok) {
            // Se houver erro de rede/servidor no Apps Script
            throw new Error(`Erro de rede ou Apps Script: Status ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Verifica se o Apps Script retornou sucesso
        if (data.result === "success") {
            // SUCESSO: Como a janela já está aberta, apenas finaliza o formulário.
            form.reset(); 
            finalizarPedidoBtn.textContent = 'Pedido Realizado'; 
            
            // Opcional: Se quiser redirecionar o *usuário* na aba original
            // setTimeout(() => window.location.href = './agradecimento.html', 2000); 

        } else {
            // FALHA: Se o script retornar um erro de validação (ex: campo faltando)
            // Fecha a aba de pagamento que foi aberta imediatamente.
            if (novaJanela && !novaJanela.closed) {
                novaJanela.close();
            }
            alert(`⚠️ Falha ao processar o pedido: ${data.message}`);
            form.reset(); 
            finalizarPedidoBtn.disabled = false;
            finalizarPedidoBtn.textContent = 'Comprar';
        }
    })
    .catch(error => {
        console.error('Erro geral de envio:', error);
        // Fecha a aba de pagamento que foi aberta
        if (novaJanela && !novaJanela.closed) {
            novaJanela.close();
        }
        alert('❌ Ocorreu um erro ao salvar o pedido. Tente novamente.');
    })
    .finally(() => {
        // Se a operação terminou com sucesso, evitamos reabilitar o botão.
        if (finalizarPedidoBtn.textContent !== 'Pedido Realizado') {
            finalizarPedidoBtn.disabled = false;
            finalizarPedidoBtn.textContent = 'Comprar';
        }
    });
});