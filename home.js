const grid = document.querySelector("#project-grid");
const filters = document.querySelector("#filters");
const slideLeft = document.querySelector("#slide-left");
const slideRight = document.querySelector("#slide-right");
const indicators = document.querySelector("#carousel-indicators");
const autoplayToggle = document.querySelector("#carousel-toggle");
const carouselMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const categories = ["All", ...new Set(projects.map(project => project.category))];

let visibleProjects = projects;
let scrollStops = [];
let scrollFrame = 0;
let resizeFrame = 0;
let activeStopIndex = 0;
let autoplayFrame = 0;
let lastAutoplayTime = 0;
let elapsed = 0;
let userPaused = false;
let pointerOverRail = false;
let touchingRail = false;
let railVisible = false;
let isScrolling = false;
let scrollSettleTimer = 0;
const AUTO_MOVE_DELAY = 3000;

function canAutoplay() {
  return scrollStops.length > 1 && railVisible && !document.hidden &&
    !carouselMotionPreference.matches && !userPaused && !pointerOverRail &&
    !touchingRail && !grid.contains(document.activeElement) && !isScrolling;
}

function drawCountdown() {
  indicators?.style.setProperty("--carousel-progress", String(Math.min(elapsed / AUTO_MOVE_DELAY, 1)));
}

function resetCountdown() {
  elapsed = 0;
  lastAutoplayTime = 0;
  drawCountdown();
}

function syncAutoplay() {
  const available = scrollStops.length > 1 && !carouselMotionPreference.matches;
  const playing = canAutoplay();
  if (autoplayToggle) {
    autoplayToggle.hidden = !available;
    autoplayToggle.textContent = userPaused ? "Play" : "Pause";
    autoplayToggle.setAttribute("aria-pressed", String(userPaused));
    autoplayToggle.setAttribute("aria-label", userPaused ? "Resume automatic project scrolling" : "Pause automatic project scrolling");
  }
  if (indicators) indicators.dataset.autoplay = !available ? "disabled" : playing ? "playing" : "paused";
  if (playing && !autoplayFrame) autoplayFrame = requestAnimationFrame(tickAutoplay);
  if (!playing) {
    cancelAnimationFrame(autoplayFrame);
    autoplayFrame = 0;
    lastAutoplayTime = 0;
  }
}

function tickAutoplay(now) {
  autoplayFrame = 0;
  if (!canAutoplay()) return syncAutoplay();
  if (lastAutoplayTime) elapsed += now - lastAutoplayTime;
  lastAutoplayTime = now;
  drawCountdown();
  if (elapsed >= AUTO_MOVE_DELAY) {
    const nextIndex = (activeStopIndex + 1) % scrollStops.length;
    scrollToPosition(scrollStops[nextIndex].position);
    return;
  }
  autoplayFrame = requestAnimationFrame(tickAutoplay);
}

function finishScrolling() {
  clearTimeout(scrollSettleTimer);
  isScrolling = false;
  updateCarouselControls();
  syncAutoplay();
}

function beginScrolling() {
  if (!isScrolling) resetCountdown();
  isScrolling = true;
  syncAutoplay();
  clearTimeout(scrollSettleTimer);
  // Fallback for browsers without scrollend; renewed for every scroll event.
  scrollSettleTimer = setTimeout(finishScrolling, 180);
}

function renderFilters() {
  filters.setAttribute("role", "group");
  filters.setAttribute("aria-label", "Filter projects by capability");
  filters.innerHTML = categories.map((category, index) => `
    <button class="filter-button ${index === 0 ? "active" : ""}" type="button"
      data-category="${category}" aria-pressed="${index === 0}" aria-controls="project-grid">
      ${category}
    </button>
  `).join("");

  filters.addEventListener("click", event => {
    const button = event.target.closest("button[data-category]");
    if (!button || button.getAttribute("aria-pressed") === "true") return;

    filters.querySelectorAll(".filter-button").forEach(item => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    visibleProjects = button.dataset.category === "All"
      ? projects
      : projects.filter(project => project.category === button.dataset.category);
    renderProjects();
  });
}

function createProjectCards(projectList) {
  return projectList.map(project => {
    const originalIndex = projects.findIndex(item => item.id === project.id);
    const cover = project.coverImage ? `
      <img class="card-image" src="${project.coverImage}" alt="${project.title}"
        loading="lazy" draggable="false"
        onerror="this.closest('.card-media').classList.add('missing-media'); this.remove();">
    ` : "";

    return `
      <a class="project-card reveal" href="project.html?id=${encodeURIComponent(project.id)}"
         data-project-id="${project.id}" aria-label="${project.title}">
        <div class="card-media ${project.coverImage ? "" : "missing-media"}" data-placeholder="Project overview">
          ${cover}
        </div>
        <div class="card-content">
          <div class="card-topline">
            <span class="card-meta">${project.category}</span>
            <span class="card-number">${String(originalIndex + 1).padStart(2, "0")}</span>
          </div>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <span class="card-link">View case study <span aria-hidden="true">↗</span></span>
        </div>
      </a>
    `;
  }).join("");
}

function renderProjects() {
  resetCountdown();
  grid.classList.toggle("single-project", visibleProjects.length === 1);
  // Each project is one normal link; the browser owns wheel and touch scrolling.
  grid.innerHTML = createProjectCards(visibleProjects);
  grid.scrollTo({ left: 0, behavior: "instant" });
  requestAnimationFrame(() => {
    measureScrollStops();
    document.dispatchEvent(new CustomEvent("portfolio:content-rendered"));
  });
}

function measureScrollStops() {
  resetCountdown();
  const cards = [...grid.querySelectorAll(".project-card")];
  const maxScroll = Math.max(0, grid.scrollWidth - grid.clientWidth);
  const firstLeft = cards[0]?.offsetLeft || 0;
  scrollStops = [];

  cards.forEach((card, index) => {
    const position = Math.min(maxScroll, Math.max(0, card.offsetLeft - firstLeft));
    const previous = scrollStops[scrollStops.length - 1];
    // Several desktop cards can share the same end position. Keep one dot per stop.
    if (!previous || position - previous.position > 1) {
      scrollStops.push({ position, title: visibleProjects[index].title });
    }
  });

  if (indicators) {
    indicators.hidden = scrollStops.length < 2;
    indicators.innerHTML = scrollStops.length < 2 ? "" : scrollStops.map((stop, index) => `
      <button class="carousel-dot" type="button" data-index="${index}"
        aria-label="Show ${stop.title}" aria-controls="project-grid" aria-current="false">
        <span></span>
      </button>
    `).join("");
  }
  updateCarouselControls();
  syncAutoplay();
}

function updateCarouselControls() {
  const position = grid.scrollLeft;
  const maxScroll = Math.max(0, grid.scrollWidth - grid.clientWidth);
  slideLeft.disabled = position <= 2;
  slideRight.disabled = position >= maxScroll - 2;

  let closestIndex = 0;
  scrollStops.forEach((stop, index) => {
    if (Math.abs(stop.position - position) < Math.abs(scrollStops[closestIndex].position - position)) {
      closestIndex = index;
    }
  });

  if (closestIndex !== activeStopIndex) {
    activeStopIndex = closestIndex;
    resetCountdown();
  }

  indicators?.querySelectorAll(".carousel-dot").forEach((dot, index) => {
    const active = index === closestIndex;
    dot.classList.toggle("active", active);
    dot.setAttribute("aria-current", String(active));
  });
}

function scrollToPosition(position) {
  resetCountdown();
  beginScrolling();
  grid.scrollTo({
    left: position,
    behavior: carouselMotionPreference.matches ? "instant" : "smooth"
  });
}

function moveCarousel(direction) {
  const position = grid.scrollLeft;
  const stop = direction > 0
    ? scrollStops.find(item => item.position > position + 2)
    : [...scrollStops].reverse().find(item => item.position < position - 2);
  if (stop) scrollToPosition(stop.position);
}

slideLeft.type = "button";
slideRight.type = "button";
slideLeft.setAttribute("aria-controls", "project-grid");
slideRight.setAttribute("aria-controls", "project-grid");
slideLeft.addEventListener("click", () => moveCarousel(-1));
slideRight.addEventListener("click", () => moveCarousel(1));

grid.addEventListener("scroll", () => {
  beginScrolling();
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    updateCarouselControls();
  });
}, { passive: true });
grid.addEventListener("scrollend", finishScrolling);

grid.addEventListener("pointerenter", event => {
  if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
  pointerOverRail = true;
  syncAutoplay();
});
grid.addEventListener("pointerleave", () => {
  pointerOverRail = false;
  syncAutoplay();
});
grid.addEventListener("pointerdown", event => {
  if (event.pointerType !== "touch") return;
  touchingRail = true;
  syncAutoplay();
});
function finishTouch() {
  if (!touchingRail) return;
  touchingRail = false;
  syncAutoplay();
}
window.addEventListener("pointerup", finishTouch);
window.addEventListener("pointercancel", finishTouch);
grid.addEventListener("focusin", syncAutoplay);
grid.addEventListener("focusout", () => queueMicrotask(syncAutoplay));
document.addEventListener("visibilitychange", syncAutoplay);
window.addEventListener("pageshow", () => {
  lastAutoplayTime = 0;
  syncAutoplay();
});
autoplayToggle?.addEventListener("click", () => {
  userPaused = !userPaused;
  syncAutoplay();
});

if ("IntersectionObserver" in window) {
  new IntersectionObserver(entries => {
    railVisible = entries[0].isIntersecting;
    syncAutoplay();
  }, { threshold: 0.2 }).observe(grid);
} else {
  railVisible = true;
}

grid.addEventListener("keydown", event => {
  if (event.target !== grid || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    moveCarousel(event.key === "ArrowLeft" ? -1 : 1);
  } else if (event.key === "Home" || event.key === "End") {
    event.preventDefault();
    scrollToPosition(event.key === "Home" ? 0 : grid.scrollWidth - grid.clientWidth);
  }
});

indicators?.addEventListener("click", event => {
  const dot = event.target.closest(".carousel-dot");
  const stop = dot && scrollStops[Number(dot.dataset.index)];
  if (stop) scrollToPosition(stop.position);
});

window.addEventListener("resize", () => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(measureScrollStops);
});

carouselMotionPreference.addEventListener("change", () => {
  resetCountdown();
  if (carouselMotionPreference.matches) {
    // Stop an in-flight smooth scroll as soon as reduced motion is requested.
    grid.scrollTo({ left: grid.scrollLeft, behavior: "instant" });
  }
  syncAutoplay();
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderFilters();
renderProjects();
