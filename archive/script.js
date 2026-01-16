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

// --- DOMContentLoaded ---
document.addEventListener("DOMContentLoaded", () => {

  // --- Gestion du formulaire contact (si présent) ---
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

  // --- Gestion des descriptions de services ---
  const toggleButtons = document.querySelectorAll(".toggle-btn");

  toggleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const descriptionRow = button.closest("tr")?.nextElementSibling;

      if (descriptionRow && descriptionRow.classList.contains("service-description")) {
        const isVisible = descriptionRow.style.display === "table-row";
        descriptionRow.style.display = isVisible ? "none" : "table-row";
        button.classList.toggle("open", !isVisible);
      }
    });
  });

  // --- Gestion FAQ accordéon ---
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const isOpen = question.classList.contains("open");

      if (isOpen) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }

      question.classList.toggle("open", !isOpen);
    });
  });

  // ======================================================
  // === BEATS : lecture / pause au clic sur l'image ===
  // ======================================================

  let currentlyPlayingAudio = null;
  let currentlyPlayingImage = null;

  document.querySelectorAll(".beat-card").forEach(card => {
    const image = card.querySelector(".beat-image");
    const audio = card.querySelector("audio");

    if (!image || !audio) return;

    image.addEventListener("click", () => {

      // Même beat → toggle play / pause
      if (audio === currentlyPlayingAudio) {
        if (audio.paused) {
          audio.play();
          image.classList.add("playing");
        } else {
          audio.pause();
          image.classList.remove("playing");
        }
        return;
      }

      // Arrêter le beat en cours
      if (currentlyPlayingAudio) {
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.currentTime = 0;
        if (currentlyPlayingImage) {
          currentlyPlayingImage.classList.remove("playing");
        }
      }

      // Lancer le nouveau beat
      audio.play();
      image.classList.add("playing");

      currentlyPlayingAudio = audio;
      currentlyPlayingImage = image;
    });

    // Nettoyage quand le beat se termine
    audio.addEventListener("ended", () => {
      image.classList.remove("playing");
      if (audio === currentlyPlayingAudio) {
        currentlyPlayingAudio = null;
        currentlyPlayingImage = null;
      }
    });
  });

});
