import Link from "next/link";
import styles from "./footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const mainHolidays = [
    {
      label: `Carnaval ${nextYear}`,
      link: `/feriados/${nextYear}/detalhes/carnaval`,
    },
    {
      label: `Sexta-feira Santa ${nextYear}`,
      link: `/feriados/${nextYear}/detalhes/sexta-feira-santa`,
    },
    {
      label: `Páscoa ${nextYear}`,
      link: `/feriados/${nextYear}/detalhes/pascoa`,
    },
    {
      label: `Corpus Christi ${nextYear}`,
      link: `/feriados/${nextYear}/detalhes/corpus-christi`,
    },
  ];

  const mainLocations = [
    {
      label: "São Paulo - SP",
      link: `/feriados/${nextYear}/regionais/sp/sao-paulo`,
    },
    {
      label: "Rio de Janeiro - RJ",
      link: `/feriados/${nextYear}/regionais/rj/rio-de-janeiro`,
    },
    {
      label: "Fortaleza - CE",
      link: `/feriados/${nextYear}/regionais/ce/fortaleza`,
    },
    {
      label: "Salvador - BA",
      link: `/feriados/${nextYear}/regionais/ba/salvador`,
    },
    {
      label: "Belo Horizonte - MG",
      link: `/feriados/${nextYear}/regionais/mg/belo-horizonte`,
    },
    {
      label: "Curitiba - PR",
      link: `/feriados/${nextYear}/regionais/pr/curitiba`,
    },
    {
      label: "Porto Alegre - RS",
      link: `/feriados/${nextYear}/regionais/rs/porto-alegre`,
    },
    {
      label: "Goiânia - GO",
      link: `/feriados/${nextYear}/regionais/go/goiania`,
    },
    {
      label: "Recife - PE",
      link: `/feriados/${nextYear}/regionais/pe/recife`,
    },
    {
      label: "Belém - PA",
      link: `/feriados/${nextYear}/regionais/pa/belem`,
    },
    {
      label: "Manaus - AM",
      link: `/feriados/${nextYear}/regionais/am/manaus`,
    },
    {
      label: "Feriados estaduais e municipais",
      link: `/feriados/${nextYear}/regionais`,
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.linksList}>
        <div>
          <p>Feriados com data móvel:</p>
          <ul>
            {mainHolidays.map((item) => (
              <Link key={item.label} href={item.link}>
                <li className={styles.link}>{item.label}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <p>Feriados Regionais para:</p>
          <ul>
            {mainLocations.map((item) => (
              <Link key={item.label} href={item.link}>
                <li className={styles.link}>{item.label}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <p className={styles.copyrightText}>
        iFeriados © {new Date().getFullYear()} VK SOFTWARE LTDA.
      </p>
    </footer>
  );
}

export default Footer;
