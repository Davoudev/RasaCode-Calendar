import React from "react";
import type { DayProps } from "../../../Types/types";

export const Day: React.FC<DayProps> = ({ day, isSelected, onClick }) => {
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
