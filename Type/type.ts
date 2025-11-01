export interface MonthProps {
  daysInMonth: {
    daysArray: { jalaliDate: string; timestamp: number }[];
    monthName: string;
    // today: { yearStr: number; monthStr: number; dayStr: number };
  };
  selectedDate: number | null;
  setSelectedDate: (day: number) => void;
  goNextMonth: () => void;
  goPrevMonth: () => void;
}

export interface DayProps {
  day: { dayNumber: string; timestamp: number };
  isSelected: boolean;
  // onClick: (day: number) => void;
  setSelectedDate: any;
}

export interface WeekDayProps {
  label: string;
}

export interface SelectedDate {
  day: number | null;
  month: number;
  year: number;
}

export interface CalendarProps {
  date: number | null;
  changeDate: (date: number | null) => void | null;
}

export interface DateInputProps {
  selectedDate: number | null;
}
export type PersianDate = { year: number; month: number; day: number };
