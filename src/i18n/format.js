const BENGALI_DIGITS = "০১২৩৪৫৬৭৮৯";

export function toBengaliDigits(value) {
  return String(value).replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)]);
}

export function formatIndex(value, lang) {
  const text = String(value).padStart(2, "0");
  return lang === "bn" ? toBengaliDigits(text) : text;
}
