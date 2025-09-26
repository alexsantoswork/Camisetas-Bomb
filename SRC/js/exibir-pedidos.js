// Definindo o nome do banco de dados e a versão
const dbName = 'CadastroDB';
const dbVersion = 1;
let db;

// Elementos do DOM
const exibirDadosBtn = document.getElementById('exibirDadosBtn');
const limparDadosBtn = document.getElementById('limparDadosBtn');
const listaDados = document.getElementById('listaDados');
const statusMessage = document.getElementById('statusMessage');

// Função para exibir uma mensagem de status
function displayStatus(message, color) {
    statusMessage.textContent = message;
    statusMessage.style.color = color;
}

// 1. ABRIR O BANCO DE DADOS
const request = indexedDB.open(dbName, dbVersion);

request.onupgradeneeded = event => {
    db = event.target.result;
    const store = db.createObjectStore('pedidos', { keyPath: 'id', autoIncrement: true });
    // Adicione os índices, se necessário, para os novos campos
    store.createIndex('nome', 'nome', { unique: false });
    store.createIndex('produto', 'produto', { unique: false });
    store.createIndex('tamanho', 'tamanho', { unique: false }); // Novo
    console.log('IndexedDB: Loja de objetos "pedidos" criada/atualizada.');
};

request.onsuccess = event => {
    db = event.target.result;
    console.log('IndexedDB: Conexão com o banco de dados estabelecida.');
};

request.onerror = event => {
    console.error('IndexedDB: Erro ao abrir o banco de dados:', event.target.errorCode);
    displayStatus('Erro ao carregar o banco de dados.', 'red');
};

// 2. FUNÇÃO UNIFICADA PARA EXIBIR OS DADOS
// Adicionado o parâmetro 'isFromBroadcast' com valor padrão 'false'
function lerEExibirDados(isFromBroadcast = false) { 
    if (!db) {
        displayStatus('Banco de dados não está pronto.', 'orange');
        return;
    }
    listaDados.innerHTML = ''; 

    
    // Não altere o status se for uma atualização em tempo real
    if (!isFromBroadcast) { 
        displayStatus('Buscando dados...', 'gray');
    }

    const transaction = db.transaction(['pedidos'], 'readonly');
    const store = transaction.objectStore('pedidos');
    const cursorRequest = store.openCursor();

    cursorRequest.onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
            // ... (Lógica de criação do <li>, mantida igual)
            const li = document.createElement('li');
            const nome = cursor.value.nome;
            const produto = cursor.value.produto || 'N/A';
            const tamanho = cursor.value.tamanho || cursor.value.modelo || 'N/A';
            li.textContent = `Produto: ${produto} | Tamanho: ${tamanho} | Cliente: ${nome}`;
            listaDados.appendChild(li);
            cursor.continue();
        } else {
            console.log('Todos os dados foram exibidos.');
            
            // Verifica se a lista está vazia
            if (listaDados.children.length === 0) {
                const li = document.createElement('li');
                li.textContent = 'Nenhum pedido encontrado.';
                listaDados.appendChild(li);
            }
            
            // AGORA, SÓ EXIBE A MENSAGEM DE SUCESSO SE NÃO FOR DO BROADCAST
            if (!isFromBroadcast) { 
                displayStatus('Dados exibidos com sucesso!', 'green');
            }
        }
    };

    cursorRequest.onerror = event => {
        // ... (Lógica de erro, mantida igual)
        console.error('IndexedDB: Erro ao ler os dados:', event.target.errorCode);
        displayStatus('Erro ao exibir os dados.', 'red');
    };
}








// 3. LIGAÇÃO COM EVENTOS DO DOM

// Lógica para EXIBIR os dados (Chama a função unificada)
exibirDadosBtn.addEventListener('click', () => lerEExibirDados(false));


// Lógica para LIMPAR os dados (Mantida)
limparDadosBtn.addEventListener('click', () => {
    if (!db) {
        displayStatus('Banco de dados não está pronto.', 'orange');
        return;
    }

    const transaction = db.transaction(['pedidos'], 'readwrite');
    const store = transaction.objectStore('pedidos');
    const clearRequest = store.clear();

    clearRequest.onsuccess = () => {
        displayStatus('Todos os dados foram apagados com sucesso!', 'green');
        listaDados.innerHTML = ''; // Limpa a lista na tela também
    };

    clearRequest.onerror = event => {
        console.error('IndexedDB: Erro ao limpar dados:', event.target.errorCode);
        displayStatus('Erro ao limpar os dados. Por favor, tente novamente.', 'red');
    };
});


// 4. CÓDIGO DO BROADCAST CHANNEL (Chama a função unificada)
// CÓDIGO DO BROADCAST CHANNEL
try {
    const broadcastChannel = new BroadcastChannel('notificacao_pedidos');

    broadcastChannel.onmessage = event => {
        if (event.data === 'novo_pedido_salvo') {
            
            // 1. Exibe uma mensagem de alerta clara para o usuário
            displayStatus('🔔 NOVO PEDIDO PENDENTE! Clique em "Exibir Dados Salvos" para atualizar a lista.', 'orange'); 
            
            // 2. Adiciona uma classe ao botão para dar um destaque visual
            exibirDadosBtn.classList.add('new-data-alert'); 
            
            // 3. Removida a chamada para: lerEExibirDados(true); 
            //    A lista NÃO será atualizada automaticamente.
        }
    };

    console.log('Broadcast Channel: Canal de escuta para notificações ativado.');
} catch (e) {
    console.warn('Broadcast Channel API não suportada neste navegador.');
}

// Lógica para EXIBIR os dados (Ajustada para remover o destaque ao clicar)
exibirDadosBtn.addEventListener('click', () => {
    // Remove o destaque ao clicar no botão
    exibirDadosBtn.classList.remove('new-data-alert'); 
});