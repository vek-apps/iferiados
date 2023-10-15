import { getTypeClassName } from "@/utils/holiday-utils";
import styles from "./holiday-type-tag.module.css";
import { Holiday } from "@/types/holiday.type";

type Props = {
  holiday: Holiday;
};

function HolidayTypeTag({ holiday }: Props) {
  return (
    <div>
      <div className={`${styles.typeTag} ${styles[getTypeClassName(holiday)]}`}>
        {holiday.type.toUpperCase()}
      </div>
    </div>
  );
}

export default HolidayTypeTag;
