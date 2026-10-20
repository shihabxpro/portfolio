import { useEffect, useState } from "react";
import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import Icon from "./Icon.jsx";

const NAV_ITEMS = ["about", "projects", "skills", "contact"];
const THEME_KEY = "shihab-theme";

function getInitialTheme() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export default function Header() {
  const { lang, setLang, u, t } = useLang();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#0b0b0a" : "#f6f5f2");
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((value) => {
      const next = value === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {}
      return next;
    });
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container site-header__inner">
        <a className="brand" href="#home" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden="true">
            {lang === "en" ? "S" : "শ"}
          </span>
          <span className="brand__text">
            {t(site.name)}
            <span className="brand__handle">@{site.handle}</span>
          </span>
        </a>

        <div className="site-header__actions">
          <nav
            id="site-menu"
            className={`site-nav${open ? " is-open" : ""}`}
            aria-label={u.navLabel}
          >
            <ul className="site-nav__list">
              {NAV_ITEMS.map((id) => (
                <li key={id}>
                  <a
                    className="site-nav__link"
                    href={`#${id}`}
                    aria-current={active === id ? "location" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {u.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lang-switch" role="group" aria-label={u.langLabel}>
            <button
              className={`lang-switch__btn${lang === "bn" ? " is-active" : ""}`}
              type="button"
              lang="bn"
              aria-pressed={lang === "bn"}
              title={u.langSwitchTo}
              onClick={() => setLang("bn")}
            >
              বাং
            </button>
            <button
              className={`lang-switch__btn${lang === "en" ? " is-active" : ""}`}
              type="button"
              lang="en"
              aria-pressed={lang === "en"}
              title={u.langSwitchTo}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>

          <button
            className="theme-btn"
            type="button"
            aria-label={theme === "dark" ? u.themeToLight : u.themeToDark}
            title={theme === "dark" ? u.themeToLight : u.themeToDark}
            onClick={toggleTheme}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
          </button>

          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? u.menuClose : u.menuOpen}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="menu-btn__bar" />
            <span className="menu-btn__bar" />
          </button>
        </div>
      </div>
    </header>
  );
}
