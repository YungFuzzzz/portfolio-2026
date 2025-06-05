window.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.navbar', {
      opacity: 0,
      duration: 0.7,
      ease: 'power1.out'
  });

  gsap.from('.navbar .logo img', {
      opacity: 0,
      duration: 0.7,
      delay: 0.3,
      ease: 'power1.out'
  });

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
    // markers: true,
  });

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
              }
          );
      } else {
          gsap.to(menuOverlay, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
          gsap.to(menuLinks, { opacity: 0, y: 40, duration: 0.3, stagger: 0.05 });
      }
  });
});
