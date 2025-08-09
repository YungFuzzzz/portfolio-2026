window.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, ScrollToPlugin);

  // Get elements
  const scrollArrow = document.querySelector('.scroll-arrow');

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

  // Scrolltrigger h1 animatie
  const h1Anim = gsap.fromTo('.content h1',
    { y: 1, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', paused: true }
  );

  ScrollTrigger.create({
    trigger: '.content h1',
    start: 'top 80%',
    end: 'bottom top',
    onEnter: () => h1Anim.play(),
    onLeaveBack: () => h1Anim.reverse(),
    onLeave: () => h1Anim.pause(),
  });

  // About section animatie
  gsap.from('.about h2', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about h2',
      start: 'top 80%',
    }
  });

  gsap.from('.about p', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about p',
      start: 'top 80%',
    }
  });

  // Projects section animaties
  gsap.from('.projects h2', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.projects h2',
      start: 'top 80%',
    }
  });

  gsap.from('.project-item', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.projects-list',
      start: 'top 80%',
    }
  });

  // Contact section animaties
  gsap.from('.contact h2', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 60%',
    }
  });

  gsap.from('.email-link', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 60%',
    }
  });

  gsap.from('.contact-divider', {
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 60%',
    }
  });

  gsap.from('.social-links', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    delay: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 60%',
    }
  });

  // Footer section animaties
  gsap.from('.footer-column', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: 'footer',
      start: 'top 80%',
    }
  });

  gsap.from('.footer-copyright', {
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.footer-copyright',
      start: 'top 90%',
    }
  });

  // Email link underline animation
  const emailLink = document.querySelector('.email-link');
  if (emailLink) {
    emailLink.addEventListener('mouseenter', () => {
      gsap.to(emailLink.querySelector('::after'), {
        width: '100%',
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  }

  // Project hover interactions
  const projectItems = document.querySelectorAll('.project-item');
  
  projectItems.forEach(item => {
    const image = item.querySelector('.project-image');
    const imageUrl = item.getAttribute('data-image');
    
    // Set background image (for now using gradients as placeholders)
    if (imageUrl.includes('project1')) {
      image.style.background = 'linear-gradient(45deg, #000, #333)';
    } else if (imageUrl.includes('project2')) {
      image.style.background = 'linear-gradient(45deg, #333, #666)';
    } else {
      image.style.background = 'linear-gradient(45deg, #666, #999)';
    }
    
    // Check if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      // Mobile touch interactions
      let isImageVisible = false;
      
      item.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (!isImageVisible) {
          gsap.to(image, {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
          isImageVisible = true;
        } else {
          gsap.to(image, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
          isImageVisible = false;
        }
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

  // Hamburger menu animatie
  const hamburger = document.getElementById('hamburger');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuLinks = menuOverlay.querySelectorAll('ul li');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menuOverlay.classList.toggle('active');

    if (menuOverlay.classList.contains('active')) {
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
        onComplete: () => {
          scrollArrow.classList.remove('visible');
        }
      });
    } else {
      gsap.to(menuOverlay, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
      gsap.to(menuLinks, { opacity: 0, y: 40, duration: 0.3, stagger: 0.05 });
      // Only show scroll arrow when menu closes if we're at the top
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        gsap.to(scrollArrow, { 
          opacity: 0.7, 
          duration: 0.3,
          onComplete: () => {
            scrollArrow.classList.add('visible');
          }
        });
      }
    }
  });

// SVG morph animatie
const logoPath = document.getElementById("logoPath");
const original = logoPath.getAttribute("d");

const shape1 = "M8.114 0H0.114V8C0.114 12.074 3.159 15.436 7.098 15.936C3.104 16.384 0 19.772 0 23.885L0 31.885H8C12.074 31.885 15.436 28.84 15.936 24.902C16.384 28.896 19.772 32 23.885 32H31.885V24C31.885 19.366 28.84 16.563 24.902 16.064C28.896 15.616 32 12.947 32 8.114V0.114L24 0.114C19.366 0.114 16.563 3.159 16.064 7.098C15.616 3.104 12.947 0 8.114 0Z";
const shape2 = "M15.996 16C7.162 15.998 0 8.835 0 0L32 0C32 8.835 24.838 15.998 16.01 16C24.838 16.002 32 23.165 32 32H0C0 23.165 7.162 16.002 15.996 16Z";
const shape3 = "M16 32V23.035L0 15.999H8.97L16 0V8.97L32 15.999H23.035L16 32Z";
const shape4 = "M16 3.52C16 1.576 14.424 0 12.48 0H3.52C1.576 0 0 1.576 0 3.52V12.28C0 14.52 1.576 15.115 3.52 15.115H12.48C14.424 15.115 16 16.69 16 18.64V28C16 29.624 17.576 32 19.52 32H28C29.624 32 32 29.624 32 28V19.44C32 17.46 29.624 16 28 16H19.52C17.576 16 16 14.66 16 12.365V3.52Z";
const shape5 = "M14.39 0.98C15.06 -0.33 16.935 -0.33 17.53 0.98L21.916 9.306C22.088 9.64 22.36 9.911 22.694 10.083L31.02 14.39C32.33 15.06 32.33 16.935 31.02 17.53L22.694 21.916C22.36 22.088 22.088 22.36 21.916 22.694L17.53 31.02C16.935 32.33 15.06 32.33 14.39 31.02L9.883 22.694C9.56 22.36 9.192 22.088 8.306 21.916L0.98 17.53C-0.33 16.935 -0.33 15.06 0.98 14.39L8.306 10.083C9.192 9.911 9.56 9.64 9.883 9.306L14.39 0.98Z";
const shape6 = "M8 0H0V16H8C3.58 16 0 19.58 0 24V32H16V24C16 27.618 19.58 32 24 32H32V16H24C27.618 16 32 12.382 32 8V0H16V8C16 3.58 12.382 0 8 0ZM16 16H8C12.382 16 16 19.58 16 24V16ZM16 16V8C16 12.382 19.58 16 24 16H16Z";
const shape7 = "M32 8V0L16 0V8C15.998 3.58 12.382 0 8 0H0V16H8C3.58 16 0 19.58 0 24L0 32H16L16 24C16 27.618 19.58 32 24 32H32L32 16H24C27.62 15.998 32 12.382 32 8Z";
const shape8 = "M12.09 28.61L12.09 28.61L10.07 26.58C10.08 26.71 10.08 26.83 10.08 26.96C10.08 29.74 7.82 32 5.04 32C2.26 32 0 29.74 0 26.96C0 24.18 2.26 21.92 5.04 21.92C5.17 21.92 5.29 21.92 5.41 21.93L3.34 19.86L3.34 19.86C1.27 17.75 0 14.86 0 11.68C0 5.23 5.23 0 11.68 0C14.86 0 17.75 1.27 19.86 3.34L19.86 3.34L19.92 3.4C19.93 3.41 19.95 3.43 19.96 3.44L21.93 5.42C21.93 5.29 21.93 5.17 21.92 5.04C21.92 2.26 23.38 0 26.96 0C29.74 0 32 2.26 32 5.04C32 7.82 29.74 10.08 26.96 10.08C26.83 10.08 26.71 10.08 26.53 10.07L28.56 12.04C28.58 12.06 28.59 12.07 28.61 12.08L28.61 12.09C30.7 14.2 32 17.11 32 20.32C32 26.78 26.78 32 20.32 32C17.11 32 14.2 30.7 12.09 28.61Z";



  gsap.timeline({ repeat: -1, defaults: { duration: 2.5, ease: "power2.inOut" } })
    .to(logoPath, { morphSVG: shape1 })
    .to(logoPath, { morphSVG: original })
    .to(logoPath, { morphSVG: shape2 })
    .to(logoPath, { morphSVG: original })
    .to(logoPath, { morphSVG: shape3 })
    .to(logoPath, { morphSVG: original })
    .to(logoPath, { morphSVG: shape4 })
    .to(logoPath, { morphSVG: original })
    .to(logoPath, { morphSVG: shape5 })
    .to(logoPath, { morphSVG: original })
    .to(logoPath, { morphSVG: shape6 })
    .to(logoPath, { morphSVG: original })
    .to(logoPath, { morphSVG: shape7 })
    .to(logoPath, { morphSVG: original })
    .to(logoPath, { morphSVG: shape8 })
    .to(logoPath, { morphSVG: original });

  // Typewriter effect animatie voor h1
  const h1Element = document.querySelector('.content h1');
  const texts = ['HIYA', 'SALUT', 'HEY'];
  let currentIndex = 0;

  function typeWriter() {
    const currentText = texts[currentIndex];
    let charIndex = 0;
    
    // Start with invisible character to maintain height
    h1Element.textContent = '\u00A0'; // Non-breaking space
    
    // Type out the text
    const typeInterval = setInterval(() => {
      h1Element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      
      if (charIndex >= currentText.length) {
        clearInterval(typeInterval);
        
        // Wait before erasing
        setTimeout(() => {
          // Erase the text
          let eraseIndex = currentText.length;
          const eraseInterval = setInterval(() => {
            const remainingText = currentText.substring(0, eraseIndex - 1);
            h1Element.textContent = remainingText || '\u00A0'; // Use non-breaking space when empty
            eraseIndex--;
            
            if (eraseIndex <= 0) {
              clearInterval(eraseInterval);
              currentIndex = (currentIndex + 1) % texts.length;
              
              // Wait before typing next word
              setTimeout(() => {
                typeWriter();
              }, 300);
            }
          }, 80); // Erase speed
        }, 1500); // Wait time before erasing
      }
    }, 100); // Type speed
  }

  // Start the typewriter effect
  typeWriter();

  // Scroll arrow animatie
  
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
    onComplete: () => {
      scrollArrow.classList.add('visible');
    }
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
      onComplete: () => {
        scrollArrow.classList.remove('visible');
      }
    });
  });

  // Show/hide arrow based on scroll position
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Only show arrow when at the very top of the first section
    if (currentScrollY < 50) {
      if (!scrollArrow.classList.contains('visible')) {
        gsap.to(scrollArrow, { 
          opacity: 0.7, 
          duration: 0.3,
          onComplete: () => {
            scrollArrow.classList.add('visible');
          }
        });
      }
    } else {
      // Hide arrow when scrolling past the first section
      if (scrollArrow.classList.contains('visible')) {
        gsap.to(scrollArrow, { 
          opacity: 0, 
          duration: 0.3,
          onComplete: () => {
            scrollArrow.classList.remove('visible');
          }
        });
      }
    }
  });

  // Language switching functionality
  const translations = {
    en: {
      'menu-about': "ABOUT ME",
      'menu-work': "WORK", 
      'menu-lab': "LAB",
      'menu-contact': "SAY HI",
      'about-title': "I'M FAISAL",
      'about-description': "Digital Experience Student passionate about creating immersive digital experiences through design and technology. Also obsessed with fashion and art.",
      'projects-title': "LATEST WORK",
      'project1-description': "BACHELOR THESIS PROJECT WHERE WE'VE CREATED AN APP FOR INTERACTIVE STORYTELLING",
      'project2-description': "APP IN REACT NATIVE FOR A CLOTHING SHOP",
      'project3-description': "CREATED A 3D SHOE CONFIGURATOR FOR SWEAR LONDON",
      'contact-title': "WANNA TALK",
      'contact-email': "SEND ME AN EMAIL",
      'footer-work': "WORK",
      'footer-about': "ABOUT ME",
      'footer-contact': "SAY HI",
      'footer-socials': "SOCIALS",
      'footer-find': "COME FIND ME",
      'footer-email': "SEND AN EMAIL",
      'footer-copyright': "© 2025 Faisal. All rights reserved."
    },
    fr: {
      'menu-about': "À PROPOS",
      'menu-work': "TRAVAIL",
      'menu-lab': "LABO",
      'menu-contact': "DITES SALUT",
      'about-title': "JE SUIS FAISAL",
      'about-description': "Étudiant en expérience numérique passionné par la création d'expériences numériques immersives grâce au design et à la technologie. Également obsédé par la mode et l'art.",
      'projects-title': "DERNIERS TRAVAUX",
      'project1-description': "PROJET DE THÈSE DE BACHELOR OÙ NOUS AVONS CRÉÉ UNE APP POUR LA NARRATION INTERACTIVE",
      'project2-description': "APP EN REACT NATIVE POUR UN MAGASIN DE VÊTEMENTS",
      'project3-description': "CRÉÉ UN CONFIGURATEUR 3D DE CHAUSSURES POUR SWEAR LONDON",
      'contact-title': "ON PARLE",
      'contact-email': "ENVOYEZ-MOI UN EMAIL",
      'footer-work': "TRAVAIL",
      'footer-about': "À PROPOS",
      'footer-contact': "DITES SALUT",
      'footer-socials': "RÉSEAUX",
      'footer-find': "VENEZ ME TROUVER",
      'footer-email': "ENVOYEZ UN EMAIL",
      'footer-copyright': "© 2025 Faisal. Tous droits réservés."
    },
    nl: {
      'menu-about': "OVER MIJ",
      'menu-work': "WERK",
      'menu-lab': "LAB",
      'menu-contact': "ZEG HALLO",
      'about-title': "IK BEN FAISAL",
      'about-description': "Digital Experience Student gepassioneerd door het creëren van meeslepende digitale ervaringen door middel van design en technologie. Ook geobsedeerd door mode en kunst.",
      'projects-title': "LAATSTE WERK",
      'project1-description': "BACHELOR THESIS PROJECT WAAR WE EEN APP HEBBEN GEMAAKT VOOR INTERACTIEF VERHALEN VERTELLEN",
      'project2-description': "APP IN REACT NATIVE VOOR EEN KLEDINGWINKEL",
      'project3-description': "EEN 3D SCHOEN CONFIGURATOR GEMAAKT VOOR SWEAR LONDON",
      'contact-title': "ZULLEN WE PRATEN",
      'contact-email': "STUUR ME EEN EMAIL",
      'footer-work': "WERK",
      'footer-about': "OVER MIJ",
      'footer-contact': "ZEG HALLO",
      'footer-socials': "SOCIALS",
      'footer-find': "KOM ME VINDEN",
      'footer-email': "STUUR EEN EMAIL",
      'footer-copyright': "© 2025 Faisal. Alle rechten voorbehouden."
    }
  };

  // Current language
  let currentLanguage = 'en';

  // Language switching function
  function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    // Update active language button
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      }
    });

    // Save language preference
    localStorage.setItem('preferred-language', lang);
  }

  // Initialize language system
  function initializeLanguage() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && translations[savedLang]) {
      switchLanguage(savedLang);
    }

    // Add event listeners to language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        switchLanguage(lang);
      });
    });
  }

  // Initialize language system
  initializeLanguage();
});