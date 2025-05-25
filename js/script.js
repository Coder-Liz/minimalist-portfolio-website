document.addEventListener('DOMContentLoaded', () => {
  // ==== FORM VALIDATION ====
  const form = document.getElementById('form');
  const fields = ['name', 'email', 'message'];

  function showError(input, messageElement, message) {
    messageElement.textContent = message;
    messageElement.classList.remove('hidden');
    input.classList.add('error-border');
  }

  function clearError(input, messageElement) {
    messageElement.textContent = '';
    messageElement.classList.add('hidden');
    input.classList.remove('error-border');
  }

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    fields.forEach((field) => {
      const input = document.getElementById(field);

      const errorMessage = input.parentElement.querySelector('.error-message');

      if (!input.value.trim()) {
        showError(input, errorMessage, 'This field is required');
        isFormValid = false;
      } else if (field === 'email' && !isValidEmail(input.value)) {
        showError(input, errorMessage, 'Please enter a valid email address');
        isFormValid = false;
      } else {
        clearError(input, errorMessage);
      }
    });

    if (isFormValid) {
      form.submit();
    }
  });

  // ==== MOBILE MENU NAVIGATION ====
  const main = document.querySelector('#main');
  const footer = document.querySelector('#footer');
  const btnOpen = document.querySelector('#btnOpen');
  const btnClose = document.querySelector('#btnClose');
  const menuTopNav = document.querySelector('#menuTopNav');
  const overlay = document.querySelector('#overlay');
  const breakpoint = window.matchMedia('(width < 48rem)');

  const setupTopNav = () => {
    if (breakpoint.matches) {
      menuTopNav.setAttribute('inert', '');
    } else {
      menuTopNav.removeAttribute('inert');
    }
  };

  function openMobileMenu() {
    btnOpen.setAttribute('aria-expanded', 'true');
    main.setAttribute('inert', '');
    footer.setAttribute('inert', '');
    menuTopNav.removeAttribute('inert');
    menuTopNav.style.setProperty('transition-duration', '400ms');
    overlay.style.setProperty('transition-duration', '400ms');
    btnClose.focus();
  }

  function closeMobileMenu() {
    btnOpen.setAttribute('aria-expanded', 'false');
    main.removeAttribute('inert');
    footer.removeAttribute('inert');
    menuTopNav.setAttribute('inert', '');
    btnOpen.focus();

    setTimeout(() => {
      menuTopNav.removeAttribute('style');
      overlay.removeAttribute('style');
    }, 500);
  }

  setupTopNav();
  breakpoint.addEventListener('change', setupTopNav);
  btnOpen.addEventListener('click', openMobileMenu);
  btnClose.addEventListener('click', closeMobileMenu);
});
