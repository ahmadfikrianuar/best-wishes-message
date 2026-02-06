const unlockDate = new Date("2025-02-20T00:01:00");
const locked = document.getElementById("locked");
const app = document.getElementById("app");

if (new Date() >= unlockDate) {
  locked.style.display = "none";
  app.classList.remove("hidden");
}

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ["#FFD700","#FF6EC7","#C57BFF","#FFB347","#FF4500","#FF69B4"];
let fireworks = [];

// Particle class
class Particle {
  constructor(x, y, color, speed, angle, life, size) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.color = color;
    this.speed = speed;
    this.angle = angle;
    this.life = life;
    this.size = size;
  }
  update() {
    this.prevX = this.x;
    this.prevY = this.y;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.life--;
  }
  draw() {
    const alpha = Math.max(this.life / 60, 0); // fade effect
    ctx.beginPath();
    ctx.moveTo(this.prevX, this.prevY);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color + Math.floor(alpha*255).toString(16);
    ctx.lineWidth = this.size;
    ctx.shadowBlur = this.size*2;
    ctx.shadowColor = this.color;
    ctx.stroke();
  }
}

// Create a firework explosion
function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;

  const layers = 3; // far, mid, near
  for (let layer = 0; layer < layers; layer++) {
    const count = 50 + layer*20;
    const speedBase = 2 + layer*1.5;
    const sizeBase = 1 + layer*0.5;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * speedBase + speedBase/2;
      const size = Math.random() * sizeBase + sizeBase/2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      fireworks.push(new Particle(x, y, color, speed, angle, 60, size));
    }
  }
}

// Animate fireworks
function animate() {
ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // adjust alpha for trail length
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Switch back to normal drawing mode for particles
  ctx.globalCompositeOperation = "source-over";

  fireworks.forEach((p, i) => {
    if (p.life <= 0) {
      fireworks.splice(i, 1);
      return;
    }

    p.update();

    const alpha = Math.max(p.life / 60, 0); // optional: adds extra fade
    ctx.beginPath();
    ctx.moveTo(p.prevX, p.prevY);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = p.color + Math.floor(alpha * 255).toString(16);
    ctx.lineWidth = p.size;
    ctx.shadowBlur = p.size * 2;
    ctx.shadowColor = p.color;
    ctx.stroke();
  });

  requestAnimationFrame(animate);
}

// Launch fireworks every 900ms
setInterval(createFirework, 900);
animate();
function goBackHome() {
  window.location.href = "index.html";
}

// Resize handler
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


