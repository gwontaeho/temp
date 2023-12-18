import { useNavigate } from "react-router-dom";
import styles from "./logoWhite.module.scss";
import { ReactComponent as ChevronLeftBig } from "assets/images/icon/ChevronLeftBig.svg";
import { ReactComponent as LogoWhite } from "assets/images/logo/LogoWhite.svg";

export default function LogoWhiteHeader() {
  const navigate = useNavigate();

  return (
    <header className={styles.logoWhite}>
      <article className={styles.leftArea}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ChevronLeftBig />
        </button>
      </article>

      <LogoWhite />

      <article className={styles.rightArea}></article>
    </header>
  );
}
