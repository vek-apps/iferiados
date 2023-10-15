import { STATES } from "@/assets/locations";
import {
  MAX_YEAR,
  MIN_YEAR,
  getHolidaysByState,
} from "@/services/holidayService";
import { Holiday } from "@/types/holiday.type";
import styles from "./page.module.css";
import Divider from "@/components/shared/divider";
import Link from "next/link";
import { groupCitiesByInitial, makeStringPlain } from "@/utils/holiday-utils";
import HolidayList from "@/components/holidays/holiday-list/holiday-list";
import BackLinkButton from "@/components/shared/back-link-button";
import LinkButton from "@/components/shared/link-button";
import YearSwitcher from "@/components/shared/year-switcher";

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
    <div>
      <BackLinkButton
        label="Voltar para a lista de Estados"
        href={`/feriados/${year}/regionais`}
      />
      <h1 className={styles.title}>
        {state.code}
        <Divider margin="10px" />
        {state.name}
      </h1>
      <HolidayList
        holidays={holidays}
        title={`Feriados Estaduais de ${year}`}
        emptyMessage="Nenhum feriado estadual"
      />

      <YearSwitcher
        currentYear={year}
        url={`/feriados/year/regionais/${params.estado}`}
      />

      <div className={styles.citiesSection}>
        <h2 className={styles.subTitle}>
          Escolha uma cidade para ver os Feriados Municipais
        </h2>

        {citiesByInitial.length > 2 ? (
          <div className={styles.citiesIndex}>
            {citiesByInitial.map((data) => (
              <a key={data.initial} href={`#${data.initial}`}>
                <LinkButton>{data.initial}</LinkButton>
              </a>
            ))}
          </div>
        ) : null}

        {citiesByInitial.map((data) => {
          return (
            <div key={data.initial}>
              <div className={styles.cityInitial} id={data.initial}>
                {data.initial}
              </div>
              <div className={styles.cityList}>
                {data.cities.map((city) => {
                  const cityLink = makeStringPlain(city.name);
                  return (
                    <Link
                      key={city.id}
                      href={`${state.code.toLowerCase()}/${cityLink}`}
                    >
                      <LinkButton height="42px">
                        <div className={styles.cityItem}>{city.name}</div>
                      </LinkButton>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
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
