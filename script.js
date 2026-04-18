// ============================================================
// Kaviyakavi Baskaran — Portfolio JS
// Reveal on scroll, marquee pause, filter chips
// ============================================================

(function () {
  'use strict';

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // Video placeholder click feedback
  const videoCard = document.querySelector('.video-card');
  if (videoCard) {
    videoCard.addEventListener('click', () => {
      alert('Placeholder: embed your Loom / YouTube intro video here.\n\nReplace this in index.html → .video-card with an <iframe>.');
    });
  }

  // Work page filters
  const chips = document.querySelectorAll('.filter-chip');
  const categories = document.querySelectorAll('.work-category');
  if (chips.length && categories.length) {
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const key = chip.dataset.filter;
        chips.forEach((c) => c.classList.toggle('active', c === chip));
        categories.forEach((cat) => {
          if (key === 'all' || cat.dataset.category === key) {
            cat.style.display = '';
          } else {
            cat.style.display = 'none';
          }
        });
        // Smooth scroll to work section top
        const workStart = document.querySelector('.work-categories');
        if (workStart) {
          window.scrollTo({ top: workStart.offsetTop - 100, behavior: 'smooth' });
        }
      });
    });
  }

  // Marquee pause on hover
  const marquee = document.querySelector('.marquee-track');
  if (marquee) {
    const parent = marquee.parentElement;
    parent.addEventListener('mouseenter', () => (marquee.style.animationPlayState = 'paused'));
    parent.addEventListener('mouseleave', () => (marquee.style.animationPlayState = 'running'));
  }

  // Current year in footer
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
