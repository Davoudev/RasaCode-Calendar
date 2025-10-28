import { useState } from "react";
import type { CalendarProps } from "../../../type/type";
import "./calendar.css";
import { months } from "./month-data";
import { Month } from "../month/month";
import { getTodayPersianDate } from "../../../utils/date-changer";
import { getMonthDays } from "../../../utils/getMonthDay";

export function Calendar({ date, changeDate }: CalendarProps) {
  // selected Date for showing in input
  const inputSelectedDate = date ? getTodayPersianDate(date) : null;
  const [viewMonth, setViewMonth] = useState<number>(inputSelectedDate!.month);
  const [daysInMonth, setDaysInMonth] = useState(getMonthDays(date!));
  const [monthOffset, setMonthOffset] = useState(0);
  const currentMonth = months[viewMonth];

  const goNextMonth = () => {
    if (!date) return;

    const newCount = monthOffset + 1;
    setMonthOffset(newCount);

    // chnaged date just for showing in every calendar page
    const nextMonthDate = new Date(date);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + newCount);
    setDaysInMonth(getMonthDays(nextMonthDate.getTime()));
    setViewMonth((prev) => (prev + 1) % 12);
  };

  const goPrevMonth = () => {
    if (!date) return;

    const newCount = monthOffset - 1;
    setMonthOffset(newCount);

    // chnaged date just for showing in every calendar page
    const nextMonthDate = new Date(date);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + newCount);
    setDaysInMonth(getMonthDays(nextMonthDate.getTime()));

    setViewMonth((prev) => (prev - 1 + 12) % 12);
  };

  const handleDateSelect = (timestamp: number) => {
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
        selectedDate={date}
        setSelectedDate={handleDateSelect}
        goNextMonth={goNextMonth}
        goPrevMonth={goPrevMonth}
      />
    </div>
  );
}
