import styles from "./enableAlarmPopup.module.scss";

export default function EnableAlarmPopup() {
  return (
    <section className={styles.enableAlarmPopup}>
      <article className={styles.textArea}>
        <h1 className={styles.popupTitle}>기기 알림을 켜주세요.</h1>
        <p
          className={styles.explain}
        >{`기기 설정>알림>빌드잡 알림을 ‘허용'으로 변경해주세요.`}</p>
      </article>

      <button className={styles.settingBtn} onClick={() => {}}>
        설정 바로가기
      </button>
    </section>
  );
}
