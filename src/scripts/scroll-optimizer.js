// ===== SCROLL OPTIMIZER - GSAP + LENIS OPTIMIZADO =====
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Configuración global para máximo rendimiento
gsap.registerPlugin(ScrollTrigger);

class ScrollOptimizer {
  constructor() {
    this.lenis = null;
    this.isInitialized = false;
    this.rafId = null;
    this.lastScrollTime = 0;
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    // Solo una instancia de Lenis para toda la aplicación
    if (typeof Lenis !== 'undefined' && !window.__lenisInstance) {
      this.lenis = new Lenis({
        lerp: 0.1,              // Más rápido que 0.05
        wheelMultiplier: 1,      // Velocidad normal
        smoothWheel: true,
        normalizeWheel: true,
        touchMultiplier: 2,      // Mejor en móvil
        infinite: false
      });

      // Marcar instancia global
      window.__lenisInstance = this.lenis;

      // RAF optimizado con throttling
      const raf = (time) => {
        // Throttle a 60fps máximo
        if (time - this.lastScrollTime > 16) {
          this.lenis.raf(time);
          this.lastScrollTime = time;
        }
        this.rafId = requestAnimationFrame(raf);
      };

      // ScrollTrigger update optimizado - solo cuando sea necesario
      let scrollUpdatePending = false;
      this.lenis.on('scroll', () => {
        if (!scrollUpdatePending) {
          scrollUpdatePending = true;
          requestAnimationFrame(() => {
            ScrollTrigger.update();
            scrollUpdatePending = false;
          });
        }
      });

      this.rafId = requestAnimationFrame(raf);
      console.log('✅ Lenis optimizado iniciado');
    } else if (window.__lenisInstance) {
      this.lenis = window.__lenisInstance;
    }

    this.isInitialized = true;
  }

  // Método para crear ScrollTriggers optimizados
  createOptimizedScrollTrigger(config) {
    const defaultConfig = {
      ease: "none",
      scrub: 1,           // Más suave que `true`
      invalidateOnRefresh: true,
      refreshPriority: -90
    };

    return ScrollTrigger.create({ ...defaultConfig, ...config });
  }

  // Animaciones GSAP optimizadas
  optimizedTo(target, vars) {
    const defaultVars = {
      duration: 0.1,        // Más rápido
      ease: "none",
      overwrite: "auto"
    };

    return gsap.to(target, { ...defaultVars, ...vars });
  }

  optimizedSet(target, vars) {
    return gsap.set(target, { 
      ...vars,
      force3D: true,       // Hardware acceleration
      transformOrigin: "center center"
    });
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    if (this.lenis && window.__lenisInstance === this.lenis) {
      this.lenis.destroy();
      window.__lenisInstance = null;
    }
  }
}

// Instancia singleton
if (!window.__scrollOptimizer) {
  window.__scrollOptimizer = new ScrollOptimizer();
}

export default window.__scrollOptimizer;