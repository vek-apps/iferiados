import { MAX_YEAR, MIN_YEAR } from "@/services/holidayService";
import { Holiday } from "@/types/holiday.type";
import { getFullDate } from "@/utils/holiday-utils";
import styles from "./holiday-dates-table.module.css";

type Props = {
  title: string;
  holiday: Holiday;
};

function HolidayDatesTable({ title, holiday }: Props) {
  const dates = holiday.mobileDates ?? {};

  const data: { year: string; date: string }[] = [];

  const fixedMonth = holiday.date.getMonth();
  const fixedDay = holiday.date.getDate();

  for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
    let yearDate: Date;

    if (holiday.mobileDates) {
      const stringDate = dates[String(year)];
      const month = parseInt(stringDate.substring(0, 2)) - 1;
      const day = parseInt(stringDate.substring(3));
      yearDate = new Date(year, month, day);
    } else {
      yearDate = new Date(year, fixedMonth, fixedDay);
    }

    data.push({ year: String(year), date: getFullDate(yearDate) });
  }

  return (
    <section className={styles.section} aria-labelledby="holiday-dates-title">
      <h2 id="holiday-dates-title" className={styles.title}>{title}</h2>
      <div className={styles.tableContainer}>
      <table className={styles.table} aria-labelledby="holiday-dates-title">
        <thead>
          <tr>
            <th scope="col">Ano</th>
            <th scope="col">Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.year}>
                <td>{item.year}</td>
                <td>{item.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </section>
  );
}

export default HolidayDatesTable;
