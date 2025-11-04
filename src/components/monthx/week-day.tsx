import type { WeekDayProps } from "../../../typex/type";

export const WeekDay = ({ label }: WeekDayProps) => {
  return <div className="day-name">{label}</div>;
};
