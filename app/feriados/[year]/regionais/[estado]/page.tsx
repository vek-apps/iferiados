import { STATES } from "@/assets/locations";
import {
  MAX_YEAR,
  MIN_YEAR,
  getHolidaysByState,
} from "@/services/holidayService";
import { Holiday } from "@/types/holiday.type";
import styles from "./page.module.css";
import layout from "@/components/shared/calendar-layout.module.css";
import CalendarHolidayList from "@/components/holidays/calendar-holiday-list";
import Link from "next/link";
import { groupCitiesByInitial, makeStringPlain } from "@/utils/holiday-utils";

export async function generateStaticParams() {
  const possibleYears: string[] = [];
  for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
    possibleYears.push(String(year));
  }

  const possibleStateCodes = STATES.map((state) => state.code.toLowerCase());

  const params: { estado: string; year: string }[] = [];

  possibleStateCodes.forEach((stateCode) => {
    possibleYears.forEach((year) => {
      params.push({ year, estado: stateCode });
    });
  });

  return params;
}

async function getHolidays(
  stateCode: string,
  yearValue: string
): Promise<Holiday[] | null> {
  const year = Number(yearValue);

  return getHolidaysByState(stateCode, year);
}

type Params = {
  params: {
    estado: string;
    year: string;
  };
};

async function StateHolidays({ params }: Params) {
  const state = STATES.find(
    (state) => state.code === params.estado.toUpperCase()
  );

  if (!state) {
    return <div>Sem informações</div>;
  }

  const { year } = params;

  const holidays = await getHolidays(state.code, year);

  const citiesByInitial = groupCitiesByInitial(state.cities);

  return (
    <div className={layout.page}>
      <Link className={styles.backLink} href={`/feriados/${year}/regionais`} prefetch={false}>
        <span aria-hidden="true">←</span> Lista de estados
      </Link>
      <h1 className={layout.title}>Feriados estaduais de {year} em {state.name}</h1>
      <CalendarHolidayList holidays={holidays} emptyMessage="Nenhum feriado estadual" />
      <nav className={styles.yearSwitcher} aria-label="Selecionar ano">
        {Number(year) > MIN_YEAR && (
          <Link href={`/feriados/${Number(year) - 1}/regionais/${params.estado}`} prefetch={false} aria-label={`Feriados de ${Number(year) - 1}`}>
            <span aria-hidden="true">←</span> {Number(year) - 1}
          </Link>
        )}
        <span className={styles.currentYear} aria-current="page">{year}</span>
        {Number(year) < MAX_YEAR && (
          <Link href={`/feriados/${Number(year) + 1}/regionais/${params.estado}`} prefetch={false} aria-label={`Feriados de ${Number(year) + 1}`}>
            {Number(year) + 1} <span aria-hidden="true">→</span>
          </Link>
        )}
      </nav>
      <section className={styles.citiesSection} aria-labelledby="cities-title">
        <h2 className={styles.subTitle} id="cities-title">Escolha uma cidade para ver os feriados municipais</h2>
        {citiesByInitial.length > 2 && (
          <nav className={styles.citiesIndex} aria-label="Cidades por letra inicial">
            {citiesByInitial.map((data) => (
              <a key={data.initial} href={`#${data.initial}`} aria-label={`Cidades com a letra ${data.initial}`}>
                {data.initial}
              </a>
            ))}
          </nav>
        )}
        {citiesByInitial.map((data) => (
          <section key={data.initial}>
            <h3 className={styles.cityInitial} id={data.initial}>{data.initial}</h3>
            <ul className={styles.cityList}>
              {data.cities.map((city) => (
                <li key={city.id}>
                  <Link className={styles.cityLink} prefetch={false} href={`${state.code.toLowerCase()}/${makeStringPlain(city.name)}`}>
                    <span>{city.name}</span><span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>
    </div>
  );
}

export default StateHolidays;

export async function generateMetadata({ params }) {
  const state = STATES.find(
    (state) => state.code === params.estado.toUpperCase()
  );

  return {
    title: `${state?.name} - Feriados Estaduais`,
    description: `${state?.name}: Confira a lista completa de todos os feriados estaduais.`,
  };
}
