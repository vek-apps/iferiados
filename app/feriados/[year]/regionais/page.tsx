import Link from "next/link";

import { STATES } from "@/assets/locations";
import styles from "./page.module.css";
import layout from "@/components/shared/calendar-layout.module.css";
import { MAX_YEAR, MIN_YEAR } from "@/services/holidayService";

export const revalidate = 86400;

export function generateStaticParams() {
  const params: { year: string }[] = [];
  for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
    params.push({ year: String(year) });
  }
  return params;
}

async function StateList() {
  const stateList = [...STATES].sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  return (
    <div className={layout.page}>
      <h1 className={layout.title}>
        Selecione um estado para ver os feriados regionais
      </h1>
      <ul className={styles.listGrid}>
        {stateList.map((state) => (
          <li key={state.code}>
            <Link
              className={styles.stateLink}
              prefetch={false}
              href={`regionais/${state.code.toLowerCase()}`}
            >
              <span className={styles.stateCode} aria-hidden="true">{state.code}</span>
              <span className={styles.stateName}>{state.name}</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StateList;

export async function generateMetadata() {
  return {
    title: "Feriados Estaduais e Municipais",
    description:
      "Confira a lista completa de todos os feriados estaduais e municipais do Brasil.",
  };
}
