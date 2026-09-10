(() => {
  const body = document.body;
  const toggle = document.getElementById('themeToggle');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  const savedTheme = localStorage.getItem('kelvin-theme');
  if (savedTheme === 'dark') body.classList.add('dark');
  const updateThemeIcon = () => { if (toggle) toggle.textContent = body.classList.contains('dark') ? '☀' : '◐'; };
  updateThemeIcon();

  toggle?.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('kelvin-theme', body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
  });

  menu?.addEventListener('click', () => nav?.classList.toggle('open'));
  document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav?.classList.remove('open')));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', e => {
    if (window.innerWidth > 900 && glow) { glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; }
  }, { passive: true });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
