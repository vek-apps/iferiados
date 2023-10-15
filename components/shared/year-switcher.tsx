import Link from "next/link";
import styles from "./year-switcher.module.css";
import Image from "next/image";
import leftArrow from "../../assets/icons/left-arrow.svg";
import rightArrow from "../../assets/icons/right-arrow.svg";
import LinkButton from "./link-button";
import { MAX_YEAR, MIN_YEAR } from "@/services/holidayService";

type Props = {
  currentYear: string | number;
  url: string;
};

function YearSwitcher({ currentYear, url }: Props) {
  const year = Number(currentYear);

  return (
    <div className={styles.container}>
      {year - 1 >= MIN_YEAR && (
        <Link href={url.replace("year", String(year - 1))}>
          <LinkButton>
            <div className={styles.link}>
              <Image src={leftArrow} alt="Ano anterior" />
              {year - 1}
            </div>
          </LinkButton>
        </Link>
      )}

      <div className={styles.currentYear}>{currentYear}</div>

      {year + 1 <= MAX_YEAR && (
        <Link href={url.replace("year", String(year + 1))}>
          <LinkButton>
            <div className={styles.link}>
              {year + 1}
              <Image src={rightArrow} alt="Ano seguinte" />
            </div>
          </LinkButton>
        </Link>
      )}
    </div>
  );
}

export default YearSwitcher;
