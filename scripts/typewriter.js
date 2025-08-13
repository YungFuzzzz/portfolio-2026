// typewriter.js - Typewriter effect
export function initializeTypewriter() {
  const h1Element = document.querySelector('.content h1');
  
  if (!h1Element) return;
  
  const TYPEWRITER_TEXTS = ['HIYA', 'SALUT', 'HEY'];
  const TYPEWRITER_SPEEDS = { type: 100, erase: 80, pause: 800, nextWord: 300 };
  
  let currentIndex = 0;

  function typeWriter() {
    const currentText = TYPEWRITER_TEXTS[currentIndex];
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
              currentIndex = (currentIndex + 1) % TYPEWRITER_TEXTS.length;
              
              // Wait before typing next word
              setTimeout(typeWriter, TYPEWRITER_SPEEDS.nextWord);
            }
          }, TYPEWRITER_SPEEDS.erase);
        }, TYPEWRITER_SPEEDS.pause);
      }
    }, TYPEWRITER_SPEEDS.type);
  }

  // Start the typewriter effect
  typeWriter();
}
