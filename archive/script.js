// --- Gestion du menu hamburger ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.getElementById('overlay');
const navItems = document.querySelectorAll('.nav-links a');

function closeMenu() {
  if (hamburger) hamburger.classList.remove('active');
  if (navLinks) navLinks.classList.remove('show');
  if (overlay) overlay.style.display = 'none';
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    hamburger.classList.toggle('active');
    if (overlay) overlay.style.display = isOpen ? 'block' : 'none';
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

  // --- Gestion des descriptions de services (index.html ou booking.html) ---
  const toggleButtons = document.querySelectorAll(".toggle-btn");

  toggleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const descriptionRow = button.closest("tr").nextElementSibling;

      if (descriptionRow && descriptionRow.classList.contains("service-description")) {
        const isVisible = descriptionRow.style.display === "table-row";
        descriptionRow.style.display = isVisible ? "none" : "table-row";
        button.classList.toggle("open", !isVisible);
      }
    });
  });

  // --- Gestion FAQ accordéon avec animation glissante ---
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const isOpen = question.classList.contains("open");

      if (isOpen) {
        // Fermer
        answer.style.maxHeight = null;
      } else {
        // Ouvrir
        answer.style.maxHeight = answer.scrollHeight + "px";
      }

      question.classList.toggle("open", !isOpen);
    });
  });
});
