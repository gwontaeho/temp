import ApplyComplete from "assets/images/example/hire/ApplyComplete.png";
import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

interface Iprops {
  off: Function;
}

export default function ApplyCompletePopup({ off }: Iprops) {
  const navigate = useNavigate();

  return (
    <section className={styles.applyCompletePopup}>
      <button className={styles.closeBtn} onClick={() => off()}>
        <XGray />
      </button>

      <article className={styles.contArea}>
        <img src={ApplyComplete} alt="" />

        <p className={styles.explain}>입사지원이 완료되었습니다.</p>
      </article>

      <article className={styles.btnArea}>
        <button
          className={styles.confirmBtn}
          onClick={() => navigate("/mypage/apply")}
        >
          입사지원현황 보기
        </button>
      </article>
    </section>
  );
}
