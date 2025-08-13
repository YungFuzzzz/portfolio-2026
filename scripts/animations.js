// animations.js - Core GSAP animations
export function initializeAnimations() {
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
}
