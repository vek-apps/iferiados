import styles from "./header-button.module.css";

function HeaderButton({ children }) {
  return <button className={styles.button}>{children}</button>;
}

export default HeaderButton;
