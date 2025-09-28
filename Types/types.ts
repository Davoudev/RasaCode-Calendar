export type Day = number | null;

// Props for Calendar
export interface CalendarProps {
  monthName: string;
  daysInMonth: number;
  startDay?: number;
}

//  a prop for a day
export interface DayProps {
  day: Day;
  isSelected: boolean;
  onClick: (day: number) => void;
}

//  a prop for week days
export interface WeekDayProps {
  label: string;
}
