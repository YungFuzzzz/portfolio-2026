// Contact page JavaScript - using existing modules
import { initializeMenu } from './menu.js';
import { initializeSVGMorph } from './svg-morph.js';

// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, ScrollToPlugin);

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
  console.log('Contact page loaded');
  initializeMenu();
  initializeSVGMorph();
  initContactAnimations();
  initMenuAnimations();
  initNavbarAnimations();
  initImageTrace();
});

// Contact page animations
function initContactAnimations() {
  // Contact links animation with stagger effect
  const contactLinks = document.querySelectorAll('.contact-link');
  
  if (contactLinks.length > 0) {
    // Set initial state
    gsap.set(contactLinks, { opacity: 0, y: 40 });
    
    // Animate in
    gsap.to(contactLinks, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.5
    });
  }
}

// Navbar animations - copied from index animations
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

// Menu animations - copied from index animations
function initMenuAnimations() {
  const menuOverlay = document.getElementById('menuOverlay');
  const hamburger = document.getElementById('hamburger');
  
  if (menuOverlay && hamburger) {
    // Initial setup for menu overlay
    gsap.set(menuOverlay, { opacity: 0, pointerEvents: 'none' });
    gsap.set(menuOverlay.querySelectorAll('ul li'), { opacity: 0, y: 40 });
  }
}

// Export for potential use in other modules
export { initContactAnimations, initMenuAnimations, initNavbarAnimations, initImageTrace };

// Image trace functionality
function initImageTrace() {
  const imageContainer = document.querySelector('.image-container');
  
  if (!imageContainer) {
    console.log('Image container not found');
    return;
  }

  const imageSet1 = [
      'assets/images/pops/pop1.svg',
      'assets/images/pops/pop2.svg',
      'assets/images/pops/pop3.svg',
      'assets/images/pops/pop4.svg',
      'assets/images/pops/pop5.svg',
      'assets/images/pops/pop6.svg',
      'assets/images/pops/pop7.svg',
      'assets/images/pops/pop8.svg',
      'assets/images/pops/pop9.svg',
      'assets/images/pops/pop10.svg',
  ];

  const imageSet2 = [
      'assets/images/pops/pop11.svg',
      'assets/images/pops/pop12.svg',
      'assets/images/pops/pop13.svg',
      'assets/images/pops/pop14.svg',
      'assets/images/pops/pop15.svg',
      'assets/images/pops/pop16.svg',
      'assets/images/pops/pop17.svg',
      'assets/images/pops/pop18.svg',
      'assets/images/pops/pop19.svg',
      'assets/images/pops/pop20.svg',
  ];

  const imageSet3 = [
      'assets/images/pops/pop21.svg',
      'assets/images/pops/pop22.svg',
      'assets/images/pops/pop23.svg',
      'assets/images/pops/pop24.svg',
      'assets/images/pops/pop25.svg',
      'assets/images/pops/pop26.svg',
      'assets/images/pops/pop27.svg',
      'assets/images/pops/pop28.svg',
      'assets/images/pops/pop29.svg',
      'assets/images/pops/pop30.svg',
  ];

  const imageSet = [imageSet1, imageSet2, imageSet3][Math.floor(Math.random() * 3)];

  let currentImageIndex = 0;

  function getNextImage() {
      const image = imageSet[currentImageIndex];
      currentImageIndex = (currentImageIndex + 1) % imageSet.length;
      return image;
  }

  let lastMove = { x: 0, y: 0 };

  document.addEventListener('mousemove', (e) => {
      lastMove = { x: e.clientX, y: e.clientY };
      createImageAtCursor(e.clientX, e.clientY);
  });

  function createImageAtCursor(x, y) {
      const img = document.createElement('img');
      img.src = getNextImage();
      img.style.left = `${x - 120}px`;
      img.style.top = `${y - 120 + window.scrollY}px`;

      img.style.position = 'absolute';
      img.style.opacity = 0;
      img.style.transform = 'scale(0)';
      img.style.transition = 'all 0.3s ease';
      img.classList.add('blurry');
      imageContainer.appendChild(img);

      setTimeout(() => {
          img.style.opacity = 1;
          img.style.transform = 'scale(1)';
      }, 0);

      setTimeout(() => {
          img.style.transform = 'scale(0)';
          img.style.opacity = 0;
      }, 800);

      setTimeout(() => {
          img.remove();
      }, 1300);
  }

  document.addEventListener('scroll', () => {
      document.querySelectorAll('.image-container img').forEach((img) => {
          img.style.left = `${lastMove.x - 120}px`;
          img.style.top = `${lastMove.y - 120 + window.scrollY}px`;
      });
  });
}
