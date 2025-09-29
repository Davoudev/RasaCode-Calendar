// components/Calendar/Month.tsx
import { useState } from "react";
import { Calendar } from "../Calendar/Calendar";
import { months } from "../../../data/months";
import type { Day } from "../../../Types/types";
import "./Month.css";

export function Month() {
  //  for change persian digits to english digits
  function toEnglishDigits(str: string): string {
    return str.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
  }

  const today = new Date();
  // get current persian year
  const persianYearStr = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
  }).format(today);

  //  change year to english digits and parse it to number
  const initialYear = parseInt(toEnglishDigits(persianYearStr), 10);

  const [persianYear, setPersianYear] = useState(initialYear);
  const [monthIndex, setMonthIndex] = useState(6); // مهر
  const [selectedDay, setSelectedDay] = useState<Day>(null);

  const currentMonth = months[monthIndex];

  const goNextMonth = () => {
    setMonthIndex((prev) => {
      if (prev === months.length - 1) setPersianYear((y) => y + 1);
      return (prev + 1) % months.length;
    });
    setSelectedDay(null);
  };

  const goPrevMonth = () => {
    setMonthIndex((prev) => {
      if (prev === 0) setPersianYear((y) => y - 1);
      return (prev - 1 + months.length) % months.length;
    });
    setSelectedDay(null);
  };
  // show selected date in input
  const formattedPersianDate =
    selectedDay != null
      ? `امروز ${selectedDay} ${currentMonth.name} ${persianYear} است`
      : "";

  return (
    <div>
      <Calendar
        monthName={currentMonth.name}
        daysInMonth={currentMonth.daysInMonth}
        startDay={currentMonth.startDay}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        goNextMonth={goNextMonth}
        goPrevMonth={goPrevMonth}
      />

      {selectedDay && (
        <div className="date-output">
          <input readOnly value={formattedPersianDate} />
        </div>
      )}
    </div>
  );
}
