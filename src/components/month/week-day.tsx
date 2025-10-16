import type { WeekDayProps } from "../../../Type/type";

export const WeekDay = ({ label }: WeekDayProps) => {
  return <div className="day-name">{label}</div>;
};
