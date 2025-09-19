// MomentosIconicos Script - Cards deslizables para momentos históricos

document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.getElementById('momentos-cards');
    const prevButton = document.getElementById('momentos-prev');
    const nextButton = document.getElementById('momentos-next');

    if (!cardsContainer || !prevButton || !nextButton) return;

    const cardWidth = 320; // Ancho de la card + gap
    let currentScrollPosition = 0;

    function updateButtonStates() {
        const maxScroll = cardsContainer.scrollWidth - cardsContainer.clientWidth;

        prevButton.disabled = currentScrollPosition <= 0;
        nextButton.disabled = currentScrollPosition >= maxScroll;
    }

    function scrollToPosition(position) {
        cardsContainer.scrollTo({
            left: position,
            behavior: 'smooth'
        });
        currentScrollPosition = position;
        updateButtonStates();
    }

    // Event listeners for navigation buttons
    prevButton.addEventListener('click', () => {
        const newPosition = Math.max(0, currentScrollPosition - cardWidth);
        scrollToPosition(newPosition);
    });

    nextButton.addEventListener('click', () => {
        const maxScroll = cardsContainer.scrollWidth - cardsContainer.clientWidth;
        const newPosition = Math.min(maxScroll, currentScrollPosition + cardWidth);
        scrollToPosition(newPosition);
    });

    // Update scroll position when user scrolls manually
    cardsContainer.addEventListener('scroll', () => {
        currentScrollPosition = cardsContainer.scrollLeft;
        updateButtonStates();
    });

    // Initial button state
    updateButtonStates();

    // Update on window resize
    window.addEventListener('resize', updateButtonStates);

    // Animaciones de entrada para las cards
    function animateMomentCards() {
        const cards = cardsContainer.querySelectorAll('.moment-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.2 });

        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease-out';
            observer.observe(card);
        });
    }

    // Inicializar animaciones
    animateMomentCards();
});