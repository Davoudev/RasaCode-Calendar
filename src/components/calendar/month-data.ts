export const months = [
  { name: "فروردین" },
  { name: "اردیبهشت" },
  { name: "خرداد" },
  { name: "تیر" },
  { name: "مرداد" },
  { name: "شهریور" },
  { name: "مهر" },
  { name: "آبان" },
  { name: "آذر" },
  { name: "دی" },
  { name: "بهمن" },
  { name: "اسفند" },
];
export function getDaysInJalaliMonth(year: number, month: number): number {
  if (month >= 0 && month <= 5) return 31;
  if (month >= 6 && month <= 10) return 30;
  if (month === 11) return isLeapJalali(year) ? 30 : 29;
  throw new Error("month is have to be between 1 and 12");
}

function isLeapJalali(year: number): boolean {
  const r = year % 33;
  return [1, 5, 9, 13, 17, 22, 26, 30].includes(r);
}
