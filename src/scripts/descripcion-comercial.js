// DescripcionComercial Script - Animaciones y efectos interactivos

document.addEventListener('DOMContentLoaded', function() {
  const section = document.querySelector('#sobre-el');
  const featureCards = section?.querySelectorAll('.bg-white.p-6');
  const statsSection = section?.querySelector('.bg-pibe-gold');
  const imageColumn = section?.querySelector('.order-1.lg\\:order-2');
  
  if (!section) return;

  // Intersection Observer para animaciones al hacer scroll
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Animar feature cards una por una
  function animateFeatureCards() {
    featureCards?.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease-out';
      
      // Observar cada card
      observer.observe(card);
      
      // Animar con delay escalonado
      setTimeout(() => {
        if (card.classList.contains('animate-in')) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }
      }, index * 200);
    });
  }

  // Animar estadísticas con contador
  function animateStats() {
    if (!statsSection) return;
    
    const statNumbers = statsSection.querySelectorAll('.text-2xl.md\\:text-3xl');
    
    observer.observe(statsSection);
    
    function countUp(element, target, duration = 2000) {
      let start = 0;
      const increment = target / (duration / 16);
      
      function timer() {
        start += increment;
        if (start >= target) {
          element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        } else {
          element.textContent = Math.floor(start).toString();
          requestAnimationFrame(timer);
        }
      }
      timer();
    }
    
    // Animar números cuando sea visible
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          
          statNumbers.forEach(stat => {
            const text = stat.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (number) {
              stat.textContent = '0';
              setTimeout(() => {
                countUp(stat, number);
              }, 200);
            }
          });
        }
      });
    }, observerOptions);
    
    statsObserver.observe(statsSection);
  }

  // Efecto hover en feature cards
  function addFeatureCardEffects() {
    featureCards?.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)';
      });
    });
  }

  // Parallax ligero para la imagen
  function addImageParallax() {
    if (!imageColumn) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      // Solo aplicar parallax cuando la sección está visible
      if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
        const parallaxValue = (scrolled - sectionTop) * 0.1;
        imageColumn.style.transform = `translateY(${parallaxValue}px)`;
      }
    });
  }

  // Lazy loading mejorado para la imagen
  function improveImageLoading() {
    const image = imageColumn?.querySelector('img');
    if (!image) return;
    
    // Agregar fade-in cuando la imagen carga
    if (image.complete && image.naturalHeight !== 0) {
      image.style.opacity = '1';
    } else {
      image.style.opacity = '0';
      image.style.transition = 'opacity 0.5s ease-in-out';
      
      image.onload = function() {
        this.style.opacity = '1';
      };
    }
  }

  // Tracking de clicks en CTAs
  function trackCTAClicks() {
    const ctaButtons = section?.querySelectorAll('a[href^="#"]');
    
    ctaButtons?.forEach(button => {
      button.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const text = this.textContent.trim();
        
        // Analytics tracking
        console.log(`CTA clicked: ${text} -> ${href}`);
        
        // Pequeña animación de feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);
      });
    });
  }

  // Inicializar todas las funciones
  animateFeatureCards();
  animateStats();
  addFeatureCardEffects();
  improveImageLoading();
  trackCTAClicks();
  
  // Opcional: parallax (descomentado si se quiere)
  // addImageParallax();
  
  // Reducir animaciones para usuarios con preferencias de accesibilidad
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    // Simplificar animaciones
    featureCards?.forEach(card => {
      card.style.transform = 'none';
      card.style.transition = 'opacity 0.3s ease';
    });
  }
});