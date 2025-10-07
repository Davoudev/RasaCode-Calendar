export type Day = number | null;

export interface MonthProps {
  monthName: string;
  daysInMonth: number;
  startDay: number;
  selectedDate: { day: Day; month: number; year: number } | null;
  setSelectedDate: (day: number) => void;
  goNextMonth: () => void;
  goPrevMonth: () => void;
  currentMonth: number;
  currentYear: number;
}

export interface DayProps {
  day: Day;
  isSelected: boolean;
  onClick: (day: number) => void;
}

export interface WeekDayProps {
  label: string;
}

export interface SelectedDate {
  day: Day;
  month: number;
  year: number;
}

export interface CalendarProps {
  date: SelectedDate | null;
  changeDate: (date: SelectedDate | null) => void;
}

export interface DateInputProps {
  selectedDate: SelectedDate | null;
  months: { name: string; daysInMonth: number; startDay: number }[];
}
