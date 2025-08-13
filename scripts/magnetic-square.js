// magnetic-image.js - Magnetic image grid effect
export function initializeMagneticSquare() {
  const magneticImage = document.querySelector('.magnetic-image');
  
  if (!magneticImage) return;
  
  const imageUrl = magneticImage.getAttribute('data-image');
  if (!imageUrl) return;
  
  // Configuration based on screen size
  const config = getConfig();
  const { gridCols, gridRows, pieceSize, imageWidth, imageHeight } = config;
  
  // Create image pieces
  function createImagePieces() {
    // Clear existing pieces
    magneticImage.innerHTML = '';
    
    // Update container size
    magneticImage.style.width = `${imageWidth}px`;
    magneticImage.style.height = `${imageHeight}px`;
    magneticImage.style.gridTemplateColumns = `repeat(${gridCols}, ${pieceSize}px)`;
    magneticImage.style.gridTemplateRows = `repeat(${gridRows}, ${pieceSize}px)`;
    
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const piece = document.createElement('div');
        piece.className = 'image-piece';
        
        // Calculate background position for this piece
        const backgroundPosX = -col * pieceSize;
        const backgroundPosY = -row * pieceSize;
        
        // Set styles
        piece.style.width = `${pieceSize}px`;
        piece.style.height = `${pieceSize}px`;
        piece.style.backgroundImage = `url('${imageUrl}')`;
        piece.style.backgroundSize = `${imageWidth}px ${imageHeight}px`;
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
      
      // Scale from 1.0 to 1.3 for subtle enlargement
      const intensity = (Math.abs(deltaX) + Math.abs(deltaY)) * 0.5; // 0 to 1
      const scaleEffect = 1.0 + (intensity * 0.3); // 1.0 to 1.3
      const rotationX = deltaY * -12; // Strong rotation
      const rotationY = deltaX * 12;  // Strong rotation
      
      // Apply transform for illusion of movement with center origin
      gsap.to(piece, {
        scale: scaleEffect,
        rotationX: rotationX,
        rotationY: rotationY,
        duration: 0.25,
        ease: "power2.out",
        transformOrigin: "center center"
      });
    });
  }
  
  // Get configuration based on screen size
  function getConfig() {
    if (window.innerWidth <= 480) {
      // Mobile: 250x356px (maintaining 400:570 ratio)
      return { 
        gridCols: 10, 
        gridRows: 14, 
        pieceSize: 25, 
        imageWidth: 250, 
        imageHeight: 356 
      };
    }
    if (window.innerWidth <= 768) {
      // Tablet: 300x428px (maintaining 400:570 ratio)
      return { 
        gridCols: 10, 
        gridRows: 14, 
        pieceSize: 30, 
        imageWidth: 300, 
        imageHeight: 428 
      };
    }
    // Desktop: 400x570px (original dimensions)
    return { 
      gridCols: 10, 
      gridRows: 14, 
      pieceSize: 40, 
      imageWidth: 400, 
      imageHeight: 570 
    };
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
