import styles from "./page.module.css";
import { Holiday } from "@/types/holiday.type";
import {
  MAX_YEAR,
  MIN_YEAR,
  getHolidayByName,
  getHolidayPlainNamesForDetail,
} from "@/services/holidayService";
import HolidayTypeTag from "@/components/holidays/holiday-type-tag/holiday-type-tag";
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
    return <div>Sem informações</div>;
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.calendarView}>
          <div className={styles.calendar}>
            <div className={styles.calendarHead}>{holiday.month}</div>
            <div className={styles.calendarBody}>{holiday.dayOfMonth}</div>
          </div>
        </div>
        <div className={styles.headerInfo}>
          <h1 className={styles.title}> {holiday.name}</h1>
          <HolidayTypeTag holiday={holiday} />
          <div>{holiday.fullDate}</div>
        </div>
      </div>
      <p className={styles.infoText}>{holiday.info}</p>
      <HolidayDatesTable
        title="Datas do feriado em outros anos"
        holiday={holiday}
      />
    </>
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
