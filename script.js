// Navigation interactions
(function(){
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');

  if (navToggle && nav) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  dropdownToggles.forEach(btn => {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.closest('.dropdown');
      const nowOpen = !parent?.classList.contains('open');
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
      if (nowOpen) parent?.classList.add('open');
      btn.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    const openDropdowns = document.querySelectorAll('.dropdown.open');
    openDropdowns.forEach(d => {
      if (!d.contains(e.target)) d.classList.remove('open');
    });
  });

  // Mark active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.setAttribute('aria-current', 'page');
  });

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    })
  });

  // Feedback form validation
  const form = document.querySelector('[data-feedback-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');

      let valid = true;
      [name, email, message].forEach(el => el.classList.remove('invalid'));

      if (!name.value.trim()) { name.classList.add('invalid'); valid = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.classList.add('invalid'); valid = false; }
      if (message.value.trim().length < 10) { message.classList.add('invalid'); valid = false; }

      if (!valid) {
        alert('Please correct the highlighted fields.');
        return;
      }
      alert('Thank you for your feedback, ' + name.value.trim() + '!');
      form.reset();
    });
  }

  // Animate bars
  document.querySelectorAll('[data-bar]')?.forEach(bar => {
    const value = parseFloat(bar.getAttribute('data-bar')) || 0;
    requestAnimationFrame(() => { bar.style.width = Math.min(value, 100) + '%'; });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('[data-reveal], .card, .timeline-item');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(({isIntersecting, target}) => {
        if (isIntersecting) target.classList.add('in-view');
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => {
      el.classList.add('reveal');
      obs.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // Ripple on buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // Image fallback
  const fallback = 'https://images.unsplash.com/photo-1584036561584-b03c19da874c?auto=format&fit=crop&w=1600&q=60';
  document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = 'true';
      img.src = fallback;
    }, { once: true });
  });
})();
