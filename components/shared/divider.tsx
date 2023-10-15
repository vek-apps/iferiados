import styles from "./divider.module.css";

type Props = {
  height?: string;
  margin?: string;
  customClassName?: string;
};

function Divider({
  height = "24px",
  margin = "16px",
  customClassName = "",
}: Props) {
  return (
    <div
      style={{ height, marginLeft: margin, marginRight: margin }}
      className={`${styles.divider} ${customClassName}`}
    ></div>
  );
}

export default Divider;
