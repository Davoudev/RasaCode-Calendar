import type { WeekDayProps } from "../../../Types/types";

export const WeekDay = ({ label }: WeekDayProps) => {
  return <div className="day-name">{label}</div>;
};
