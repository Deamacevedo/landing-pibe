// ===== TIMELINE HORIZONTAL QUIEN ES OPTIMIZADO =====
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import scrollOptimizer from './scroll-optimizer.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 TIMELINE HORIZONTAL OPTIMIZADO');

  // ===== ELEMENTOS =====
  const wrapper = document.querySelector("#quien-es");
  const track = wrapper?.querySelector(".track");
  const panels = gsap.utils.toArray("#quien-es .panel");
  const progressBar = document.querySelector('.timeline-progress-bar');
  const progressContainer = document.querySelector('.progress-fill-container');

  if (!wrapper || !track || panels.length === 0) {
    console.log('❌ No se encontraron elementos');
    return;
  }

  console.log(`📊 ${panels.length} paneles encontrados`);

  // ===== SCROLL TRIGGER PRINCIPAL OPTIMIZADO =====
  scrollOptimizer.createOptimizedScrollTrigger({
    trigger: wrapper,
    pin: true,
    scrub: 1,
    start: "top top",
    end: () => "+=" + (window.innerHeight * panels.length * 1.5),
    onUpdate: (self) => {
      updateExtendedTimeline(self.progress);
    },
    onEnter: () => {
      wrapper.classList.add('pinned');
      if (progressBar) {
        scrollOptimizer.optimizedTo(progressBar, { opacity: 1, duration: 0.3 });
        progressBar.classList.add('show');
      }
    },
    onLeave: () => {
      wrapper.classList.remove('pinned');
      if (progressBar) {
        scrollOptimizer.optimizedTo(progressBar, { opacity: 0, duration: 0.2 });
        progressBar.classList.remove('show');
      }
      scrollOptimizer.optimizedSet(track, { xPercent: -100 * (panels.length - 1) });
    },
    onLeaveBack: () => {
      wrapper.classList.add('pinned');
    }
  });

  // ===== FUNCIÓN PRINCIPAL DE ACTUALIZACIÓN OPTIMIZADA =====
  function updateExtendedTimeline(globalProgress) {
    const totalPanels = panels.length;
    const panelIndex = Math.min(Math.floor(globalProgress * totalPanels), totalPanels - 1);
    const localProgress = (globalProgress * totalPanels) % 1;

    updateProgressBar(globalProgress);

    if (panelIndex === totalPanels - 1) {
      handleFinalPanel(localProgress);
    } else {
      updatePanelsWithExtendedLogic(panelIndex, localProgress);
    }
  }

  // ===== MANEJO OPTIMIZADO DEL ÚLTIMO PANEL =====
  function handleFinalPanel(localProgress) {
    const lastPanelIndex = panels.length - 1;
    const lastPanel = panels[lastPanelIndex];
    
    scrollOptimizer.optimizedSet(track, { xPercent: -100 * lastPanelIndex });
    
    const elements = getElementsFromPanel(lastPanel);

    // Ocultar todos los otros paneles
    panels.forEach((panel, index) => {
      if (index !== lastPanelIndex) {
        panel.classList.remove('active');
        hideAllElements(getElementsFromPanel(panel));
      }
    });

    if (localProgress <= 0.8) {
      lastPanel.classList.add('active');
      animateElementsInSequenceOptimized(elements, localProgress / 0.8);
    } else {
      const exitProgress = (localProgress - 0.8) / 0.2;
      const allElements = Object.values(elements).flat().filter(Boolean);
      
      allElements.forEach(el => {
        if (el) {
          scrollOptimizer.optimizedTo(el, {
            opacity: 1 - exitProgress,
            y: -15 * exitProgress,
            scale: 1 - (0.03 * exitProgress)
          });
        }
      });
    }
  }

  // ===== ACTUALIZAR PANELES CON LÓGICA HORIZONTAL OPTIMIZADA =====
  function updatePanelsWithExtendedLogic(currentPanel, localProgress) {
    panels.forEach((panel, index) => {
      const elements = getElementsFromPanel(panel);

      if (index === currentPanel) {
        panel.classList.add('active');

        if (localProgress > 0.9) {
          const moveProgress = (localProgress - 0.9) / 0.1;
          const targetX = -100 * index - (moveProgress * 100);
          scrollOptimizer.optimizedSet(track, { xPercent: targetX });
          
          const allElements = Object.values(elements).flat().filter(Boolean);
          allElements.forEach(el => {
            if (el) {
              scrollOptimizer.optimizedTo(el, {
                opacity: 1 - moveProgress,
                y: -10 * moveProgress
              });
            }
          });
        } else {
          scrollOptimizer.optimizedSet(track, { xPercent: -100 * index });
        }

        if (localProgress <= 0.85) {
          animateElementsInSequenceOptimized(elements, localProgress);
        }

      } else {
        panel.classList.remove('active');
        hideAllElements(elements);
      }
    });
  }

  // ===== FUNCIÓN AUXILIAR PARA OBTENER ELEMENTOS =====
  function getElementsFromPanel(panel) {
    return {
      image: panel.querySelector('.timeline-image'),
      text: panel.querySelector('.timeline-text'),
      yearBadge: panel.querySelector('.year-badge'),
      title: panel.querySelector('h1, h2, h3'),
      // FIX: convertimos NodeList a Array para evitar warning en GSAP
      paragraphs: Array.from(panel.querySelectorAll('p')),
      blockquote: panel.querySelector('blockquote'),
      // FIX: convertimos NodeList a Array para evitar warning en GSAP
      statCards: Array.from(panel.querySelectorAll('.stat-card')),
      // FIX: convertimos NodeList a Array para evitar warning en GSAP
      worldCups: Array.from(panel.querySelectorAll('.world-cup')),
      achievements: panel.querySelector('.achievements'),
      legacyStats: panel.querySelector('.legacy-stats'),
      familyInfo: panel.querySelector('.family-info')
    };
  }

  // ===== ANIMAR ELEMENTOS EN SECUENCIA OPTIMIZADA =====
  function animateElementsInSequenceOptimized(elements, progress) {
    // Imagen (0-15%)
    if (elements.image) {
      const imageProgress = Math.min(progress * 6.67, 1);
      scrollOptimizer.optimizedTo(elements.image, {
        opacity: imageProgress,
        y: (1 - imageProgress) * 20,
        scale: 0.95 + (0.05 * imageProgress)
      });
    }

    // Year Badge (15-25%)
    if (elements.yearBadge) {
      const badgeProgress = Math.max(0, Math.min((progress - 0.15) * 10, 1));
      scrollOptimizer.optimizedTo(elements.yearBadge, {
        opacity: badgeProgress,
        scale: badgeProgress,
        rotation: -90 + (90 * badgeProgress)
      });
    }

    // Contenedor de texto (25-35%)
    if (elements.text) {
      const textProgress = Math.max(0, Math.min((progress - 0.25) * 10, 1));
      scrollOptimizer.optimizedTo(elements.text, {
        opacity: textProgress,
        y: (1 - textProgress) * 25
      });
    }

    // Título (30-40%)
    if (elements.title) {
      const titleProgress = Math.max(0, Math.min((progress - 0.3) * 10, 1));
      scrollOptimizer.optimizedTo(elements.title, {
        opacity: titleProgress,
        x: (1 - titleProgress) * -20
      });
    }

    // Párrafos (35-50%)
    if (elements.paragraphs.length > 0) {
      elements.paragraphs.forEach((p, index) => {
        const pStart = 0.35 + (index * 0.02);
        const pProgress = Math.max(0, Math.min((progress - pStart) * 15, 1));
        scrollOptimizer.optimizedTo(p, {
          opacity: pProgress,
          y: (1 - pProgress) * 15
        });
      });
    }

    // Elementos especiales (45-65%)
    const specialElements = [
      elements.statCards,
      elements.worldCups,
      [elements.achievements, elements.legacyStats, elements.familyInfo].filter(Boolean)
    ].flat().filter(Boolean);

    specialElements.forEach((el, index) => {
      if (!el) return;
      const specialStart = 0.45 + (index * 0.015);
      const specialProgress = Math.max(0, Math.min((progress - specialStart) * 12, 1));
      scrollOptimizer.optimizedTo(el, {
        opacity: specialProgress,
        scale: 0.95 + (0.05 * specialProgress),
        y: (1 - specialProgress) * 20
      });
    });

    // Blockquote (60-70%)
    if (elements.blockquote) {
      const quoteProgress = Math.max(0, Math.min((progress - 0.6) * 10, 1));
      scrollOptimizer.optimizedTo(elements.blockquote, {
        opacity: quoteProgress,
        x: (1 - quoteProgress) * 15
      });
    }

    // Estabilizar elementos (70-85%)
    if (progress > 0.7 && progress <= 0.85) {
      const allElements = Object.values(elements).flat().filter(Boolean);
      allElements.forEach(el => {
        if (el) {
          scrollOptimizer.optimizedTo(el, {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.1
          });
        }
      });
    }
  }

  // ===== FUNCIONES DE UTILIDAD OPTIMIZADAS =====
  function hideAllElements(elements) {
    const allElements = Object.values(elements).flat().filter(Boolean);
    allElements.forEach(el => {
      scrollOptimizer.optimizedSet(el, { opacity: 0 });
    });
  }

  // ===== BARRA DE PROGRESO HORIZONTAL OPTIMIZADA =====
  function updateProgressBar(progress) {
    const containerWidth = progress * 100;

    if (progressContainer) {
      scrollOptimizer.optimizedTo(progressContainer, {
        width: `${containerWidth}%`,
        duration: 0.2
      });
    }
  }

  console.log('✅ Timeline horizontal optimizado inicializado');
});