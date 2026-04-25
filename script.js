const card = document.getElementById("preview-card");

const video = document.getElementById("preview-video");
const title = document.getElementById("preview-title");
const dev = document.getElementById("developer");
const release = document.getElementById("release");
const tags = document.getElementById("tags");
const platforms = document.getElementById("platforms");

const rows = document.querySelectorAll(".game-row");

rows.forEach(row => {

  row.addEventListener("mouseenter", () => {
    card.style.display = "block";

    video.src = row.dataset.video;
    video.play();

    title.textContent = row.dataset.title;
    dev.textContent = "Developer: " + row.dataset.dev;
    release.textContent = "Release: " + row.dataset.release;

    // التاقات
    tags.innerHTML = "";
    row.dataset.tags.split(",").forEach(tag => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      tags.appendChild(span);
    });

    // المنصات
    platforms.innerHTML = "";
    if (row.dataset.platforms.includes("pc")) {
      platforms.innerHTML += "🖥️ ";
    }
    if (row.dataset.platforms.includes("ps")) {
      platforms.innerHTML += "🎮 ";
    }
  });

  row.addEventListener("mouseleave", () => {
    card.style.display = "none";
    video.pause();
  });
});

// تحريك مع الماوس
document.addEventListener("mousemove", (e) => {
  card.style.left = e.pageX + 20 + "px";
  card.style.top = e.pageY + 20 + "px";
});