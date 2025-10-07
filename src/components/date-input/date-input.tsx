import type { DateInputProps } from "../../../type/type";

export function DateInput({ selectedDate, months }: DateInputProps) {
  let formattedPersianDate = "";

  if (selectedDate != null) {
    const { year, month, day } = selectedDate;
    formattedPersianDate = `امروز ${day} ${months[month].name} ${year} است`;
  }

  return (
    <div className="date-output">
      <input readOnly value={formattedPersianDate} />
    </div>
  );
}
