// Redes Sociales Script - Social Media Wall con embeds reales

document.addEventListener('DOMContentLoaded', function() {
  const section = document.querySelector('#redes');
  const embedCards = section?.querySelectorAll('.bg-white\\/10.backdrop-blur-sm');
  const statisticsCards = section?.querySelectorAll('.bg-white\\/5');
  const finalCTA = section?.querySelector('.bg-gradient-to-r a');
  const socialLinks = section?.querySelectorAll('a[href*="facebook"], a[href*="instagram"], a[href*="tiktok"], a[href*="youtube"]');

  if (!section) return;

  // Animaciones de entrada escalonadas para embeds
  function initializeEntryAnimations() {
    if (!embedCards || !embedCards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          embedCards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 200);
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    // Inicializar cards como invisibles
    embedCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    observer.observe(section);
  }

  // Efectos hover mejorados para embeds
  function enhanceHoverEffects() {
    if (!embedCards || !embedCards.length) return;

    embedCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        // Efecto de elevación suave
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        this.style.filter = 'brightness(1.1)';

        // Sombra mejorada
        this.style.boxShadow = '0 25px 50px -12px rgba(255, 215, 0, 0.3)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.filter = 'brightness(1)';
        this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)';
      });
    });
  }

  // Efectos de contador animado para estadísticas
  function animateCounters() {
    const counters = section.querySelectorAll('.text-4xl.md\\:text-5xl');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = counter.textContent;

          // Extraer número y sufijo
          const numberMatch = target.match(/([0-9.]+)([MK+%]*)/);
          if (!numberMatch) return;

          const targetNum = parseFloat(numberMatch[1]);
          const suffix = numberMatch[2];

          let current = 0;
          const increment = targetNum / 60; // 60 frames para 1 segundo

          const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
              current = targetNum;
              clearInterval(timer);
            }

            // Formatear número
            let displayNum = current;
            if (suffix.includes('.')) {
              displayNum = current.toFixed(1);
            } else {
              displayNum = Math.floor(current);
            }

            counter.textContent = displayNum + suffix;
          }, 16); // ~60fps

          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // Efectos de brillo en estadísticas
  function addStatisticsEffects() {
    statisticsCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 255, 255, 0.15)';
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'all 0.3s ease';
      });

      card.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.05)';
        this.style.transform = 'scale(1)';
      });
    });
  }

  // Tracking de clics en redes sociales
  function setupSocialTracking() {
    socialLinks.forEach(link => {
      link.addEventListener('click', function() {
        const platform = this.href.includes('facebook') ? 'Facebook' :
                        this.href.includes('instagram') ? 'Instagram' :
                        this.href.includes('tiktok') ? 'TikTok' :
                        this.href.includes('youtube') ? 'YouTube' : 'Unknown';

        console.log(`Social media click: ${platform} - ${this.href}`);

        // Efecto visual al hacer clic
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);
      });
    });
  }








  // Función para mejorar la carga de embeds reales
  function enhanceRealEmbeds() {
    // Mejorar el loading de Instagram
    const instagramEmbed = section.querySelector('.instagram-media');
    if (instagramEmbed) {
      instagramEmbed.style.transition = 'opacity 0.5s ease-in-out';
      instagramEmbed.style.opacity = '0.8';

      // Aplicar estilos cuando cargue
      setTimeout(() => {
        instagramEmbed.style.opacity = '1';
      }, 1000);
    }

    // Mejorar el loading de TikTok
    const tiktokEmbed = section.querySelector('.tiktok-embed');
    if (tiktokEmbed) {
      tiktokEmbed.style.transition = 'opacity 0.5s ease-in-out';
      tiktokEmbed.style.opacity = '0.8';

      setTimeout(() => {
        tiktokEmbed.style.opacity = '1';
      }, 1500);
    }

    // Mejorar el iframe de YouTube
    const youtubeIframe = section.querySelector('iframe[src*="youtube"]');
    if (youtubeIframe) {
      youtubeIframe.style.transition = 'opacity 0.5s ease-in-out';
      youtubeIframe.addEventListener('load', () => {
        youtubeIframe.style.opacity = '1';
      });
    }
  }

  // Inicializar todas las funciones
  initializeEntryAnimations();
  enhanceHoverEffects();
  animateCounters();
  addStatisticsEffects();
  setupSocialTracking();
  enhanceRealEmbeds(); // Mejorar embeds reales

  // Cleanup
  window.addEventListener('beforeunload', () => {
    // Limpiar observers si es necesario
  });
});