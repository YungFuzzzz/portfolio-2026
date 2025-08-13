// interactions.js - User interactions and hover effects
export function initializeInteractions() {
  const emailLink = document.querySelector('.email-link');
  const projectItems = document.querySelectorAll('.project-item');
  
  // Performance: Check touch device once
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Email link underline animation
  if (emailLink) {
    emailLink.addEventListener('mouseenter', () => {
      gsap.to(emailLink.querySelector('::after'), {
        width: '100%',
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  }

  // Project hover interactions - optimized
  projectItems.forEach(item => {
    const image = item.querySelector('.project-image');
    const imageUrl = item.getAttribute('data-image');
    
    // Set background image using the actual image path
    if (imageUrl && image) {
      // Use Object.assign for better performance
      Object.assign(image.style, {
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      });
    }
    
    if (isTouchDevice) {
      // Mobile touch interactions
      let isImageVisible = false;
      
      item.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const opacity = isImageVisible ? 0 : 1;
        gsap.to(image, {
          opacity,
          duration: 0.4,
          ease: 'power2.out'
        });
        isImageVisible = !isImageVisible;
      });
    } else {
      // Desktop mouse interactions
      item.addEventListener('mouseenter', () => {
        gsap.to(image, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(image, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    }
  });
}
