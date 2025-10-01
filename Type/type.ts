export type Day = number | null;

// Props for Calendar
export interface MonthProps {
  monthName: string;
  daysInMonth: number;
  startDay: number;
  selectedDate: { day: Day; monthIndex: number; year: number } | null;
  setSelectedDate: (day: number) => void;
  goNextMonth: () => void;
  goPrevMonth: () => void;
  currentMonthIndex: number;
  currentYear: number;
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
export interface SelectedDate {
  day: Day;
  monthIndex: number;
  year: number;
}

export interface CalendarProps {
  months: { name: string; daysInMonth: number; startDay: number }[];
  onDateSelect: (
    date: { day: Day; monthIndex: number; year: number } | null
  ) => void;
  selectedDate: SelectedDate | null;
}
export interface DateInputProps {
  selectedDate: { day: Day; monthIndex: number; year: number } | null;
  months: { name: string; daysInMonth: number; startDay: number }[];
}
