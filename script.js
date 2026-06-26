// ─── Active sidebar on scroll ───
const sections = document.querySelectorAll('section[id]');
const icons = document.querySelectorAll('.sidebar-icon');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      icons.forEach(i => i.classList.remove('active'));
      const target = document.querySelector(`.sidebar-icon[href="#${e.target.id}"]`);
      if (target) target.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ─── Smooth scroll ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Subtle parallax on stars ───
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  document.querySelectorAll('.star').forEach((s, i) => {
    s.style.transform = `translate(${x * (i % 2 === 0 ? 1 : -0.6)}px, ${y * 0.8}px)`;
  });
});

// ─── Sparkle cursor & trail ───
(function () {
  let mouseX = -200, mouseY = -200;
  let lastTrailTime = 0;

  // Pink + white palette
  const colors = [
    '#FFB6C1', '#FF9EB5', '#FFD6E0', '#FF69B4',
    '#fff', '#FFE0EC', '#F9A8C9', '#FFAEC9',
    '#FFC0CB', '#ffe4ee'
  ];
  const shapes = ['✦', '✧', '⋆', '✺', '·', '✼', '*', '✨'];

  // Creates one sparkle particle
  function spawnSparkle(x, y, opts = {}) {
    const el = document.createElement('div');
    el.className = 'sparkle-particle';

    const size     = opts.size     ?? (Math.random() * 11 + 4);
    const color    = opts.color    ?? colors[Math.floor(Math.random() * colors.length)];
    const shape    = opts.shape    ?? shapes[Math.floor(Math.random() * shapes.length)];
    const dx       = opts.dx       ?? (Math.random() - 0.5) * 48;
    const dy       = opts.dy       ?? (Math.random() - 0.5) * 48 - 8;
    const duration = opts.duration ?? (Math.random() * 450 + 350);
    const delay    = opts.delay    ?? (Math.random() * 60);

    el.style.cssText = `
      left: ${x}px; top: ${y}px;
      font-size: ${size}px;
      color: ${color};
      --dx: ${dx}px;
      --dy: ${dy}px;
      animation-duration: ${duration}ms;
      animation-delay: ${delay}ms;
      text-shadow: 0 0 8px ${color}, 0 0 16px ${color};
      line-height: 1;
      font-family: sans-serif;
      transform: translate(-50%, -50%);
    `;
    el.textContent = shape;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), duration + delay + 50);
  }

  // The "cursor" itself: a dense tight cluster of sparkles right at the pointer
  function spawnCursorBurst(x, y) {
    const count = 5;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = Math.random() * 7;
      spawnSparkle(
        x + Math.cos(angle) * r,
        y + Math.sin(angle) * r,
        {
          size: Math.random() * 8 + 5,
          dx: Math.cos(angle) * (Math.random() * 6 + 2),
          dy: Math.sin(angle) * (Math.random() * 6 + 2) - 4,
          duration: Math.random() * 200 + 200,
          delay: 0,
        }
      );
    }
  }

  // Trail sparkles that drift further
  function spawnTrail(x, y) {
    const count = Math.floor(Math.random() * 3) + 4; // 4–6 per tick
    for (let i = 0; i < count; i++) {
      spawnSparkle(
        x + (Math.random() - 0.5) * 18,
        y + (Math.random() - 0.5) * 18,
        {
          size: Math.random() * 10 + 3,
          dx: (Math.random() - 0.5) * 55,
          dy: (Math.random() - 0.5) * 55 - 12,
          duration: Math.random() * 500 + 400,
          delay: Math.random() * 80,
        }
      );
    }
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const now = Date.now();

    // Dense cursor cluster every 16ms (~60fps feel)
    spawnCursorBurst(mouseX, mouseY);

    // Trail every 22ms
    if (now - lastTrailTime > 22) {
      lastTrailTime = now;
      spawnTrail(mouseX, mouseY);
    }
  });
})();