export const getMonthDays = (timestamp: number) => {
  const baseDate = new Date(timestamp);
  baseDate.setHours(0, 0, 0, 0);

  // Convert Gregorian date to Jalali (Shamsi)
  const formattedJalaliDate = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(baseDate);

  // get MonthName
  const monthName = new Intl.DateTimeFormat("fa-IR", {
    month: "long",
    calendar: "persian",
  }).format(baseDate);

  // Extract Jalali year, month, and day
  const [yearStr, monthStr, dayStr] = formattedJalaliDate
    .split("/")
    .map(Number);

  // Calculate the start of the Jalali month
  const startOfMonth = new Date(baseDate);
  startOfMonth.setDate(baseDate.getDate() - dayStr);

  const daysArray = [];

  // Loop through days of the Jalali month
  let dayCounter = 1;
  while (true) {
    const currentDate = new Date(startOfMonth);
    currentDate.setDate(startOfMonth.getDate() + dayCounter);

    // Convert current Gregorian date to Jalali format
    const currentJalaliDate = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
    }).format(currentDate);

    // Extract Jalali month and year for comparison
    const currentMonth = Number(currentJalaliDate.split("/")[1]);
    const currentYear = Number(currentJalaliDate.split(" ")[1].split("/")[0]);

    // Stop when we reach the next Jalali month or year
    if (currentMonth > monthStr || currentYear > yearStr) break;

    // Add current day to the array
    daysArray.push({
      jalaliDate: currentJalaliDate,
      timestamp: currentDate.getTime(),
    });

    dayCounter++;
  }

  return {
    daysArray,
    monthName,
    today: {
      yearStr,
      monthStr,
      dayStr,
    },
  };
};
