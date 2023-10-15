import styles from "./page.module.css";
import { Holiday } from "@/types/holiday.type";
import HolidayList from "@/components/holidays/holiday-list/holiday-list";
import Image from "next/image";
import calendar from "../assets/icons/calendar.svg";
import LinkButton from "@/components/shared/link-button";
import Link from "next/link";
import { makeStringPlain } from "@/utils/holiday-utils";

async function getHolidays(type: string): Promise<Holiday[]> {
  const res = await fetch(`${process.env.API_URL}/api/holidays?type=${type}`, {
    // next: { revalidate: 0 },
    next: { revalidate: 10800 }, // 3 hours
  });
  return res.json();
}

export default async function Home() {
  const holidays = await getHolidays("nacionais");

  const mobileHolidays = holidays.filter((h) => h.mobileDates);

  return (
    <>
      <h1 className={styles.title}>Próximos Feriados Nacionais:</h1>
      <HolidayList holidays={holidays} />
      <section className={styles.mobileHolidays}>
        <div className={styles.mobileHolidaysHeader}>
          <Image width={24} height={24} src={calendar} alt="Calendário" />
          <h2>Feriados com data móvel</h2>
        </div>
        <div className={styles.mobileHolidaysList}>
          {mobileHolidays.map((mobileHoliday) => (
            <Link
              key={mobileHoliday.name}
              href={`feriados/${
                mobileHoliday.fullYear
              }/detalhes/${makeStringPlain(mobileHoliday.name)}`}
            >
              <LinkButton height="42px">{mobileHoliday.name}</LinkButton>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export async function generateMetadata() {
  return {
    title: `iFeriados Brasil - Guia completo de feriados brasileiros`,
    description: `Confira facilmente todos os feriados nacionais, estaduais e municipais. Escolha seu estado e cidade para visualizar os feriados regionais.`,
  };
}
