import { memo, useCallback } from "react";
import type { DayProps } from "../../../typex/type";

export const Day = memo(({ day, isSelected, setSelectedDate }: DayProps) => {
  if (!day) return <div className="empty"></div>;

  console.log("day", day);

  const onClick = useCallback(() => {
    day && setSelectedDate(day.timestamp);
  }, [day]);

  return (
    <div className={`day ${isSelected ? "selected" : ""}`} onClick={onClick}>
      {day.dayNumber}
    </div>
  );
});
