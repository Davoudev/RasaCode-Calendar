import type { DayProps } from "../../../type/type";

export const Day = ({ day, isSelected, onClick }: DayProps) => {
  // console.log("day : ", day);
  if (!day) {
    return <div className="empty"></div>;
  }

  return (
    <div
      className={`day ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(day)}
    >
      {day}
    </div>
  );
};
