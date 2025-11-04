import { useCallback, useState } from "react";
import type { CalendarProps } from "../../../type/type";
import "./calendar.css";
import { Month } from "../month/month";
import { getMonthDays } from "../../../utils/get-month-day";

export function Calendar({ date, changeDate }: CalendarProps) {
  // selected Date for showing in input
  const [daysInMonth, setDaysInMonth] = useState(getMonthDays(date!));
  const [monthOffset, setMonthOffset] = useState(0);

  const goNextMonth = useCallback(() => {
    if (!date) return;

    const newCount = monthOffset + 1;
    setMonthOffset(newCount);

    // chnaged date just for showing in every calendar page
    const nextMonthDate = new Date(date);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + newCount);
    setDaysInMonth(getMonthDays(nextMonthDate.getTime()));
  }, [date, monthOffset]);

  const goPrevMonth = useCallback(() => {
    if (!date) return;

    const newCount = monthOffset - 1;
    setMonthOffset(newCount);

    // chnaged date just for showing in every calendar page
    const prevMonthDate = new Date(date);
    prevMonthDate.setMonth(prevMonthDate.getMonth() + newCount);
    setDaysInMonth(getMonthDays(prevMonthDate.getTime()));
  }, [date, monthOffset]);

  const handleDateSelect = useCallback((timestamp: number) => {
    const newDate = new Date(timestamp);
    newDate.setDate(newDate.getDate());
    changeDate(newDate.getTime());
    setMonthOffset(0);
  }, []);

  return (
    <div>
      <Month
        daysInMonth={daysInMonth}
        setDaysInMonth={setDaysInMonth}
        selectedDate={date}
        setSelectedDate={handleDateSelect}
        goNextMonth={goNextMonth}
        goPrevMonth={goPrevMonth}
      />
    </div>
  );
}
