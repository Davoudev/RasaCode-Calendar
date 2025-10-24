import { useState } from "react";
import type { CalendarProps } from "../../../type/type";
import "./calendar.css";
import { months } from "./month-data";
import { Month } from "../month/month";
import {
  getFirstWeekdayOfPersianMonthByYM,
  getTodayPersianDate,
} from "../../../utils/date-changer";
import { getMonthDays } from "../../../utils/getMonthDay";

export function Calendar({ date, changeDate }: CalendarProps) {
  // selected Date for showing in input
  const inputSelectedDate = date ? getTodayPersianDate(date) : null;
  const [viewYear, setViewYear] = useState<number>(inputSelectedDate!.year);
  const [viewMonth, setViewMonth] = useState<number>(inputSelectedDate!.month);
  const [daysInMonth, setِِDaysInMonth] = useState(getMonthDays(date!));
  const [monthOffset, setMonthOffset] = useState(0);
  const startDay = getFirstWeekdayOfPersianMonthByYM(viewYear, viewMonth);
  const currentMonth = months[viewMonth];

  const goNextMonth = () => {
    if (!date) return;

    const newCount = monthOffset + 1;
    setMonthOffset(newCount);

    const nextMonthDate = new Date(date);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + newCount);
    setِِDaysInMonth(getMonthDays(nextMonthDate.getTime()));
    setViewMonth((prev) => (prev + 1) % 12);
    setViewYear((prev) => (viewMonth === 11 ? prev + 1 : prev));
  };

  const goPrevMonth = () => {
    if (!date) return;

    const newCount = monthOffset - 1;
    setMonthOffset(newCount);
    console.log("count", newCount);

    const nextMonthDate = new Date(date);
    console.log("nextMonthDate", nextMonthDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + newCount);

    console.log("nextMonthDateAfter", nextMonthDate);

    setِِDaysInMonth(getMonthDays(nextMonthDate.getTime()));

    setViewMonth((prev) => (prev - 1 + 12) % 12);
    setViewYear((prev) => (viewMonth === 0 ? prev - 1 : prev));
  };

  const handleDateSelect = (timestamp: number) => {
    console.log("time", timestamp);
    const newDate = new Date(timestamp);

    newDate.setDate(newDate.getDate());

    changeDate(newDate.getTime());
    setMonthOffset(0);
  };

  return (
    <div>
      <Month
        monthName={currentMonth.name}
        daysInMonth={daysInMonth}
        startDay={startDay}
        selectedDate={date}
        setSelectedDate={handleDateSelect}
        goNextMonth={goNextMonth}
        goPrevMonth={goPrevMonth}
        currentYear={viewYear}
      />
    </div>
  );
}
