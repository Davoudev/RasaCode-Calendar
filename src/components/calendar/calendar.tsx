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

  const startDay = getFirstWeekdayOfPersianMonthByYM(viewYear, viewMonth);

  const currentMonth = months[viewMonth];

  const goNextMonth = () => {
    if (!date) return;
    // update timestamp
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    newDate.setMonth(newDate.getMonth() + 1);
    changeDate(newDate.getTime());
    // update state
    setViewMonth((prev) => (prev + 1) % 12);
    setViewYear((prev) => (viewMonth === 11 ? prev + 1 : prev));
  };

  const goPrevMonth = () => {
    if (!date) return;
    // update timestamp
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    newDate.setHours(0, 0, 0, 0);
    changeDate(newDate.getTime());
    // update state
    setViewMonth((prev) => (prev - 1 + 12) % 12);
    setViewYear((prev) => (viewMonth === 0 ? prev - 1 : prev));
  };

  const handleDateSelect = (timestamp: number) => {
    changeDate(timestamp);
  };

  return (
    <div>
      <Month
        monthName={currentMonth.name}
        daysInMonth={getMonthDays(date!)}
        startDay={startDay}
        selectedDate={date}
        setSelectedDate={handleDateSelect}
        goNextMonth={goNextMonth}
        goPrevMonth={goPrevMonth}
        // currentMonth={viewMonth}
        currentYear={viewYear}
      />
    </div>
  );
}
