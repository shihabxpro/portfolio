import Icon from "./Icon.jsx";
import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Footer() {
  const { lang, u, t } = useLang();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner" data-reveal>
        <p>
          © {lang === "en" ? "2026" : "২০২৬"} {t(site.name)}
        </p>
        <p>{u.footerBuilt}</p>
        <a className="site-footer__top" href="#home">
          <Icon name="arrow-up" size={15} />
          {u.footerTop}
        </a>
      </div>
    </footer>
  );
}
