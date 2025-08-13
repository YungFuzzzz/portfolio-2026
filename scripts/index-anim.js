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
});