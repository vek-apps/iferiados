import Link from "next/link";
import layout from "@/components/shared/calendar-layout.module.css";
import styles from "./page.module.css";
import { Holiday } from "@/types/holiday.type";
import {
  MAX_YEAR,
  MIN_YEAR,
  getHolidaysByYear,
} from "@/services/holidayService";
import CalendarHolidayList from "@/components/holidays/calendar-holiday-list";

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
    <div className={layout.page}>
      <h1 className={layout.title}>Feriados nacionais de {params.year}</h1>
      <CalendarHolidayList
        holidays={holidays}
        emptyMessage="Ainda não temos os feriados disponíveis para esse ano..."
      />
      <nav className={styles.yearSwitcher} aria-label="Selecionar ano">
        {Number(year) > MIN_YEAR && (
          <Link href={`/feriados/${Number(year) - 1}`} prefetch={false} aria-label={`Feriados de ${Number(year) - 1}`}>
            <span aria-hidden="true">←</span> {Number(year) - 1}
          </Link>
        )}
        <span className={styles.currentYear} aria-current="page">{year}</span>
        {Number(year) < MAX_YEAR && (
          <Link href={`/feriados/${Number(year) + 1}`} prefetch={false} aria-label={`Feriados de ${Number(year) + 1}`}>
            {Number(year) + 1} <span aria-hidden="true">→</span>
          </Link>
        )}
      </nav>
    </div>
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
