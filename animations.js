(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const frames = new Map();
  let observer;

  function finishCounter(counter) {
    cancelAnimationFrame(frames.get(counter));
    frames.delete(counter);
    counter.textContent = `${counter.dataset.target}${counter.dataset.suffix || ''}`;
  }

  function animateCounter(counter) {
    if (counter.dataset.counted) return;
    counter.dataset.counted = 'true';
    if (preference.matches) return finishCounter(counter);
    const start = performance.now();
    const target = Number(counter.dataset.target);
    counter.setAttribute('aria-label', `${target}${counter.dataset.suffix || ''}`);
    function frame(now) {
      const progress = Math.min((now - start) / 1000, 1);
      counter.textContent = `${Math.round(target * (1 - (1 - progress) ** 3))}${counter.dataset.suffix || ''}`;
      if (progress < 1) frames.set(counter, requestAnimationFrame(frame));
      else frames.delete(counter);
    }
    frames.set(counter, requestAnimationFrame(frame));
  }

  function reveal(element) {
    element.classList.add('is-visible');
    element.querySelectorAll('.counter').forEach(animateCounter);
    observer?.unobserve(element);
  }

  function prepareMotion() {
    const enabled = !preference.matches && 'IntersectionObserver' in window;
    root.classList.toggle('motion-enabled', enabled);
    // Animate children individually so tall sections never conceal their content.
    document.querySelectorAll('.hero-content, .project-hero, .stats-grid, .skills-grid, .gallery-grid, .story-grid, .project-meta-grid, .video-grid').forEach(group => {
      Array.from(group.children).forEach((child, i) => child.style.setProperty('--reveal-delay', `${Math.min(i, 3) * 75}ms`));
    });
    const targets = document.querySelectorAll('.hero-content > *, .hero-showcase, .hero-footnote, .portrait-card, .section-heading, .project-toolbar, .project-card, .timeline-item, .stat-card, .skill-card, .about > *, .contact > *, .project-hero > *, .project-cover, .project-meta-grid > *, .two-column > *, .story-card, .gallery-item, .video-card, .comparison, .next-project');
    if (enabled && !observer) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target); });
      }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
    }
    targets.forEach(element => {
      if (!enabled) return reveal(element);
      if (element.dataset.motionReady) return;
      element.dataset.motionReady = 'true';
      element.classList.add('motion-reveal');
      observer.observe(element);
    });
    if (!enabled) {
      observer?.disconnect();
      document.querySelectorAll('.counter').forEach(finishCounter);
    }
  }

  const header = document.querySelector('.site-header');
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);
  const links = Array.from(document.querySelectorAll('nav a[href^="#"]'));
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  let queued = false;
  function updateScroll() {
    queued = false;
    const range = root.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0})`;
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
    let current = '';
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= window.innerHeight * .35) current = `#${section.id}`;
    });
    links.forEach(link => {
      if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function queueScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(updateScroll);
  }
  window.addEventListener('scroll', queueScroll, { passive: true });
  window.addEventListener('resize', queueScroll);
  window.addEventListener('pageshow', () => {
    document.body.classList.remove('page-leave');
    updateScroll();
  });
  document.addEventListener('portfolio:content-rendered', () => { prepareMotion(); queueScroll(); });
  preference.addEventListener('change', prepareMotion);
  prepareMotion();
  updateScroll();
})();
