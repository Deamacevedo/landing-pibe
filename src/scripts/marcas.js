// ===== CARRUSEL INFINITO DE MARCAS CON GSAP =====
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import scrollOptimizer from './scroll-optimizer.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 CARRUSEL DE MARCAS INICIALIZADO');

  // ===== ELEMENTOS =====
  const section = document.querySelector('#marcas');
  const carousel = document.querySelector('#carousel-track');
  // FIX: convertimos NodeList a Array para evitar warning en GSAP
  const brandItems = Array.from(document.querySelectorAll('.brand-item'));

  if (!section || !carousel || brandItems.length === 0) {
    console.log('❌ No se encontraron elementos del carrusel');
    return;
  }

  console.log(`📊 ${brandItems.length} elementos de marca encontrados`);

  // ===== CONFIGURACIÓN DEL CARRUSEL =====
  let carouselAnimation;
  const totalItems = brandItems.length;
  const itemsPerSet = 4; // 4 marcas originales
  const itemWidth = 280 + 64; // 280px + margin (32px * 2)

  // ===== INICIALIZACIÓN DE ELEMENTOS =====
  function initializeBrandItems() {
    brandItems.forEach((item, index) => {
      // Estado inicial oculto
      gsap.set(item, {
        opacity: 0,
        y: 30,
        scale: 0.9
      });
    });

    console.log('✅ Elementos de marca inicializados');
  }

  // ===== ANIMACIÓN DE ENTRADA DE ELEMENTOS =====
  function animateItemsIn() {
    brandItems.forEach((item, index) => {
      scrollOptimizer.optimizedTo(item, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out"
      });

      // Agregar clase para CSS
      setTimeout(() => {
        item.classList.add('animate-in');
      }, index * 100);
    });
  }

  // ===== CARRUSEL INFINITO PRINCIPAL =====
  function createInfiniteCarousel() {
    // Calcular la distancia total para un ciclo completo (4 elementos)
    const totalDistance = itemWidth * itemsPerSet;
    
    // Crear la animación infinita
    carouselAnimation = gsap.to(carousel, {
      x: -totalDistance,
      duration: 20, // 20 segundos para un ciclo completo
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          // Resetear posición cuando se complete un ciclo
          const numValue = parseFloat(x);
          return `${numValue % totalDistance}px`;
        }
      }
    });

    console.log('🔄 Carrusel infinito creado');
  }

  // ===== EFECTOS DE HOVER MEJORADOS =====
  function setupHoverEffects() {
    brandItems.forEach((item) => {
      const logo = item.querySelector('.brand-logo');
      const placeholder = item.querySelector('.logo-placeholder');
      
      if (!logo || !placeholder) return;

      // Hover in
      item.addEventListener('mouseenter', () => {
        scrollOptimizer.optimizedTo(logo, {
          y: -8,
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out"
        });

        scrollOptimizer.optimizedTo(placeholder, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });

        // Ralentizar carrusel en hover
        if (carouselAnimation) {
          scrollOptimizer.optimizedTo(carouselAnimation, {
            timeScale: 0.3,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });

      // Hover out
      item.addEventListener('mouseleave', () => {
        scrollOptimizer.optimizedTo(logo, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });

        scrollOptimizer.optimizedTo(placeholder, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });

        // Restaurar velocidad del carrusel
        if (carouselAnimation) {
          scrollOptimizer.optimizedTo(carouselAnimation, {
            timeScale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    });

    console.log('✨ Efectos de hover configurados');
  }

  // ===== SCROLL TRIGGER PARA ANIMACIÓN DE ENTRADA =====
  function setupScrollTrigger() {
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        animateItemsIn();
        // Pequeño delay antes de iniciar el carrusel
        setTimeout(() => {
          createInfiniteCarousel();
        }, 800);
      },
      once: true
    });

    console.log('📜 ScrollTrigger configurado');
  }

  // ===== MANEJO DE RESIZE RESPONSIVO =====
  function handleResize() {
    const updateCarousel = () => {
      if (carouselAnimation) {
        carouselAnimation.kill();
      }
      
      // Recalcular dimensiones basado en viewport
      const newItemWidth = window.innerWidth < 768 ? 200 + 32 : 280 + 64;
      const newTotalDistance = newItemWidth * itemsPerSet;
      
      // Recrear animación con nuevas dimensiones
      carouselAnimation = gsap.to(carousel, {
        x: -newTotalDistance,
        duration: 20,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const numValue = parseFloat(x);
            return `${numValue % newTotalDistance}px`;
          }
        }
      });
    };

    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateCarousel, 250);
    });

    console.log('📱 Manejo de resize configurado');
  }

  // ===== CONTROLES DE PAUSA/PLAY =====
  function setupPlayPauseControls() {
    // Pausar en hover del contenedor completo
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => {
        if (carouselAnimation) {
          carouselAnimation.pause();
        }
      });

      carouselContainer.addEventListener('mouseleave', () => {
        if (carouselAnimation) {
          carouselAnimation.resume();
        }
      });
    }

    // Pausar cuando la pestaña no está visible
    document.addEventListener('visibilitychange', () => {
      if (carouselAnimation) {
        if (document.hidden) {
          carouselAnimation.pause();
        } else {
          carouselAnimation.resume();
        }
      }
    });

    console.log('⏯️ Controles de pausa/play configurados');
  }

  // ===== INICIALIZACIÓN PRINCIPAL =====
  function init() {
    // Registrar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Inicializar elementos
    initializeBrandItems();
    
    // Configurar efectos y controles
    setupHoverEffects();
    setupScrollTrigger();
    setupPlayPauseControls();
    handleResize();

    console.log('✅ Carrusel de marcas completamente inicializado');
  }

  // ===== CLEANUP AL SALIR =====
  function cleanup() {
    if (carouselAnimation) {
      carouselAnimation.kill();
    }
    ScrollTrigger.getAll().forEach(st => st.kill());
  }

  // Event listener para cleanup
  window.addEventListener('beforeunload', cleanup);

  // Inicializar todo
  init();
});