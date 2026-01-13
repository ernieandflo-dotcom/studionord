/* =========================
   COUNTDOWN
========================= */

const openingDate = new Date("2026-01-15T20:00:00");

const cdDays = document.getElementById("cd-days");
const cdHours = document.getElementById("cd-hours");
const cdMinutes = document.getElementById("cd-minutes");
const cdSeconds = document.getElementById("cd-seconds");

const daysDisplay = document.getElementById("days");
const overlay = document.getElementById("countdown-overlay");
const enterBtn = document.getElementById("enter-site");

function updateCountdown() {
  const now = new Date();
  const diff = openingDate - now;

  if (diff <= 0) {
    cdDays.textContent = "00";
    cdHours.textContent = "00";
    cdMinutes.textContent = "00";
    cdSeconds.textContent = "00";
    daysDisplay.textContent = "0";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  cdDays.textContent = String(days).padStart(2, "0");
  cdHours.textContent = String(hours).padStart(2, "0");
  cdMinutes.textContent = String(minutes).padStart(2, "0");
  cdSeconds.textContent = String(seconds).padStart(2, "0");

  daysDisplay.textContent = days;
}

setInterval(updateCountdown, 1000);
updateCountdown();

enterBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

/* =========================
   VIDEO AUTOPLAY (DESKTOP + MOBILE)
========================= */

const videos = document.querySelectorAll(".wall-video");

function forceMutedAutoplay(video) {
  video.muted = true;
  video.loop = true;
  video.playsInline = true;

  const attempt = video.play();
  if (attempt !== undefined) {
    attempt.catch(() => {
      // Safari iOS peut refuser tant que le rendu n'est pas stabilisé
      // → on réessaie après un micro délai
      setTimeout(() => {
        video.play().catch(() => {});
      }, 300);
    });
  }
}

/* lancer autoplay dès que possible */
videos.forEach(video => {
  forceMutedAutoplay(video);
});

/* sécurité supplémentaire pour Safari iOS */
document.addEventListener(
  "visibilitychange",
  () => {
    if (!document.hidden) {
      videos.forEach(video => {
        if (video.paused) {
          forceMutedAutoplay(video);
        }
      });
    }
  },
  false
);

/* fallback après chargement complet */
window.addEventListener("load", () => {
  videos.forEach(video => {
    if (video.paused) {
      forceMutedAutoplay(video);
    }
  });
});
