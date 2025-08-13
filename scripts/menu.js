// menu.js - Hamburger menu functionality
export function initializeMenu() {
  const hamburger = document.getElementById('hamburger');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuLinks = menuOverlay.querySelectorAll('ul li');
  const scrollArrow = document.querySelector('.scroll-arrow');
  
  const SCROLL_THRESHOLD = 50;

  // Hamburger menu animatie - optimized
  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    menuOverlay.classList.toggle('active');

    if (isActive) {
      gsap.to(menuOverlay, { opacity: 1, duration: 0.4, pointerEvents: 'all' });
      gsap.fromTo(menuLinks,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.1,
          ease: 'power3.out'
        });
      // Hide scroll arrow when menu opens
      gsap.to(scrollArrow, { 
        opacity: 0, 
        duration: 0.3,
        onComplete: () => scrollArrow.classList.remove('visible')
      });
    } else {
      gsap.to(menuOverlay, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
      gsap.to(menuLinks, { opacity: 0, y: 40, duration: 0.3, stagger: 0.05 });
      // Only show scroll arrow when menu closes if we're at the top
      if (window.scrollY < SCROLL_THRESHOLD) {
        gsap.to(scrollArrow, { 
          opacity: 0.7, 
          duration: 0.3,
          onComplete: () => scrollArrow.classList.add('visible')
        });
      }
    }
  });
}
