import { City, Holiday, HolidayData } from "@/types/holiday.type";

export function sortHolidays(holidays: Holiday[]) {
  holidays.sort(
    (a: Holiday, b: Holiday) => a.date.getTime() - b.date.getTime()
  );
}

export function createHoliday(
  data: HolidayData,
  specificYear: number | null = null
) {
  const date = specificYear
    ? initDateWithSpecificYear(data, specificYear)
    : initDate(data);

  const holiday: Holiday = {
    name: data.name,
    info: data.info,
    type: data.type,
    date,
    showDetails: Boolean(data.showDetails),
    mobileDates: data.mobileDates,
  };

  return holiday;
}

function initDate(data: HolidayData) {
  let today = new Date();

  let stringDate: string;

  if (data.mobileDates) {
    const currentYear = new Date().getFullYear();
    stringDate = data.mobileDates[currentYear];
  } else {
    stringDate = data.date;
  }

  const currentYear = today.getFullYear();
  const month = parseInt(stringDate.substring(0, 2)) - 1;
  const day = parseInt(stringDate.substring(3));

  let date = new Date(currentYear, month, day);

  if (date < today) {
    date = new Date(currentYear + 1, month, day);
  }

  return date;
}

function initDateWithSpecificYear(data: HolidayData, year: number) {
  let stringDate: string;

  if (data.mobileDates) {
    stringDate = data.mobileDates[year];
  } else {
    stringDate = data.date;
  }

  const month = parseInt(stringDate.substring(0, 2)) - 1;
  const day = parseInt(stringDate.substring(3));

  const date = new Date(year, month, day);

  return date;
}

export function getCountdown(date: Date) {
  const today = new Date();

  if (
    today.getDate() == date.getDate() &&
    today.getMonth() == date.getMonth() &&
    today.getFullYear() == date.getFullYear()
  ) {
    return "É hoje!";
  }

  var diff = Math.ceil((date.getTime() - today.getTime()) / 86400000);

  if (diff == 1) {
    return "Falta 1 dia!";
  } else {
    return "Faltam " + diff + " dias!";
  }
}

function formatDate(date: Date, options: Intl.DateTimeFormatOptions) {
  return date.toLocaleDateString("pt-BR", options);
}

export function getFullDate(date: Date) {
  return formatDate(date, {
    year: "numeric",
    month: "long",
    day: "2-digit",
    weekday: "long",
  });
}

export function getDayOfMonth(date: Date) {
  return formatDate(date, { day: "2-digit" });
}

export function getMonth(date: Date) {
  return formatDate(date, { month: "long" });
}

export function getTypeClassName(holiday: Holiday) {
  let type = holiday.type;
  if (type.indexOf("(") !== -1) {
    type = type.split("(")[0].trim();
  }
  return type.replace(/ /g, "-").toLowerCase();
}

export function makeStringPlain(text: string) {
  return text
    .replace(/\s+/g, "-")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function groupCitiesByInitial(
  cities: Array<City>
): Array<{ initial: string; cities: City[] }> {
  const groupedCities = {};

  cities.forEach((item) => {
    const initial = item.name[0]
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (!groupedCities[initial]) {
      groupedCities[initial] = [];
    }

    groupedCities[initial].push(item);
  });

  const resultArray = Object.keys(groupedCities).map((initial) => ({
    initial,
    cities: groupedCities[initial],
  }));

  return resultArray;
}

export function groupHolidaysByMonth(
  holidays: Holiday[]
): Array<{ monthAndYear: string; holidays: Holiday[] }> {
  const groupedHolidays = {};

  holidays.forEach((holiday) => {
    const month = holiday.month!;
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    const monthAndYear = `${capitalizedMonth}, ${new Date(
      holiday.date
    ).getFullYear()}`;

    if (!groupedHolidays[monthAndYear]) {
      groupedHolidays[monthAndYear] = [];
    }

    groupedHolidays[monthAndYear].push(holiday);
  });

  const resultArray = Object.keys(groupedHolidays).map((monthAndYear) => ({
    monthAndYear,
    holidays: groupedHolidays[monthAndYear],
  }));

  return resultArray;
}
