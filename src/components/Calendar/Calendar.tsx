// components/Calendar/Month.tsx
import { useEffect, useRef, useState } from "react";
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
    setMonthIndex((prev) => (prev + 1) % months.length);
  };

  const goPrevMonth = () => {
    setMonthIndex((prev) => (prev - 1 + months.length) % months.length);
  };

  // update year when month changes
  const prevMonthRef = useRef<number>(monthIndex);

  useEffect(() => {
    const prev = prevMonthRef.current;

    const len = months.length;

    if (prev === len - 1 && monthIndex === 0) {
      setPersianYear((y) => y + 1);
    } else if (prev === 0 && monthIndex === len - 1) {
      setPersianYear((y) => y - 1);
    }

    // update the previous month index
    prevMonthRef.current = monthIndex;
  }, [monthIndex, months.length]);

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
