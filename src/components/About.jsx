import Section from "./Section.jsx";
import Icon from "./Icon.jsx";
import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function About() {
  const { u, t } = useLang();
  const paragraphs = t(site.about);

  return (
    <Section
      id="about"
      index={u.aboutIndex}
      eyebrow={u.aboutEyebrow}
      title={u.aboutTitle}
      icon="user"
    >
      <div className="about">
        <div className="about__aside">
          <dl className="facts" data-reveal="left">
            {site.facts.map((fact, index) => (
              <div className="facts__row" key={index}>
                <dt>
                  <span className="icon-tile icon-tile--sm">
                    <Icon name={fact.icon} size={14} />
                  </span>
                  {t(fact.label)}
                </dt>
                <dd>{t(fact.value)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="about__body">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
