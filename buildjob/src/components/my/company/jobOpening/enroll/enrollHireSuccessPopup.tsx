import SuccessEnrollHire from "assets/images/bg/hire/SuccessEnrollHire.png";
import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";
import { useNavigate } from "react-router-dom";
import styles from "./enrollHireSuccessPopup.module.scss";

interface Iprops {
  off: Function;
  uuid?: string;
}

export default function EnrollHireSuccessPopup({ off, uuid }: Iprops) {
  const navigate = useNavigate();

  return (
    <section className={styles.enrollHireSuccessPopup}>
      <button className={styles.closeBtn} onClick={() => off()}>
        <XGray />
      </button>

      <article className={styles.contArea}>
        <img className={styles.contImg} src={SuccessEnrollHire} alt="" />

        <p className={styles.title}>
          공고 <span className={styles.blue}>등록 완료!</span>
        </p>

        <p className={styles.explain}>
          빌드잡에 등록된 <strong className={styles.blue}>인재</strong>
          에게
          <br />
          제안을 보내고 빠르게 채용해 보세요.
          <br />
        </p>
      </article>

      <article className={styles.btnArea}>
        <button
          className={styles.checkBtn}
          onClick={() => navigate(`/hire/${uuid}`, { replace: true })}
        >
          공고 확인
        </button>

        <button
          className={styles.confirmBtn}
          onClick={() => navigate("/person")}
        >
          인재 보러가기
        </button>
      </article>
    </section>
  );
}
