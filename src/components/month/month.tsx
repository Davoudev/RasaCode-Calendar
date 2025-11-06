import "./month.css";
import { WeekDay } from "./week-day";
import PopoverYearInput from '../../../utils/year-picker-popover'
import { Day as DayComponent } from "./day";
import type { MonthProps } from "../../../type/type";
import { useMemo } from "react";
import { getMonthDays } from "../../../utils/get-month-day";

export function Month({
  daysInMonth,
  setDaysInMonth,
  selectedDate,
  setSelectedDate,
  goNextMonth,
  goPrevMonth,
}: 
MonthProps) {

  const fullToShortDayMap = {
    شنبه: "شنبه",
    یکشنبه: "یک",
    دوشنبه: "دو",
    سه‌شنبه: "سه",
    چهارشنبه: "چهار",
    پنجشنبه: "پنج",
    جمعه: "جمعه",
  };
  console.log("daysInMonth", daysInMonth);
  const firstDayLabelFull = daysInMonth?.daysArray[0]?.jalaliDate?.split(" ")[0];
  const allFullNames = Object.keys(fullToShortDayMap);
  const startDay = allFullNames.indexOf(firstDayLabelFull);
  const summeryDays = Object.values(fullToShortDayMap);
  const currentYear = daysInMonth?.today?.yearStr

      const days = useMemo(() => {
      return [
        ...Array(startDay).fill(null),
        ...daysInMonth!.daysArray.map((dayObj, i) => ({
          dayNumber: i + 1,
          timestamp: dayObj.timestamp,
        })),
      ];
    }, [daysInMonth]);
  const handleYearChange = (newYear: number) => {
  const yearDiff = newYear - currentYear;
      const prevDate = new Date(selectedDate!);
      prevDate.setFullYear(prevDate.getFullYear() + yearDiff);
      setDaysInMonth(getMonthDays(prevDate.getTime()));
  };


  console.log("days", days); 
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="arrow" onClick={goPrevMonth}>
          ‹
        </button>
        <h2 className="month-title">
          {daysInMonth?.monthName} - 
          <PopoverYearInput currentYear={currentYear} onSubmit={handleYearChange} />
        </h2>
        <button className="arrow" onClick={goNextMonth}>
          ›
        </button>
      </div>
      <div className="calendar">
        {summeryDays.map((day) => (
          <WeekDay key={day} label={day} />
        ))}

        {days.map((day, idx) => (
          <DayComponent
            key={day ? day.timestamp : `empty-${idx}`}
            day={day}
            isSelected={!!day && selectedDate === day.timestamp}
            setSelectedDate={setSelectedDate}
          />
        ))}
      </div>
    </div>
  );
}
