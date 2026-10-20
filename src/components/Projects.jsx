import Section from "./Section.jsx";
import ProjectCard from "./ProjectCard.jsx";
import Icon from "./Icon.jsx";
import { projects } from "../data/projects.js";
import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Projects() {
  const { u } = useLang();

  return (
    <Section
      id="projects"
      index={u.projectsIndex}
      eyebrow={u.projectsEyebrow}
      title={u.projectsTitle}
      icon="folder"
    >
      <p className="section__lead" data-reveal>
        {u.projectsLead}
      </p>
      <ul className="projects">
        {projects.map((project, index) => (
          <li
            key={project.title.en}
            data-reveal="blur"
            style={{ "--reveal-delay": `${index * 80}ms` }}
          >
            <ProjectCard project={project} index={index + 1} />
          </li>
        ))}
      </ul>

      <p className="projects__more" data-reveal>
        <a
          className="text-link text-link--icon"
          href={site.github}
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="github" size={16} />
          {u.projectsMore}
          <span className="arrow" aria-hidden="true">
            {" "}
            ↗
          </span>
        </a>
      </p>
    </Section>
  );
}
