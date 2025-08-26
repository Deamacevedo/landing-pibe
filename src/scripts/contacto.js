// ===== SECCIÓN DE CONTACTO FINAL CON EFECTOS DINÁMICOS =====
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import scrollOptimizer from './scroll-optimizer.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 SECCIÓN CONTACTO INICIALIZADA');

  // ===== ELEMENTOS =====
  const section = document.querySelector('#contacto');
  const mainTitle = document.querySelector('.main-title');
  const subtitle = document.querySelector('.subtitle');
  const emailCard = document.querySelector('.email-card');
  const finalMessage = document.querySelector('.final-message');
  const copyBtn = document.querySelector('#copy-email-btn');
  const copySuccess = document.querySelector('#copy-success');
  const emailAddress = document.querySelector('.email-address');

  if (!section) {
    console.log('❌ No se encontró la sección de contacto');
    return;
  }

  console.log('📧 Elementos de contacto encontrados');

  // ===== INICIALIZACIÓN DE ELEMENTOS =====
  function initializeElements() {
    // Estados iniciales para animaciones
    if (mainTitle) {
      gsap.set(mainTitle, {
        opacity: 0,
        y: 50,
        scale: 0.9
      });
    }

    if (subtitle) {
      gsap.set(subtitle, {
        opacity: 0,
        y: 30
      });
    }

    if (emailCard) {
      gsap.set(emailCard, {
        opacity: 0,
        y: 40,
        scale: 0.95
      });
    }

    if (finalMessage) {
      gsap.set(finalMessage, {
        opacity: 0,
        y: 20
      });
    }

    console.log('✅ Elementos inicializados para animaciones');
  }

  // ===== ANIMACIÓN DE ENTRADA ESPECTACULAR =====
  function createEntranceAnimation() {
    const tl = gsap.timeline();

    // Título principal con efecto dramático
    if (mainTitle) {
      tl.to(mainTitle, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      });

      // Efecto de brillo en el texto "Pibe"
      // FIX: validamos existencia de .golden-shine antes de animar para evitar warning de GSAP
      const goldenShine = document.querySelector('.golden-shine');
      if (goldenShine) {
        tl.to('.golden-shine', {
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
          repeat: 2,
          yoyo: true
        }, "-=0.8");
      }
    }

    // Subtítulo con retraso elegante
    if (subtitle) {
      tl.to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.6");
    }

    // Card de email con efecto de levitación
    if (emailCard) {
      tl.to(emailCard, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.4");
    }

    // Mensaje final con suavidad
    if (finalMessage) {
      tl.to(finalMessage, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.2");
    }

    // Agregar clases CSS
    setTimeout(() => {
      [mainTitle, subtitle, emailCard, finalMessage].forEach(el => {
        if (el) el.classList.add('animate-in');
      });
    }, 100);

    return tl;
  }

  // ===== FUNCIONALIDAD DE COPIADO DE EMAIL =====
  function setupEmailCopyFunctionality() {
    if (!copyBtn || !copySuccess) return;

    const emailText = 'negocios@pibevalderrama.com';
    
    copyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      try {
        // Intentar usar la API moderna del portapapeles
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailText);
        } else {
          // Fallback para navegadores más antiguos
          const textArea = document.createElement('textarea');
          textArea.value = emailText;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        // Animación de éxito
        showCopySuccess();
        
        console.log('📋 Email copiado al portapapeles');
      } catch (err) {
        console.error('❌ Error al copiar email:', err);
        // Mostrar mensaje de error alternativo
        showCopyError();
      }
    });

    function showCopySuccess() {
      // Cambiar texto del botón temporalmente
      const originalText = copyBtn.querySelector('.copy-text').textContent;
      copyBtn.querySelector('.copy-text').textContent = '¡Copiado!';
      
      // Efecto visual en el botón
      gsap.to(copyBtn, {
        scale: 1.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });

      // Mostrar mensaje de éxito
      copySuccess.classList.add('show');
      gsap.to(copySuccess, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      // Efecto de partículas
      createSuccessParticles();

      // Resetear después de 3 segundos
      setTimeout(() => {
        copyBtn.querySelector('.copy-text').textContent = originalText;
        copySuccess.classList.remove('show');
        gsap.to(copySuccess, {
          opacity: 0,
          y: 4,
          duration: 0.3
        });
      }, 3000);
    }

    function showCopyError() {
      copySuccess.textContent = 'Error al copiar. Selecciona y copia manualmente.';
      copySuccess.style.color = '#fca5a5'; // text-red-300
      copySuccess.classList.add('show');
      
      setTimeout(() => {
        copySuccess.classList.remove('show');
        copySuccess.textContent = '¡Email copiado al portapapeles! ✨';
        copySuccess.style.color = '#86efac'; // text-green-300
      }, 4000);
    }

    console.log('📋 Funcionalidad de copiado configurada');
  }

  // ===== EFECTOS DE PARTÍCULAS DE ÉXITO =====
  function createSuccessParticles() {
    const particles = [];
    const colors = ['#FCDD09', '#FFE55C', '#FFF700', '#FFD700'];
    
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '8px';
      particle.style.height = '8px';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      
      // Posicionar en el botón
      const btnRect = copyBtn.getBoundingClientRect();
      particle.style.left = (btnRect.left + btnRect.width / 2) + 'px';
      particle.style.top = (btnRect.top + btnRect.height / 2) + 'px';
      
      document.body.appendChild(particle);
      particles.push(particle);

      // Animar partícula
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        scale: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: Math.random() * 0.3,
        onComplete: () => {
          particle.remove();
        }
      });
    }
  }

  // ===== EFECTOS HOVER MEJORADOS =====
  function setupHoverEffects() {
    // Hover en el email address
    if (emailAddress) {
      emailAddress.addEventListener('mouseenter', () => {
        gsap.to(emailAddress, {
          scale: 1.05,
          textShadow: "0 0 30px rgba(252, 221, 9, 0.8)",
          duration: 0.3,
          ease: "power2.out"
        });
      });

      emailAddress.addEventListener('mouseleave', () => {
        gsap.to(emailAddress, {
          scale: 1,
          textShadow: "0 0 20px rgba(252, 221, 9, 0.5)",
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }

    // Hover en la card de email
    if (emailCard) {
      emailCard.addEventListener('mouseenter', () => {
        // FIX: validamos existencia de .golden-particles .particle antes de animar para evitar warning de GSAP
        const goldenParticles = document.querySelectorAll('.golden-particles .particle');
        if (goldenParticles.length > 0) {
          gsap.to(goldenParticles, {
            scale: 1.5,
            duration: 0.3,
            stagger: 0.1
          });
        }
      });

      emailCard.addEventListener('mouseleave', () => {
        // FIX: validamos existencia de .golden-particles .particle antes de animar para evitar warning de GSAP
        const goldenParticles = document.querySelectorAll('.golden-particles .particle');
        if (goldenParticles.length > 0) {
          gsap.to(goldenParticles, {
            scale: 1,
            duration: 0.3,
            stagger: 0.05
          });
        }
      });
    }

    console.log('✨ Efectos hover configurados');
  }

  // ===== ANIMACIONES DE ELEMENTOS DE FONDO =====
  function setupBackgroundAnimations() {
    // Animación de formas flotantes más dinámica
    // FIX: convertimos NodeList a Array para evitar warning en GSAP
    const shapes = Array.from(document.querySelectorAll('.floating-shape'));
    shapes.forEach((shape, index) => {
      gsap.set(shape, {
        rotation: Math.random() * 360
      });

      gsap.to(shape, {
        rotation: "+=360",
        duration: 20 + index * 5,
        repeat: -1,
        ease: "none"
      });

      // Movimiento flotante individual
      gsap.to(shape, {
        y: "+=30",
        duration: 4 + index,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });
    });

    // Animación de balones más realista
    // FIX: convertimos NodeList a Array para evitar warning en GSAP
    const footballs = Array.from(document.querySelectorAll('.football-icon'));
    footballs.forEach((ball, index) => {
      gsap.fromTo(ball, {
        y: window.innerHeight + 100,
        rotation: 0,
        opacity: 0.3
      }, {
        y: -100,
        rotation: 720,
        opacity: 0.1,
        duration: 15 + index * 3,
        repeat: -1,
        ease: "none",
        delay: index * 4
      });
    });

    console.log('🎭 Animaciones de fondo configuradas');
  }

  // ===== SCROLL TRIGGER PARA ANIMACIÓN DE ENTRADA =====
  function setupScrollTrigger() {
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        createEntranceAnimation();
      },
      once: true
    });

    console.log('📜 ScrollTrigger configurado');
  }

  // ===== EFECTOS DE CLICK EN EL FONDO =====
  function setupClickEffects() {
    section.addEventListener('click', (e) => {
      // Solo si no es un elemento interactivo
      if (e.target === section || e.target.closest('.floating-shapes')) {
        createClickRipple(e.clientX, e.clientY);
      }
    });

    function createClickRipple(x, y) {
      const ripple = document.createElement('div');
      ripple.style.position = 'fixed';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'radial-gradient(circle, rgba(252,221,9,0.6), transparent)';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '100';
      ripple.style.transform = 'translate(-50%, -50%)';
      
      document.body.appendChild(ripple);

      gsap.to(ripple, {
        width: '200px',
        height: '200px',
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => ripple.remove()
      });
    }

    console.log('👆 Efectos de click configurados');
  }

  // ===== RESPONSIVE HANDLING =====
  function setupResponsiveHandling() {
    function updateForViewport() {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Reducir intensidad de animaciones en mobile
        gsap.set('.floating-shape', { scale: 0.7, opacity: 0.3 });
        gsap.set('.football-icon', { display: 'none' });
      } else {
        gsap.set('.floating-shape', { scale: 1, opacity: 0.6 });
        gsap.set('.football-icon', { display: 'block' });
      }
    }

    updateForViewport();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateForViewport, 250);
    });

    console.log('📱 Manejo responsive configurado');
  }

  // ===== INICIALIZACIÓN PRINCIPAL =====
  function init() {
    gsap.registerPlugin(ScrollTrigger);
    
    initializeElements();
    setupEmailCopyFunctionality();
    setupHoverEffects();
    setupBackgroundAnimations();
    setupScrollTrigger();
    setupClickEffects();
    setupResponsiveHandling();

    console.log('✅ Sección Contacto completamente inicializada');
  }

  // ===== CLEANUP =====
  function cleanup() {
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    // Limpiar partículas si existen
    // FIX: convertimos NodeList a Array para evitar warning en GSAP
    Array.from(document.querySelectorAll('[style*="position: fixed"]')).forEach(el => {
      if (el.style.borderRadius === '50%' && el.style.width === '8px') {
        el.remove();
      }
    });
  }

  window.addEventListener('beforeunload', cleanup);

  // Inicializar todo
  init();
});