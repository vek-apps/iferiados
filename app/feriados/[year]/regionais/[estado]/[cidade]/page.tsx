import { STATES } from "@/assets/locations";
import CalendarHolidayList from "@/components/holidays/calendar-holiday-list";
import layout from "@/components/shared/calendar-layout.module.css";
import Link from "next/link";
import { MAX_YEAR, MIN_YEAR, getHolidaysByCity } from "@/services/holidayService";
import { Holiday } from "@/types/holiday.type";
import { makeStringPlain } from "@/utils/holiday-utils";
import styles from "./page.module.css";

export const revalidate = false;

// Generate and cache each municipality on its first request.
export function generateStaticParams() {
  return [];
}

type Params = {
  params: {
    estado: string;
    cidade: string;
    year: string;
  };
};

async function getCityHolidays(
  cityId: string,
  stateCode: string,
  yearValue: string
): Promise<Holiday[] | null> {
  const year = Number(yearValue);

  return getHolidaysByCity(cityId, stateCode, year, true);
}

async function LocalHolidays({ params }: Params) {
  const state = STATES.find(
    (state) => state.code === params.estado.toUpperCase()
  );

  if (!state) {
    return <div className={layout.page}><p className={layout.emptyMessage}>Sem informações</p></div>;
  }

  const city = state.cities.find((city) => {
    const cityPlainName = makeStringPlain(city.name);
    return cityPlainName === params.cidade;
  });

  if (!city) {
    return <div className={layout.page}><p className={layout.emptyMessage}>Sem informações</p></div>;
  }

  const { year } = params;

  const cityHolidays = await getCityHolidays(city.id, state.code, year);

  return (
    <div className={layout.page}>
      <Link className={styles.backLink} href={`/feriados/${year}/regionais/${state.code.toLowerCase()}`} prefetch={false}>
        <span aria-hidden="true">←</span> Cidades de {state.name}
      </Link>
      <h1 className={layout.title}>Feriados estaduais e municipais de {year} em {city.name} ({state.code})</h1>
      <CalendarHolidayList
        holidays={cityHolidays}
        emptyMessage="Nenhum feriado estadual ou municipal"
      />
      <nav className={styles.yearSwitcher} aria-label="Selecionar ano">
        {Number(year) > MIN_YEAR && (
          <Link href={`/feriados/${Number(year) - 1}/regionais/${params.estado}/${params.cidade}`} prefetch={false} aria-label={`Feriados de ${Number(year) - 1}`}>
            <span aria-hidden="true">←</span> {Number(year) - 1}
          </Link>
        )}
        <span className={styles.currentYear} aria-current="page">{year}</span>
        {Number(year) < MAX_YEAR && (
          <Link href={`/feriados/${Number(year) + 1}/regionais/${params.estado}/${params.cidade}`} prefetch={false} aria-label={`Feriados de ${Number(year) + 1}`}>
            {Number(year) + 1} <span aria-hidden="true">→</span>
          </Link>
        )}
      </nav>
    </div>
  );
}

export default LocalHolidays;

export async function generateMetadata({ params }) {
  const state = STATES.find(
    (state) => state.code === params.estado.toUpperCase()
  );

  const city = state?.cities.find((city) => {
    const cityPlainName = makeStringPlain(city.name);
    return cityPlainName === params.cidade;
  });

  return {
    title: `${city?.name}/${state?.code} - Feriados Municipais`,
    description: `${city?.name}/${state?.code}: Confira a lista completa de todos os feriados estaduais e municipais.`,
  };
}
