import Section from "./Section.jsx";
import Icon from "./Icon.jsx";
import { skillGroups, learning } from "../data/skills.js";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Skills() {
  const { u, t } = useLang();

  return (
    <Section
      id="skills"
      index={u.skillsIndex}
      eyebrow={u.skillsEyebrow}
      title={u.skillsTitle}
      icon="code"
    >
      <div className="skills">
        {skillGroups.map((group, index) => (
          <div
            className="skill-group"
            key={group.title.en}
            data-reveal
            style={{ "--reveal-delay": `${index * 80}ms` }}
          >
            <h3 className="skill-group__title">
              <span className="icon-tile icon-tile--sm">
                <Icon name={group.icon} size={15} />
              </span>
              {t(group.title)}
            </h3>
            <p className="skill-group__note">{t(group.note)}</p>
            <ul className="skill-group__list">
              {group.items.map((item) => (
                <li key={t(item)}>{t(item)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="learning" data-reveal>
        <h3 className="learning__title">{u.skillsLearning}</h3>
        <ul className="tags">
          {learning.map((item) => (
            <li className="tag" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
