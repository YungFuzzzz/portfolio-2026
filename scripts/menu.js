// menu.js - Hamburger menu functionality
export function initializeMenu() {
  const hamburger = document.getElementById('hamburger');
  const menuOverlay = document.getElementById('menuOverlay');
  
  if (!hamburger || !menuOverlay) {
    console.log('Menu elements not found');
    return;
  }
  
  const menuLinks = menuOverlay.querySelectorAll('ul li');
  const scrollArrow = document.querySelector('.scroll-arrow');
  
  const SCROLL_THRESHOLD = 50;

  // Color schemes for active menu items - no white/light unreadable colors
  const colorSchemes = [
    'linear-gradient(90deg, #007F5F, #DAA520)', // Green to Dark Gold
    'linear-gradient(90deg, #FF7B00, #CC8800)', // Orange to Dark Yellow
    'linear-gradient(90deg, #757BC8, #9966CC)', // Purple to Medium Purple
    'linear-gradient(90deg, #8B0000, #DC143C)', // Dark Red to Crimson
    'linear-gradient(90deg, #0077BE, #4682B4)', // Ocean Blue to Steel Blue
    'linear-gradient(90deg, #228B22, #32CD32)', // Forest Green to Lime Green
    'linear-gradient(90deg, #FF4500, #FF1493)', // Sunset Orange to Hot Pink
    'linear-gradient(90deg, #4169E1, #6495ED)', // Royal Blue to Cornflower
    'linear-gradient(90deg, #2E7D32, #20B2AA)', // Dark Green to Light Sea Green
    'linear-gradient(90deg, #800020, #B8860B)', // Burgundy to Dark Goldenrod
    'linear-gradient(90deg, #008080, #5F9EA0)', // Teal to Cadet Blue
    'linear-gradient(90deg, #8B008B, #BA55D3)', // Dark Magenta to Medium Orchid
    'linear-gradient(90deg, #CD7F32, #DAA520)', // Bronze to Goldenrod
    'linear-gradient(90deg, #4B0082, #8A2BE2)', // Indigo to Blue Violet
    'linear-gradient(90deg, #FF7F50, #FF6347)'  // Coral to Tomato
  ];

  // Set random gradient for active menu item
  function setRandomActiveGradient() {
    const randomScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
    document.documentElement.style.setProperty('--active-gradient', randomScheme);
    console.log('Selected menu gradient:', randomScheme);
  }

  // Initialize random gradient on page load
  setRandomActiveGradient();

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
      if (scrollArrow) {
        gsap.to(scrollArrow, { 
          opacity: 0, 
          duration: 0.3,
          onComplete: () => scrollArrow.classList.remove('visible')
        });
      }
    } else {
      gsap.to(menuOverlay, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
      gsap.to(menuLinks, { opacity: 0, y: 40, duration: 0.3, stagger: 0.05 });
      // Only show scroll arrow when menu closes if we're at the top
      if (scrollArrow && window.scrollY < SCROLL_THRESHOLD) {
        gsap.to(scrollArrow, { 
          opacity: 0.7, 
          duration: 0.3,
          onComplete: () => scrollArrow.classList.add('visible')
        });
      }
    }
  });
}