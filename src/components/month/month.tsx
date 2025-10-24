import "./month.css";
import { WeekDay } from "./week-day";
import { Day as DayComponent } from "./day";
import type { MonthProps } from "../../../type/type";

export function Month({
  monthName,
  daysInMonth,
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
console.log("daysInMonth" , daysInMonth)
    const firstDayLabelFull = daysInMonth?.[0]?.jalaliDate?.split(" ")[0];
    const allFullNames = Object.keys(fullToShortDayMap);
    const summeryDays = Object.values(fullToShortDayMap)
    const startDay = allFullNames.indexOf(firstDayLabelFull);
    const currentYear = daysInMonth?.[0]?.jalaliDate?.split(" ")[1]?.split("/")[0];

  const days = [
    ...Array(startDay).fill(null),
    ...daysInMonth!.map((dayObj, i) => ({
      dayNumber: i + 1,
      timestamp: dayObj.timestamp,
    })),
  ];

  const handleClick = (timestamp: number): void => {
    setSelectedDate(timestamp);
  };
  // console.log("days", days);
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="arrow" onClick={goPrevMonth}>
          ‹
        </button>
        <h2 className="month-title">
          {monthName} - {currentYear}
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
            onClick={() => day && handleClick(day.timestamp)}
          />
        ))}
      </div>
    </div>
  );
}
