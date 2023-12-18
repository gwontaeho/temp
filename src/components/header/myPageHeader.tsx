import { useNavigate } from "react-router-dom";
import styles from "./myPageHeader.module.scss";
import { ReactComponent as ChevronLeftBig } from "assets/images/icon/ChevronLeftBig.svg";
import { ReactComponent as Dot3 } from "assets/images/icon/Dot3.svg";

export default function MyPageHeader() {
  const navigate = useNavigate();

  return (
    <header className={`${styles.detailHeader} ${styles.bottomBorder}`}>
      <article className={styles.leftArea}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ChevronLeftBig />
        </button>
      </article>

      <h1 className={styles.pageTitle}>MY PAGE</h1>

      <article className={styles.rightArea}>
        <button className={styles.settingBtn} onClick={() => {}}>
          <Dot3 />
        </button>
      </article>
    </header>
  );
}
