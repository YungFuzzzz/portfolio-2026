// index-anim.js - Main entry point for all animations
import { initializeAnimations } from './animations.js';
import { initializeInteractions } from './interactions.js';
import { initializeMenu } from './menu.js';
import { initializeSVGMorph } from './svg-morph.js';
import { initializeTypewriter } from './typewriter.js';
import { initializeScrollArrow } from './scroll-arrow.js';
import { initializeMagneticSquare } from './magnetic-square.js';

window.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, ScrollToPlugin);

  // Initialize all modules
  initializeAnimations();
  initializeInteractions();
  initializeMenu();
  initializeSVGMorph();
  initializeTypewriter();
  initializeScrollArrow();
  initializeMagneticSquare();
  initializeAboutButton();
  initializeProjectsButton();
});

// Initialize about button hover effect
function initializeAboutButton() {
  const aboutBtn = document.querySelector('.about-btn');
  if (!aboutBtn) return;

  aboutBtn.addEventListener('mouseenter', (e) => {
    const rect = aboutBtn.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const buttonWidth = rect.width;
    const centerX = buttonWidth / 2;
    
    // Determine fill direction based on mouse position
    if (mouseX < centerX) {
      // Mouse entered from left, fill left to right
      aboutBtn.style.setProperty('--fill-origin', 'left');
    } else {
      // Mouse entered from right, fill right to left  
      aboutBtn.style.setProperty('--fill-origin', 'right');
    }
  });
}

// Initialize projects button hover effect
function initializeProjectsButton() {
  const projectsBtn = document.querySelector('.projects-btn');
  if (!projectsBtn) return;

  projectsBtn.addEventListener('mouseenter', (e) => {
    const rect = projectsBtn.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const buttonWidth = rect.width;
    const centerX = buttonWidth / 2;
    
    // Determine fill direction based on mouse position
    if (mouseX < centerX) {
      // Mouse entered from left, fill left to right
      projectsBtn.style.setProperty('--fill-origin', 'left');
    } else {
      // Mouse entered from right, fill right to left  
      projectsBtn.style.setProperty('--fill-origin', 'right');
    }
  });
}