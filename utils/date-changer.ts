export function getTodayPersianDate(timestamp: number) {
  const formatted = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(timestamp);

  const [year, month, day] = formatted.split("/").map(Number);

  return {
    year,
    month: month - 1,
    day,
  };
}
