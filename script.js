const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.getElementById('overlay');
const navItems = document.querySelectorAll('.nav-links a');

// Function to close the menu
function closeMenu() {
  hamburger.classList.remove('active');
  navLinks.classList.remove('show');
  overlay.style.display = 'none';
}

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('show');
  hamburger.classList.toggle('active');
  overlay.style.display = isOpen ? 'block' : 'none';
});

// Close menu on overlay click
overlay.addEventListener('click', closeMenu);

// Close menu when a nav link is clicked
navItems.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});
