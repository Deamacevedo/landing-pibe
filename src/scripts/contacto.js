// Contacto Script - Funcionalidad mejorada para copiar email y tracking

document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelector('#contacto');
  const copyEmailBtn = document.getElementById('copy-email');
  const whatsappBtn = section?.querySelector('a[href*="wa.me"]');
  const emailText = 'negocios@pibevalderrama.com';

  if (!section) return;

  // Función mejorada para copiar email
  function setupEmailCopy() {
    if (!copyEmailBtn) return;

    copyEmailBtn.addEventListener('click', async function (e) {
      e.preventDefault();

      try {
        // Intentar usar la API moderna de Clipboard
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailText);
          showSuccessMessage('📧 Email copiado al portapapeles');
        } else {
          // Fallback para navegadores más antiguos
          copyToClipboardFallback(emailText);
          showSuccessMessage('📧 Email copiado al portapapeles');
        }

        // Animación de feedback
        animateButton(this);

        // Tracking del evento
        trackEmailCopy();

      } catch (err) {
        console.error('Error al copiar email:', err);
        showErrorMessage('❌ Error al copiar. Intenta manualmente.');
      }
    });
  }

  // Fallback para copiar texto en navegadores antiguos
  function copyToClipboardFallback(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      textArea.remove();
    } catch (err) {
      textArea.remove();
      throw err;
    }
  }

  // Mostrar mensaje de éxito
  function showSuccessMessage(message) {
    const toast = createToast(message, 'success');
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }

  // Mostrar mensaje de error
  function showErrorMessage(message) {
    const toast = createToast(message, 'error');
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }

  // Crear elemento de notificación toast
  function createToast(message, type) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 9999;
      opacity: 0;
      transform: translateY(-20px);
      transition: all 0.3s ease;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    `;
    toast.textContent = message;
    return toast;
  }

  // Animación del botón al hacer click
  function animateButton(button) {
    const originalText = button.textContent;
    const originalBg = button.style.backgroundColor;

    // Cambiar texto y color temporalmente
    button.textContent = '✓ ¡Copiado!';
    button.style.backgroundColor = '#10b981';
    button.style.transform = 'scale(0.95)';

    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 150);

    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = originalBg;
    }, 2000);
  }

  // Tracking de WhatsApp clicks
  function setupWhatsAppTracking() {
    if (!whatsappBtn) return;

    whatsappBtn.addEventListener('click', function () {
      // Analytics tracking
      console.log('WhatsApp button clicked from Contact section');

      // Opcional: enviar evento a Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'Contact',
          event_label: 'WhatsApp',
          value: 1
        });
      }
    });
  }

  // Tracking de copia de email
  function trackEmailCopy() {
    console.log('Email copied from Contact section');

    // Opcional: enviar evento a Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'Contact',
        event_label: 'Copy Email',
        value: 1
      });
    }
  }

  // Animaciones de entrada para la sección
  function setupSectionAnimations() {
    const cards = section?.querySelectorAll('.bg-white\\/10');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 200);
        }
      });
    }, { threshold: 0.2 });

    cards?.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease-out';
      observer.observe(card);
    });
  }

  // Validación del formulario (si se agrega en el futuro)
  function setupFormValidation() {
    const form = section?.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      // Aquí se puede agregar validación de formulario
      console.log('Form submitted');
    });
  }

  // Inicializar todas las funciones
  setupEmailCopy();
  setupWhatsAppTracking();
  setupSectionAnimations();
  setupFormValidation();

  // Ya no es necesario este código - los enlaces mailto se manejan directamente en los componentes
  // sin usar target="_blank" que causaba pestañas vacías

  // Detectar si el usuario llega directamente a la sección de contacto
  if (window.location.hash === '#contacto') {
    setTimeout(() => {
      const contactSection = document.querySelector('#contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }
});