import { D_homeNoticeList } from "data/home/D_notice";
import styles from "./noticePopup.module.scss";
import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";

interface Iprops {
  off: Function;
}

export default function NoticePopup({ off }: Iprops) {
  return (
    <section className={styles.noticePopup}>
      <article className={styles.topBar}>
        <span className={styles.blank} />

        <h1 className={styles.popupTitle}>공지사항</h1>

        <button className={styles.closeBtn} onClick={() => off()}>
          <XGray />
        </button>
      </article>

      <article className={styles.contArea}>
        <ul className={styles.contList}>
          {D_homeNoticeList.map((v, i) => (
            <li key={i}>
              <p>{v}</p>
            </li>
          ))}
        </ul>
      </article>

      <article className={styles.btnArea}>
        <button className={styles.primaryBtn} onClick={() => off()}>
          내용을 확인했습니다
        </button>
      </article>
    </section>
  );
}
