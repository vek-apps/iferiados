export type HolidayData = {
  name: string;
  info: string;
  type: string;
  date: string;
  mobileDates?: Record<string, string>;
  showDetails?: boolean;
};

export type Holiday = {
  name: string;
  info: string;
  type: string;
  date: Date;
  showDetails: boolean;
  mobileDates?: Record<string, string>;
  month?: string;
  dayOfMonth?: string;
  fullDate?: string;
  fullYear?: string;
  countDown?: string;
};

export type City = {
  id: string;
  name: string;
};
