
const messages = [
  "Happy Birthday to You 🎉",
  "Wishing You Joy & Happiness 💖",
  "May All Your Dreams Come True ✨",
  "Have a Beautiful Day Ahead 🌸"
];

const tapHint = document.getElementById("tapHint");

function moveHintRandomly() {
  if (!tapHint) return;

  const padding = 40;
  const x = Math.random() * (window.innerWidth - padding * 2) + padding;
  const y = Math.random() * (window.innerHeight - padding * 2) + padding;

  tapHint.style.left = `${x}px`;
  tapHint.style.top = `${y}px`;
}

// Move hint every few seconds
moveHintRandomly();
const hintInterval = setInterval(moveHintRandomly, 3000);


const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.25; // start silent

function startMusicWithFade() {
  bgMusic.play().catch(() => {});

  // Remove floating hint
  tapHint?.remove();
  clearInterval(hintInterval);

  let targetVolume = 0.25;
  let fadeInterval = setInterval(() => {
    if (bgMusic.volume < targetVolume) {
      bgMusic.volume = Math.min(bgMusic.volume + 0.01, targetVolume);
    } else {
      clearInterval(fadeInterval);
    }
  }, 200);

  document.removeEventListener("click", startMusicWithFade);
  document.removeEventListener("touchstart", startMusicWithFade);
}

// browser-friendly trigger
document.addEventListener("click", startMusicWithFade);
document.addEventListener("touchstart", startMusicWithFade);




const element = document.getElementById("birthdayText");
const subtext = document.querySelector(".subtext");
const nextBtn = document.querySelector(".next-btn");

const typingSpeed = 120;   // typing speed
const readDelay = 3000;    // pause to read
const restartDelay = 800;  // pause before next message

let msgIndex = 0;
let charIndex = 0;

function typeText() {
  if (charIndex < messages[msgIndex].length) {
    element.textContent += messages[msgIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, typingSpeed);
  } else {
    // show extra elements after first full message
    subtext.classList.remove("hidden");
    nextBtn.classList.remove("hidden");

    // wait, then switch to next message
    setTimeout(resetText, readDelay);
  }
}

function resetText() {
  element.textContent = "";
  charIndex = 0;
  msgIndex = (msgIndex + 1) % messages.length;

  setTimeout(typeText, restartDelay);
}

// Start animation
typeText();

function goNext() {
  window.location.href = "celebration.html";
}
const canvas = document.getElementById("sparkles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const sparkles = [];
const colors = ["#FFD700", "#FF69B4", "#FFB347", "#C77DFF", "#FFFFFF"];

class Sparkle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.life = 60;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 2 + 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.life--;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.life / 60;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// RANDOM POP effect like fireworks
function spawnSparkleBurst() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;

  const count = Math.random() * 20 + 15;

  for (let i = 0; i < count; i++) {
    sparkles.push(new Sparkle(x, y));
  }
}

// Random timing (not fixed!)
function randomPop() {
  spawnSparkleBurst();
  setTimeout(randomPop, Math.random() * 600 + 200);
}


randomPop();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sparkles.forEach((s, i) => {
    s.update();
    s.draw();

    if (s.life <= 0) sparkles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();

// Resize safe
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


