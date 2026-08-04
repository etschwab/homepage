import styles from "./plus-background.module.css";

export function PlusBackground() {
  return (
    <div aria-hidden="true" className="site-background">
      <div className="background-shade" />
      <div className={styles.floorballField}>
        <span className={styles.innerBoundary} />
        <span className={styles.centerLine} />
        <span className={styles.centerCircle} />
        <span className={styles.centerSpot} />
        <span className={`${styles.goalArea} ${styles.goalAreaLeft}`} />
        <span className={`${styles.goalArea} ${styles.goalAreaRight}`} />
        <span className={`${styles.goal} ${styles.goalLeft}`} />
        <span className={`${styles.goal} ${styles.goalRight}`} />
        <span className={`${styles.faceoffSpot} ${styles.spotTopLeft}`} />
        <span className={`${styles.faceoffSpot} ${styles.spotBottomLeft}`} />
        <span className={`${styles.faceoffSpot} ${styles.spotTopRight}`} />
        <span className={`${styles.faceoffSpot} ${styles.spotBottomRight}`} />
      </div>
      <div className="background-vignette" />
    </div>
  );
}
