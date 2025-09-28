import React, { useState } from "react";
import "./Calendar.css";
import { WeekDay } from "./WeekDay";
import { Day as DayComponent } from "./Day";
import type { CalendarProps, Day } from "../../../Types/types";

export const Calendar: React.FC<CalendarProps> = ({
  monthName,
  daysInMonth,
  startDay = 0,
}) => {
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

  const [selectedDay, setSelectedDay] = useState<Day>(null);

  // create days
  const days: Day[] = Array(startDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  // for select a day
  const handleClick = (day: number): void => {
    setSelectedDay((prev) => (prev === day ? null : day));
  };

  // for fetting time stamp
  const getTimestamp = (day: Day): Day => {
    if (!day) return null;
    return new Date(2025, 10, day).getTime();
  };

  return (
    <div className="calendar-container">
      <h2>تقویم {monthName}</h2>
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

      <div className={`timestamp ${selectedDay ? "show" : ""}`}>
        {selectedDay ? (
          <p>Timestamp انتخاب شده: {getTimestamp(selectedDay)}</p>
        ) : (
          <p>&nbsp;</p>
        )}
      </div>
    </div>
  );
};
