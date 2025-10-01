import { useEffect, useRef, useState } from "react";
import type { CalendarProps } from "../../../Type/type";
import "./calendar.css";
import { Month } from "../month/month";

export function Calendar({
  months,
  onDateSelect,
  selectedDate,
}: CalendarProps) {
  const [persianYear, setPersianYear] = useState(selectedDate?.year ?? 1404);
  const [monthIndex, setMonthIndex] = useState(selectedDate?.monthIndex ?? 0);

  const currentMonth = months[monthIndex];

  const goNextMonth = () => {
    setMonthIndex((prev) => (prev + 1) % months.length);
  };

  const goPrevMonth = () => {
    setMonthIndex((prev) => (prev - 1 + months.length) % months.length);
  };

  const prevMonthRef = useRef<number>(monthIndex);

  useEffect(() => {
    const prev = prevMonthRef.current;
    const len = months.length;

    if (prev === len - 1 && monthIndex === 0) {
      setPersianYear((y) => y + 1);
    } else if (prev === 0 && monthIndex === len - 1) {
      setPersianYear((y) => y - 1);
    }

    prevMonthRef.current = monthIndex;
  }, [monthIndex, months.length]);

  const handleDateSelect = (day: number) => {
    const newDate = { day, monthIndex, year: persianYear };
    if (
      selectedDate?.day === day &&
      selectedDate?.monthIndex === monthIndex &&
      selectedDate?.year === persianYear
    ) {
      onDateSelect(null);
    } else {
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
