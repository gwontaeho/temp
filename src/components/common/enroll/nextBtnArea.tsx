import styles from "./nextBtnArea.module.scss";

export default function NextBtnArea() {
  return (
    <article className={styles.nextBtnArea}>
      <button className={styles.nextBtn} type="submit">
        다음 단계
      </button>
    </article>
  );
}
