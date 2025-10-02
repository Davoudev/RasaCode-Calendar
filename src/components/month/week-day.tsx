import type { WeekDayProps } from "../../../type/type";

export const WeekDay = ({ label }: WeekDayProps) => {
  return <div className="day-name">{label}</div>;
};
