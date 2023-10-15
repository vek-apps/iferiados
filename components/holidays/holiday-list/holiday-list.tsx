import { Holiday } from "@/types/holiday.type";
import styles from "./holiday-list.module.css";
import HolidayCard from "../holiday-card/holiday-card";
import BannerMessage from "@/components/shared/banner-message";
import { groupHolidaysByMonth } from "@/utils/holiday-utils";

type Props = {
  holidays: Holiday[] | null;
  title?: string;
  groupedByMonth?: boolean;
  emptyMessage?: string;
};

function HolidayList({
  holidays,
  title,
  groupedByMonth = true,
  emptyMessage = "Nenhum feriado",
}: Props) {
  const hasHolidays = holidays && holidays.length > 0;

  return (
    <div>
      {title && <h1 className={styles.listTitle}>{title}</h1>}
      {hasHolidays ? (
        groupedByMonth ? (
          groupHolidaysByMonth(holidays).map((data) => (
            <CardList
              key={data.monthAndYear}
              title={data.monthAndYear}
              holidays={data.holidays}
            />
          ))
        ) : (
          <CardList holidays={holidays} />
        )
      ) : (
        <div className={styles.emptyMessageContainer}>
          <BannerMessage message={emptyMessage} />
        </div>
      )}
    </div>
  );
}

function CardList({
  title,
  holidays,
}: {
  title?: string;
  holidays: Holiday[];
}) {
  return (
    <div className={styles.listContainer}>
      {title && <p className={styles.title}>{title}</p>}
      {holidays.map((holiday) => (
        <div key={holiday.name}>
          <HolidayCard holiday={holiday} />
        </div>
      ))}
    </div>
  );
}

export default HolidayList;
