// Definindo o nome do banco de dados e a versão
const dbName = 'CadastroDB';
const dbVersion = 1;
let db;

// Elementos do DOM
const form = document.getElementById('cadastroForm');
const statusMessage = document.getElementById('statusMessage');
const exibirDadosBtn = document.getElementById('exibirDadosBtn');
const listaDados = document.getElementById('listaDados');

// 1. Abrir ou criar o banco de dados
const request = indexedDB.open(dbName, dbVersion);

request.onupgradeneeded = event => {
    db = event.target.result;
    const store = db.createObjectStore('pedidos', { keyPath: 'id', autoIncrement: true });
    
    // É importante criar os índices para os novos campos 'produto' e 'modelo/tamanho'
    store.createIndex('nome', 'nome', { unique: false });
    store.createIndex('produto', 'produto', { unique: false });
    store.createIndex('modelo', 'modelo', { unique: false }); // Mantendo 'modelo' como chave de índice
    
    console.log('IndexedDB: Loja de objetos "pedidos" criada com sucesso.');
};

request.onsuccess = event => {
    db = event.target.result;
    console.log('IndexedDB: Conexão com o banco de dados estabelecida.');
};

request.onerror = event => {
    console.error('IndexedDB: Erro ao abrir o banco de dados:', event.target.errorCode);
    statusMessage.textContent = 'Erro ao carregar o banco de dados. Por favor, tente novamente.';
    statusMessage.style.color = 'red';
};

// 2. Adicionar dados ao banco de dados quando o formulário é submetido
form.addEventListener('submit', event => {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os valores do formulário
    const nome = document.getElementById('nome').value;
    const produto = document.getElementById('produto').value;
    const modelo = form.querySelector('input[name="modelo"]:checked').value;
    
    // NOVO CÓDIGO: Pega o link de pagamento do atributo data-link do botão
    const botaoComprar = document.getElementById('finalizarPedidoBtn'); 
    const linkPagamento = botaoComprar ? botaoComprar.getAttribute('data-link') : null;

    const novoPedido = {
        nome: nome,
        produto: produto,
        modelo: modelo,
        data: new Date()
    };

    // Inicia uma transação de escrita
    const transaction = db.transaction(['pedidos'], 'readwrite');
    const store = transaction.objectStore('pedidos');

    // Adiciona o novo objeto à loja
    const addRequest = store.add(novoPedido);

    addRequest.onsuccess = () => {
        statusMessage.textContent = 'Pedido salvo! Redirecionando para o pagamento...'; // Mensagem atualizada
        statusMessage.style.color = 'green';
        form.reset(); // Limpa o formulário após o sucesso

        // CORREÇÃO APLICADA: Abre o link de pagamento após o sucesso no salvamento
        if (linkPagamento) {
            // Abre o link em uma nova aba para que o usuário não perca a página atual
            window.open(linkPagamento, '_blank'); 
        }

        // Lógica do Broadcast Channel (mantida)
        try {
            const broadcastChannel = new BroadcastChannel('notificacao_pedidos');
            broadcastChannel.postMessage('novo_pedido_salvo');
            broadcastChannel.close();
        } catch (e) {
            console.warn('Broadcast Channel API não suportada neste navegador.');
        }
    };

    addRequest.onerror = event => {
        console.error('IndexedDB: Erro ao adicionar dados:', event.target.errorCode);
        statusMessage.textContent = 'Erro ao salvar os dados. Por favor, tente novamente.';
        statusMessage.style.color = 'red';
    };
});