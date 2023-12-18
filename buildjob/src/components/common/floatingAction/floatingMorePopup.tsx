import { ReactComponent as PasteBlue } from "assets/images/icon/PasteBlue.svg";
import { ReactComponent as WriteBlue } from "assets/images/icon/WriteBlue.svg";
import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";
import { useNavigate } from "react-router-dom";
import styles from "./floatingMorePopup.module.scss";

interface Iprops {
  off: Function;
}

export default function FloatingMorePopup({ off }: Iprops) {
  const navigate = useNavigate();

  return (
    <ul className={styles.floatingMorePopup}>
      <button
        className={styles.actionBtn}
        onClick={() => navigate("/mypage/company/jobopening/enroll")}
      >
        <p>공고등록</p>
        <span className={styles.iconBox}>
          <PasteBlue />
        </span>
      </button>

      <button
        className={styles.actionBtn}
        onClick={() => navigate("/mypage/resume/enroll")}
      >
        <p>이력서 작성</p>
        <span className={styles.iconBox}>
          <WriteBlue />
        </span>
      </button>

      <button className={styles.closeBtn} onClick={() => off()}>
        <span className={styles.iconBox}>
          <XGray />
        </span>
      </button>
    </ul>
  );
}
