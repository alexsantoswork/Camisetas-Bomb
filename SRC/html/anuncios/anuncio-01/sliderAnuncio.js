const sliderWrapper = document.querySelector('.slider-wrapper');
        const slides = document.querySelectorAll('.slider-wrapper img');
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        const indicatorsContainer = document.querySelector('.slider-indicators');
        const indicators = document.querySelectorAll('.indicator');

        let currentIndex = 0; // Índice da imagem atual
        const totalSlides = slides.length; // Total de imagens

        // Função para atualizar a posição do slide
        function updateSlider() {
            // Calcula o deslocamento necessário para mostrar a imagem correta
            const offset = -currentIndex * 100;
            sliderWrapper.style.transform = `translateX(${offset}%)`;

            // Atualiza os indicadores para mostrar qual slide está ativo
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        // Evento para o botão "Próximo"
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides; // Avança para a próxima imagem, voltando para a primeira se for a última
            updateSlider();
        });

        // Evento para o botão "Anterior"
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Volta para a imagem anterior, indo para a última se for a primeira
            updateSlider();
        });

        // Evento para os indicadores (pontos)
        indicators.forEach(indicator => {
            indicator.addEventListener('click', (event) => {
                const index = parseInt(event.target.dataset.index); // Pega o índice do indicador clicado
                currentIndex = index;
                updateSlider();
            });
        });

        // Inicializa o slide na primeira imagem
        updateSlider();