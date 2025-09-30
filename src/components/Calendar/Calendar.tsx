// components/Calendar/Month.tsx
import { useState } from "react";
import type { CalendarProps, Day } from "../../../Type/type";
import "./calendar.css";
import { Month } from "../month/month";

export function Calendar({ months, onDateSelect }: CalendarProps) {
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
  const [selectedDate, setSelectedDate] = useState<{
    day: Day;
    monthIndex: number;
    year: number;
  } | null>(null);
  const currentMonth = months[monthIndex];

  const goNextMonth = () => {
    setMonthIndex((prev) => {
      if (prev === months.length - 1) setPersianYear((y) => y + 1);
      return (prev + 1) % months.length;
    });
    // setSelectedDay(null);
  };

  const goPrevMonth = () => {
    setMonthIndex((prev) => {
      if (prev === 0) setPersianYear((y) => y - 1);
      return (prev - 1 + months.length) % months.length;
    });
    // setSelectedDay(null);
  };
  // show selected date in input
  const handleDateSelect = (day: number) => {
    const newDate = { day, monthIndex, year: persianYear };
    if (
      selectedDate?.day === day &&
      selectedDate?.monthIndex === monthIndex &&
      selectedDate?.year === persianYear
    ) {
      setSelectedDate(null);
      onDateSelect(null);
    } else {
      setSelectedDate(newDate);
      onDateSelect(newDate);
    }
  };
  return (
    <div>
      <Month
        monthName={currentMonth.name}
        daysInMonth={currentMonth.daysInMonth}
        startDay={currentMonth.startDay}
        selectedDate={selectedDate}
        setSelectedDate={handleDateSelect}
        goNextMonth={goNextMonth}
        goPrevMonth={goPrevMonth}
        currentMonthIndex={monthIndex}
        currentYear={persianYear}
      />
    </div>
  );
}
