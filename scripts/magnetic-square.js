// magnetic-image.js - Magnetic image grid effect
export function initializeMagneticSquare() {
  const magneticImage = document.querySelector('.magnetic-image');
  
  if (!magneticImage) return;
  
  const imageUrl = magneticImage.getAttribute('data-image');
  if (!imageUrl) return;
  
  // Configuration based on screen size
  const config = getConfig();
  const { gridSize, pieceSize, imageSize } = config;
  
  // Create image pieces
  function createImagePieces() {
    // Clear existing pieces
    magneticImage.innerHTML = '';
    
    // Update container size
    magneticImage.style.width = `${imageSize}px`;
    magneticImage.style.height = `${imageSize}px`;
    magneticImage.style.gridTemplateColumns = `repeat(10, ${pieceSize}px)`;
    magneticImage.style.gridTemplateRows = `repeat(10, ${pieceSize}px)`;
    
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const piece = document.createElement('div');
        piece.className = 'image-piece';
        
        // Calculate background position for this piece
        const backgroundPosX = -col * pieceSize;
        const backgroundPosY = -row * pieceSize;
        
        // Set styles
        piece.style.width = `${pieceSize}px`;
        piece.style.height = `${pieceSize}px`;
        piece.style.backgroundImage = `url('${imageUrl}')`;
        piece.style.backgroundSize = `${imageSize}px ${imageSize}px`;
        piece.style.backgroundPosition = `${backgroundPosX}px ${backgroundPosY}px`;
        
        // Add magnetic hover effect
        addMagneticEffect(piece);
        
        magneticImage.appendChild(piece);
      }
    }
  }
  
  // Add magnetic effect to each piece
  function addMagneticEffect(piece) {
    let isHovering = false;
    
    piece.addEventListener('mouseenter', () => {
      isHovering = true;
    });
    
    piece.addEventListener('mouseleave', () => {
      isHovering = false;
      // Return to original state
      gsap.to(piece, {
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    });
    
    piece.addEventListener('mousemove', (e) => {
      if (!isHovering) return;
      
      const rect = piece.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (normalized between -1 and 1)
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      // Create more noticeable illusion of movement
      const scaleEffect = 1 + (Math.abs(deltaX) + Math.abs(deltaY)) * 0.3; // More noticeable scale (up to 1.3x)
      const rotationX = deltaY * -12; // Stronger tilt (up to ±12°)
      const rotationY = deltaX * 12;  // Stronger tilt (up to ±12°)
      
      // Apply transform for illusion of movement
      gsap.to(piece, {
        scale: scaleEffect,
        rotationX: rotationX,
        rotationY: rotationY,
        duration: 0.25, // Slightly faster response
        ease: "power2.out",
        transformOrigin: "center center"
      });
    });
  }
  
  // Get configuration based on screen size
  function getConfig() {
    if (window.innerWidth <= 480) {
      return { gridSize: 10, pieceSize: 25, imageSize: 250 };
    }
    if (window.innerWidth <= 768) {
      return { gridSize: 10, pieceSize: 30, imageSize: 300 };
    }
    return { gridSize: 10, pieceSize: 40, imageSize: 400 };
  }
  
  // Initialize
  createImagePieces();
  
  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    
    resizeTimeout = setTimeout(() => {
      createImagePieces();
    }, 250);
  });
}
