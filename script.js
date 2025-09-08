// Navigation interactions
(function(){
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  dropdownToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.closest('.dropdown');
      parent?.classList.toggle('open');
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
})();
