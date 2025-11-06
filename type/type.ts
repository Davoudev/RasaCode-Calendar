export interface MonthProps {
  daysInMonth: {
    daysArray: { jalaliDate: string; timestamp: number }[];
    monthName: string;
    today: { yearStr: number; monthStr: number; dayStr: number };
  };
  setDaysInMonth: (days: any) => void;
  selectedDate: number | null;
  setSelectedDate: (day: number) => void;
  goNextMonth: () => void;
  goPrevMonth: () => void;
}

export interface DayProps {
  day: { dayNumber: string; timestamp: number };
  isSelected: boolean;
  setSelectedDate: Function;
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
  onClick?: () => void;
}
export type PersianDate = { year: number; month: number; day: number };

export interface PopoverYearInputProps {
  currentYear: number;
  onSubmit: (year: number) => void;
}
