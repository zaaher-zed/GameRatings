const card = document.getElementById("preview-card");

const video = document.getElementById("preview-video");
const title = document.getElementById("preview-title");
const dev = document.getElementById("developer");
const release = document.getElementById("release");
const tags = document.getElementById("tags");
const platforms = document.getElementById("platforms");

const rows = document.querySelectorAll(".game-row");
const gameCards = document.querySelectorAll(".game-card");
const btn = document.getElementById("scrollTopBtn");

// =====================
// 🎥 Video settings
// =====================

if (video) {
  video.preload = "auto";
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
}

// =====================
// 🚀 Preload preview videos
// =====================

const preloadedVideos = {};

rows.forEach((row) => {
  const src = row.dataset.video;

  if (src) {
    const preloadVideo = document.createElement("video");

    preloadVideo.src = src;
    preloadVideo.preload = "auto";

    preloadedVideos[src] = preloadVideo;
  }
});

// =====================
// 🧠 Hover preview system
// =====================

let currentVideo = "";

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// =====================
// 🚀 Smooth positioning
// =====================

function updateCardPosition() {
  if (card) {
    const offset = 20;

    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;

    let x = mouseX + offset;
    let y = mouseY + offset;

    // Right / Left fix
    if (x + cardWidth > window.innerWidth) {
      x = mouseX - cardWidth - offset;
    }

    if (x < 0) {
      x = offset;
    }

    // Bottom / Top fix
    if (y + cardHeight > window.innerHeight) {
      y = mouseY - cardHeight - offset;
    }

    if (y < 0) {
      y = offset;
    }

    card.style.left = x + "px";
    card.style.top = y + "px";
  }

  requestAnimationFrame(updateCardPosition);
}

requestAnimationFrame(updateCardPosition);

// =====================
// 🎮 Table hover cards
// =====================

rows.forEach((row) => {
  row.addEventListener("mouseenter", () => {
    if (!card) return;

    card.style.display = "block";

    const videoSrc = row.dataset.video;

    // Change video only if needed
    if (videoSrc && currentVideo !== videoSrc) {
      currentVideo = videoSrc;

      video.pause();

      video.src = videoSrc;

      video.currentTime = 0;

      video.play().catch(() => {});
    } else {
      // Replay same video instantly
      video.currentTime = 0;
      video.play().catch(() => {});
    }

    // Title
    title.textContent = row.dataset.title || "";

    // Developer
    dev.textContent = "Developer: " + (row.dataset.dev || "");

    // Release
    release.textContent = "Release: " + (row.dataset.release || "");

    // =====================
    // 🏷️ TAGS
    // =====================

    const tagsData = row.dataset.tags;

    tags.innerHTML = "";

    if (tagsData) {
      tagsData.split(",").forEach((tag) => {
        if (!tag) return;

        const span = document.createElement("span");

        span.className = "tag";
        span.textContent = tag.trim();

        tags.appendChild(span);
      });
    }

    // =====================
    // 🖥️ Platforms
    // =====================

    let icons = "";

    const platformData = (
      row.dataset.platforms || ""
    ).toLowerCase();

    if (platformData.includes("pc")) {
      icons += "🖥️ ";
    }

    if (platformData.includes("ps")) {
      icons += "🎮 ";
    }

    platforms.textContent = icons;
  });

  row.addEventListener("mouseleave", () => {
    if (!card) return;

    card.style.display = "none";

    video.pause();
  });
});

// =====================
// 🖼️ Game cards tags system
// =====================

gameCards.forEach((card) => {
  const tagsData = card.dataset.tags;

  if (!tagsData) return;

  const tagsContainer = card.querySelector(".tags");

  if (!tagsContainer) return;

  tagsContainer.innerHTML = "";

  tagsData.split(",").forEach((tag) => {
    if (!tag) return;

    const span = document.createElement("span");

    span.textContent = tag.trim();

    tagsContainer.appendChild(span);
  });
});

// =====================
// 🔝 Scroll to top button
// =====================

if (btn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      btn.style.opacity = "1";
      btn.style.pointerEvents = "auto";
    } else {
      btn.style.opacity = "0";
      btn.style.pointerEvents = "none";
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
