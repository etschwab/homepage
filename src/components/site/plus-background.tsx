import styles from "./plus-background.module.css";

export function PlusBackground() {
  return (
    <div aria-hidden="true" className="site-background">
      <div className="background-shade" />
      <div className={styles.floorballField}>
        <span className={styles.centerLine} />
        <span className={styles.centerCircle} />
        <span className={`${styles.goalArea} ${styles.goalAreaLeft}`} />
        <span className={`${styles.goalArea} ${styles.goalAreaRight}`} />
      </div>
      <div className="background-vignette" />
    </div>
  );
}
