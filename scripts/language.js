// Language switching functionality
const translations = {
  en: {
    'menu-about': "ABOUT",
    'menu-work': "PROJECTS", 
    'menu-lab': "LAB",
    'menu-contact': "SAY HI",
    'about-title': "I AM FAISAL",
    'about-description': "Digital Experience student driven by creativity and a passion for crafting immersive, impactful digital experiences. I love working with emerging technologies to design and develop well-structured, high-quality applications that solve real problems. Beyond technology, I draw inspiration from fashion and art, blending aesthetics with functionality to deliver unique and engaging solutions.",
    'projects-title': "LATEST PROJECTS",
    'project1-description': "BACHELOR THESIS PROJECT — AN APP FOR INTERACTIVE STORYTELLING",
    'project2-description': "REACT NATIVE APP FOR A CLOTHING STORE",
    'project3-description': "3D SHOE CONFIGURATOR FOR SWEAR LONDON",
    'contact-title': "LET'S TALK",
    'contact-email': "SEND ME AN EMAIL",
    'footer-work': "PROJECTS",
    'footer-about': "ABOUT",
    'footer-contact': "SAY HI",
    'footer-socials': "SOCIALS",
    'footer-find': "FIND ME",
    'footer-email': "SEND AN EMAIL",
    'footer-copyright': "© 2025 Faisal. All rights reserved.",
    'about-button': "LEARN MORE ABOUT ME",
    'projects-button': "SEE MORE PROJECTS"
  },
  fr: {
    'menu-about': "À PROPOS",
    'menu-work': "PROJETS",
    'menu-lab': "LABO",
    'menu-contact': "SALUER",
    'about-title': "JE SUIS FAISAL",
    'about-description': "Étudiant en Expérience Digitale, animé par la créativité et la passion de créer des expériences numériques immersives et marquantes. J’aime travailler avec les technologies émergentes afin de concevoir et développer des applications bien structurées et de haute qualité, répondant à de véritables besoins. Au-delà de la technologie, je puise mon inspiration dans la mode et l’art, combinant l’esthétique et la fonctionnalité pour proposer des solutions uniques et captivantes.",
    'projects-title': "PROJETS RÉCENTS",
    'project1-description': "PROJET DE FIN D’ÉTUDES — UNE APPLICATION POUR LA NARRATION INTERACTIVE",
    'project2-description': "APPLICATION REACT NATIVE POUR UNE BOUTIQUE DE VÊTEMENTS",
    'project3-description': "CONFIGURATEUR 3D DE CHAUSSURES POUR SWEAR LONDON",
    'contact-title': "ON DISCUTE",
    'contact-email': "M’ENVOYER UN EMAIL",
    'footer-work': "PROJETS",
    'footer-about': "À PROPOS",
    'footer-contact': "SALUER",
    'footer-socials': "RÉSEAUX",
    'footer-find': "ME TROUVER",
    'footer-email': "ENVOYER UN EMAIL",
    'footer-copyright': "© 2025 Faisal. Tous droits réservés.",
    'about-button': "EN SAVOIR PLUS SUR MOI",
    'projects-button': "VOIR PLUS DE PROJETS"
  },
  nl: {
    'menu-about': "OVER",
    'menu-work': "PROJECTEN",
    'menu-lab': "LAB",
    'menu-contact': "ZEG HALLO",
    'about-title': "IK BEN FAISAL",
    'about-description': "Digital Experience-student met een sterke creativiteit en passie voor het creëren van meeslepende en impactvolle digitale ervaringen. Ik werk graag met nieuwe technologieën om goed gestructureerde, hoogwaardige applicaties te ontwerpen en ontwikkelen die echte problemen oplossen. Naast technologie haal ik veel inspiratie uit mode en kunst, waarbij ik esthetiek en functionaliteit combineer om unieke en boeiende oplossingen te realiseren.",
    'projects-title': "RECENTE PROJECTEN",
    'project1-description': "BACHELORPROEF — EEN APP VOOR INTERACTIEF VERHALENVERTELLEN",
    'project2-description': "REACT NATIVE APP VOOR EEN KLEDINGWINKEL",
    'project3-description': "3D SCHOENENCONFIGURATOR VOOR SWEAR LONDON",
    'contact-title': "LATEN WE PRATEN",
    'contact-email': "STUUR ME EEN MAIL",
    'footer-work': "PROJECTEN",
    'footer-about': "OVER",
    'footer-contact': "ZEG HALLO",
    'footer-socials': "SOCIALS",
    'footer-find': "VIND ME",
    'footer-email': "STUUR EEN MAIL",
    'footer-copyright': "© 2025 Faisal. Alle rechten voorbehouden.",
    'about-button': "MEER OVER MIJ",
    'projects-button': "MEER PROJECTEN BEKIJKEN"
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeLanguage();
});
