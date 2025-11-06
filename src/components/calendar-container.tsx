import { useState } from "react";
import { DateInput } from "./date-input/date-input";
import { Calendar } from "./calendar/calendar";

export function CalendarContainer() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const today = now.getTime();

  const [selectedDate, setSelectedDate] = useState<number | null>(today);
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => setShowCalendar((prev) => !prev);

  return (
    <div className="calendar-wrapper">
      <div className="calendar-inner">
        {showCalendar && (
          <div className="calendar-popup">
            <Calendar date={selectedDate} changeDate={setSelectedDate} />
          </div>
        )}
        <DateInput selectedDate={selectedDate} onClick={toggleCalendar} />
      </div>
    </div>
  );
}
