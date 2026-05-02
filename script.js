const card = document.getElementById("preview-card");

const video = document.getElementById("preview-video");
const title = document.getElementById("preview-title");
const dev = document.getElementById("developer");
const release = document.getElementById("release");
const tags = document.getElementById("tags");
const platforms = document.getElementById("platforms");
const rows = document.querySelectorAll(".game-row");

// 🧠 تخزين آخر فيديو لتجنب إعادة التحميل
let currentVideo = "";

// 🧠 لتقليل استهلاك mousemove
let mouseX = 0;
let mouseY = 0;

// تحسين: فصل تحديث الموقع عن الحدث
document.addEventListener("mousemove", (e) => {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

// تحديث الموقع 60 مرة في الثانية بدل مئات
setInterval(() => {
  const offset = 20;

  const cardWidth = card.offsetWidth;
  const cardHeight = card.offsetHeight;

  let x = mouseX + offset;
  let y = mouseY + offset;

  // 🧠 لو اقترب من يمين الشاشة
  if (x + cardWidth > window.innerWidth) {
    x = mouseX - cardWidth - offset;
  }

  // 🧠 لو اقترب من أسفل الشاشة
  if (y + cardHeight > window.innerHeight) {
    y = mouseY - cardHeight - offset;
  }

  card.style.left = x + "px";
  card.style.top = y + "px";

}, 16);

rows.forEach(row => {

  row.addEventListener("mouseenter", () => {
    card.style.display = "block";

    // ✅ لا تعيد تحميل نفس الفيديو
    if (currentVideo !== row.dataset.video) {
      currentVideo = row.dataset.video;
      video.src = currentVideo;
      video.load();
    }

    video.play().catch(() => {}); // منع أخطاء المتصفح

    title.textContent = row.dataset.title;
    dev.textContent = "Developer: " + row.dataset.dev;
    release.textContent = "Release: " + row.dataset.release;

    // ✅ تقليل عمليات DOM (باستخدام Fragment)
    const fragment = document.createDocumentFragment();
    tags.innerHTML = "";

    row.dataset.tags.split(",").forEach(tag => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      fragment.appendChild(span);
    });

    tags.appendChild(fragment);

    // ✅ تحسين المنصات (بدون innerHTML المتكرر)
    let icons = "";

    if (row.dataset.platforms.toLowerCase().includes("pc")) {
      icons += "🖥️ ";
    }
    if (row.dataset.platforms.toLowerCase().includes("ps")) {
      icons += "🎮 ";
    }

    platforms.textContent = icons;
  });

  row.addEventListener("mouseleave", () => {
    card.style.display = "none";
    video.pause();
  });
});
// new cards

document.querySelectorAll(".game-card").forEach(card => {

    // TAGS
    const tags = card.dataset.tags.split(",");

    const tagsContainer = card.querySelector(".tags");
    tagsContainer.innerHTML = "";

    tags.forEach(tag => {
        const span = document.createElement("span");
        span.textContent = tag.trim();
        tagsContainer.appendChild(span);
    });

});