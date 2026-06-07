/* ============================================================
   INDEX JS — Homepage
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initHeroParticles();
    initTypedRoles();
    initCounters();
    initProjectTilts();
    initHeroParallax();
  });

  /* ── Hero Particle Network ────────────────────────────── */
  function initHeroParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H, particles = [], mouse = { x: -9999, y: -9999 };
    let animId;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.min(Math.floor(W * H / 12000), 120);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 2.5 + 1,
          opacity: Math.random() * 0.4 + 0.15,
          hue: Math.random() > 0.5 ? '79, 126, 255' : '122, 95, 255'
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      particles.forEach(p => {
        // Mouse repel
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const force = (160 - dist) / 160;
          p.x -= dx * force * 0.025;
          p.y -= dy * force * 0.025;
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue}, ${p.opacity})`;
        ctx.fill();
      });

      // Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            const alpha = (1 - d / 140) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(79, 126, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    window.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('resize', () => {
      cancelAnimationFrame(animId);
      resize();
      createParticles();
      draw();
    });

    resize();
    createParticles();
    draw();
  }

  /* ── Typed Roles ──────────────────────────────────────── */
  function initTypedRoles() {
    const el = document.getElementById('typed-role');
    if (!el) return;
    window.initTyped(el, [
      'AI Engineer',
      'Researcher',
      'Full Stack Dev',
      'Product Builder',
      'LLM Specialist'
    ], { typeSpeed: 70, deleteSpeed: 35, delay: 1600 });
  }

  /* ── Counter Animations ───────────────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter);
          const suffix = el.dataset.suffix || '';
          window.animateCounter(el, target, 2000, suffix);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  /* ── Project Card Tilts ───────────────────────────────── */
  function initProjectTilts() {
    window.initTiltCards('.project-card-preview');
  }

  /* ── Hero Parallax ────────────────────────────────────── */
  function initHeroParallax() {
    const badges = document.querySelector('.hero-badges');
    if (!badges) return;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      badges.style.transform = `translateY(calc(-50% + ${y * 0.15}px))`;
    }, { passive: true });
  }

})();

// Counter re-init for about section stat bubbles
document.addEventListener('DOMContentLoaded', () => {
  const numCounters = document.querySelectorAll('[data-counter]');
  if (numCounters.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.counter);
          const suffix = el.dataset.suffix || '';
          window.animateCounter(el, target, 2000, suffix);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    numCounters.forEach(c => obs.observe(c));
  }
});
