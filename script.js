// --- Gestion du menu hamburger ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.getElementById('overlay');
const navItems = document.querySelectorAll('.nav-links a');

function closeMenu() {
  hamburger.classList.remove('active');
  navLinks.classList.remove('show');
  overlay.style.display = 'none';
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    hamburger.classList.toggle('active');
    overlay.style.display = isOpen ? 'block' : 'none';
  });
}

if (overlay) {
  overlay.addEventListener('click', closeMenu);
}

navItems.forEach(link => {
  link.addEventListener('click', closeMenu);
});


// --- Gestion du formulaire contact (si présent) ---
document.addEventListener("DOMContentLoaded", () => {
  const roleSelect = document.getElementById("contact-role");
  const defaultForm = document.getElementById("default-form");
  const creatorForm = document.getElementById("creator-form");

  if (roleSelect && defaultForm && creatorForm) {
    roleSelect.addEventListener("change", () => {
      if (roleSelect.value === "creator") {
        defaultForm.classList.add("hidden");
        creatorForm.classList.remove("hidden");
      } else {
        defaultForm.classList.remove("hidden");
        creatorForm.classList.add("hidden");
      }
    });
  }

  // --- Gestion des descriptions de services (index.html uniquement) ---
  document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    toggleButtons.forEach(button => {
      button.addEventListener("click", () => {
        const descriptionRow = button.closest("tr").nextElementSibling;
        descriptionRow.classList.toggle("show");
        button.classList.toggle("open");
    });
  });
});

});
