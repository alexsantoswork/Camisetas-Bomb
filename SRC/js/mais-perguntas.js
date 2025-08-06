// const btnFaq = document.getElementById('btnMaisPerguntas')
// const maisPerguntas = document.getElementById('maisPerguntas')

// btnFaq.addEventListener('click', function(){
//     if (maisPerguntas.style.display === 'block' ) {
//         maisPerguntas.style.display = 'none';
//         btnFaq.textContent = 'Ver perguntas'
//     } else {
//         maisPerguntas.style.display = 'block';
//         btnFaq.textContent = 'Fechar perguntas'
//     }
// })



// Seleciona todos os botões de pergunta da FAQ
const faqPerguntas = document.querySelectorAll('.faq-pergunta');

faqPerguntas.forEach(pergunta => {
    // Adiciona um "listener" de evento de clique para cada botão
    pergunta.addEventListener('click', () => {
        // Seleciona o elemento de resposta que está diretamente após o botão clicado
        // closest('.faq-item') encontra o pai mais próximo com essa classe
        // querySelector('.faq-resposta') encontra a resposta dentro desse item
        const faqResposta = pergunta.closest('.faq-item').querySelector('.faq-resposta');

        // Alterna a classe 'mostrar' na resposta
        // Se a resposta tem a classe 'mostrar', ela será removida (escondendo)
        // Se não tem, ela será adicionada (mostrando)
        faqResposta.classList.toggle('mostrar');

        // Alterna a classe 'active' no botão da pergunta
        // Isso pode ser usado para mudar o estilo do botão (como o ícone de seta)
        pergunta.classList.toggle('active');

        // Opcional: Fechar outras respostas quando uma nova é aberta
        // Descomente o bloco abaixo se quiser que apenas uma resposta fique aberta por vez
        /*
        faqPerguntas.forEach(otherPergunta => {
            if (otherPergunta !== pergunta && otherPergunta.classList.contains('active')) {
                otherPergunta.classList.remove('active');
                otherPergunta.closest('.faq-item').querySelector('.faq-resposta').classList.remove('mostrar');
            }
        });
        */
    });
});
