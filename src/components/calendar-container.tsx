import { useState } from "react";
import { DateInput } from "./date-input/date-input";
import { Calendar } from "./calendarx/calendar";

export function CalendarContainer() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const today = now.getTime();

  const [selectedDate, setSelectedDate] = useState<number | null>(today);
  return (
    <div className="calendar-wrapper">
      <Calendar date={selectedDate} changeDate={setSelectedDate} />
      <DateInput selectedDate={selectedDate} />
    </div>
  );
}
