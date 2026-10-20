import { useEffect, useMemo, useState } from "react";

const segmenter =
  typeof Intl !== "undefined" && Intl.Segmenter
    ? new Intl.Segmenter("bn", { granularity: "grapheme" })
    : null;

function toGraphemes(text) {
  return segmenter
    ? Array.from(segmenter.segment(text), (item) => item.segment)
    : Array.from(text);
}

export default function Typewriter({
  words,
  colors,
  typeSpeed = 95,
  deleteSpeed = 45,
  holdTime = 1700,
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduced(motion.matches);
    const updateVisibility = () => setPaused(document.hidden);

    updateMotion();
    updateVisibility();

    motion.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      motion.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  const target = useMemo(
    () => toGraphemes(words[wordIndex]),
    [words, wordIndex]
  );

  useEffect(() => {
    if (reduced || paused) return undefined;

    if (!deleting && count >= target.length) {
      const timer = setTimeout(() => setDeleting(true), holdTime);
      return () => clearTimeout(timer);
    }

    if (deleting && count <= 0) {
      setDeleting(false);
      setWordIndex((value) => (value + 1) % words.length);
      return undefined;
    }

    const timer = setTimeout(
      () => setCount((value) => (deleting ? value - 1 : value + 1)),
      deleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timer);
  }, [
    count,
    deleting,
    target,
    reduced,
    paused,
    words,
    typeSpeed,
    deleteSpeed,
    holdTime,
  ]);

  const visible = reduced ? words[0] : target.slice(0, count).join("");
  const color = colors ? colors[wordIndex % colors.length] : undefined;

  return (
    <span
      className="typewriter"
      style={color ? { "--role-color": color } : undefined}
    >
      <span className="sr-only">{words.join(", ")}</span>
      <span className="typewriter__text" aria-hidden="true">
        {visible}
      </span>
      {!reduced && <span className="typewriter__caret" aria-hidden="true" />}
    </span>
  );
}
