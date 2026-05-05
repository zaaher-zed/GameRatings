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
// 🧠 Hover preview system
// =====================

let currentVideo = "";

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

setInterval(() => {
  if (!card) return;

  const offset = 20;

  const cardWidth = card.offsetWidth;
  const cardHeight = card.offsetHeight;

  let x = mouseX + offset;
  let y = mouseY + offset;

  if (x + cardWidth > window.innerWidth) {
    x = mouseX - cardWidth - offset;
  }

  if (y + cardHeight > window.innerHeight) {
    y = mouseY - cardHeight - offset;
  }

  card.style.left = x + "px";
  card.style.top = y + "px";
}, 16);

// =====================
// 🎮 Table hover cards
// =====================

rows.forEach((row) => {
  row.addEventListener("mouseenter", () => {
    if (!card) return;

    card.style.display = "block";

    const videoSrc = row.dataset.video;

    if (videoSrc && currentVideo !== videoSrc) {
      currentVideo = videoSrc;
      video.src = videoSrc;
      video.load();
    }

    video.play().catch(() => {});

    title.textContent = row.dataset.title || "";
    dev.textContent = "Developer: " + (row.dataset.dev || "");
    release.textContent = "Release: " + (row.dataset.release || "");

    // TAGS
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

    // PLATFORMS
    let icons = "";
    const platformData = (row.dataset.platforms || "").toLowerCase();

    if (platformData.includes("pc")) icons += "🖥️ ";
    if (platformData.includes("ps")) icons += "🎮 ";

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
