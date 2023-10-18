import { STATES } from "@/assets/locations";
import HolidayList from "@/components/holidays/holiday-list/holiday-list";
import BackLinkButton from "@/components/shared/back-link-button";
import YearSwitcher from "@/components/shared/year-switcher";
import {
  MAX_YEAR,
  MIN_YEAR,
  getHolidaysByCity,
} from "@/services/holidayService";
import { Holiday } from "@/types/holiday.type";
import { makeStringPlain } from "@/utils/holiday-utils";
import styles from "./page.module.css";
import Divider from "@/components/shared/divider";

// export async function generateStaticParams() {
//   const possibleYears: string[] = [];
//   for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
//     possibleYears.push(String(year));
//   }

//   const params: { estado: string; cidade: string; year: string }[] = [];

//   STATES.forEach((state) => {
//     const stateCode = state.code.toLowerCase();

//     state.cities.forEach((city) => {
//       const cityParam = makeStringPlain(city.name);
//       possibleYears.forEach((year) => {
//         params.push({ year, estado: stateCode, cidade: cityParam });
//       });
//     });
//   });

//   return params;
// }

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
    return <div>Sem informações</div>;
  }

  const city = state.cities.find((city) => {
    const cityPlainName = makeStringPlain(city.name);
    return cityPlainName === params.cidade;
  });

  if (!city) {
    return <div>Sem informações</div>;
  }

  const { year } = params;

  const cityHolidays = await getCityHolidays(city.id, state.code, year);

  return (
    <div>
      <BackLinkButton
        label="Voltar para a lista de Municípios"
        href={`/feriados/${year}/regionais/${state.code}`}
      />
      <h1 className={styles.title}>
        {city.name}
        <Divider margin="10px" />
        {state.code}
      </h1>
      <HolidayList
        holidays={cityHolidays}
        title={`Feriados Estaduais e Municipais de ${year}`}
        emptyMessage="Nenhum feriado municipal"
      />

      <YearSwitcher
        currentYear={year}
        url={`/feriados/year/regionais/${params.estado}/${params.cidade}`}
      />
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
