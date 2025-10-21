export type Day = number | null;

export interface MonthProps {
  monthName: string;
  daysInMonth: { jalaliDate: string; timestamp: number }[];
  startDay: number;
  selectedDate: number | null;
  setSelectedDate: (day: number) => void;
  goNextMonth: () => void;
  goPrevMonth: () => void;
  currentMonth: number;
  currentYear: number;
}

export interface DayProps {
  day: { dayNumber: string; timestamp: number };
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
  date: number | null;
  changeDate: (date: number | null) => void | null;
}

export interface DateInputProps {
  selectedDate: number | null;
  months: { name: string }[];
}
export type PersianDate = { year: number; month: number; day: number };
// export type GregorianDate = { gy: number; gm: number; gd: number };
