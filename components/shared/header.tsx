import Link from "next/link";
import styles from "./header.module.css";
import HeaderButton from "./header-button";
import Divider from "./divider";

function Header() {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const menuItems = [
    {
      title: "Próximos Feriados",
      path: `/`,
    },
    {
      title: `Feriados ${currentYear}`,
      path: `/feriados/${currentYear}`,
    },
    {
      title: `Feriados ${nextYear}`,
      path: `/feriados/${nextYear}`,
    },
  ];
  const menuItems2 = [
    {
      title: "Feriados Estaduais e Municipais",
      path: `/feriados/${currentYear}/regionais`,
    },
  ];

  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <span className={styles.appTitle}>iFeriados</span>
      </Link>

      <nav className={styles.nav}>
        <ul>
          {menuItems.map((item) => {
            return (
              <li key={item.title}>
                <Link href={item.path}>
                  <HeaderButton>{item.title}</HeaderButton>
                </Link>
              </li>
            );
          })}
          <Divider
            customClassName={styles.divider}
            height="32px"
            margin="8px"
          />
          {menuItems2.map((item) => {
            return (
              <li key={item.title} className={styles.secondaryMenuItem}>
                <Link href={item.path}>
                  <HeaderButton>{item.title}</HeaderButton>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
