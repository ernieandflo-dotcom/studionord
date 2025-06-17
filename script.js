// MENU HAMBURGER
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('show');
});

navItems.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('show');
  });
});

// ANIMATION LOGO ROTATIF SUR L’AXE Y
const logo = document.querySelector('.main-logo');

// 4 rotations Y au chargement
window.addEventListener('load', () => {
  logo.style.animation = 'rotateYTwoTimes 5s ease-in-out';
});

// Réinitialise l'animation une fois terminée pour pouvoir relancer plus tard
logo.addEventListener('animationend', () => {
  logo.style.animation = '';
});

// 1 rotation Y à chaque réapparition dans le viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && logo.classList.contains('has-loaded')) {
      logo.style.animation = 'rotateYOnce 2s ease-in-out';
    } else if (entry.isIntersecting) {
      logo.classList.add('has-loaded');
    }
  });
}, { threshold: 0.5 });

observer.observe(logo);
