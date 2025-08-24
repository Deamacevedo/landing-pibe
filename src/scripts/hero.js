import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // Hero entrance timeline
    const heroTl = gsap.timeline({ delay: 0.5 });

    // Animate background image
    heroTl.fromTo('.hero-bg img',
        {
            scale: 1.2,
            rotation: 2
        },
        {
            scale: 1,
            rotation: 0,
            duration: 2,
            ease: "power2.out"
        }
    );

    // Animate pre-title
    heroTl.fromTo('.hero-pretitle p',
        {
            y: 100,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=1.5"
    );

    // Animate main title
    heroTl.fromTo('.hero-title h1 span',
        {
            y: 150,
            opacity: 0,
            rotationX: 90
        },
        {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=0.8"
    );

    // Animate quote
    heroTl.fromTo('.hero-quote blockquote',
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, "-=0.5"
    );

    // Animate CTA button
    heroTl.fromTo('.hero-cta a',
        {
            y: 30,
            opacity: 0,
            scale: 0.9
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.3"
    );

    // Animate scroll indicator
    heroTl.fromTo('.scroll-indicator',
        {
            y: 30,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5"
    );

    // Parallax effect for background
    gsap.to('.hero-bg', {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Floating elements animations
    gsap.to('.floating-shape', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 1
    });

    gsap.to('.floating-icon', {
        rotation: 10,
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 1.5
    });

    // Hero content scroll animations
    ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;

            // Fade out hero content
            gsap.to('.hero-content', {
                opacity: 1 - progress * 1.5,
                y: -100 * progress,
                duration: 0.3,
                ease: "none"
            });

            // Scale and fade background
            gsap.to('.hero-bg img', {
                scale: 1 + progress * 0.1,
                duration: 0.3,
                ease: "none"
            });
        }
    });

    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#quien-es');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Magnetic effect for CTA button
    const magneticBtn = document.querySelector('.cta-button');
    if (magneticBtn) {
        magneticBtn.addEventListener('mousemove', (e) => {
            const rect = magneticBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(magneticBtn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        magneticBtn.addEventListener('mouseleave', () => {
            gsap.to(magneticBtn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    }

    // Add scroll indicator click functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('#quien-es');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Add cursor pointer
        scrollIndicator.style.cursor = 'pointer';
    }

});