import Icon from "./Icon.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

const BENGALI_DIGITS = "০১২৩৪৫৬৭৮৯";

function formatIndex(value, lang) {
  const text = String(value).padStart(2, "0");
  if (lang !== "bn") return text;
  return text.replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)]);
}

export default function ProjectCard({ project, index }) {
  const { lang, u, t } = useLang();

  function trackPointer(event) {
    if (event.pointerType === "touch") return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty(
      "--mx",
      `${((event.clientX - rect.left) / rect.width) * 100}%`
    );
    card.style.setProperty(
      "--my",
      `${((event.clientY - rect.top) / rect.height) * 100}%`
    );
  }

  return (
    <article className="project-card" onPointerMove={trackPointer}>
      <span className="project-card__watermark" aria-hidden="true">
        {formatIndex(index, lang)}
      </span>

      <div className="project-card__top">
        <span className="project-card__index">
          {formatIndex(index, lang)}
        </span>
        <span className="project-card__status">
          <Icon name={project.statusIcon} size={12} />
          {t(project.status)}
        </span>
      </div>

      <h3 className="project-card__title">{t(project.title)}</h3>
      <p className="project-card__description">{t(project.description)}</p>

      <ul className="tags" aria-label={u.techLabel}>
        {project.tech.map((tech) => (
          <li className="tag" key={tech}>
            {tech}
          </li>
        ))}
      </ul>

      {project.links.length > 0 && (
        <div className="project-card__links">
          {project.links.map((link) => (
            <a
              className="text-link"
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
              <span className="arrow" aria-hidden="true">
                {" "}
                ↗
              </span>
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
