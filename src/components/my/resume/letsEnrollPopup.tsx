import { useNavigate } from "react-router-dom";
import styles from "./letsEnrollPopup.module.scss";

export default function LetsEnrollPopup() {
  const navigate = useNavigate();

  return (
    <section className={styles.letsEnrollPopup}>
      <article className={styles.contArea}>
        <h1 className={styles.popupTitle}>지금 이력서를 등록해 보세요!</h1>

        <p className={styles.subTitle}>
          작성 후 바로 공고에 지원하고
          <br />
          관심업종으로부터 제안을 받을 수 있어요.
        </p>
      </article>

      <article className={styles.btnArea}>
        <button
          className={styles.confirmBtn}
          onClick={() => navigate("enroll")}
        >
          확인
        </button>
      </article>
    </section>
  );
}
