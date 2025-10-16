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
  const month = parseInt(toEnglishDigits(persianMonthStr), 10) - 1;
  const day = parseInt(toEnglishDigits(persianDayStr), 10);

  return { day, month, year };
}

export function getFirstWeekdayOfPersianMonthByYM(
  year: number,
  month: number
): number {
  // start  from today and find target month
  let date = new Date();

  // looping until we find the target month and year
  while (true) {
    const persianYear = parseInt(
      toEnglishDigits(
        new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
          year: "numeric",
        }).format(date)
      ),
      10
    );
    const persianMonth =
      parseInt(
        toEnglishDigits(
          new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
            month: "numeric",
          }).format(date)
        ),
        10
      ) - 1;

    console.log("persianYear:", persianYear);
    console.log("year", year);
    console.log("persianMonth", persianMonth);
    console.log("month", month);
    if (persianYear === year && persianMonth === month) {
      // now find frist day in current month
      while (true) {
        const day = parseInt(
          toEnglishDigits(
            new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
              day: "numeric",
            }).format(date)
          ),
          10
        );
        if (day === 1) break;
        date.setDate(date.getDate() - 1);
      }

      // return startDay
      const weekDay = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        weekday: "long",
      }).format(date);

      switch (weekDay) {
        case "شنبه":
          return 0;
        case "یکشنبه":
          return 1;
        case "دوشنبه":
          return 2;
        case "سه‌شنبه":
          return 3;
        case "چهارشنبه":
          return 4;
        case "پنجشنبه":
          return 5;
        case "جمعه":
          return 6;
        default:
          return 0;
      }
    } else if (persianYear < year || persianMonth < month) {
      date.setDate(date.getDate() + 1);
    } else if (persianYear > year || persianMonth > month) {
      date.setDate(date.getDate() - 1);
    }
    // one day forward until find current month
  }
}
