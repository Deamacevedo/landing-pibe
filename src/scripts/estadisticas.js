// EstadisticasAudiencia Script - Animaciones profesionales y efectos interactivos

document.addEventListener('DOMContentLoaded', function() {
  const section = document.querySelector('#estadisticas-section');
  const counterNumbers = document.querySelectorAll('.counter-number');
  const percentageCounters = document.querySelectorAll('.percentage-counter');
  const progressBars = document.querySelectorAll('.progress-bar');

  if (!section) return;

  let hasAnimated = false;

  // Intersection Observer para activar animaciones
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        // Delay extra para móviles
        setTimeout(() => {
          animateCounters();
        }, 100);
      }
    });
  }, {
    threshold: 0.1, // Threshold más bajo para móviles
    rootMargin: '50px' // Margen para activar antes
  });

  observer.observe(section);

  // Contadores de números animados
  function animateCounters() {
    if (hasAnimated) return;

    console.log('Iniciando animaciones de contadores');

    // Contadores principales
    counterNumbers.forEach((counter, index) => {
      const target = parseFloat(counter.dataset.target);
      console.log(`Animando contador ${index}:`, target);
      setTimeout(() => {
        animateNumber(counter, target, 1500, index === 0);
      }, index * 200);
    });

    // Contadores de porcentajes
    percentageCounters.forEach((counter, index) => {
      const target = parseInt(counter.dataset.target);
      console.log(`Animando porcentaje ${index}:`, target);
      setTimeout(() => {
        animatePercentage(counter, target, 1000);
      }, index * 150);
    });

    // Barras de progreso - no animar en móviles para evitar problemas
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      progressBars.forEach((bar, index) => {
        const width = parseInt(bar.dataset.width);
        setTimeout(() => {
          bar.style.width = width + '%';
        }, index * 150 + 300);
      });
    }

    hasAnimated = true;
  }

  // Función genérica para animar números
  function animateNumber(element, target, duration = 2000, isFirst = false) {
    if (!element) return; // Safety check

    let current = 0;
    const increment = target / (duration / 16);

    // Verificar si el elemento es visible
    const rect = element.getBoundingClientRect();
    if (rect.height === 0) {
      console.warn('Element not visible:', element);
      element.textContent = formatNumber(target, isFirst);
      return;
    }

    function updateNumber() {
      current += increment;
      if (current >= target) {
        element.textContent = formatNumber(target, isFirst);
        // Efecto de brillo al finalizar
        element.style.transform = 'scale(1.05)';
        element.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
          element.style.transform = 'scale(1)';
        }, 300);
        return;
      }
      element.textContent = formatNumber(current, isFirst);
      requestAnimationFrame(updateNumber);
    }
    requestAnimationFrame(updateNumber);
  }

  // Función para animar porcentajes
  function animatePercentage(element, target, duration = 1500) {
    if (!element) return; // Safety check

    let current = 0;
    const increment = target / (duration / 16);

    function updatePercentage() {
      current += increment;
      if (current >= target) {
        element.textContent = target + '%';
        return;
      }
      element.textContent = Math.floor(current) + '%';
      requestAnimationFrame(updatePercentage);
    }
    requestAnimationFrame(updatePercentage);
  }

  // Función para formatear números
  function formatNumber(num, isFirst = false) {
    if (isFirst && num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    } else if (num % 1 !== 0) {
      return num.toFixed(1);
    }
    return Math.floor(num).toString();
  }

  // Efectos adicionales para las cards
  const platformCards = document.querySelectorAll('.bg-white.rounded-3xl');
  platformCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '';
    });
  });

  // Debug info
  console.log('Estadísticas de audiencia inicializadas correctamente');
  console.log('Elementos encontrados:');
  console.log('- Section:', section ? 'OK' : 'NOT FOUND');
  console.log('- Counter numbers:', counterNumbers.length);
  console.log('- Percentage counters:', percentageCounters.length);
  console.log('- Progress bars:', progressBars.length);

  // Fallback para dispositivos móviles - activar después de un delay
  setTimeout(() => {
    if (!hasAnimated) {
      console.log('Activando animaciones por fallback (móviles)');
      animateCounters();
    }
  }, 3000);
});