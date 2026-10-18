import Link from "next/link";
import { Holiday } from "@/types/holiday.type";
import { groupHolidaysByMonth, makeStringPlain } from "@/utils/holiday-utils";
import styles from "@/components/shared/calendar-layout.module.css";

type Props = {
  holidays: Holiday[] | null;
  highlightFirst?: boolean;
  emptyMessage?: string;
};

export default function CalendarHolidayList({
  holidays,
  highlightFirst = false,
  emptyMessage = "Nenhum feriado disponível.",
}: Props) {
  return <>{holidays && holidays.length > 0 ? (
        groupHolidaysByMonth(holidays).map((group, groupIndex) => (
          <section className={styles.monthGroup} key={group.monthAndYear}>
            <h2 className={styles.monthTitle}>
              {group.monthAndYear.split(", ")[0]}
              <span>{group.holidays[0].fullYear}</span>
            </h2>
            <ul className={styles.holidayList}>
              {group.holidays.map((holiday, index) => (
                <li key={`${holiday.name}-${holiday.type}-${holiday.fullDate}`}>
                  <article
                    className={`${styles.holidayCard} ${highlightFirst && groupIndex === 0 && index === 0 ? styles.nextHoliday : ""}`}
                  >
                    <div className={styles.calendar} aria-hidden="true">
                      <span className={styles.calendarMonth}>
                        {holiday.month}
                      </span>
                      <span className={styles.calendarDay}>
                        {holiday.dayOfMonth}
                      </span>
                    </div>
                    <div className={styles.holidayInfo}>
                      <h3>
                        {holiday.showDetails ? (
                          <Link
                            href={`/feriados/${holiday.fullYear}/detalhes/${makeStringPlain(holiday.name)}`}
                          >
                            {holiday.name}
                          </Link>
                        ) : (
                          holiday.name
                        )}
                      </h3>
                      <p>{holiday.fullDate}</p>
                    </div>
                    <span
                      className={`${styles.typeTag} ${holiday.type === "Data Comemorativa" ? styles.commemorative : ""}`}
                    >
                      {holiday.type}
                    </span>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        ))
      ) : (
        <p className={styles.emptyMessage}>{emptyMessage}</p>
      )}</>;
}
