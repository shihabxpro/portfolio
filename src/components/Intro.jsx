import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "../data/site.js";
import { useLang } from "../i18n/LanguageContext.jsx";

const DURATION = 1450;
const EXIT = 760;

function splitGraphemes(text) {
  if (typeof Intl !== "undefined" && typeof Intl.Segmenter === "function") {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });
    return Array.from(segmenter.segment(text), (part) => part.segment);
  }
  return Array.from(text);
}

export default function Intro({ onDone }) {
  const { lang, u, t } = useLang();
  const [leaving, setLeaving] = useState(false);
  const [reduced] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const onDoneRef = useRef(onDone);
  const finishedRef = useRef(false);
  const rafRef = useRef(0);
  const timerRef = useRef(0);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    let cancelled = false;
    const ready = () => {
      if (cancelled || !rootRef.current) return;
      rootRef.current.classList.add("is-font-ready");
    };

    if (document.fonts?.ready) {
      Promise.race([
        document.fonts.ready,
        new Promise((resolve) => window.setTimeout(resolve, 400)),
      ]).then(ready);
    } else {
      ready();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    cancelAnimationFrame(rafRef.current);
    if (countRef.current) countRef.current.textContent = "100";
    if (barRef.current) barRef.current.style.transform = "scaleX(1)";
    setLeaving(true);

    timerRef.current = window.setTimeout(() => {
      document.documentElement.classList.remove("intro-lock");
      onDoneRef.current();
    }, EXIT);
  }, []);

  useEffect(() => {
    if (reduced) {
      onDoneRef.current();
      return undefined;
    }

    document.documentElement.classList.add("intro-lock");

    const start = performance.now();
    const tick = (now) => {
      const ratio = Math.min(1, (now - start) / DURATION);

      if (countRef.current) {
        countRef.current.textContent = String(Math.round(ratio * 100)).padStart(
          3,
          "0"
        );
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${ratio})`;
      }

      if (ratio < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    const onKeyDown = (event) => {
      if (event.key === "Tab") return;
      finish();
    };
    const onPointerDown = (event) => {
      if (event.button === 0) finish();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(timerRef.current);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.classList.remove("intro-lock");
    };
  }, [finish, reduced]);

  if (reduced) return null;

  const name = t(site.name);
  const chars = splitGraphemes(name);

  return (
    <div
      ref={rootRef}
      className={`intro${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={lang === "bn" ? "পোর্টফোলিও লোড হচ্ছে" : "Loading portfolio"}
    >
      <span className="intro__grain" aria-hidden="true" />

      <div className="intro__top">
        <span className="intro__eyebrow">{u.heroEyebrow}</span>
        <span className="intro__count" ref={countRef}>
          000
        </span>
      </div>

      <div className="intro__center">
        <div className="intro__stage">
          <span className="intro__avatar" aria-hidden="true">
            <img
              src={`${import.meta.env.BASE_URL}profile.webp`}
              alt=""
              width="640"
              height="640"
              decoding="async"
            />
          </span>

          <h1 className="intro__name" aria-hidden="true">
            {chars.map((char, index) => (
              <span className="intro__char-mask" key={index}>
                <span className="intro__char" style={{ "--i": index }}>
                  {char}
                </span>
              </span>
            ))}
            <span className="intro__char-mask">
              <span
                className="intro__dot"
                style={{ "--i": chars.length }}
              >
                .
              </span>
            </span>
          </h1>
          <span className="sr-only">{name}</span>

          <p className="intro__roles">
            {u.heroRoles.map((role) => (
              <span className="intro__role" key={role}>
                {role}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="intro__bottom">
        <span className="intro__handle">@{site.handle}</span>
        <span className="intro__line" aria-hidden="true">
          <span className="intro__bar" ref={barRef} />
        </span>
        <span className="intro__hint">
          {lang === "bn" ? "স্কিপ করতে ট্যাপ করো" : "Tap to skip"}
        </span>
      </div>
    </div>
  );
}
