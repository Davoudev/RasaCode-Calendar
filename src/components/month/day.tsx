import React from "react";
import type { DayProps } from "../../../type/type";

export const Day = React.memo(({ day, isSelected, onClick }: DayProps) => {
  if (!day) return <div className="empty"></div>;
  console.log("isSelected", isSelected);
  console.log("day", day);
  console.log("onClick", onClick);
  return (
    <div
      className={`day ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(day.timestamp)}
    >
      {day.dayNumber}
    </div>
  );
});
