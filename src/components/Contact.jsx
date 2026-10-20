import { useEffect, useState } from "react";
import Section from "./Section.jsx";
import Icon from "./Icon.jsx";
import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Contact() {
  const { u, t } = useLang();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;

    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <Section
      id="contact"
      index={u.contactIndex}
      eyebrow={u.contactEyebrow}
      title={u.contactTitle}
      icon="mail"
    >
      <div className="contact">
        <p className="contact__lead" data-reveal>
          {u.contactLead}
        </p>

        <div
          className="contact__email-row"
          data-reveal
          style={{ "--reveal-delay": "90ms" }}
        >
          <a className="contact__email" href={`mailto:${site.email}`}>
            <Icon name="mail" size={20} />
            {site.email}
          </a>
          <button
            className={`btn btn--small${copied ? " is-done" : ""}`}
            type="button"
            onClick={copyEmail}
          >
            {copied ? u.copied : u.copy}
          </button>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {copied ? u.copiedStatus : ""}
        </p>

        <ul
          className="socials"
          data-reveal
          style={{ "--reveal-delay": "180ms" }}
        >
          {site.socials.map((social) => (
            <li key={social.label}>
              <a
                className="socials__link"
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="socials__icon">
                  <Icon name={social.icon} size={15} />
                </span>
                <span>{social.label}</span>
                <span className="arrow socials__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
          <li className="socials__location">
            <span className="socials__note">
              <Icon name="pin" size={15} />
              {t(site.location)}
            </span>
          </li>
        </ul>
      </div>
    </Section>
  );
}
