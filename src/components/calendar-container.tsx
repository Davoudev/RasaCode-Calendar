import { useState } from "react";
import type { Day } from "../../type/type";
import { months } from "./calendar/month-data";
import { DateInput } from "./date-input/date-input";
import toEnglishDigits from "../../utils/english-digits";
import { Calendar } from "./calendar/calendar";

export function CalendarContainer() {
  const today = new Date().getTime();
  const persianYearStr = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
  }).format(today);
  const persianMonthStr = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    month: "numeric",
  }).format(today);
  const persianDayStr = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
  }).format(today);
  console.log("persianyearStr  :", persianYearStr);

  const initialYear = parseInt(toEnglishDigits(persianYearStr), 10);
  const initialMonth = parseInt(toEnglishDigits(persianMonthStr), 10) - 1;
  const initialDay = parseInt(toEnglishDigits(persianDayStr), 10);

  const [selectedDate, setSelectedDate] = useState<{
    day: Day;
    monthIndex: number;
    year: number;
  } | null>({
    day: initialDay,
    monthIndex: initialMonth,
    year: initialYear,
  });

  return (
    <div className="calendar-wrapper">
      <Calendar
        months={months}
        onDateSelect={setSelectedDate}
        selectedDate={selectedDate}
      />
      <DateInput selectedDate={selectedDate} months={months} />
    </div>
  );
}
