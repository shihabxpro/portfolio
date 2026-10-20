# Shihab — Personal Portfolio

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Bengali / English](https://img.shields.io/badge/language-Bengali%20%7C%20English-orange)](https://shihabxpro.github.io/portfolio/)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)](https://shihabxpro.github.io/portfolio/)

Personal portfolio of **Shihab** — Nurani teacher, Kotlin learner and web developer. A Bengali-first, bilingual site built with React and Vite, featuring dark mode, an animated hero, projects, skills and contact sections.

## Live demo

https://shihabxpro.github.io/portfolio/

## Features

- Bilingual interface (Bengali / English) with a persistent language toggle
- Light, dark and system theme support
- Animated typewriter hero roles with a hand-drawn ink flourish
- Projects, skills and contact sections
- Minimal warm monochrome design with terracotta accents
- Deployed to GitHub Pages via GitHub Actions

## Tech stack

- React 18
- Vite
- Custom-property CSS (scroll-reveal, keyframes, theme tokens)
- GitHub Actions + GitHub Pages

## Project structure

```
portfolio/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   ├── favicon.svg
│   └── og.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── data/           site.js, projects.js, skills.js
│   ├── components/     Header, Hero, About, Projects, Contact, Footer, Icon, ...
│   ├── hooks/          useReveal.js
│   ├── i18n/           LanguageContext.jsx, ui.js
│   └── styles/         global.css, sections.css
└── .github/workflows/deploy.yml
```

## Getting started

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

## Deployment

Push to the `main` branch. GitHub Actions builds the site and deploys it to GitHub Pages automatically. Set the Pages source to **GitHub Actions** in repository settings.

## Contact

- Email: muhammadshihablbl@gmail.com
- GitHub: https://github.com/shihabxpro

Personal portfolio. All rights reserved.
