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

// ─── Wand cursor & sparkle trail ───
(function () {
  const wand = document.getElementById('wand-cursor');
  let lastSparkleTime = 0;

  const colors = [
    '#FFE066', '#FFB347', '#E07B54', '#C8D8C0',
    '#fff', '#FFD700', '#A8BEA0', '#FFEC8B'
  ];
  const shapes = ['✦', '✧', '⋆', '★', '·', '*'];

  function createSparkle(x, y) {
    const el = document.createElement('div');
    el.className = 'sparkle-particle';

    const size     = Math.random() * 10 + 5;
    const color    = colors[Math.floor(Math.random() * colors.length)];
    const shape    = shapes[Math.floor(Math.random() * shapes.length)];
    const dx       = (Math.random() - 0.5) * 40;
    const dy       = (Math.random() - 0.5) * 40 - 10;
    const duration = Math.random() * 400 + 400;
    const delay    = Math.random() * 80;

    el.style.cssText = `
      left: ${x}px; top: ${y}px;
      font-size: ${size}px;
      color: ${color};
      --dx: ${dx}px;
      --dy: ${dy}px;
      animation-duration: ${duration}ms;
      animation-delay: ${delay}ms;
      text-shadow: 0 0 6px ${color};
      line-height: 1;
      font-family: sans-serif;
    `;
    el.textContent = shape;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), duration + delay + 50);
  }

  document.addEventListener('mousemove', (e) => {
    wand.style.left = e.clientX + 'px';
    wand.style.top  = e.clientY + 'px';

    const now = Date.now();
    if (now - lastSparkleTime > 30) {
      lastSparkleTime = now;
      const count = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < count; i++) {
        createSparkle(
          e.clientX + (Math.random() - 0.5) * 12,
          e.clientY + (Math.random() - 0.5) * 12
        );
      }
    }
  });

  document.addEventListener('mouseleave', () => {
    wand.style.left = '-100px';
    wand.style.top  = '-100px';
  });
})();