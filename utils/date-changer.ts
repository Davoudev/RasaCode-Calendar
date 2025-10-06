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

  return { year, month, day };
}

export function persianToTimestamp(
  year: number,
  month: number,
  day: number
): number {
  console.log("outputs =>", year, month, day);
  function toGregorian(jy: number, jm: number, jd: number) {
    jy += 1595;
    let days =
      -355668 +
      365 * jy +
      Math.floor(jy / 33) * 8 +
      Math.floor(((jy % 33) + 3) / 4) +
      jd +
      (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
    let gy = 400 * Math.floor(days / 146097);
    days %= 146097;
    if (days > 36524) {
      gy += 100 * Math.floor(--days / 36524);
      days %= 36524;
      if (days >= 365) days++;
    }
    gy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
      gy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    let gd = days + 1;
    const sal_a = [
      0,
      31,
      (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    let gm;
    for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) {
      gd -= sal_a[gm];
    }
    return { gy: gy, gm: gm - 1, gd: gd };
  }

  const gregorian = toGregorian(year, month + 1, day);
  const resultDate = new Date(gregorian.gy, gregorian.gm, gregorian.gd);

  return resultDate.getTime();
}
export const jalaliToTimestamp = (
  jy: number,
  jm: number,
  jd: number
): number => {
  // normalize month: allow jm to be 0..11 (JS Date.getMonth()) or 1..12
  if (jm >= 0 && jm <= 11) {
    jm = jm + 1; // treat as zero-based input -> convert to 1..12
  }
  // frist phase change jalali to JDM

  const epbase = jy >= 0 ? jy - 474 : jy - 473;
  const epyear = 474 + (epbase % 2820);

  let mdays: number;
  if (jm <= 7) {
    mdays = (jm - 1) * 31;
  } else {
    mdays = (jm - 1) * 30 + 6;
  }

  const jdn =
    jd +
    mdays +
    Math.floor((epyear * 682 - 110) / 2816) +
    (epyear - 1) * 365 +
    Math.floor(epbase / 2820) * 1029983 +
    (1948320 - 1);
  // secound phase change JDM to georgian

  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);

  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);

  // build timestamp at UTC midnight (avoids local timezone day-shift)
  return Date.UTC(year, month - 1, day); // milliseconds since epoch (UTC)
};
