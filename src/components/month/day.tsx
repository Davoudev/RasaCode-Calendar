import { memo, useCallback } from "react";
import type { DayProps } from "../../../type/type";

export const Day = memo(({ day, isSelected, setSelectedDate }: DayProps) => {
  if (!day) return <div className="empty"></div>;
  // console.log("isSelected", isSelected);
  console.log("day", day);
  // console.log("onClick", onClick);
  const onClick = useCallback(() => {
    day && setSelectedDate(day.timestamp);
  }, []);

  return (
    <div className={`day ${isSelected ? "selected" : ""}`} onClick={onClick}>
      {day.dayNumber}
    </div>
  );
});
