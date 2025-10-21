import type { DayProps } from "../../../type/type";

export const Day = ({ day, isSelected, onClick }: DayProps) => {
  if (!day) {
    return <div className="empty"></div>;
  }
  console.log("isSelected", isSelected);
  return (
    <div
      className={`day ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(day.timestamp)}
    >
      {day.dayNumber}
    </div>
  );
};
