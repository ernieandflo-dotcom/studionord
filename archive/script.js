// =====================================================
// === MENU HAMBURGER ===
// =====================================================
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

// =====================================================
// === DOM READY ===
// =====================================================
document.addEventListener("DOMContentLoaded", () => {

  // =====================================================
  // === CONTACT FORM SWITCH (if present) ===
  // =====================================================
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

  // =====================================================
  // === SERVICES DESCRIPTIONS ===
  // =====================================================
  document.querySelectorAll(".toggle-btn").forEach(button => {
    button.addEventListener("click", () => {
      const row = button.closest("tr")?.nextElementSibling;
      if (!row) return;

      const isVisible = row.style.display === "table-row";
      row.style.display = isVisible ? "none" : "table-row";
      button.classList.toggle("open", !isVisible);
    });
  });

  // =====================================================
  // === FAQ ACCORDION ===
  // =====================================================
  document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const isOpen = question.classList.contains("open");

      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + "px";
      question.classList.toggle("open", !isOpen);
    });
  });

  // =====================================================
  // === BEATS : PLAY / PAUSE ===
  // =====================================================
  let currentlyPlayingAudio = null;
  let currentlyPlayingImage = null;

  document.querySelectorAll(".beat-card").forEach(card => {
    const image = card.querySelector(".beat-image");
    const audio = card.querySelector("audio");

    if (!image || !audio) return;

    image.addEventListener("click", () => {

      // Same beat → toggle
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

      // Stop previous beat
      if (currentlyPlayingAudio) {
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.currentTime = 0;
        if (currentlyPlayingImage) {
          currentlyPlayingImage.classList.remove("playing");
        }
      }

      // Play new beat
      audio.play();
      image.classList.add("playing");

      currentlyPlayingAudio = audio;
      currentlyPlayingImage = image;
    });

    audio.addEventListener("ended", () => {
      image.classList.remove("playing");
      if (audio === currentlyPlayingAudio) {
        currentlyPlayingAudio = null;
        currentlyPlayingImage = null;
      }
    });
  });

  // =====================================================
  // === BEATS : "M'INFORMER" MODAL ===
  // =====================================================
  const modal = document.getElementById("notify-modal");
  const modalClose = modal?.querySelector(".modal-close");

  function openModal() {
    if (!modal) return;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  // Open modal from beat buttons
  document.querySelectorAll(".beat-card button").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      openModal();
    });
  });

  // Close button
  modalClose?.addEventListener("click", closeModal);

  // Click outside modal
  modal?.addEventListener("click", e => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // =====================================================
  // === PRIZE PAGES : T&C + FORMSPREE (AJAX + REDIRECT) ===
  // =====================================================
  document.querySelectorAll(".prize-form").forEach(form => {

    const decisionInputs = form.querySelectorAll('input[name="decision"]');
    const transferBlock = form.querySelector('[data-transfer-block]');
    const renounceCheckbox = form.querySelector('input[name="confirmation_renonciation"]');

    const firstName = form.querySelector('input[name="beneficiaire_prenom"]');
    const lastName = form.querySelector('input[name="beneficiaire_nom"]');

    // Toggle accept / transfer
    decisionInputs.forEach(input => {
      input.addEventListener("change", () => {
        if (input.value === "RENONCE_ET_TRANSFERE" && input.checked) {
          transferBlock?.classList.remove("hidden");
        } else {
          transferBlock?.classList.add("hidden");
        }
      });
    });

    // Submit (AJAX – Formspree Free compatible)
    form.addEventListener("submit", async e => {
      e.preventDefault();

      const decision = form.querySelector('input[name="decision"]:checked')?.value;

      if (!decision) {
        alert("Veuillez accepter le prix ou indiquer un transfert.");
        return;
      }

      if (decision === "RENONCE_ET_TRANSFERE") {
        if (!firstName?.value.trim() || !lastName?.value.trim()) {
          alert("Veuillez indiquer le prénom et le nom du nouveau bénéficiaire.");
          return;
        }

        if (!renounceCheckbox?.checked) {
          alert("Vous devez confirmer la renonciation définitive au prix.");
          return;
        }
      }

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json"
          }
        });

        if (response.ok) {
          window.location.href = "https://ostudionord.ca/merci";
        } else {
          alert("Une erreur est survenue lors de l’envoi. Veuillez réessayer.");
        }
      } catch (error) {
        alert("Impossible d’envoyer le formulaire. Vérifiez votre connexion.");
      }
    });
  });
});
