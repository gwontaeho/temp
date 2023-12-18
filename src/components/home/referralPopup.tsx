import styles from "./referralPopup.module.scss";
import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";

interface Iprops {
  off: Function;
}

export default function ReferralPopup({ off }: Iprops) {
  return (
    <section className={styles.referralPopup}>
      <button className={styles.closeBtn} onClick={() => off()}>
        <XGray />
      </button>

      <article className={styles.contArea}>
        <div className={styles.textCont}>
          <h1 className={styles.content}>
            빌드잡 추천하고
            <br />
            수수료 돌려받으세요!
          </h1>

          <div className={styles.explainBox}>
            <p>
              빌드잡 안 써본 분들께
              <br />
              초대장을 보내주세요!
            </p>

            <p>
              추천해주신 분과 추천 받으신 분
              <br />
              양쪽 모두에게 수수료를 돌려드려요
            </p>
          </div>
        </div>

        <div className={styles.profBox}></div>
      </article>

      <article className={styles.btnArea}>
        <button className={styles.primaryBtn} onClick={() => {}}>
          초대하러 가기
        </button>

        <button className={styles.exitBtn} onClick={() => off()}>
          닫기
        </button>
      </article>
    </section>
  );
}
