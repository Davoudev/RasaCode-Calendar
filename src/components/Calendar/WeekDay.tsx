import React from "react";
import type { WeekDayProps } from "../../../Types/types";

export const WeekDay: React.FC<WeekDayProps> = ({ label }) => {
  return <div className="day-name">{label}</div>;
};
