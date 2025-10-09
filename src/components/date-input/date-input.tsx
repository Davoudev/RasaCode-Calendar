import type { DateInputProps } from "../../../type/type";
import { getTodayPersianDate } from "../../../utils/date-changer";

export function DateInput({ selectedDate, months }: DateInputProps) {
  let formattedPersianDate = "";
  const todayPersianDate = getTodayPersianDate(selectedDate!);

  if (selectedDate != null) {
    formattedPersianDate = `امروز ${todayPersianDate.day} ${
      months[todayPersianDate.month].name
    } ${todayPersianDate.year} است`;
  }

  return (
    <div className="date-output">
      <input readOnly value={formattedPersianDate} />
    </div>
  );
}
