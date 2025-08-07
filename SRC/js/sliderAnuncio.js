const sliderWrapper = document.querySelector('.slider-wrapper');
        const slides = document.querySelectorAll('.slider-wrapper img');
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        const indicatorsContainer = document.querySelector('.slider-indicators');
        const indicators = document.querySelectorAll('.indicator');

        let currentIndex = 0; 
        const totalSlides = slides.length;

        function updateSlider() {

            const offset = -currentIndex * 100;
            sliderWrapper.style.transform = `translateX(${offset}%)`;

            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        });

        indicators.forEach(indicator => {
            indicator.addEventListener('click', (event) => {
                const index = parseInt(event.target.dataset.index);
                currentIndex = index;
                updateSlider();
            });
        });

        updateSlider();