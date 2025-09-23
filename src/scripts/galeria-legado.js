// Galería de Legado - Script interactivo
document.addEventListener('DOMContentLoaded', function() {
    // Referencias DOM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const closeLightbox = document.getElementById('close-lightbox');
    const prevButton = document.getElementById('prev-image');
    const nextButton = document.getElementById('next-image');

    let currentImageIndex = 0;
    let visibleImages = [];

    // Filtrado de imágenes
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filtrar imágenes
            filterImages(filter);
        });
    });

    function filterImages(categoria) {
        visibleImages = [];

        galeriaItems.forEach((item, index) => {
            const itemCategoria = item.getAttribute('data-categoria');

            if (categoria === 'todas' || itemCategoria === categoria) {
                item.classList.remove('hidden');
                visibleImages.push({
                    element: item,
                    index: index
                });

                // Animación de entrada
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, index * 100);
            } else {
                item.classList.add('hidden');
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
            }
        });

        // Actualizar contador
        updateImageCounter();
    }

    // Lightbox functionality
    galeriaItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = visibleImages.findIndex(img => img.element === item);
            if (currentImageIndex === -1) {
                currentImageIndex = index;
            }
            openLightbox(item);
        });
    });

    function openLightbox(item) {
        const img = item.querySelector('img');
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');

        lightboxContent.innerHTML = `
            <div class="relative">
                <img src="${img.src}" alt="${img.alt}" class="w-full h-auto max-h-[70vh] object-contain">
                <div class="p-6">
                    <h3 class="text-2xl font-bold text-gray-900 mb-3">${title}</h3>
                    <p class="text-gray-600 text-lg">${description}</p>
                    <div class="mt-4 flex items-center text-sm text-gray-500">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
                        </svg>
                        Galería del Pibe Valderrama
                    </div>
                </div>
            </div>
        `;

        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden';

        // Añadir animación de entrada
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    }

    function closeLightboxModal() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Event listeners para el lightbox
    closeLightbox.addEventListener('click', closeLightboxModal);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxModal();
        }
    });

    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('hidden')) {
            switch(e.key) {
                case 'Escape':
                    closeLightboxModal();
                    break;
                case 'ArrowLeft':
                    navigateImage(-1);
                    break;
                case 'ArrowRight':
                    navigateImage(1);
                    break;
            }
        }
    });

    // Navegación entre imágenes
    prevButton.addEventListener('click', () => navigateImage(-1));
    nextButton.addEventListener('click', () => navigateImage(1));

    function navigateImage(direction) {
        const totalImages = visibleImages.length;

        if (totalImages === 0) return;

        currentImageIndex += direction;

        if (currentImageIndex >= totalImages) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = totalImages - 1;
        }

        const currentItem = visibleImages[currentImageIndex].element;
        openLightbox(currentItem);
    }

    // Actualizar contador de imágenes
    function updateImageCounter() {
        const counter = document.querySelector('.image-counter');
        if (counter) {
            counter.textContent = `${visibleImages.length} fotos`;
        }
    }

    // Lazy loading mejorado
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    // Observar todas las imágenes
    galeriaItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            imageObserver.observe(img);
        }
    });

    // Inicializar galería
    filterImages('todas');

    // Scroll reveal effect más suave
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Aplicar observer a elementos de galería
    galeriaItems.forEach(item => {
        scrollObserver.observe(item);
    });

    // Touch/swipe support para mobile
    let startX = 0;
    let endX = 0;

    lightbox.addEventListener('touchstart', e => {
        startX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', e => {
        endX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 100;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                navigateImage(1);
            } else {
                // Swipe right - previous image
                navigateImage(-1);
            }
        }
    }

    // Preload de imágenes para mejor UX
    function preloadImages() {
        galeriaItems.forEach(item => {
            const img = item.querySelector('img');
            const newImg = new Image();
            newImg.src = img.src;
        });
    }

    // Inicializar preload después de un delay
    setTimeout(preloadImages, 2000);

    console.log('🎨 Galería de Legado del Pibe Valderrama inicializada');
});