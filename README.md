# Shihab — Personal Portfolio

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Bengali / English](https://img.shields.io/badge/language-Bengali%20%7C%20English-orange)](https://shihabxpro.github.io/portfolio/)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)](https://shihabxpro.github.io/portfolio/)

Personal portfolio of **Shihab** — Nurani teacher, Kotlin learner and web developer.  
A Bengali-first, bilingual site built with React and Vite, featuring dark mode, an animated hero, projects, skills and contact sections.

---

## 🚀 Live Demo

👉 **[https://shihabxpro.github.io/portfolio/](https://shihabxpro.github.io/portfolio/)**

---

## ✨ Features

- **Bilingual interface** — Bengali / English with a persistent language toggle
- **Theme support** — Light, dark and system theme
- **Animated hero** — Typewriter roles with hand-drawn ink flourish
- **Projects & Skills** — Showcase sections with clean cards
- **Contact section** — Reach out directly
- **Minimal warm monochrome design** — With terracotta accents
- **Deployed to GitHub Pages** — Via GitHub Actions

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 |
| Build tool | Vite 6 |
| Styling | Custom CSS (scroll-reveal, keyframes, theme tokens) |
| i18n | Custom LanguageContext |
| Deployment | GitHub Actions → GitHub Pages |

---

## 📁 Project Structure

```
portfolio/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   ├── favicon.svg
│   ├── og.png
│   ├── og.svg
│   └── sitemap.xml
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── data/        site.js, projects.js, skills.js, brandIcons.js
│   ├── components/  Header, Hero, About, Projects, Contact, Footer, Icon, ...
│   ├── hooks/       useReveal.js
│   ├── i18n/        LanguageContext.jsx, ui.js, format.js
│   └── styles/      global.css, sections.css
└── .github/workflows/deploy.yml
```

`public/og.svg` is the editable source for `public/og.png` (the social preview image).

---

## 🧭 Getting Started

```bash
# clone
git clone https://github.com/shihabxpro/portfolio.git
cd portfolio

# install dependencies
npm install

# development server (Termux: scripts use node node_modules/vite/bin/vite.js)
npm run dev

# production build
npm run build

# preview the build locally
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## 🚢 Deployment

Push to the `main` branch. GitHub Actions builds the site and deploys it to GitHub Pages automatically.  
Set the Pages source to **GitHub Actions** in repository settings.

---

## 📬 Contact

- **Email:** muhammadshihablbl@gmail.com
- **GitHub:** https://github.com/shihabxpro

---

Personal portfolio. All rights reserved.