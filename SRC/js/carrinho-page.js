function renderizarCarrinho() {
    const listaElemento = document.getElementById('lista-carrinho');
    const totalElemento = document.getElementById('valor-total');
    let carrinho = JSON.parse(localStorage.getItem('carrinho-bomb')) || [];
    
    listaElemento.innerHTML = '';
    let totalGeral = 0;

    if (carrinho.length === 0) {
        listaElemento.innerHTML = '<p>Seu carrinho está vazio.</p>';
        totalElemento.textContent = '0.00';
        return;
    }

    // carrinho.forEach((item, index) => {
    //     const subtotal = item.preco * item.quantidade;
    //     totalGeral += subtotal;

    //     listaElemento.innerHTML += `
    //         <div class="item-carrinho">
    //             <img src="${item.imagem}" alt="${item.nome}">
    //             <div class="item-info">
    //                 <strong>${item.nome}</strong><br>
    //                 Cor: ${item.cor || 'N/A'} | Tamanho: ${item.tamanho}<br>
    //                 Qtd: ${item.quantidade} | R$ ${item.preco.toFixed(2)}
    //             </div>
    //             <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
    //         </div>
    //     `;
    // });




    carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    totalGeral += subtotal;

    listaElemento.innerHTML += `
        <div class="item-carrinho">
            <!-- AQUI: Verifique se src está usando item.imagem -->
            <img src="${item.imagem}" alt="${item.nome}" class="img-carrinho-thumb">
            
            <div class="item-info">
                <strong>${item.nome}</strong><br>
                Cor: ${item.cor || 'N/A'} | Tamanho: ${item.tamanho}<br>
                Qtd: ${item.quantidade} | R$ ${item.preco.toFixed(2)}
            </div>
            <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
        </div>
    `;
});






    totalElemento.textContent = totalGeral.toFixed(2);
}

function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho-bomb')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho-bomb', JSON.stringify(carrinho));
    renderizarCarrinho();
}

function finalizarCompra() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho-bomb')) || [];
    if (carrinho.length === 0) return alert("Seu carrinho está vazio!");

    let mensagem = "Olá! Gostaria de finalizar o pedido:\n\n";
    carrinho.forEach(item => {
        mensagem += `- ${item.nome} (${item.cor} - ${item.tamanho}) ${item.quantidade} Unidades \n`;
    });
    
    const total = document.getElementById('valor-total').textContent;
    mensagem += `\n*Total: R$ ${total}*`;

    const fone = "5511985480431"; // COLOQUE SEU WHATSAPP AQUI
    const url = `https://wa.me/${fone}?text=${encodeURIComponent(mensagem)}`;

    // AQUI ESTÁ A MUDANÇA:
    // window.open(url, '_blank') abre o link em uma nova aba
    window.open(url, '_blank');
}

// Inicia a página
document.addEventListener('DOMContentLoaded', renderizarCarrinho);