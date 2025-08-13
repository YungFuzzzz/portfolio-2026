// scroll-arrow.js - Scroll arrow functionality
export function initializeScrollArrow() {
  const scrollArrow = document.querySelector('.scroll-arrow');
  
  if (!scrollArrow) return;
  
  const SCROLL_THRESHOLD = 50;

  // Initial state - hidden
  gsap.set(scrollArrow, { opacity: 0 });
  scrollArrow.classList.remove('visible');
  
  // Fade in animation after page load
  gsap.to(scrollArrow, {
    opacity: 0.7,
    y: 0,
    duration: 0.2,
    delay: 0.5,
    ease: "power2.out",
    onComplete: () => scrollArrow.classList.add('visible')
  });

  // Bouncing animation
  gsap.to(scrollArrow, {
    y: 10,
    duration: 1.5,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
    delay: 1.3
  });

  // Click handler for smooth scroll
  scrollArrow.addEventListener('click', () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: window.innerHeight, offsetY: 0 },
      ease: "power2.inOut"
    });
    // Hide arrow permanently after click
    gsap.to(scrollArrow, { 
      opacity: 0, 
      duration: 0.3,
      onComplete: () => scrollArrow.classList.remove('visible')
    });
  });

  // Throttled scroll handler for better performance
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    
    scrollTimeout = setTimeout(() => {
      const currentScrollY = window.scrollY;
      const isVisible = scrollArrow.classList.contains('visible');
      
      // Only show arrow when at the very top of the first section
      if (currentScrollY < SCROLL_THRESHOLD) {
        if (!isVisible) {
          gsap.to(scrollArrow, { 
            opacity: 0.7, 
            duration: 0.3,
            onComplete: () => scrollArrow.classList.add('visible')
          });
        }
      } else {
        // Hide arrow when scrolling past the first section
        if (isVisible) {
          gsap.to(scrollArrow, { 
            opacity: 0, 
            duration: 0.3,
            onComplete: () => scrollArrow.classList.remove('visible')
          });
        }
      }
      
      scrollTimeout = null;
    }, 16); // ~60fps throttling
  });
}
