import Link from "next/link";
import { Holiday } from "@/types/holiday.type";
import styles from "./holiday-card.module.css";
import HolidayTypeTag from "../holiday-type-tag/holiday-type-tag";
import { makeStringPlain } from "@/utils/holiday-utils";

type Props = {
  holiday: Holiday;
  showCountdown?: boolean;
};

function HolidayCard({ holiday, showCountdown = false }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.calendarView}>
        <div className={styles.calendar}>
          <div className={styles.calendarHead}>{holiday.month}</div>
          <div className={styles.calendarBody}>{holiday.dayOfMonth}</div>
        </div>
        {showCountdown && (
          <div className={styles.countdown}>
            <span>{holiday.countDown}</span>
          </div>
        )}
      </div>
      <div className={styles.infoContainer}>
        {holiday.showDetails ? (
          <div className={styles.titleLink}>
            <Link
              href={`/feriados/${holiday.fullYear}/detalhes/${makeStringPlain(
                holiday.name
              )}`}
            >
              {holiday.name}
            </Link>
          </div>
        ) : (
          <div className={styles.title}>{holiday.name}</div>
        )}

        <HolidayTypeTag holiday={holiday} />
        <div>{holiday.fullDate}</div>
      </div>
    </div>
  );
}

export default HolidayCard;
