function setupSlideshow(containerSelector) {
    const sliderContainer = document.querySelector(containerSelector);
    if (!sliderContainer) return;

    const sliderWrapper = sliderContainer.querySelector('.slider-wrapper');
    const slides = sliderContainer.querySelectorAll('.slider-wrapper img');
    const prevButton = sliderContainer.querySelector('.prev-button');
    const nextButton = sliderContainer.querySelector('.next-button');
    const indicators = sliderContainer.querySelectorAll('.indicator');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let slideInterval;
    const intervalTime = 3000; // 3 segundos

    function updateSlider(isLooping = false) {
        // Se a transição for um loop, remove a transição do CSS
        if (isLooping) {
            sliderWrapper.classList.add('no-transition');
        }

        const offset = -currentIndex * 100;
        sliderWrapper.style.transform = `translateX(${offset}%)`;

        // Usa setTimeout para dar tempo ao CSS de aplicar a classe e depois removê-la
        // Isso é necessário para que a transição volte a funcionar nos próximos slides
        if (isLooping) {
            setTimeout(() => {
                sliderWrapper.classList.remove('no-transition');
            }, 50); // 50ms é geralmente tempo suficiente
        }

        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function startSlideshow() {
        stopSlideshow();
        slideInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % totalSlides;
            let isLooping = nextIndex < currentIndex; // Verifica se está voltando para 0
            currentIndex = nextIndex;
            updateSlider(isLooping);
        }, intervalTime);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Adiciona eventos de mouse para pausar e reiniciar o slideshow
    sliderContainer.addEventListener('mouseenter', stopSlideshow);
    sliderContainer.addEventListener('mouseleave', startSlideshow);

    // Eventos de clique para navegação manual
    nextButton.addEventListener('click', () => {
        stopSlideshow();
        let nextIndex = (currentIndex + 1) % totalSlides;
        let isLooping = nextIndex < currentIndex;
        currentIndex = nextIndex;
        updateSlider(isLooping);
        startSlideshow();
    });

    prevButton.addEventListener('click', () => {
        stopSlideshow();
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
        startSlideshow();
    });

    indicators.forEach(indicator => {
        indicator.addEventListener('click', (event) => {
            stopSlideshow();
            const index = parseInt(event.target.dataset.index);
            currentIndex = index;
            updateSlider();
            startSlideshow();
        });
    });

    // Inicia o slideshow automaticamente ao carregar
    startSlideshow();
    updateSlider();
}

// Chame a função para cada slider na sua página
setupSlideshow('.slider-1 .slider-container');
setupSlideshow('.slider-2 .slider-container');
setupSlideshow('.slider-3 .slider-container');
setupSlideshow('.slider-4 .slider-container');