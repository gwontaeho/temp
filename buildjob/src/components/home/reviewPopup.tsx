import styles from "./reviewPopup.module.scss";
import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";
import { useNavigate } from "react-router-dom";

interface Iprops {
  off: Function;
}

export default function ReviewPopup({ off }: Iprops) {
  const navigate = useNavigate();
  return (
    <section className={styles.reviewPopup}>
      <button className={styles.closeBtn} onClick={() => off()}>
        <XGray />
      </button>

      <h1 className={styles.content}>
        채용하신 인재는 만족하셨나요?
        <br />
        별점으로 남겨주세요.
      </h1>

      <article className={styles.btnArea}>
        <button className={styles.primaryBtn} onClick={() => {navigate('/mypage/company/hire_situation')}}>
          별점 남기기
        </button>

        <button className={styles.exitBtn} onClick={() => off()}>
          닫기
        </button>
      </article>
    </section>
  );
}
