import styles from "@/components/shared/calendar-layout.module.css";
import CalendarHolidayList from "@/components/holidays/calendar-holiday-list";
import { Holiday } from "@/types/holiday.type";
import Image from "next/image";
import calendar from "../assets/icons/calendar.svg";
import Link from "next/link";
import { makeStringPlain } from "@/utils/holiday-utils";

async function getHolidays(type: string): Promise<Holiday[]> {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/holidays?type=${type}`,
      {
        // next: { revalidate: 0 },
        next: { revalidate: 10800 }, // 3 hours
      },
    );
    return res.json();
  } catch (error) {
    return Promise.resolve([]);
  }
}

export default async function Home() {
  const holidays = await getHolidays("nacionais");

  const mobileHolidays = holidays.filter((h) => h.mobileDates);

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <h1 className={styles.title}>Próximos feriados nacionais</h1>
      </div>
      <CalendarHolidayList holidays={holidays} highlightFirst />
      <section className={styles.mobileHolidays}>
        <div className={styles.mobileHolidaysHeader}>
          <Image width={20} height={20} src={calendar} alt="" />
          <h2>Feriados com data móvel</h2>
        </div>
        <div className={styles.mobileHolidaysList}>
          {mobileHolidays.map((mobileHoliday) => (
            <Link
              key={mobileHoliday.name}
              className={styles.mobileHolidayLink}
              prefetch={false}
              href={`/feriados/${
                mobileHoliday.fullYear
              }/detalhes/${makeStringPlain(mobileHoliday.name)}`}
            >
              {mobileHoliday.name}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "iFeriados Brasil - Guia completo de feriados brasileiros",
    description:
      "Confira facilmente todos os feriados nacionais, estaduais e municipais. Escolha seu estado e cidade para visualizar os feriados regionais.",
  };
}
