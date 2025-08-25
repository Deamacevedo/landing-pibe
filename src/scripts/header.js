import { gsap } from 'gsap';

  document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item');
    const socialLinks = document.getElementById('social-links');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let menuOpen = false;

    // Menu toggle functionality
    menuToggle.addEventListener('click', () => {
      menuOpen = !menuOpen;
      
      if (menuOpen) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    function openMenu() {
      // Update button state
      menuToggle.classList.add('menu-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      
      // Show overlay
      gsap.set(menuOverlay, { display: 'block' });
      gsap.to(menuOverlay, {
        x: 0,
        duration: 0.5,
        ease: "power3.out"
      });

      // Animate menu items
      gsap.fromTo(menuItems, 
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: "back.out(1.7)"
        }
      );

      // Animate social links
      gsap.fromTo(socialLinks, 
        { 
          y: 30, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          delay: 0.8,
          ease: "power2.out"
        }
      );

      // Animate button with more elegant rotation
      gsap.to(menuToggle, {
        rotation: 90,
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out"
      });

      // Disable body scroll
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      // Update button state
      menuToggle.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      
      // Animate out menu items
      gsap.to(menuItems, {
        y: -50,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in"
      });

      // Animate out social links
      gsap.to(socialLinks, {
        y: 30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });

      // Hide overlay
      gsap.to(menuOverlay, {
        x: '100%',
        duration: 0.5,
        delay: 0.2,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(menuOverlay, { display: 'none' });
        }
      });

      // Animate button back smoothly
      gsap.to(menuToggle, {
        rotation: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });

      // Re-enable body scroll
      document.body.style.overflow = '';
    }

    // Close menu when clicking on navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        console.log('Navigating to:', targetId, 'Element found:', !!targetElement);
        if (targetElement) {
          console.log('Element position:', targetElement.getBoundingClientRect());
          console.log('Current scroll position:', window.pageYOffset);
        }
        
        if (targetElement) {
          // Close menu first
          closeMenu();
          menuOpen = false;
          
          // Alternative approach - use URL hash navigation for better compatibility
          setTimeout(() => {
            // Set the hash first
            window.location.hash = targetId;
            
            // Then scroll to ensure it's visible
            setTimeout(() => {
              targetElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
              });
            }, 100);
            
          }, 900); // Wait for menu to close completely
        } else {
          console.error('Target element not found:', targetId);
        }
      });
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu();
      }
    });

    // Initial button animation
    gsap.fromTo(menuToggle, 
      { 
        scale: 0, 
        rotation: -180 
      },
      { 
        scale: 1, 
        rotation: 0, 
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        delay: 0.5
      }
    );

    // Floating animation for decorative elements
    gsap.to('.animate-pulse', {
      scale: 1.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.5
    });
  });