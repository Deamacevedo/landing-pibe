// ===== SECCIÓN PROYECTOS SIMPLE =====
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const proyectoCards = document.querySelectorAll('.proyecto-card');
  
  if (proyectoCards.length === 0) return;

  // Animación simple de entrada
  gsap.fromTo(proyectoCards, 
    {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#proyectos",
        start: "top 70%",
        once: true
      }
    }
  );

  // Agregar clase para efectos CSS
  proyectoCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate-in');
    }, index * 200);
  });
});