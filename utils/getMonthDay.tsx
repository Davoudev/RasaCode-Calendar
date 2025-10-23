export const getMonthDays = (timestamp: number) => {
  const baseDate = new Date(timestamp);
  baseDate.setHours(0, 0, 0, 0);

  // Convert Gregorian date to Jalali (Shamsi)
  const formattedJalaliDate = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(baseDate);

  // Extract Jalali year, month, and day
  const jalaliYear = Number(formattedJalaliDate.split("/")[0]);
  const jalaliMonth = Number(formattedJalaliDate.split("/")[1]);
  const jalaliDay = Number(formattedJalaliDate.split("/")[2]);

  // Calculate the start of the Jalali month
  const startOfMonth = new Date(baseDate);
  startOfMonth.setDate(baseDate.getDate() - jalaliDay);

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
    if (currentMonth > jalaliMonth || currentYear > jalaliYear) break;

    // Add current day to the array
    daysArray.push({
      jalaliDate: currentJalaliDate,
      timestamp: currentDate.getTime(),
    });

    dayCounter++;
  }

  return daysArray;
};
