// Active sidebar on scroll
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
 
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
 
  // Subtle parallax on stars
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    document.querySelectorAll('.star').forEach((s, i) => {
      s.style.transform = `translate(${x * (i % 2 === 0 ? 1 : -0.6)}px, ${y * 0.8}px)`;
    });
  });