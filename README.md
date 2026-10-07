# Zwe Htet Aung — Portfolio

A responsive portfolio for BIM, automation and digital construction, built with plain HTML, CSS and JavaScript. No build step or package installation is needed.

## Website

Published with GitHub Pages from the `main` branch, root folder:
https://zwewh.github.io/zwe-portfolio/

## Edit content

- `index.html`: introduction, career, skills and contact details.
- `projects.js`: project descriptions, cover images, galleries and videos.
- `home.js`: project filters and accessible carousel with optional automatic scrolling.
- `project.js`: shared case-study rendering, comparison slider and image lightbox.
- `styles.css`: base visual design.
- `motion.css` and `animations.js`: subtle one-time reveals, staggered entrances, hover effects, reading progress and active navigation.
- `assets/`: project media, software icons and downloadable CV.

Use `null` for a project cover that is not yet available, and an empty gallery array when there are no images. Only reference files you have added. Disabled video entries remain hidden until their files are available. Some case studies intentionally have no cover or gallery yet.

## Preview locally

Open the folder in VS Code and use Live Server, or run `python -m http.server 8000` if Python is installed. Open http://localhost:8000 in your browser.

## Publish updates

Commit and push changes to `main`. GitHub Pages publishes the root folder automatically. The `.nojekyll` file tells Pages to serve these static files directly. Check the repository's Actions tab for deployment status.

```sh
git add index.html project.html projects.js home.js project.js styles.css motion.css animations.js assets
git commit -m "Update portfolio"
git push
```

In repository Settings → Pages, the source should be **Deploy from a branch**, **main**, **/ (root)**.

## Motion and accessibility

- Native smooth anchor scrolling and browser page transitions where supported.
- One-time reveals, with staggered hero text and capability cards.
- The carousel advances every 3 seconds, with the active dot filling to show the countdown. There is no vertical-wheel interception.
- Automatic scrolling pauses while hovering over the rail, focusing it with the keyboard, touching it, scrolling it out of view or switching browser tabs. The Pause/Play control also lets visitors pause it explicitly.
- Carousel arrows, touch/trackpad scrolling and keyboard arrows/Home/End when the rail is focused.
- The system's reduced-motion preference disables carousel autoplay, animated scrolling and decorative movement, including preference changes while the page is open.
- Core homepage content stays visible without JavaScript; project rendering needs JavaScript.

Before adding new project media, use material you are permitted to publish and remove internal project identifiers where necessary.
