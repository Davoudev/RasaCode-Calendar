export const months = [
  { name: "فروردین", startDay: 6 },
  { name: "اردیبهشت", startDay: 2 },
  { name: "خرداد", startDay: 5 },
  { name: "تیر", startDay: 1 },
  { name: "مرداد", startDay: 4 },
  { name: "شهریور", startDay: 0 },
  { name: "مهر", startDay: 3 },
  { name: "آبان", startDay: 5 },
  { name: "آذر", startDay: 0 },
  { name: "دی", startDay: 2 },
  { name: "بهمن", startDay: 5 },
  { name: "اسفند", startDay: 6 },
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
