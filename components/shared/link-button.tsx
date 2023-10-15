import styles from "./link-button.module.css";

function LinkButton({ children, height = "32px" }) {
  return (
    <button style={{ height }} className={styles.button}>
      {children}
    </button>
  );
}

export default LinkButton;
