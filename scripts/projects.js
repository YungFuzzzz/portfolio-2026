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
  initializeScrollIndicators();
});

// Handle main scroll arrow functionality
function initializeScrollArrow() {
  // We're now using main-scroll-indicator class for the hero section arrow
  // The old .scroll-arrow class isn't used anymore
  console.log('Scroll indicators initialized');
}

// Initialize main scroll indicator
function initializeScrollIndicators() {
  const mainScrollIndicator = document.querySelector('.main-scroll-indicator');
  
  if (mainScrollIndicator) {
    mainScrollIndicator.addEventListener('click', () => {
      // Scroll to the first project
      const heroSection = document.querySelector('.hero');
      const firstProject = document.querySelector('.project-slide');
      
      if (heroSection && firstProject) {
        gsap.to(window, {
          scrollTo: {
            y: firstProject,
            autoKill: false
          },
          duration: 1,
          ease: 'power3.inOut'
        });
      }
    });
  }
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

  // Project slides animations
  const projectSlides = document.querySelectorAll('.project-slide');
  
  projectSlides.forEach((slide, index) => {
    // Set background image for the visual element with landscape orientation
    const imageUrl = slide.getAttribute('data-image');
    const visualElement = slide.querySelector('.project-visual');
    
    if (imageUrl && visualElement) {
      // Create and append actual IMG element instead of using background-image
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.style.width = '100%';
      imgElement.style.height = '100%';
      imgElement.style.objectFit = 'cover';
      imgElement.style.display = 'block';
      
      // Clear any existing background image settings
      visualElement.style.backgroundImage = 'none';
      visualElement.appendChild(imgElement);
    }
    
    // Create scrolltrigger for each project
    const slideAnim = gsap.timeline({
      scrollTrigger: {
        trigger: slide,
        start: 'top center',
        toggleActions: 'play none none none',
        once: true
      }
    });
    
    // Add animations
    slideAnim
      .fromTo(visualElement, 
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8 }
      )
      .fromTo(visualElement.querySelector('img'),
        { scale: 1.05 },
        { scale: 1, duration: 0.8 },
        '-=0.8'
      )
      .fromTo(slide.querySelector('h2'), 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(slide.querySelector('p'), 
        { opacity: 0, y: 30 },
        { opacity: 0.9, y: 0, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(slide.querySelector('.project-meta'), 
        { opacity: 0, y: 30 },
        { opacity: 0.5, y: 0, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(slide.querySelector('.more-info-btn'), 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );
  });

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
  
  // Button hover effects for more-info-btn
  const moreInfoBtns = document.querySelectorAll('.more-info-btn');
  
  moreInfoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Add click animation
      gsap.fromTo(btn, 
        { scale: 1 },
        { 
          scale: 0.95, 
          duration: 0.1,
          yoyo: true,
          repeat: 1
        }
      );
    });
  });
}
