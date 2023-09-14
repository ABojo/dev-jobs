import styles from "./Header.module.scss";
import useTheme from "../../hooks/useTheme";

function Header() {
  const [isDark, toggleTheme] = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <h1 className={styles.header__heading}>devjobs</h1>
        <div className={styles.header__theme}>
          <input className={styles.header__check} id="theme" type="checkbox" checked={isDark} onChange={toggleTheme} />
          <img src="/images/desktop/icon-sun.svg" alt="" />
          <label htmlFor="theme"></label>
          <img src="/images/desktop/icon-moon.svg" alt="" />
        </div>
      </div>
    </header>
  );
}

export default Header;
