import Link from "next/link";
import styles from "./page.module.css";
import layout from "@/components/shared/calendar-layout.module.css";
import { Holiday } from "@/types/holiday.type";
import {
  MAX_YEAR,
  MIN_YEAR,
  getHolidayByName,
  getHolidayPlainNamesForDetail,
} from "@/services/holidayService";
import HolidayDatesTable from "@/components/holidays/holiday-dates-table/holiday-dates-table";

export async function generateStaticParams() {
  const possibleYears: string[] = [];
  for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
    possibleYears.push(String(year));
  }

  const params: { name: string; year: string }[] = [];

  const holidayNames = getHolidayPlainNamesForDetail();

  holidayNames.forEach((name) => {
    possibleYears.forEach((year) => {
      params.push({ name, year });
    });
  });

  return params;
}

async function getHoliday(
  name: string,
  yearValue: string
): Promise<Holiday | null> {
  const year = Number(yearValue);
  return getHolidayByName(name, year);
}

type Params = {
  params: {
    year: string;
    name: string;
  };
};

async function HolidayDetails({ params }: Params) {
  const holiday = await getHoliday(params.name, params.year);

  if (!holiday) {
    return <div className={layout.page}><p className={layout.emptyMessage}>Sem informações</p></div>;
  }

  return (
    <div className={layout.page}>
      <Link className={styles.backLink} href={`/feriados/${params.year}`} prefetch={false}>
        <span aria-hidden="true">←</span> Feriados de {params.year}
      </Link>
      <article className={styles.details}>
        <header className={styles.header}>
          <div className={styles.calendar} aria-hidden="true">
            <span className={layout.calendarMonth}>{holiday.month}</span>
            <span className={styles.calendarDay}>{holiday.dayOfMonth}</span>
          </div>
          <div className={styles.headerInfo}>
            <h1 className={layout.title}>{holiday.name}</h1>
            <p className={styles.date}>{holiday.fullDate}</p>
            <span className={`${layout.typeTag} ${holiday.type === "Data Comemorativa" ? layout.commemorative : ""}`}>
              {holiday.type}
            </span>
          </div>
        </header>
        {holiday.info && <p className={styles.infoText}>{holiday.info}</p>}
      </article>
      <HolidayDatesTable
        title="Datas do feriado em outros anos"
        holiday={holiday}
      />
    </div>
  );
}

export default HolidayDetails;

export async function generateMetadata({ params }) {
  const holiday = await getHoliday(params.name, params.year);

  return {
    title: `${holiday?.name} ${params.year} - Feriados`,
    description: `${holiday?.name}: Confira a data do feriado esse ano e nos próximos anos.`,
  };
}
