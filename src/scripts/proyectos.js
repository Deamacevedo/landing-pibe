// ===== SECCIÓN PROYECTOS CON SCROLL HORIZONTAL =====
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import scrollOptimizer from './scroll-optimizer.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 SECCIÓN PROYECTOS INICIALIZADA');

  // ===== ELEMENTOS =====
  const section = document.querySelector('#proyectos');
  const scrollContainer = document.querySelector('#proyectos-scroll');
  const proyectoCards = document.querySelectorAll('.proyecto-card');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (!section || !scrollContainer || proyectoCards.length === 0) {
    console.log('❌ No se encontraron elementos de proyectos');
    return;
  }

  console.log(`📊 ${proyectoCards.length} tarjetas de proyecto encontradas`);

  // ===== INICIALIZACIÓN DE ELEMENTOS =====
  function initializeProjectCards() {
    proyectoCards.forEach((card, index) => {
      // Estado inicial oculto
      gsap.set(card, {
        opacity: 0,
        x: 50,
        y: 20,
        scale: 0.9
      });
    });

    // Ocultar indicador inicialmente
    if (scrollIndicator) {
      gsap.set(scrollIndicator, {
        opacity: 0,
        y: 20
      });
    }

    console.log('✅ Tarjetas de proyecto inicializadas');
  }

  // ===== ANIMACIÓN DE ENTRADA ESCALONADA =====
  function animateCardsIn() {
    const tl = gsap.timeline();

    proyectoCards.forEach((card, index) => {
      tl.to(card, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, index * 0.2);

      // Agregar clase CSS para efectos adicionales
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 200);
    });

    // Mostrar indicador de scroll después de las tarjetas
    if (scrollIndicator) {
      tl.to(scrollIndicator, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");
    }

    return tl;
  }

  // ===== SCROLL HORIZONTAL MEJORADO =====
  function setupSmoothScroll() {
    let isScrolling = false;
    
    // Agregar wheel event para desktop
    scrollContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      const delta = e.deltaY || e.deltaX;
      const scrollAmount = delta * 2; // Multiplicador para hacer scroll más sensible
      
      scrollContainer.scrollLeft += scrollAmount;
    }, { passive: false });

    // Detectar inicio y fin de scroll para efectos
    scrollContainer.addEventListener('scroll', () => {
      if (!isScrolling) {
        scrollContainer.classList.add('scrolling');
        isScrolling = true;
      }

      // Debounce para detectar fin de scroll
      clearTimeout(scrollContainer.scrollTimeout);
      scrollContainer.scrollTimeout = setTimeout(() => {
        scrollContainer.classList.remove('scrolling');
        isScrolling = false;
      }, 150);

      // Ocultar indicador al hacer scroll
      if (scrollIndicator && scrollContainer.scrollLeft > 50) {
        gsap.to(scrollIndicator, {
          opacity: 0,
          y: 10,
          duration: 0.3
        });
      } else if (scrollIndicator && scrollContainer.scrollLeft <= 50) {
        gsap.to(scrollIndicator, {
          opacity: 1,
          y: 0,
          duration: 0.3
        });
      }
    });

    console.log('🖱️ Scroll horizontal configurado');
  }

  // ===== EFECTOS HOVER AVANZADOS =====
  function setupHoverEffects() {
    proyectoCards.forEach((card) => {
      const cardInner = card.querySelector('.card-inner');
      const icon = card.querySelector('.icon-container');
      const title = card.querySelector('.proyecto-title');
      const btn = card.querySelector('.proyecto-btn');

      if (!cardInner || !icon || !title) return;

      // Hover in
      card.addEventListener('mouseenter', () => {
        // Efecto de elevación y scale
        scrollOptimizer.optimizedTo(cardInner, {
          y: -10,
          scale: 1.02,
          duration: 0.5,
          ease: "power2.out"
        });

        // Rotación y scale del icono
        scrollOptimizer.optimizedTo(icon, {
          scale: 1.1,
          rotation: 5,
          duration: 0.3,
          ease: "back.out(1.7)"
        });

        // Color dorado del título
        scrollOptimizer.optimizedTo(title, {
          color: "#FCDD09",
          duration: 0.3
        });

        // Efecto en el botón
        if (btn) {
          scrollOptimizer.optimizedTo(btn, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });

      // Hover out
      card.addEventListener('mouseleave', () => {
        scrollOptimizer.optimizedTo(cardInner, {
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });

        scrollOptimizer.optimizedTo(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });

        scrollOptimizer.optimizedTo(title, {
          color: "#ffffff",
          duration: 0.3
        });

        if (btn) {
          scrollOptimizer.optimizedTo(btn, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });
    });

    console.log('✨ Efectos hover configurados');
  }

  // ===== PARALLAX SUTIL EN SCROLL =====
  function setupParallaxEffect() {
    scrollContainer.addEventListener('scroll', () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const progress = scrollLeft / maxScroll;

      proyectoCards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        
        // Calcular si la tarjeta está visible
        const isVisible = cardRect.right > containerRect.left && cardRect.left < containerRect.right;
        
        if (isVisible) {
          // Efecto parallax sutil
          const parallaxAmount = (cardRect.left - containerRect.left) * -0.1;
          const icon = card.querySelector('.icon-container');
          
          if (icon) {
            gsap.set(icon, {
              x: parallaxAmount,
              rotation: parallaxAmount * 0.1
            });
          }
        }
      });
    });

    console.log('🌊 Efecto parallax configurado');
  }

  // ===== SCROLL TRIGGER PARA ANIMACIÓN DE ENTRADA =====
  function setupScrollTrigger() {
    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => {
        animateCardsIn();
      },
      once: true
    });

    console.log('📜 ScrollTrigger configurado');
  }

  // ===== NAVEGACIÓN CON TECLADO =====
  function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (!section.matches(':hover')) return;

      const scrollAmount = 300;
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
          });
          break;
        case 'ArrowRight':
          e.preventDefault();
          scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
          break;
      }
    });

    console.log('⌨️ Navegación con teclado configurada');
  }

  // ===== INDICADORES DINÁMICOS =====
  function setupScrollIndicators() {
    if (!scrollIndicator) return;

    // Actualizar texto del indicador basado en dispositivo
    const isTouchDevice = 'ontouchstart' in window;
    const indicatorText = scrollIndicator.querySelector('span') || scrollIndicator;
    
    if (isTouchDevice) {
      indicatorText.textContent = 'Desliza para ver más proyectos';
    } else {
      indicatorText.textContent = 'Usa las flechas o arrastra para navegar';
    }

    // Auto-ocultar indicador después de un tiempo
    setTimeout(() => {
      if (scrollContainer.scrollLeft === 0) {
        gsap.to(scrollIndicator, {
          opacity: 0.3,
          duration: 2
        });
      }
    }, 5000);

    console.log('📍 Indicadores dinámicos configurados');
  }

  // ===== RESPONSIVE HANDLING =====
  function setupResponsiveHandling() {
    function updateLayout() {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Configuración móvil
        scrollContainer.style.paddingLeft = '1rem';
        scrollContainer.style.paddingRight = '1rem';
      } else {
        // Configuración desktop
        scrollContainer.style.paddingLeft = '2rem';
        scrollContainer.style.paddingRight = '2rem';
      }
    }

    // Ejecutar al cargar
    updateLayout();

    // Escuchar cambios de tamaño
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateLayout, 250);
    });

    console.log('📱 Manejo responsive configurado');
  }

  // ===== INICIALIZACIÓN PRINCIPAL =====
  function init() {
    // Registrar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Inicializar elementos
    initializeProjectCards();
    
    // Configurar funcionalidades
    setupSmoothScroll();
    setupHoverEffects();
    setupParallaxEffect();
    setupScrollTrigger();
    setupKeyboardNavigation();
    setupScrollIndicators();
    setupResponsiveHandling();

    console.log('✅ Sección Proyectos completamente inicializada');
  }

  // ===== CLEANUP =====
  function cleanup() {
    ScrollTrigger.getAll().forEach(st => st.kill());
  }

  window.addEventListener('beforeunload', cleanup);

  // Inicializar todo
  init();
});