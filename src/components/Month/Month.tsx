import "./month.css";
import { WeekDay } from "./week-day";
import { Day as DayComponent } from "./day";
import type { MonthProps, Day } from "../../../type/type";

export function Month({
  monthName,
  daysInMonth,
  startDay,
  selectedDate,
  setSelectedDate,
  goNextMonth,
  goPrevMonth,
  currentMonthIndex,
  currentYear,
}: MonthProps) {
  // the week Days
  const daysOfWeek: string[] = [
    "شنبه",
    "یک",
    "دو",
    "سه",
    "چهار",
    "پنج",
    "جمعه",
  ];

  // create days
  const days: Day[] = Array(startDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  // for select a day
  const handleClick = (day: number): void => {
    setSelectedDate(day);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="arrow" onClick={goPrevMonth}>
          ‹
        </button>
        <h2 className="month-title">تقویم {monthName}</h2>
        <button className="arrow" onClick={goNextMonth}>
          ›
        </button>
      </div>
      <div className="calendar">
        {daysOfWeek.map((day) => (
          <WeekDay key={day} label={day} />
        ))}

        {days.map((day, idx) => (
          <DayComponent
            key={day ?? `empty-${idx}`}
            day={day}
            isSelected={
              !!day &&
              selectedDate?.day === day &&
              selectedDate?.monthIndex === currentMonthIndex &&
              selectedDate?.year === currentYear
            }
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}
