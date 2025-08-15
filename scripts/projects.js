// Import modules
import { initializeSVGMorph } from './svg-morph.js';
import { initializeMenu } from './menu.js';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Projects page initialized');
  
  // Initialize common components
  initializeSVGMorph();
  initializeMenu();
  initializeScrollArrow();
  
  // Initialize project-specific components
  initializeProjectsAnimations();
  initializeProjectCards();
});

// Handle scroll arrow functionality
function initializeScrollArrow() {
  const scrollArrow = document.querySelector('.scroll-arrow');
  
  if (!scrollArrow) {
    console.warn('Scroll arrow not found');
    return;
  }

  // Show arrow after a delay on page load
  gsap.to(scrollArrow, { 
    opacity: 0.7, 
    duration: 0.5, 
    delay: 1.5,
    onComplete: () => scrollArrow.classList.add('visible')
  });

  // Handle arrow click
  scrollArrow.addEventListener('click', () => {
    const heroSection = document.querySelector('.hero');
    const projectsSection = document.querySelector('.projects');
    
    if (heroSection && projectsSection) {
      const projectsTop = projectsSection.getBoundingClientRect().top + window.pageYOffset;
      
      gsap.to(window, {
        scrollTo: {
          y: projectsTop,
          autoKill: false
        },
        duration: 1,
        ease: 'power3.inOut'
      });
    }
  });

  // Hide/show arrow based on scroll position
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // At top of page
    if (currentScrollTop < 100) {
      if (!document.getElementById('hamburger').classList.contains('active')) {
        gsap.to(scrollArrow, { opacity: 0.7, duration: 0.3 });
        scrollArrow.classList.add('visible');
      }
    } 
    // Scrolling down
    else if (currentScrollTop > lastScrollTop) {
      gsap.to(scrollArrow, { opacity: 0, duration: 0.3 });
      scrollArrow.classList.remove('visible');
    }
    // Scrolling to top
    else {
      if (!document.getElementById('hamburger').classList.contains('active')) {
        gsap.to(scrollArrow, { opacity: 0.7, duration: 0.3 });
        scrollArrow.classList.add('visible');
      }
    }
    
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  });
}

// Hero and content animations
function initializeProjectsAnimations() {
  // Hero animations
  const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' }});
  
  heroTimeline
    .fromTo('.hero h1', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo('.hero .subtitle', 
      { opacity: 0, y: 30 },
      { opacity: 0.7, y: 0, duration: 1 },
      '-=0.7' // Slight overlap
    );

  // Project cards staggered reveal
  gsap.fromTo('.project-card', 
    { opacity: 0, y: 50 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top bottom-=100',
        toggleActions: 'play none none none'
      }
    }
  );

  // Contact section animation
  gsap.fromTo('.contact h2', 
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8,
      scrollTrigger: {
        trigger: '.contact',
        start: 'top bottom-=150',
        toggleActions: 'play none none none'
      }
    }
  );

  gsap.fromTo('.contact-btn', 
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: '.contact',
        start: 'top bottom-=150',
        toggleActions: 'play none none none'
      }
    }
  );
}

// Initialize project card images and hover effects
function initializeProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Set background image
    const imageUrl = card.getAttribute('data-image');
    const imageElement = card.querySelector('.project-image');
    
    if (imageUrl && imageElement) {
      imageElement.style.backgroundImage = `url('${imageUrl}')`;
    }

    // Add hover animations
    card.addEventListener('mouseenter', () => {
      gsap.to(card.querySelector('.project-info'), { 
        y: -5, 
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card.querySelector('.project-info'), { 
        y: 0, 
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    // Make cards clickable
    card.addEventListener('click', () => {
      // In the future, this could navigate to project detail pages
      console.log(`Project card clicked: ${card.querySelector('h3').textContent}`);
      
      // For now, just add a subtle effect to confirm click
      gsap.fromTo(card, 
        { scale: 1 },
        { 
          scale: 0.98, 
          duration: 0.1,
          yoyo: true,
          repeat: 1
        }
      );
    });
  });
}
