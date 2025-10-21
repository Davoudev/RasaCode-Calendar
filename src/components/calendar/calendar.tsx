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
    let newMonth = (viewMonth + 1) % 12;
    let newYear = viewYear + (newMonth === 0 ? 1 : 0);
    setViewMonth(newMonth);
    setViewYear(newYear);

    // this input will not change; it will only be updated by clicking on a day
  };

  const goPrevMonth = () => {
    let newMonth = viewMonth - 1;
    let newYear = viewYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setViewMonth(newMonth);
    setViewYear(newYear);
    // this input will not change; it will only be updated by clicking on a day
  };

  const handleDateSelect = (timestamp: number) => {
    const dateObj = new Date(timestamp);
    dateObj.setHours(0, 0, 0, 0);
    changeDate(dateObj.getTime());
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
        currentMonth={viewMonth}
        currentYear={viewYear}
      />
    </div>
  );
}
