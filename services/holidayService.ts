import { HolidayData } from "@/types/holiday.type";
import {
  createHoliday,
  getDayOfMonth,
  getFullDate,
  getMonth,
  makeStringPlain,
  sortHolidays,
} from "@/utils/holiday-utils";
import countryHolidays from "../assets/holidays/country.json";
import stateHolidays from "../assets/holidays/states.json";
import citiesHolidays from "../assets/holidays/cities.json";

export const MIN_YEAR = 2023;
export const MAX_YEAR = 2028;

function isValidYear(year: number) {
  return year >= MIN_YEAR && year <= MAX_YEAR;
}

export function getHolidaysByYear(year: number) {
  if (!isValidYear(year)) return null;

  const holidaysData: HolidayData[] = countryHolidays.data;
  return prepareHolidays(holidaysData, year);
}

export function getHolidaysByState(stateCode: string, year: number) {
  if (!isValidYear(year)) return null;

  const holidaysData = stateHolidays[stateCode];
  return prepareHolidays(holidaysData, year);
}

export function getHolidaysByCity(
  cityId: string,
  stateCode: string,
  year: number,
  includeStateHolidays = false
) {
  if (!isValidYear(year)) return null;

  const holidaysData = [...(citiesHolidays[stateCode][cityId] ?? [])];

  if (includeStateHolidays) {
    const state = stateHolidays[stateCode];

    if (state) {
      state.forEach((h) => {
        holidaysData.push(h);
      });
    }
  }

  return holidaysData ? prepareHolidays(holidaysData, year) : [];
}

export function getHolidayByName(plainName: string, year: number) {
  if (!isValidYear(year)) return null;

  const holidayData = countryHolidays.data.find((holiday) => {
    return makeStringPlain(holiday.name) === plainName;
  });

  if (!holidayData) {
    return null;
  }

  const [holiday] = prepareHolidays([holidayData], year);
  return holiday;
}

export function getHolidayPlainNamesForDetail() {
  const holidays = countryHolidays.data.filter((data) => data.showDetails);
  return holidays.map((holiday) => makeStringPlain(holiday.name));
}

function prepareHolidays(holidaysData: HolidayData[], year: number) {
  const holidays = holidaysData.map((data) => {
    const holiday = createHoliday(data, year);
    holiday.month = getMonth(holiday.date);
    holiday.dayOfMonth = getDayOfMonth(holiday.date);
    holiday.fullYear = String(holiday.date.getFullYear());
    holiday.fullDate = getFullDate(holiday.date);
    return holiday;
  });

  sortHolidays(holidays);
  return holidays;
}
