const page = document.querySelector("#project-page");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-arrow.previous");
const nextButton = document.querySelector(".lightbox-arrow.next");

const params = new URLSearchParams(window.location.search);
const requestedId = params.get("id");
const projectIndex = projects.findIndex(project => project.id === requestedId);
const project = projects[projectIndex];
const gallery = (project?.gallery || []).filter(image => image.src);

let activeImageIndex = 0;

function safeMediaImage(src, alt, className = "") {
  if (!src) return "";
  return `<img class="${className}" src="${src}" alt="${alt}" loading="lazy" decoding="async">`;
}

function renderProject() {
  if (!project) {
    page.innerHTML = `
      <section class="error-panel">
        <p class="eyebrow">PROJECT NOT FOUND</p>
        <h2>This project link is not available.</h2>
        <p>The project ID may have been changed or removed.</p>
        <a class="button primary" href="index.html#work">Return to all work</a>
      </section>
    `;
    return;
  }

  document.title = `${project.title} | Zwe Htet Aung`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", project.summary);

  const galleryHtml = gallery.length
    ? `
      <section class="case-section reveal">
        <div class="section-heading">
          <p class="eyebrow">GALLERY</p>
          <h2>Selected project views.</h2>
        </div>
        <div class="gallery-grid reveal-stagger">
          ${gallery.map((image, index) => `
            <button class="gallery-item" data-image-index="${index}" aria-label="Open ${image.caption}">
              ${safeMediaImage(image.src, image.caption)}
              <span class="gallery-caption">
                ${image.highlight ? `<span class="gallery-highlight">${image.highlight}</span>` : ""}
                ${image.caption}
              </span>
            </button>
          `).join("")}
        </div>
      </section>
    `
    : "";

  const availableVideos = (project.videos || []).filter(video => video.enabled !== false);

  const videosHtml = availableVideos.length
    ? `
      <section class="case-section reveal">
        <div class="section-heading">
          <p class="eyebrow">VIDEO</p>
          <h2>See the workflow in motion.</h2>
        </div>
        <div class="video-grid reveal-stagger">
          ${availableVideos.map(video => {
            const media = video.type === "youtube"
              ? `<div class="video-frame"><iframe
                   src="https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0"
                   title="${video.title}"
                   loading="lazy"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                   referrerpolicy="strict-origin-when-cross-origin"
                   allowfullscreen></iframe></div>`
              : `<video controls preload="metadata" poster="${video.poster || ""}">
                   <source src="${video.src}" type="video/mp4">
                   Your browser does not support HTML video.
                 </video>`;

            return `
              <article class="video-card">
                ${media}
                <div class="video-info">
                  <h3>${video.title}</h3>
                  <p>${video.description}</p>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      </section>
    `
    : "";

  const comparison = project.beforeAfter?.before && project.beforeAfter?.after && project.beforeAfter.enabled !== false
    ? project.beforeAfter
    : null;

  const beforeAfterHtml = comparison
    ? `
      <section class="case-section reveal">
        <div class="section-heading">
          <p class="eyebrow">BEFORE & AFTER</p>
          <h2>${comparison.heading || "Compare the improvement."}</h2>
          ${comparison.description ? `<p class="section-intro">${comparison.description}</p>` : ""}
        </div>
        <div class="comparison" data-comparison>
          <img class="comparison-image comparison-after" src="${comparison.after}" alt="${comparison.afterLabel || "After"}">
          <div class="comparison-before" style="width: 50%;">
            <img class="comparison-image" src="${comparison.before}" alt="${comparison.beforeLabel || "Before"}">
          </div>
          <span class="comparison-label label-before">${comparison.beforeLabel || "Before"}</span>
          <span class="comparison-label label-after">${comparison.afterLabel || "After"}</span>
          <div class="comparison-handle" style="left: 50%;" aria-hidden="true"><span>↔</span></div>
          <input class="comparison-range" type="range" min="0" max="100" value="50" aria-label="Move slider to compare before and after">
        </div>
      </section>
    `
    : "";

  const nextProject = projects[(projectIndex + 1) % projects.length];

  page.innerHTML = `
    <section class="project-hero reveal">
      <p class="eyebrow">${project.category}</p>
      <h1>${project.title}</h1>
      <p class="project-subtitle">${project.summary}</p>
    </section>

    ${safeMediaImage(project.coverImage, `${project.title} cover image`, "project-cover")}

    <section class="project-meta-grid reveal-stagger">
      <div class="meta-card">
        <span class="meta-label">Period</span>
        <strong>${project.year}</strong>
      </div>
      <div class="meta-card">
        <span class="meta-label">Project</span>
        <strong>${project.client}</strong>
      </div>
      <div class="meta-card">
        <span class="meta-label">Role</span>
        <strong>${project.role}</strong>
      </div>
      <div class="meta-card">
        <span class="meta-label">Tools</span>
        <strong>${project.tools.join(" · ")}</strong>
      </div>
    </section>

    <section class="case-section two-column reveal">
      <div>
        <p class="eyebrow">OVERVIEW</p>
        <h2>Project context.</h2>
      </div>
      <div class="content">
        <p>${project.overview}</p>
      </div>
    </section>

    <section class="case-section two-column reveal">
      <div>
        <p class="eyebrow">MY CONTRIBUTION</p>
        <h2>What I personally handled.</h2>
      </div>
      <div>
        <ul class="contribution-list">
          ${project.contributions.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </section>

    <section class="case-section reveal">
      <div class="section-heading">
        <p class="eyebrow">PROCESS</p>
        <h2>Problem. Approach. Result.</h2>
      </div>
      <div class="story-grid">
        <article class="story-card">
          <p class="eyebrow">01 · CHALLENGE</p>
          <h3>What needed to be solved</h3>
          <p>${project.challenge}</p>
        </article>
        <article class="story-card">
          <p class="eyebrow">02 · APPROACH</p>
          <h3>How I handled it</h3>
          <p>${project.approach}</p>
        </article>
        <article class="story-card">
          <p class="eyebrow">03 · RESULT</p>
          <h3>What improved</h3>
          <p>${project.result}</p>
        </article>
      </div>
    </section>

    ${beforeAfterHtml}
    ${galleryHtml}
    ${videosHtml}

    <section class="case-section reveal">
      <a class="next-project" href="project.html?id=${encodeURIComponent(nextProject.id)}">
        <p>Next project</p>
        <h3>${nextProject.title} →</h3>
      </a>
    </section>
  `;
  document.dispatchEvent(new CustomEvent("portfolio:content-rendered"));
}

function openLightbox(index) {
  if (!Number.isInteger(index) || !gallery[index]) return;
  activeImageIndex = index;
  updateLightbox();
  lightbox.showModal();
}

function updateLightbox() {
  const image = gallery[activeImageIndex];
  if (!image) return;
  lightboxImage.src = image.src;
  lightboxImage.alt = image.caption;
  lightboxCaption.textContent = image.caption;
}

page.addEventListener("click", event => {
  const item = event.target.closest(".gallery-item");
  if (!item) return;
  openLightbox(Number(item.dataset.imageIndex));
});

page.addEventListener("input", event => {
  const range = event.target.closest(".comparison-range");
  if (!range) return;
  const comparisonElement = range.closest("[data-comparison]");
  const value = Number(range.value);
  comparisonElement.querySelector(".comparison-before").style.width = `${value}%`;
  comparisonElement.querySelector(".comparison-handle").style.left = `${value}%`;
});

closeButton.addEventListener("click", () => lightbox.close());

previousButton.addEventListener("click", () => {
  if (!gallery.length) return;
  activeImageIndex = (activeImageIndex - 1 + gallery.length) % gallery.length;
  updateLightbox();
});

nextButton.addEventListener("click", () => {
  if (!gallery.length) return;
  activeImageIndex = (activeImageIndex + 1) % gallery.length;
  updateLightbox();
});

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener("keydown", event => {
  if (!lightbox.open || !project) return;
  if (event.key === "ArrowLeft") previousButton.click();
  if (event.key === "ArrowRight") nextButton.click();
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderProject();
