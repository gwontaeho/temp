import styles from "./termsDetail.module.scss";
import FloatingActBtns from "components/common/floatingAction/floatingActBtns";

export default function TermsDetail({ detail }: any) {

  return (
    <>
      <section className={styles.termsDetail}>
        {
          detail.map((e: { title: string, content: string }, i: string) => {
            return (
              <article key={i} className={styles.box}>
                <p className={styles.title}>{e.title}</p>
                <p className={styles.content}>{e.content}</p>
              </article>
            )
          })
        }
      </section>

      <section className={styles.bottom}>
        <article className={styles.copyright}>
          <p className={styles.text}>ⓒ</p>
          <p className={styles.strong}>Build Job</p>
          <p className={styles.text}>Corp.</p>
        </article>
      </section>

      <FloatingActBtns upBtn/>
    </>
  );
}
