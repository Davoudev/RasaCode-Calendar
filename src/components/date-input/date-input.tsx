import type { DateInputProps } from "../../../type/type";
import { getTodayPersianDate } from "../../../utils/persian-date";

export function DateInput({ selectedDate, months }: DateInputProps) {
  let formattedPersianDate = "";

  if (selectedDate != null) {
    const { year, month, day } = getTodayPersianDate(selectedDate);
    formattedPersianDate = `امروز ${day} ${months[month].name} ${year} است`;
  }

  return (
    <div className="date-output">
      <input readOnly value={formattedPersianDate} />
    </div>
  );
}
