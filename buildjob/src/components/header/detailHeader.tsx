import { useNavigate } from "react-router-dom";
import styles from "./detailHeader.module.scss";
import { ReactComponent as ChevronLeftBig } from "assets/images/icon/ChevronLeftBig.svg";
import { ReactComponent as X } from "assets/images/icon/X.svg";

interface Iprops {
  title: string;
  bottomBorder?: boolean;
  closeBtn?: boolean;
  closeBtnFunc?: Function;
}

export default function DetailHeader({
  title,
  bottomBorder,
  closeBtn,
  closeBtnFunc,
}: Iprops) {
  const navigate = useNavigate();

  return (
    <header
      className={`${styles.detailHeader} ${
        bottomBorder ? styles.bottomBorder : ""
      }`}
    >
      <article className={styles.leftArea}>
        {closeBtn ? (
          <button
            className={styles.closeBtn}
            onClick={() => closeBtnFunc && closeBtnFunc()}
          >
            <X />
          </button>
        ) : (
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <ChevronLeftBig />
          </button>
        )}
      </article>

      <h1 className={styles.pageTitle}>{title}</h1>

      <article className={styles.rightArea}></article>
    </header>
  );
}
