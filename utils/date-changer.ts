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

export function getFirstWeekdayOfPersianMonthByYM(
  year: number,
  month: number
): number {
  // start  from today and find target month
  let date = new Date();

  // looping until we find the target month and year
  while (true) {
    const persianYear = parseInt(
      new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
        year: "numeric",
      }).format(date),
      10
    );
    const persianMonth =
      parseInt(
        new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
          month: "numeric",
        }).format(date),
        10
      ) - 1;

    // console.log("persianYear:", persianYear);
    // console.log("year", year);
    // console.log("persianMonth", persianMonth);
    // console.log("month", month);

    if (persianYear === year && persianMonth === month) {
      // now find frist day in current month
      while (true) {
        const day = parseInt(
          new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
            day: "numeric",
          }).format(date),
          10
        );
        if (day === 1) break;
        date.setDate(date.getDate() - 1);
      }

      // return startDay
      const weekDay = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
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
