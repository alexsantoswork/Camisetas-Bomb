const btnFaq = document.getElementById('btnMaisPerguntas')
const maisPerguntas = document.getElementById('maisPerguntas')

btnFaq.addEventListener('click', function(){
    if (maisPerguntas.style.display === 'block' ) {
        maisPerguntas.style.display = 'none';
        btnFaq.textContent = 'Ver mais perguntas'
    } else {
        maisPerguntas.style.display = 'block';
        btnFaq.textContent = 'Fechar mais perguntas'
    }
})

