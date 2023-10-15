import HolidayCard from "@/components/holidays/holiday-card/holiday-card";
import styles from "./page.module.css";
import { Holiday } from "@/types/holiday.type";
import {
  MAX_YEAR,
  MIN_YEAR,
  getHolidaysByYear,
} from "@/services/holidayService";
import HolidayList from "@/components/holidays/holiday-list/holiday-list";
import YearSwitcher from "@/components/shared/year-switcher";

export async function generateStaticParams() {
  const possibleYears: string[] = [];
  for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
    possibleYears.push(String(year));
  }

  const params: { year: string }[] = [];

  possibleYears.forEach((year) => {
    params.push({ year });
  });

  return params;
}

async function getHolidays(yearValue: string): Promise<Holiday[] | null> {
  const year = Number(yearValue);
  return getHolidaysByYear(year);
}

type Params = {
  params: {
    year: string;
  };
};

async function Holidays({ params }: Params) {
  const { year } = params;
  const holidays = await getHolidays(year);

  return (
    <>
      <h1 className={styles.title}>Feriados Nacionais de {params.year}</h1>
      <HolidayList
        holidays={holidays}
        emptyMessage="Ainda não temos os feriados disponíveis para esse ano..."
      />
      <YearSwitcher currentYear={year} url="/feriados/year" />
    </>
  );
}

export default Holidays;

export async function generateMetadata({ params }) {
  const { year } = params;
  return {
    title: `Feriados de ${year}`,
    description: `Confira a lista completa de todos os feriados nacionais, estaduais e municipais de ${year}.`,
  };
}
