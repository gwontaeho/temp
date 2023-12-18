import { D_paymentList } from "data/my/history/D_point";
import styles from "./payment.module.scss";
import MonthFooter from "./monthFooterBtn";

export default function Payment() {
  return (
    <>
      <section className={styles.paymentSec}>
        <ul className={styles.paymentList}>
          <li>
            <p className={styles.date}>24일 (월)</p>

            <ul className={styles.datePaymentList}>
              {D_paymentList.map((v, i) => (
                <li key={i}>
                  <span className={styles.iconBox}>
                    <img src={v.icon} alt="" />
                  </span>

                  <ul className={styles.infoList}>
                    <li>
                      <p className={styles.content}>{v.content}</p>

                      <p
                        className={`${styles.amount} ${
                          v.amount > 0 ? styles.plus : ""
                        }`}
                      >
                        {v.amount > 0 ? "+" : ""}
                        {Intl.NumberFormat().format(v.amount)}원
                      </p>
                    </li>
                    <li>
                      <p className={styles.time}>{v.time}</p>

                      <p className={styles.category}>{v.catrgory}</p>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </section>

      <MonthFooter />
    </>
  );
}
