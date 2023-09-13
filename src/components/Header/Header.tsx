import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <h1 className={styles.header__heading}>devjobs</h1>
        <button>Placeholder</button>
      </div>
    </header>
  );
}

export default Header;
