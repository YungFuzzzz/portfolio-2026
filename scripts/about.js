// About page JavaScript - using existing modules
import { initializeMenu } from './menu.js';
import { initializeSVGMorph } from './svg-morph.js';

// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, ScrollToPlugin);

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
  console.log('About page loaded');
  initializeMenu();
  initializeSVGMorph();
  initAboutAnimations();
  initNavbarAnimations();
});

// About page specific animations
function initAboutAnimations() {
    // Animate content sections on scroll
    animateContentSections();
    
    // Animate stats on scroll
    animateStats();
}

// Navbar animations (same as contact.js)
function initNavbarAnimations() {
  // Navbar fade-in
  gsap.from('.navbar', {
    opacity: 0,
    duration: 0.7,
    ease: 'power1.out'
  });

  // Logo fade-in
  gsap.from('#logoSvg', {
    opacity: 0,
    duration: 0.7,
    delay: 0.3,
    ease: 'power1.out'
  });
}

function animateContentSections() {
    // Animate intro text
    gsap.fromTo('.intro-text h2', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.intro-text',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
    
    gsap.fromTo('.intro-text p', {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.intro-text',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Animate bio section
    gsap.fromTo('.bio-section h3', {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.bio-section',
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
    
    gsap.fromTo('.bio-section p', {
        y: 20,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.bio-section',
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Animate skills section
    gsap.fromTo('.skills-section h3', {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.skills-section',
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
    
    gsap.fromTo('.skill-item', {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.skills-section',
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Animate image column
    gsap.fromTo('.image-column', {
        x: 50,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.image-column',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Animate philosophy section
    gsap.fromTo('.philosophy-content h2', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.philosophy-section',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
    
    gsap.fromTo('.philosophy-content blockquote', {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.philosophy-section',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // Footer animations (same as other pages)
    gsap.from('.footer-column', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 80%',
        }
    });

    gsap.from('.footer-copyright', {
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.footer-copyright',
            start: 'top 90%',
        }
    });
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const endValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        
        gsap.fromTo(stat, {
            textContent: 0
        }, {
            textContent: endValue,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function() {
                const currentValue = Math.round(this.targets()[0].textContent);
                const originalText = stat.dataset.original || stat.textContent;
                
                // Check if the original text has a suffix (like +, k, etc.)
                const suffix = originalText.replace(/[0-9]/g, '');
                stat.textContent = currentValue + suffix;
            },
            scrollTrigger: {
                trigger: '.stats-section',
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
        
        // Store original text as data attribute
        stat.dataset.original = stat.textContent;
    });
    
    // Animate stat labels
    gsap.fromTo('.stat-label', {
        y: 20,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.stats-section',
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
}

// Add parallax effect to hero section
function addParallaxEffect() {
    gsap.to('.about-title', {
        y: '-20%',
        ease: "none",
        scrollTrigger: {
            trigger: '.about-hero',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

// Initialize parallax after page load
window.addEventListener('load', () => {
    addParallaxEffect();
});

// Add smooth scroll behavior for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: "power2.inOut"
            });
        }
    });
});

// Add interaction effects to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            scale: 1.02,
            y: -5,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Add hover effect to profile image placeholder
const imageOverlay = document.querySelector('.image-overlay');
if (imageOverlay) {
    const profileImage = document.querySelector('.profile-image');
    
    profileImage.addEventListener('mouseenter', () => {
        gsap.to(imageOverlay, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    profileImage.addEventListener('mouseleave', () => {
        gsap.to(imageOverlay, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
}
