import { useState } from "react";
import { months } from "./calendar/month-data-";
import { DateInput } from "./date-input/date-input-";
import { Calendar } from "./calendar/calendar-";
import { getTodayPersianDate } from "../../utils/date-changer";
import type { SelectedDate } from "../../type/type";

export function CalendarContainer() {
  const today = new Date().getTime();
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(
    getTodayPersianDate(today)
  );

  return (
    <div className="calendar-wrapper">
      <Calendar date={selectedDate} changeDate={setSelectedDate} />
      <DateInput selectedDate={selectedDate} months={months} />
    </div>
  );
}
