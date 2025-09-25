// Header Navigation Script - Navegación suave y efectos del header

document.addEventListener('DOMContentLoaded', function () {
  // Navegación suave para todos los enlaces internos
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calcular offset para el header fijo
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Actualizar estado activo del menú
        updateActiveNavItem(targetId);
      }
    });
  });

  // Cambiar transparencia del header al hacer scroll
  let lastScrollTop = 0;
  // Si estamos en la página de 'historia', forzar header scrolled al cargar
  const pathname = window.location.pathname || '/';
  const isHistoria = pathname.replace(/\/$/, '') === '/historia' || pathname.startsWith('/historia');
  if (isHistoria) {
    const header = document.querySelector('header');
    if (header) {
      header.classList.add('scrolled');
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      header.style.backdropFilter = 'blur(12px)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      const logo = header.querySelector('.logo h1');
      const navLinks = header.querySelectorAll('nav ul li a');
      if (logo) logo.style.color = 'white';
      navLinks.forEach(link => link.style.color = 'white');
    }
  }
  window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const logo = header.querySelector('.logo h1');
    const navLinks = header.querySelectorAll('nav ul li a');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      header.style.backdropFilter = 'blur(12px)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';

      // Cambiar colores del texto cuando está scrolled
      logo.style.color = 'white';
      navLinks.forEach(link => {
        link.style.color = 'white';
      });
    } else {
      // If we're on the Historia page, keep the header in scrolled (dark) state always
      if (isHistoria) {
        // Leave the scrolled styles applied
        header.classList.add('scrolled');
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        header.style.backdropFilter = 'blur(12px)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        logo.style.color = 'white';
        navLinks.forEach(link => link.style.color = 'white');
      } else {
        header.classList.remove('scrolled');
        header.style.backgroundColor = 'transparent';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = 'none';

        // Mantener colores blancos originales
        logo.style.color = 'white';
        navLinks.forEach(link => {
          link.style.color = 'white';
        });
      }
    }

    // Actualizar elemento activo basado en scroll
    updateActiveNavOnScroll();

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  // Función para actualizar navegación activa
  function updateActiveNavItem(activeId) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === activeId) {
        link.classList.add('active');
      }
    });
  }

  // Función para actualizar navegación activa en scroll
  function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('header').offsetHeight;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionId = '#' + section.id;
      const navLink = document.querySelector(`a[href="${sectionId}"]`);

      if (rect.top <= headerHeight + 50 && rect.bottom >= headerHeight + 50) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  }

  // Menu móvil
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link, .mobile-menu-cta');
  let savedScrollPosition = 0;

  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuButton.classList.remove('active');
    document.body.classList.remove('mobile-menu-open');

    // Limpiar el estilo top del body
    document.body.style.top = '';

    // Restaurar posición de scroll
    window.scrollTo(0, savedScrollPosition);
  }

  function openMobileMenu() {
    // Guardar posición actual de scroll
    savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    mobileMenu.classList.add('active');
    mobileMenuButton.classList.add('active');
    document.body.classList.add('mobile-menu-open');

    // Fijar la posición del body en la posición actual
    document.body.style.top = `-${savedScrollPosition}px`;
  }

  if (mobileMenuButton && mobileMenu) {
    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function () {
      if (mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close button
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu when clicking on links
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) {
        closeMobileMenu();
      }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });

    // Close mobile menu on window resize (if switching to desktop)
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }
});