import "./Calendar.css";
import { WeekDay } from "./WeekDay";
import { Day as DayComponent } from "./Day";
import type { CalendarProps, Day } from "../../../Types/types";

export function Calendar({
  monthName,
  daysInMonth,
  startDay,
  selectedDay,
  setSelectedDay,
  goNextMonth,
  goPrevMonth,
}: CalendarProps) {
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
    setSelectedDay((prev) => (prev === day ? null : day));
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
            isSelected={selectedDay === day}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}
