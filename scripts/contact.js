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

// Liquid trace functionality
function initImageTrace() {
  const imageContainer = document.querySelector('.image-container');
  
  if (!imageContainer) {
    console.log('Image container not found');
    return;
  }

  // Create canvas for liquid trail
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.className = 'liquid-trail-canvas';
  imageContainer.appendChild(canvas);

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Trail points array
  const trailPoints = [];
  const maxPoints = 200; // More points for smoother trail
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // Color schemes - randomly selected on page load
  const colorSchemes = [
    // Scheme 1: Dark Green to Bright Yellow
    [
      { r: 0, g: 127, b: 95 },      // #007F5F - Dark green (start)
      { r: 30, g: 150, b: 80 },     
      { r: 80, g: 180, b: 70 },     
      { r: 130, g: 210, b: 60 },    
      { r: 180, g: 230, b: 55 },    
      { r: 220, g: 245, b: 58 },    
      { r: 255, g: 255, b: 63 }     // #FFFF3F - Bright yellow (end)
    ],
    // Scheme 2: Orange to Yellow
    [
      { r: 255, g: 123, b: 0 },     // #FF7B00 - Orange
      { r: 255, g: 140, b: 20 },    
      { r: 255, g: 160, b: 40 },    
      { r: 255, g: 180, b: 60 },    
      { r: 255, g: 200, b: 80 },    
      { r: 255, g: 220, b: 120 },   
      { r: 255, g: 234, b: 0 }      // #FFEA00 - Bright yellow
    ],
    // Scheme 3: Purple to Light Purple
    [
      { r: 117, g: 123, b: 200 },   // #757BC8 - Purple
      { r: 130, g: 140, b: 210 },   
      { r: 150, g: 160, b: 220 },   
      { r: 170, g: 180, b: 230 },   
      { r: 190, g: 200, b: 240 },   
      { r: 210, g: 210, b: 250 },   
      { r: 224, g: 195, b: 252 }    // #E0C3FC - Light purple
    ],
    // Scheme 4: Deep Red to Pink
    [
      { r: 139, g: 0, b: 0 },       // Dark red
      { r: 180, g: 20, b: 30 },     
      { r: 220, g: 50, b: 70 },     
      { r: 240, g: 80, b: 110 },    
      { r: 250, g: 120, b: 150 },   
      { r: 255, g: 160, b: 190 },   
      { r: 255, g: 192, b: 203 }    // Light pink
    ],
    // Scheme 5: Ocean Blue to Cyan
    [
      { r: 0, g: 119, b: 190 },     // Deep ocean blue
      { r: 30, g: 144, b: 200 },    
      { r: 60, g: 170, b: 210 },    
      { r: 90, g: 195, b: 220 },    
      { r: 120, g: 220, b: 230 },   
      { r: 150, g: 240, b: 240 },   
      { r: 175, g: 255, b: 255 }    // Light cyan
    ],
    // Scheme 6: Forest Green to Lime
    [
      { r: 34, g: 139, b: 34 },     // Forest green
      { r: 60, g: 160, b: 60 },     
      { r: 90, g: 180, b: 90 },     
      { r: 120, g: 200, b: 120 },   
      { r: 150, g: 220, b: 150 },   
      { r: 180, g: 240, b: 180 },   
      { r: 210, g: 255, b: 210 }    // Light lime
    ],
    // Scheme 7: Sunset Orange to Hot Pink
    [
      { r: 255, g: 69, b: 0 },      // Red-orange
      { r: 255, g: 100, b: 50 },    
      { r: 255, g: 130, b: 100 },   
      { r: 255, g: 160, b: 150 },   
      { r: 255, g: 180, b: 180 },   
      { r: 255, g: 105, b: 180 },   
      { r: 255, g: 20, b: 147 }     // Deep pink
    ],
    // Scheme 8: Royal Blue to Electric Blue
    [
      { r: 65, g: 105, b: 225 },    // Royal blue
      { r: 80, g: 130, b: 235 },    
      { r: 100, g: 155, b: 245 },   
      { r: 120, g: 180, b: 255 },   
      { r: 140, g: 200, b: 255 },   
      { r: 160, g: 220, b: 255 },   
      { r: 135, g: 206, b: 250 }    // Sky blue
    ]
  ];

  // Randomly select a color scheme
  const selectedScheme = Math.floor(Math.random() * colorSchemes.length);
  const colors = colorSchemes[selectedScheme];
  
  console.log(`Selected color scheme: ${selectedScheme + 1}`); // Debug log

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Add multiple points for ultra-smooth trail
    const lastPoint = trailPoints[trailPoints.length - 1];
    const distance = lastPoint ? 
      Math.sqrt((mouseX - lastPoint.x) ** 2 + (mouseY - lastPoint.y) ** 2) : 0;
    
    // Add points more frequently for thicker, smoother appearance
    if (!lastPoint || distance > 5) { // More frequent points for thicker trail
      trailPoints.push({
        x: mouseX,
        y: mouseY,
        time: Date.now(),
        life: 1.0
      });
    }

    // Remove old points
    if (trailPoints.length > maxPoints) {
      trailPoints.splice(0, trailPoints.length - maxPoints);
    }
  });

  // Animation loop
  function animate() {
    // Clear canvas completely for bright colors
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'source-over';

    // Update and draw trail points
    const currentTime = Date.now();
    
    for (let i = trailPoints.length - 1; i >= 0; i--) {
      const point = trailPoints[i];
      const age = currentTime - point.time;
      const maxAge = 3000; // Longer hanging time - 3 seconds
      
      point.life = Math.max(0, 1 - (age / maxAge));
      
      if (point.life <= 0) {
        trailPoints.splice(i, 1);
        continue;
      }

      // Calculate color based on position in trail
      const progress = i / trailPoints.length;
      const colorIndex = Math.floor(progress * (colors.length - 1));
      const colorProgress = (progress * (colors.length - 1)) % 1;
      
      const color1 = colors[colorIndex] || colors[0];
      const color2 = colors[colorIndex + 1] || colors[colors.length - 1];
      
      // Interpolate between colors
      const r = Math.round(color1.r + (color2.r - color1.r) * colorProgress);
      const g = Math.round(color1.g + (color2.g - color1.g) * colorProgress);
      const b = Math.round(color1.b + (color2.b - color1.b) * colorProgress);
      
      // Draw only smooth liquid blob without visible dots
      const size = (50 + progress * 70) * point.life; // 2x thicker
      const opacity = Math.pow(point.life, 1.5) * 0.8; // Much more intense colors
      
      // Create soft gradient
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, size * 1.2 // Tighter gradient for more intensity
      );
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
      gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${opacity * 0.6})`); // Less fade
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, size * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
}
