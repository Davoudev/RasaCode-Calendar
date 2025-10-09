import toEnglishDigits from "./english-digits";

export function getTodayPersianDate(timestamp: number) {
  const persianYearStr = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
  }).format(timestamp);

  const persianMonthStr = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    month: "numeric",
  }).format(timestamp);

  const persianDayStr = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
  }).format(timestamp);

  const year = parseInt(toEnglishDigits(persianYearStr), 10);
  const month = parseInt(toEnglishDigits(persianMonthStr), 10) - 1; // صفر ایندکس
  const day = parseInt(toEnglishDigits(persianDayStr), 10);

  return { day, month, year };
}
