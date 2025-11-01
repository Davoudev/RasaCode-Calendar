import "./month.css";
import { WeekDay } from "./week-day";
import { Day as DayComponent } from "./day";
import type { MonthProps } from "../../../type/type";
import { memo, useMemo } from "react";

export const Month =memo(({
  daysInMonth,
  selectedDate,
  setSelectedDate,
  goNextMonth,
  goPrevMonth,
}: 
MonthProps) =>{

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

 
  console.log("days", days);
  // console.log('selectedDate', selectedDate);
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="arrow" onClick={goPrevMonth}>
          ‹
        </button>
        <h2 className="month-title">
          {daysInMonth?.monthName} - {currentYear}
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
})
