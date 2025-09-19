// Hero Section Script - Efectos de parallax y animaciones

document.addEventListener('DOMContentLoaded', function() {
  const hero = document.querySelector('#inicio');
  const heroTitle = hero?.querySelector('h1');
  const heroSubtitle = hero?.querySelector('p');
  const heroQuote = hero?.querySelector('blockquote');
  const heroButtons = hero?.querySelector('.flex');
  
  if (!hero) return;

  // Animación de entrada gradual
  function animateHeroElements() {
    // Configurar elementos para animación
    if (heroSubtitle) {
      heroSubtitle.style.opacity = '0';
      heroSubtitle.style.transform = 'translateY(30px)';
    }
    
    if (heroTitle) {
      heroTitle.style.opacity = '0';
      heroTitle.style.transform = 'translateY(50px)';
    }
    
    if (heroQuote) {
      heroQuote.style.opacity = '0';
      heroQuote.style.transform = 'translateY(30px)';
    }
    
    if (heroButtons) {
      heroButtons.style.opacity = '0';
      heroButtons.style.transform = 'translateY(40px)';
    }

    // Animar elementos con retraso
    setTimeout(() => {
      if (heroSubtitle) {
        heroSubtitle.style.transition = 'all 0.8s ease-out';
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
      }
    }, 200);
    
    setTimeout(() => {
      if (heroTitle) {
        heroTitle.style.transition = 'all 1s ease-out';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
      }
    }, 400);
    
    setTimeout(() => {
      if (heroQuote) {
        heroQuote.style.transition = 'all 0.8s ease-out';
        heroQuote.style.opacity = '1';
        heroQuote.style.transform = 'translateY(0)';
      }
    }, 800);
    
    setTimeout(() => {
      if (heroButtons) {
        heroButtons.style.transition = 'all 0.8s ease-out';
        heroButtons.style.opacity = '1';
        heroButtons.style.transform = 'translateY(0)';
      }
    }, 1200);
  }

  // Efecto parallax ligero
  function handleParallax() {
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;
    
    // Solo aplicar parallax si estamos en la vista del hero
    if (scrolled < heroHeight) {
      const parallaxSpeed = 0.3;
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
  }

  // Efecto de typing para el título
  function typeWriter(element, text, delay = 50) {
    if (!element) return;
    
    element.textContent = '';
    let i = 0;
    const isHTML = text.includes('<');
    
    function type() {
      if (i < text.length) {
        if (isHTML) {
          element.innerHTML = text.substring(0, i + 1);
        } else {
          element.textContent = text.substring(0, i + 1);
        }
        i++;
        setTimeout(type, delay);
      }
    }
    
    setTimeout(type, 1000);
  }

  // Tracking de clicks en botones
  function trackButtonClicks() {
    const ctaButton = hero.querySelector('a[href="#contacto"]');
    const whatsappButton = hero.querySelector('a[href*="wa.me"]');
    
    if (ctaButton) {
      ctaButton.addEventListener('click', function() {
        // Analytics tracking (puede integrarse con Google Analytics)
        console.log('CTA Button clicked from Hero');
      });
    }
    
    if (whatsappButton) {
      whatsappButton.addEventListener('click', function() {
        console.log('WhatsApp Button clicked from Hero');
      });
    }
  }

  // Efecto de brillo en el título
  function addShineEffect() {
    if (heroTitle) {
      heroTitle.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 20px rgba(252, 221, 9, 0.5)';
        this.style.transition = 'text-shadow 0.3s ease';
      });
      
      heroTitle.addEventListener('mouseleave', function() {
        this.style.textShadow = 'none';
      });
    }
  }

  // Inicializar funciones
  animateHeroElements();
  trackButtonClicks();
  addShineEffect();
  
  // Opcional: efecto de typing en el título (descomentado si se quiere usar)
  // const titleText = heroTitle?.textContent || '';
  // typeWriter(heroTitle, titleText, 100);

  // Scroll listener para parallax (descomentado si se quiere efecto parallax)
  // window.addEventListener('scroll', handleParallax);
  
  // Reducir motion para usuarios con preferencias de accesibilidad
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    // Deshabilitar animaciones para usuarios que prefieren menos movimiento
    hero.style.transform = 'none';
  }
});