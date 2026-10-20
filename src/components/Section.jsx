import Icon from "./Icon.jsx";

export default function Section({
  id,
  index,
  eyebrow,
  title,
  icon,
  children,
}) {
  return (
    <section
      id={id}
      className="section"
      aria-labelledby={`${id}-title`}
    >
      <div className="container">
        <header className="section__head" data-reveal>
          <p className="section__eyebrow">
            <span className="section__index">{index}</span>
            {eyebrow}
            <span className="icon-tile icon-tile--accent">
              <Icon name={icon} size={14} />
            </span>
          </p>
          <h2 className="section__title" id={`${id}-title`}>
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}
