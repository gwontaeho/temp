import { ReactComponent as BellWhite } from "assets/images/icon/BellWhite.svg";
import { ReactComponent as SmileWhite } from "assets/images/icon/SmileWhite.svg";
import { ReactComponent as LogoWhite } from "assets/images/logo/LogoWhite.svg";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import styles from "./homeHeader.module.scss";

export default function HomeHeader() {
  const navigate = useNavigate();
  const user = useRecoilValue(userSelector);

  return (
    <header className={styles.header}>
      <article className={styles.leftArea}>
        <button className={styles.logoBtn} onClick={() => navigate("/home")}>
          <LogoWhite className={styles.logo} />
        </button>
      </article>

      <article className={styles.rightArea}>
        {user && (
          <button
            className={`${styles.utilBtn} ${styles.noticeBtn}`}
            onClick={() => navigate("/notice")}
          >
            <BellWhite />

            <span className={styles.new} />
          </button>
        )}

        <button
          className={`${styles.utilBtn} ${styles.profBtn}`}
          onClick={() => {}}
        >
          <SmileWhite />
        </button>
      </article>
    </header>
  );
}
