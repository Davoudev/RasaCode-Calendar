import { useState } from "react";
import { months } from "./calendar/month-data";
import { DateInput } from "./date-input/date-input";
import { Calendar } from "./calendar/calendar";

export function CalendarContainer() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const today = now.getTime();

  const [selectedDate, setSelectedDate] = useState<number | null>(today);
  return (
    <div className="calendar-wrapper">
      <Calendar date={selectedDate} changeDate={setSelectedDate} />
      <DateInput selectedDate={selectedDate} months={months} />
    </div>
  );
}
