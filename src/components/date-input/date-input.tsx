import type { DateInputProps } from "../../../type/type";
import { getMonthDays } from "../../../utils/getMonthDay";

export function DateInput({ selectedDate }: DateInputProps) {
  let formattedPersianDate = "";

  // const { monthName, today } = getMonthDays(selectedDate!);

  // if (selectedDate != null) {
  //   formattedPersianDate = `امروز ${today.dayStr} ${monthName} ${today.yearStr} است`;
  // }

  return (
    <div className="date-output">
      <input readOnly value={formattedPersianDate} />
    </div>
  );
}
