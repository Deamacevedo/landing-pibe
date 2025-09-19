// Marcas Script - Carrusel infinito profesional

document.addEventListener('DOMContentLoaded', function() {
  const section = document.querySelector('#marcas');
  const carousel = document.querySelector('#marcas-carousel');
  const brandCards = carousel?.querySelectorAll('.flex-shrink-0');
  const pausePlayBtn = document.querySelector('#pause-play-btn');
  const pauseIcon = document.querySelector('#pause-icon');
  const playIcon = document.querySelector('#play-icon');
  const btnText = document.querySelector('#btn-text');

  if (!section || !carousel || !brandCards.length) return;

  let isPaused = false;

  // Control de pausa/reproducción
  function togglePlayPause() {
    isPaused = !isPaused;

    if (isPaused) {
      carousel.classList.add('paused');
      pauseIcon.classList.add('hidden');
      playIcon.classList.remove('hidden');
      btnText.textContent = 'Reproducir';
    } else {
      carousel.classList.remove('paused');
      pauseIcon.classList.remove('hidden');
      playIcon.classList.add('hidden');
      btnText.textContent = 'Pausar';
    }
  }

  // Configurar eventos del botón
  function setupControls() {
    pausePlayBtn?.addEventListener('click', togglePlayPause);

    // Pausar al hacer hover sobre cualquier card
    brandCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (!isPaused) {
          carousel.classList.add('paused');
        }
      });

      card.addEventListener('mouseleave', () => {
        if (!isPaused) {
          carousel.classList.remove('paused');
        }
      });
    });
  }

  // Efectos visuales mejorados
  function addVisualEffects() {
    brandCards.forEach((card, index) => {
      // Animación de entrada escalonada
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 150);

      // Efectos de hover adicionales
      card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
      });
    });
  }

  // Observador de intersección para animaciones
  function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Iniciar animaciones cuando la sección es visible
          setTimeout(() => {
            addVisualEffects();
          }, 300);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(section);
  }

  // Tracking básico
  function setupTracking() {
    brandCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        const brandName = card.querySelector('h3')?.textContent || `Brand ${index + 1}`;
        console.log(`Brand card clicked: ${brandName}`);

        // Efecto de click
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.style.transform = '';
        }, 150);
      });
    });

    // Tracking del botón de pausa/play
    pausePlayBtn?.addEventListener('click', () => {
      console.log(`Carousel ${isPaused ? 'resumed' : 'paused'}`);
    });
  }

  // Performance y accesibilidad
  function setupAccessibility() {
    // Reducir animaciones para usuarios con preferencias de accesibilidad
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
      carousel.style.animation = 'none';
      brandCards.forEach(card => {
        card.style.transition = 'none';
      });
    }

    // Soporte para teclado
    pausePlayBtn?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    });
  }

  // Inicializar todas las funciones
  setupControls();
  setupScrollAnimations();
  setupTracking();
  setupAccessibility();

  console.log('Carrusel infinito de marcas inicializado correctamente');
});