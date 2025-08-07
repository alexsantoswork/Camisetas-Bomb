
const faqPerguntas = document.querySelectorAll('.faq-pergunta');

faqPerguntas.forEach(pergunta => {

    pergunta.addEventListener('click', () => {

        const faqResposta = pergunta.closest('.faq-item').querySelector('.faq-resposta');

        faqResposta.classList.toggle('mostrar');

        pergunta.classList.toggle('active');
    });
});
