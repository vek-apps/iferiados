import { HolidayData } from "@/types/holiday.type";
import { NextApiRequest, NextApiResponse } from "next";

import countryHolidays from "../../assets/holidays/country.json";
import {
  createHoliday,
  getCountdown,
  getDayOfMonth,
  getFullDate,
  getMonth,
  sortHolidays,
} from "@/utils/holiday-utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return;
  }

  if (req.query.type === "nacionais") {
    const holidaysData: HolidayData[] = countryHolidays.data;

    const holidays = holidaysData.map((data) => {
      const holiday = createHoliday(data);
      holiday.month = getMonth(holiday.date);
      holiday.dayOfMonth = getDayOfMonth(holiday.date);
      holiday.fullDate = getFullDate(holiday.date);
      holiday.fullYear = String(holiday.date.getFullYear());
      holiday.countDown = getCountdown(holiday.date);
      return holiday;
    });

    sortHolidays(holidays);

    res.status(200).json(holidays);
    return;
  }

  res.status(200).json({ message: "GET request handled" });
}
