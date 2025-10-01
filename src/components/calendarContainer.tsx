import { useState } from "react";
import { Calendar } from "./calendar/calendar";
import type { Day } from "../../Type/type";
import { months } from "./calendar/monthData";
import { DateInput } from "./dateInput/dateInput";

export function CalendarContainer() {
  const [selectedDate, setSelectedDate] = useState<{
    day: Day;
    monthIndex: number;
    year: number;
  } | null>(null);

  return (
    <div className="calendar-wrapper">
      <Calendar months={months} onDateSelect={setSelectedDate} />
      <DateInput selectedDate={selectedDate} months={months} />
    </div>
  );
}
