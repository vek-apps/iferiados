import Link from "next/link";

import { STATES } from "@/assets/locations";
import styles from "./page.module.css";
import LinkButton from "@/components/shared/link-button";
import Divider from "@/components/shared/divider";
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
  const stateList = STATES.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  return (
    <>
      <h1 className={styles.title}>
        Selecione um Estado para ver os feriados regionais
      </h1>
      <div className={styles.listContainer}>
        <div className={styles.listGrid}>
          {stateList.map((state) => (
            <Link
              key={state.code}
              href={`regionais/${state.code.toLowerCase()}`}
            >
              <LinkButton height="52px">
                <div className={styles.listItem}>
                  {state.code}
                  <Divider />
                  {state.name}
                </div>
              </LinkButton>
            </Link>
          ))}
        </div>
      </div>
    </>
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
