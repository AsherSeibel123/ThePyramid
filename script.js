const scene = document.getElementById('scene');
const sun = document.getElementById('sun');
const stars = document.getElementById('stars');
const ground = document.getElementById('ground');
const gods = document.getElementById('gods');
const title = document.getElementById('title');
const controlBtn = document.getElementById('controlBtn');
const ufo = document.getElementById('ufo');
const ufoBeam = document.getElementById('ufoBeam');
const discoBall = document.getElementById('discoBall');
const raveLights = document.getElementById('raveLights');
const hieroglyphicsTop = document.getElementById('hieroglyphicsTop');
const hieroglyphicsBottom = document.getElementById('hieroglyphicsBottom');

// Hieroglyph symbols (simple Egyptian-style shapes)
const hieroglyphSymbols = [
  // Eye
  '<svg class="hieroglyph" viewBox="0 0 30 30"><ellipse cx="15" cy="15" rx="12" ry="8"/><circle cx="15" cy="15" r="4" fill="#8B4513"/><line x1="27" y1="15" x2="30" y2="18"/></svg>',
  // Ankh
  '<svg class="hieroglyph" viewBox="0 0 30 30"><circle cx="15" cy="8" r="5"/><line x1="15" y1="13" x2="15" y2="28"/><line x1="8" y1="18" x2="22" y2="18"/></svg>',
  // Scarab
  '<svg class="hieroglyph" viewBox="0 0 30 30"><ellipse cx="15" cy="15" rx="10" ry="12"/><line x1="5" y1="10" x2="2" y2="8"/><line x1="25" y1="10" x2="28" y2="8"/><line x1="5" y1="20" x2="2" y2="22"/><line x1="25" y1="20" x2="28" y2="22"/></svg>',
  // Bird
  '<svg class="hieroglyph" viewBox="0 0 30 30"><path d="M5 20 L10 10 L20 12 L25 8 L25 15 L20 18 L15 20 L10 22 Z"/><circle cx="22" cy="10" r="2" fill="#8B4513"/></svg>',
  // Reed
  '<svg class="hieroglyph" viewBox="0 0 30 30"><line x1="15" y1="5" x2="15" y2="25"/><line x1="12" y1="8" x2="18" y2="8"/><line x1="12" y1="12" x2="18" y2="12"/><line x1="12" y1="16" x2="18" y2="16"/></svg>',
  // Sun disk
  '<svg class="hieroglyph" viewBox="0 0 30 30"><circle cx="15" cy="15" r="8"/><line x1="15" y1="2" x2="15" y2="6"/><line x1="15" y1="24" x2="15" y2="28"/><line x1="2" y1="15" x2="6" y2="15"/><line x1="24" y1="15" x2="28" y2="15"/></svg>',
  // Feather
  '<svg class="hieroglyph" viewBox="0 0 30 30"><path d="M15 5 Q12 15, 10 25 M15 5 Q18 15, 20 25"/><line x1="15" y1="5" x2="15" y2="25"/></svg>',
  // Was scepter
  '<svg class="hieroglyph" viewBox="0 0 30 30"><circle cx="15" cy="6" r="4"/><line x1="15" y1="10" x2="15" y2="22"/><path d="M10 22 L15 22 L15 26 L12 28 L10 26 Z"/></svg>',
  // Snake
  '<svg class="hieroglyph" viewBox="0 0 30 30"><path d="M5 15 Q10 8, 15 15 T25 15" fill="none"/><circle cx="23" cy="14" r="2" fill="#8B4513"/></svg>',
  // Papyrus
  '<svg class="hieroglyph" viewBox="0 0 30 30"><path d="M10 25 L10 15 Q10 8, 15 5 Q20 8, 20 15 L20 25"/></svg>'
];

// Generate hieroglyphs for top border
for (let i = 0; i < 25; i++) {
  const randomHieroglyph = hieroglyphSymbols[Math.floor(Math.random() * hieroglyphSymbols.length)];
  hieroglyphicsTop.innerHTML += randomHieroglyph;
}

// Generate hieroglyphs for bottom border
for (let i = 0; i < 25; i++) {
  const randomHieroglyph = hieroglyphSymbols[Math.floor(Math.random() * hieroglyphSymbols.length)];
  hieroglyphicsBottom.innerHTML += randomHieroglyph;
}

// Generate 150 stars
for (let i = 0; i < 150; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 70 + '%';
  stars.appendChild(star);
}

let isNight = false;
let isTransitioning = false;

function transitionToNight() {
  if (isTransitioning) return;
  isTransitioning = true;
  isNight = true;

  // Animate sun moving down slowly
  let sunTop = 15;
  let sunRight = 20;
  const sunInterval = setInterval(() => {
    sunTop += 1.3;
    sunRight -= 0.2;
    sun.style.top = sunTop + '%';
    sun.style.right = sunRight + '%';
    
    if (sunTop >= 80) {
      clearInterval(sunInterval);
      sun.style.opacity = '0';
      
      // Start night effects
      setTimeout(() => {
        scene.style.background = 'linear-gradient(to bottom, #0a0e27 0%, #1a1a3e 50%, #2c2440 70%, #3d2f1f 100%)';
        stars.style.opacity = '1';
        ground.style.background = 'linear-gradient(to bottom, #4a3c28, #3d2f1f)';
        gods.style.opacity = '1';
        title.style.color = 'rgba(255, 255, 255, 0.95)';
        title.style.textShadow = '4px 4px 0px rgba(100, 100, 255, 0.4), 8px 8px 0px rgba(0, 0, 0, 0.6), 0 0 30px rgba(200, 200, 255, 0.4)';
        
        // UFO sequence after 1 second
        setTimeout(startUFOSequence, 1000);
        
        // Disco ball and rave lights
        setTimeout(() => {
          discoBall.style.opacity = '.1';
          raveLights.style.opacity = '1';
        }, 2000);
        
        isTransitioning = false;
      }, 500);
    }
  }, 50);

  controlBtn.textContent = 'NIGHT';
}

function transitionToDay() {
  if (isTransitioning) return;
  isTransitioning = true;
  isNight = false;

  // Hide night effects immediately
  discoBall.style.opacity = '0';
  raveLights.style.opacity = '0';
  ufo.style.opacity = '0';
  ufoBeam.style.opacity = '0';

  // Animate sun rising slowly
  sun.style.opacity = '1';
  let sunTop = 80;
  let sunRight = 10;
  const sunInterval = setInterval(() => {
    sunTop -= 1.3;
    sunRight += 0.2;
    sun.style.top = sunTop + '%';
    sun.style.right = sunRight + '%';
    
    if (sunTop <= 15) {
      clearInterval(sunInterval);
      
      setTimeout(() => {
        scene.style.background = 'linear-gradient(to bottom, #87CEEB 0%, #87CEEB 50%, #F4A460 70%, #DEB887 100%)';
        stars.style.opacity = '0';
        ground.style.background = 'linear-gradient(to bottom, #F4D03F, #D4AF37)';
        gods.style.opacity = '0';
        title.style.color = 'rgba(40, 30, 20, 0.95)';
        title.style.textShadow = '4px 4px 0px rgba(218, 165, 32, 0.3), 8px 8px 0px rgba(0, 0, 0, 0.2), 3px 3px 15px rgba(255, 255, 255, 0.4)';
        
        isTransitioning = false;
      }, 500);
    }
  }, 50);

  controlBtn.textContent = 'DAY';
}

function startUFOSequence() {
  // UFO flies in from left
  ufo.style.opacity = '1';
  let ufoLeft = -200;
  const flyIn = setInterval(() => {
    ufoLeft += 9;
    ufo.style.left = ufoLeft + 'px';
    
    if (ufoLeft >= window.innerWidth / 2 - 60) {
      clearInterval(flyIn);
      
      // Hover and beam down
      setTimeout(() => {
        ufoBeam.style.opacity = '1';
        
        // Beam stays for 2 seconds then UFO flies away
        setTimeout(() => {
          ufoBeam.style.opacity = '0';
          
          const flyOut = setInterval(() => {
            ufoLeft += 8;
            ufo.style.left = ufoLeft + 'px';
            
            if (ufoLeft >= window.innerWidth + 200) {
              clearInterval(flyOut);
              ufo.style.opacity = '0';
              ufo.style.left = '-200px';
            }
          }, 30);
        }, 2000);
      }, 500);
    }
  }, 30);
}

// Auto cycle every 10 seconds
setInterval(() => {
  if (isNight) {
    transitionToDay();
  } else {
    transitionToNight();
  }
}, 30000);

// Manual control
controlBtn.addEventListener('click', () => {
  if (isNight) {
    transitionToDay();
  } else {
    transitionToNight();
  }
});

// Start with day
sun.style.top = '15%';
sun.style.right = '20%';