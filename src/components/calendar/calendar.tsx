import { useState } from "react";
import type { CalendarProps, SelectedDate } from "../../../type/type";
import "./calendar.css";
import { getDaysInJalaliMonth, months } from "./month-data";
import { Month } from "../month/month";
import {
  getFirstWeekdayOfPersianMonthByYM,
  getTodayPersianDate,
} from "../../../utils/date-changer";

export function Calendar({ date, changeDate }: CalendarProps) {
  // selected Date for showing in input
  const inputSelectedDate = date ? getTodayPersianDate(date) : null;

  // show initial view
  const initialView = date
    ? getTodayPersianDate(date)
    : { year: 1404, month: 0, day: 1 };
  const [viewYear, setViewYear] = useState<number>(initialView.year);
  const [viewMonth, setViewMonth] = useState<number>(initialView.month);

  const startDay = getFirstWeekdayOfPersianMonthByYM(viewYear, viewMonth);

  const currentMonth = months[viewMonth];

  // calculate day difference between current input date and clicked target date
  const calculateDayDelta = (from: SelectedDate, to: SelectedDate) => {
    const fromIndex = from.year * 12 + from.month;
    const toIndex = to.year * 12 + to.month;

    if (toIndex === fromIndex) {
      return (to.day as number) - (from.day as number);
    }

    if (toIndex > fromIndex) {
      // move forward
      let days =
        getDaysInJalaliMonth(from.year, from.month) - (from.day as number);
      for (let idx = fromIndex + 1; idx < toIndex; idx++) {
        const m = idx % 12;
        days += getDaysInJalaliMonth(from.year, m);
      }
      days += to.day as number;
      return days;
    } else {
      // move backward
      let days = from.day as number;
      for (let idx = fromIndex - 1; idx > toIndex; idx--) {
        const m = idx % 12;
        days += getDaysInJalaliMonth(from.year, m);
      }

      days += getDaysInJalaliMonth(to.year, to.month) - (to.day as number);
      return -days;
    }
  };

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

  const handleDateSelect = (day: number) => {
    if (!date) return;
    const from = getTodayPersianDate(date);
    const to: SelectedDate = { day, month: viewMonth, year: viewYear };
    const delta = calculateDayDelta(from, to);
    changeDate(new Date(date).setDate(new Date(date).getDate() + delta));
  };
  return (
    <div>
      <Month
        monthName={currentMonth.name}
        daysInMonth={getDaysInJalaliMonth(viewYear, viewMonth)}
        startDay={startDay}
        selectedDate={inputSelectedDate}
        setSelectedDate={handleDateSelect}
        goNextMonth={goNextMonth}
        goPrevMonth={goPrevMonth}
        currentMonth={viewMonth}
        currentYear={viewYear}
      />
    </div>
  );
}
