import { useState } from "react";
import type { CalendarProps, PersianDate } from "../../../type/type";
import "./calendar.css";
import { months } from "./month-data";
import {
  getTodayPersianDate,
  jalaliToTimestamp,
} from "../../../utils/date-changer";
import { Month } from "../month/month";

export function Calendar({ date, changeDate }: CalendarProps) {
  const [todayPersianDate, setTodayPersianDate] = useState<PersianDate | null>(
    date ? getTodayPersianDate(date) : null
  );
  console.log("todayPersianDate =>", todayPersianDate);
  const persianYear = todayPersianDate?.year ?? 1404;
  const month = todayPersianDate?.month ?? 0;
  const currentMonth = months[month];

  const goNextMonth = () => {
    setTodayPersianDate((prev) => {
      if (!prev) return null;
      let newMonth = (prev.month + 1) % months.length;
      let newYear = prev.year;

      if (newMonth === 0) {
        newYear += 1;
      }

      return { day: 0, month: newMonth, year: newYear };
    });
  };

  const goPrevMonth = () => {
    setTodayPersianDate((prev) => {
      if (!prev) return null;
      let newMonth = prev.month - 1;
      let newYear = prev.year;

      if (newMonth < 0) {
        newMonth = months.length - 1;
        newYear -= 1;
      }

      return { day: 0, month: newMonth, year: newYear };
    });
  };

  const handleDateSelect = (day: number) => {
    if (!todayPersianDate) return;

    const newDate = {
      day,
      month: todayPersianDate.month,
      year: todayPersianDate.year,
    };

    console.log("newDate =>", newDate);
    setTodayPersianDate(newDate);

    const timestamp = jalaliToTimestamp(
      newDate.year,
      newDate.month,
      newDate.day
    );
    changeDate(timestamp);
  };

  return (
    <div>
      <Month
        monthName={currentMonth.name}
        daysInMonth={currentMonth.daysInMonth}
        startDay={currentMonth.startDay}
        selectedDate={todayPersianDate}
        setSelectedDate={handleDateSelect}
        goNextMonth={goNextMonth}
        goPrevMonth={goPrevMonth}
        currentMonth={month}
        currentYear={persianYear}
      />
    </div>
  );
}
