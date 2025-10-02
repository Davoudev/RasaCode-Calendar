import type { DateInputProps } from "../../../type/type";
// import "./calendar.css";

export function DateInput({ selectedDate, months }: DateInputProps) {
  const formattedPersianDate =
    selectedDate != null
      ? `امروز ${selectedDate.day} ${months[selectedDate.monthIndex].name} ${
          selectedDate.year
        } است`
      : "";

  return (
    <div className="date-output">
      <input readOnly value={formattedPersianDate} />
    </div>
  );
}
