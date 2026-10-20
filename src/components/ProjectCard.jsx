import { useEffect, useRef } from "react";
import Icon from "./Icon.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";
import { formatIndex } from "../i18n/format.js";

export default function ProjectCard({ project, index }) {
  const { lang, u, t } = useLang();
  const frame = useRef(0);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    []
  );

  function trackPointer(event) {
    if (event.pointerType === "touch" || frame.current) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
      card.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
      card.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
    });
  }

  function resetPointer(event) {
    if (event.pointerType === "touch") return;
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    const card = event.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "0%");
  }

  return (
    <article
      className="project-card"
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      onPointerCancel={resetPointer}
    >
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
