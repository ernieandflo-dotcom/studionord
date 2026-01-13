/* === COUNTDOWN === */
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

/* === VIDEO INTERACTION (MOBILE-FIRST SAFE) === */
const videos = document.querySelectorAll(".wall-video");
const isMobile = window.matchMedia("(pointer: coarse)").matches;

let activeVideo = null;

function stopActiveVideo() {
  if (!activeVideo) return;

  activeVideo.pause();
  activeVideo.muted = true;
  activeVideo.closest(".video-tile")?.classList.remove("playing");
  activeVideo = null;
}

/* autoplay muted desktop uniquement */
if (!isMobile) {
  videos.forEach(video => {
    video.muted = true;
    video.loop = true;

    const p = video.play();
    if (p !== undefined) {
      p.catch(() => {});
    }
  });
}

/* tap-to-play mobile + contrôle global */
videos.forEach(video => {
  video.addEventListener("click", (e) => {
    e.stopPropagation();

    if (activeVideo === video) {
      stopActiveVideo();
      return;
    }

    stopActiveVideo();

    activeVideo = video;
    video.muted = false;
    video.loop = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play();
      });
    }

    video.closest(".video-tile")?.classList.add("playing");
  });
});

/* clic extérieur → stop */
document.addEventListener("click", () => {
  stopActiveVideo();
});
