import styles from "./processBarArea.module.scss";

interface Iprops {
  process: number;
}

export default function ProcessBarArea({ process }: Iprops) {
  return (
    <article className={styles.processArea}>
      <div className={styles.processBar}>
        <div className={styles.processThumb} style={{ width: `${process}%` }} />
      </div>

      <p className={styles.label}>{process}%</p>
    </article>
  );
}
