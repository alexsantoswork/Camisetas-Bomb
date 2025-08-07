// Função JavaScript para alternar a classe
        function navegacaoLojaVisivel() {
            
            const conteudoDiv = document.getElementById('navegarLoja');

            if (conteudoDiv.classList.contains('navegar-loja-visivel')) {
                conteudoDiv.classList.remove('navegar-loja-visivel');
                conteudoDiv.classList.add('navegar-loja');
            } else {
                conteudoDiv.classList.add('navegar-loja-visivel');
                conteudoDiv.classList.remove('navegar-loja'); 
            }
        }