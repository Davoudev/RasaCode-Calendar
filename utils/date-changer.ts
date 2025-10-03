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
