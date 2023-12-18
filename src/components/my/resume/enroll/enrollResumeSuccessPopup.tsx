import styles from "./enrollResumeSuccessPopup.module.scss";
import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";
import Resume from "assets/images/bg/resume/Resume.png";

interface Iprops {
  off: Function;
}

export default function EnrollResumeSuccessPopup({ off }: Iprops) {
  return (
    <section className={styles.enrollResumeSuccessPopup}>
      <button className={styles.closeBtn} onClick={() => off()}>
        <XGray />
      </button>

      <article className={styles.contArea}>
        <img className={styles.contImg} src={Resume} alt="" />

        <p className={styles.title}>
          이력서 <span className={styles.blue}>등록 완료!</span>
        </p>

        <p className={styles.explain}>
          프로필이 인재정보에 공개됩니다.
          <br />
          앞으로 기업으로부터 <br />
          구직 제안을 받을 수 있습니다.
          <br />
        </p>
      </article>

      <article className={styles.btnArea}>
        <button className={styles.confirmBtn} onClick={() => off()}>
          확인
        </button>
      </article>
    </section>
  );
}
