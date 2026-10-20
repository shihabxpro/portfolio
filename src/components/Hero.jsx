import Typewriter from "./Typewriter.jsx";
import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";

const ROLE_COLORS = [
  "var(--role-1)",
  "var(--role-2)",
  "var(--role-3)",
  "var(--role-4)",
];

export default function Hero() {
  const { lang, u, t } = useLang();

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true">
        <span className="hero__blob hero__blob--a" />
        <span className="hero__blob hero__blob--b" />
      </div>

      <div className="container hero__inner">
        <p className="hero__eyebrow">{u.heroEyebrow}</p>

        <div className="hero__name-row">
          <h1 className="hero__title" id="hero-title">
            <span className="hero__title-inner">{t(site.name)}</span>
            <span className="hero__dot" aria-hidden="true">
              .
            </span>
          </h1>

          <svg
            className="hero__ink"
            viewBox="0 0 300 140"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="hero__ink-path"
              style={{ "--i": "0" }}
              d="M52 20C40 40 32 72 32 96c0 12 8 18 22 14 9-3 16-9 20-16"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="hero__ink-path"
              style={{ "--i": "1" }}
              d="M88 52c-18 0-26 20-16 34 10 14 36 10 38-8 2-16-8-24-22-26"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="hero__ink-path"
              style={{ "--i": "2" }}
              d="M120 56c0 18 8 36 20 40 12-4 20-22 20-40"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="hero__ink-path"
              style={{ "--i": "3" }}
              d="M182 78c14-6 28-8 40-6 4-16-24-24-36-10-12 14-2 34 22 32 12-1 22-7 30-16"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="hero__ink-path"
              style={{ "--i": "4" }}
              d="M262 74c-4-8 6-14 10-8 4-6 14 0 10 8-3 6-10 12-10 12s-7-6-10-12Z"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <p className="hero__tagline">
          {u.heroTaglinePre}{" "}
          <Typewriter key={lang} words={u.heroRoles} colors={ROLE_COLORS} />{" "}
          {u.heroTaglinePost}
        </p>
        <p className="hero__intro">{t(site.intro)}</p>

        <div className="hero__actions">
          <a className="btn btn--primary" href="#projects">
            {u.heroProjects}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a className="btn" href="#contact">
            {u.heroContact}
          </a>
        </div>

        <p className="hero__status">
          <span className="status-dot" aria-hidden="true" />
          {u.heroStatus}
        </p>
      </div>
    </section>
  );
}
