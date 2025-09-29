import type { DayProps } from "../../../Types/types";

export const Day = ({ day, isSelected, onClick }: DayProps) => {
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
