const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}

export function paragraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}
