import { useNavigate } from "react-router-dom";
import styles from "./depositInfo.module.scss";

export default function DepositInfo() {
  const navigate = useNavigate();

  return (
    <section className={styles.depositInfo}>
      <article className={styles.contArea}>
        <h1 className={styles.areaTitle}>
          채용 수수료를
          <br />
          아래 계좌로 입금해 주세요.
        </h1>

        <ul className={styles.payList}>
          <li>
            <p className={styles.key}>입금기간</p>
            <p className={styles.value}>23.05.20 06:00</p>
          </li>

          <li>
            <p className={styles.key}>가상계좌</p>
            <p className={styles.value}>농협 79027902790200</p>
          </li>

          <li>
            <p className={styles.key}>예금주</p>
            <p className={styles.value}>주식회사 한양유통</p>
          </li>

          <li>
            <p className={styles.key}>입금금액</p>
            <p className={styles.value}>
              {Intl.NumberFormat().format(120000)}원
            </p>
          </li>
        </ul>

        <p className={styles.explain}>
          결제내역은 기업서비스 &gt; 결제내역에서
          <br />
          확인하실 수 있습니다.
        </p>

        <button
          className={styles.confirmBtn}
          onClick={() => navigate("/mypage/company/payhistory")}
        >
          결제내역 확인
        </button>
      </article>
    </section>
  );
}
