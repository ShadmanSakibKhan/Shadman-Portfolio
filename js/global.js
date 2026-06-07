/* ============================================================
   GLOBAL JS — SHADMAN SAKIB KHAN PORTFOLIO
   ============================================================ */

(function () {
  'use strict';

  /* ── DOM Ready ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initLoading();
    initCursor();
    initNav();
    initScrollProgress();
    initScrollReveal();
    initMagneticButtons();
    initMobileMenu();
    initFooterYear();
  });

  /* ── Loading Screen ───────────────────────────────────── */
  function initLoading() {
    const screen = document.getElementById('loading-screen');
    if (!screen) return;
    const bar = screen.querySelector('.loading-bar');
    const pct = screen.querySelector('.loading-pct');
    let progress = 0;

    const tick = setInterval(() => {
      progress += Math.random() * 18 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(tick);
        setTimeout(() => {
          screen.classList.add('hidden');
          document.body.style.overflow = '';
        }, 300);
      }
      if (bar) bar.style.width = progress + '%';
      if (pct) pct.textContent = Math.floor(progress) + '%';
    }, 60);

    document.body.style.overflow = 'hidden';
  }

  /* ── Custom Cursor ────────────────────────────────────── */
  function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    // Smooth ring follow
    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effects on interactive elements
    const hoverEls = document.querySelectorAll('a, button, .btn, [data-cursor="hover"]');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });
  }

  /* ── Navigation ───────────────────────────────────────── */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      // Hide/show nav on scroll direction
      if (scrollY > lastScroll && scrollY > 200) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
      lastScroll = scrollY;
    }, { passive: true });

    nav.style.transition = 'transform 0.4s ease, background 0.3s ease, box-shadow 0.3s ease';

    // Active link tracking
    const sections = document.querySelectorAll('[data-section]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.section;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
  }

  /* ── Scroll Progress Bar ──────────────────────────────── */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? window.scrollY / docH : 0;
      bar.style.transform = `scaleX(${pct})`;
    }, { passive: true });
  }

  /* ── Scroll Reveal ────────────────────────────────────── */
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    els.forEach(el => observer.observe(el));
  }

  /* ── Magnetic Buttons ─────────────────────────────────── */
  function initMagneticButtons() {
    const magnets = document.querySelectorAll('[data-magnetic]');

    magnets.forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.25;
        const dy = (e.clientY - cy) * 0.25;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });

      btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'transform 0.1s ease';
      });
    });
  }

  /* ── Mobile Menu ──────────────────────────────────────── */
  function initMobileMenu() {
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.nav-mobile');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── Footer Year ──────────────────────────────────────── */
  function initFooterYear() {
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ── Counter Animation ────────────────────────────────── */
  window.animateCounter = function (el, target, duration = 2000, suffix = '') {
    let start = 0;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ── Particle Network Canvas ──────────────────────────── */
  window.initParticleNetwork = function (canvasId, opts = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const config = {
      count: opts.count || 80,
      color: opts.color || '79, 126, 255',
      lineColor: opts.lineColor || '79, 126, 255',
      maxDist: opts.maxDist || 130,
      speed: opts.speed || 0.4,
      mouseRadius: opts.mouseRadius || 150,
      ...opts
    };

    let W, H, mouse = { x: -9999, y: -9999 };
    let particles = [];
    let animId;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < config.count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * config.speed,
          vy: (Math.random() - 0.5) * config.speed,
          r: Math.random() * 2 + 1.5,
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      particles.forEach(p => {
        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < config.mouseRadius) {
          const force = (config.mouseRadius - dist) / config.mouseRadius;
          p.x -= dx * force * 0.03;
          p.y -= dy * force * 0.03;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${config.color}, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.maxDist) {
            const alpha = (1 - dist / config.maxDist) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${config.lineColor}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => {
      mouse.x = -9999; mouse.y = -9999;
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

    return { destroy: () => cancelAnimationFrame(animId) };
  };

  /* ── Konami Code Easter Egg ───────────────────────────── */
  const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIdx = 0;

  document.addEventListener('keydown', e => {
    if (e.key === konamiCode[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konamiCode.length) {
        konamiIdx = 0;
        triggerKonami();
      }
    } else {
      konamiIdx = 0;
    }
  });

  function triggerKonami() {
    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed; inset:0; z-index:999999; pointer-events:none;
      display:flex; align-items:center; justify-content:center;
      background:rgba(0,0,0,0.85); animation: fadeIn 0.3s ease;
    `;
    el.innerHTML = `
      <div style="text-align:center; color:white; font-family:'Syne',sans-serif;">
        <div style="font-size:4rem; margin-bottom:16px;">🚀</div>
        <div style="font-size:1.5rem; font-weight:800; background:linear-gradient(135deg,#4F7EFF,#7A5FFF); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">
          DEVELOPER MODE ACTIVATED
        </div>
        <div style="font-size:0.875rem; color:#888; margin-top:8px; font-family:'JetBrains Mono',monospace;">
          You found the secret! 🎉
        </div>
      </div>
    `;
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.5s ease';
      setTimeout(() => el.remove(), 500);
    }, 2500);
  }

  /* ── Tilt Effect ──────────────────────────────────────── */
  window.initTiltCards = function (selector) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotX = (y - 0.5) * -10;
        const rotY = (x - 0.5) * 10;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.1s ease';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
    });
  };

  /* ── Typed Text ───────────────────────────────────────── */
  window.initTyped = function (el, words, opts = {}) {
    if (!el) return;
    const config = {
      typeSpeed: opts.typeSpeed || 80,
      deleteSpeed: opts.deleteSpeed || 40,
      delay: opts.delay || 1800,
      loop: opts.loop !== false
    };

    let wordIdx = 0, charIdx = 0, deleting = false;

    function tick() {
      const word = words[wordIdx];
      if (!deleting) {
        el.textContent = word.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === word.length) {
          deleting = true;
          setTimeout(tick, config.delay);
          return;
        }
        setTimeout(tick, config.typeSpeed);
      } else {
        el.textContent = word.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
        }
        setTimeout(tick, config.deleteSpeed);
      }
    }
    tick();
  };

  /* ── Smooth Scroll ────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
