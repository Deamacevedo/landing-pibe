// Proyectos Script - Carrusel funcional y modal de detalles

document.addEventListener('DOMContentLoaded', function() {
  const section = document.querySelector('#proyectos');
  const carousel = section?.querySelector('.flex.overflow-x-auto');
  const projectCards = section?.querySelectorAll('.flex-shrink-0.bg-white');
  const ctaButton = section?.querySelector('.bg-pibe-gold a');
  
  if (!section || !carousel) return;

  // Auto-scroll del carrusel de proyectos
  let isAutoScrolling = true;
  let autoScrollInterval;
  let currentIndex = 0;

  function startAutoScroll() {
    if (!isAutoScrolling || projectCards.length <= 1) return;
    
    autoScrollInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % projectCards.length;
      scrollToProject(currentIndex);
    }, 5000); // Cada 5 segundos
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    isAutoScrolling = false;
  }

  function scrollToProject(index) {
    if (!projectCards[index]) return;
    
    const card = projectCards[index];
    const cardRect = card.getBoundingClientRect();
    const carouselRect = carousel.getBoundingClientRect();
    const scrollLeft = card.offsetLeft - (carouselRect.width / 2) + (cardRect.width / 2);
    
    carousel.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  }

  // Modal de detalles del proyecto
  function createProjectModal() {
    const modal = document.createElement('div');
    modal.id = 'project-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 pointer-events-none transition-all duration-300';
    
    modal.innerHTML = `
      <div class="bg-white rounded-2xl p-8 max-w-2xl mx-4 transform scale-90 transition-all duration-300">
        <div class="flex justify-between items-start mb-6">
          <h3 id="modal-title" class="text-3xl font-bold text-gray-900"></h3>
          <button id="close-modal" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div id="modal-content" class="space-y-4">
          <div class="flex items-center gap-4 mb-4">
            <div id="modal-icon" class="w-16 h-16 rounded-xl flex items-center justify-center text-2xl"></div>
            <div>
              <div id="modal-category" class="font-semibold"></div>
              <div id="modal-year" class="text-pibe-gold"></div>
            </div>
          </div>
          <p id="modal-description" class="text-gray-700 leading-relaxed"></p>
          <div id="modal-details" class="grid grid-cols-2 gap-4 mt-6"></div>
          <div class="flex gap-4 mt-6">
            <button id="modal-cta" class="bg-pibe-gold hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition-colors duration-300"></button>
            <a id="modal-link" href="#" target="_blank" class="border-2 border-pibe-gold text-pibe-gold hover:bg-pibe-gold hover:text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300">Ver más</a>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listeners del modal
    const closeBtn = modal.querySelector('#close-modal');
    const modalBg = modal;
    
    closeBtn?.addEventListener('click', closeModal);
    modalBg.addEventListener('click', (e) => {
      if (e.target === modalBg) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function showProjectModal(projectData) {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    // Llenar el modal con datos del proyecto
    modal.querySelector('#modal-title').textContent = projectData.title;
    modal.querySelector('#modal-icon').textContent = projectData.icon;
    modal.querySelector('#modal-icon').className = `w-16 h-16 ${projectData.iconBg} rounded-xl flex items-center justify-center text-2xl text-white`;
    modal.querySelector('#modal-category').textContent = projectData.category;
    modal.querySelector('#modal-year').textContent = projectData.year;
    modal.querySelector('#modal-description').textContent = projectData.description;
    modal.querySelector('#modal-cta').textContent = projectData.ctaText;
    modal.querySelector('#modal-link').href = projectData.link || '#';
    
    // Detalles adicionales
    const detailsContainer = modal.querySelector('#modal-details');
    detailsContainer.innerHTML = '';
    
    if (projectData.details) {
      Object.entries(projectData.details).forEach(([key, value]) => {
        const detail = document.createElement('div');
        detail.innerHTML = `
          <div class="text-sm text-gray-500 font-medium">${key}</div>
          <div class="font-semibold">${value}</div>
        `;
        detailsContainer.appendChild(detail);
      });
    }
    
    // Mostrar modal
    modal.style.pointerEvents = 'auto';
    modal.style.opacity = '1';
    modal.querySelector('.bg-white').style.transform = 'scale(1)';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    modal.style.opacity = '0';
    modal.querySelector('.bg-white').style.transform = 'scale(0.9)';
    setTimeout(() => {
      modal.style.pointerEvents = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }

  // Datos de los proyectos
  const projectsData = {
    0: {
      title: '"Por un puñado de pelos"',
      icon: '🎬',
      iconBg: 'bg-red-600',
      category: 'Cine',
      year: '2014',
      description: 'Película colombiana donde el Pibe Valderrama participó como actor, mostrando su versatilidad más allá del fútbol y su carisma natural en pantalla. Una comedia que explora temas de identidad y humor colombiano.',
      ctaText: 'Ver trailer',
      link: 'https://www.youtube.com/watch?v=example',
      details: {
        'Género': 'Comedia',
        'Director': 'Marcel Rasquin',
        'Duración': '95 minutos',
        'Recaudación': '$2.1M USD'
      }
    },
    1: {
      title: 'RT en Español - Mundial Rusia',
      icon: '📺',
      iconBg: 'bg-green-600',
      category: 'Televisión',
      year: '2018',
      description: 'Comentarista oficial para RT en Español durante el Mundial de Rusia 2018, ofreciendo análisis experto y entretenido que llegó a millones de espectadores hispanohablantes alrededor del mundo.',
      ctaText: 'Ver clips',
      link: 'https://www.youtube.com/watch?v=example',
      details: {
        'Formato': 'Comentarios deportivos',
        'Audiencia': '15M+ espectadores',
        'Partidos': '32 encuentros',
        'Idioma': 'Español'
      }
    },
    2: {
      title: 'Canal de YouTube',
      icon: '🎥',
      iconBg: 'bg-red-500',
      category: 'Digital',
      year: 'Presente',
      description: 'Contenido regular en su canal oficial con 380K suscriptores, incluyendo entrevistas exclusivas, análisis futbolísticos profundos y momentos personales únicos que muestran la personalidad auténtica del Pibe.',
      ctaText: 'Suscribirse',
      link: 'https://www.youtube.com/@pibevalderrama',
      details: {
        'Suscriptores': '380K+',
        'Videos': '150+ publicados',
        'Visualizaciones': '25M+ totales',
        'Frecuencia': 'Semanal'
      }
    }
  };

  // Configurar clicks en las cards
  function setupProjectClicks() {
    projectCards?.forEach((card, index) => {
      const verMasBtn = card.querySelector('a');
      
      card.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          e.preventDefault();
          showProjectModal(projectsData[index]);
        }
      });
      
      verMasBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        showProjectModal(projectsData[index]);
      });
    });
  }

  // Efectos hover en las cards
  function addProjectHoverEffects() {
    projectCards?.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
      });
    });
  }

  // Animaciones de entrada
  function setupProjectAnimations() {
    projectCards?.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateX(30px)';
      card.style.transition = 'all 0.8s ease-out';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          projectCards?.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateX(0)';
            }, index * 200);
          });
        }
      });
    }, { threshold: 0.3 });

    if (section) observer.observe(section);
  }

  // Controles de navegación del carrusel
  function addCarouselControls() {
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'flex justify-center gap-3 mt-6';
    
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '←';
    prevBtn.className = 'w-10 h-10 bg-pibe-gold hover:bg-yellow-500 text-black rounded-full font-bold transition-all duration-300 transform hover:scale-105';
    
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '→';
    nextBtn.className = 'w-10 h-10 bg-pibe-gold hover:bg-yellow-500 text-black rounded-full font-bold transition-all duration-300 transform hover:scale-105';
    
    controlsContainer.appendChild(prevBtn);
    controlsContainer.appendChild(nextBtn);
    
    carousel.parentNode?.insertBefore(controlsContainer, carousel.nextSibling);
    
    prevBtn.addEventListener('click', () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : projectCards.length - 1;
      scrollToProject(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % projectCards.length;
      scrollToProject(currentIndex);
    });
  }

  // Tracking de interacciones
  function setupProjectTracking() {
    ctaButton?.addEventListener('click', () => {
      console.log('Final CTA clicked from Projects section');
    });
    
    // Tracking del modal
    document.addEventListener('modalOpened', (e) => {
      console.log('Project modal opened:', e.detail.project);
    });
  }

  // Pausar auto-scroll en interacciones
  carousel.addEventListener('mouseenter', stopAutoScroll);
  carousel.addEventListener('mouseleave', () => {
    if (isAutoScrolling) {
      setTimeout(startAutoScroll, 2000);
    }
  });

  // Inicializar todas las funciones
  createProjectModal();
  setupProjectClicks();
  addProjectHoverEffects();
  setupProjectAnimations();
  addCarouselControls();
  setupProjectTracking();
  
  // Iniciar auto-scroll después de un delay
  setTimeout(() => {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(startAutoScroll, 2000);
        }
      });
    }, { threshold: 0.5 });
    
    sectionObserver.observe(section);
  }, 1000);
  
  // Cleanup
  window.addEventListener('beforeunload', () => {
    clearInterval(autoScrollInterval);
  });
});