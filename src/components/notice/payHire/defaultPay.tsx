import styles from "./defaultPay.module.scss";
import { useForm } from "react-hook-form";
import { ReactComponent as ChkCircleGray } from "assets/images/icon/ChkCircleGray.svg";

interface Iprops {
  setProcess: Function;
}

export default function DefaultPay({ setProcess }: Iprops) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IpayInfoFormProps>({
    defaultValues: {
      form: "계약직",
      terms: "3개월",
      time: "10:00 ~ 18:00",
      dayOfWeek: "주 5일",
      pay: "300만원",
    },
  });

  function onSubmit() {
    setProcess(2);
  }

  return (
    <section className={styles.defaultPay}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className={`${styles.jobOpeningArea} ${styles.contArea}`}>
          <h1 className={styles.areaTitle}>(주)위베네베네</h1>

          <div className={styles.valueCont}>
            <p className={styles.title}>
              베네베네 직영점 [신세계 강남점] 정규직 모집
            </p>

            <p className={styles.info}>
              서울 전체 · <span className={styles.red}>월</span> 300만원
            </p>
          </div>
        </article>

        <article className={`${styles.inputArea} ${styles.contArea}`}>
          <h1 className={styles.areaTitle}>기본정보</h1>

          <div className={styles.valueCont}>
            <ul className={styles.inputList}>
              <li>
                <div className={styles.keyBox}>
                  <p className={styles.key}>고용형태</p>
                </div>

                <div className={styles.valueBox}>
                  <div className={styles.inputBar}>
                    <div
                      className={`${errors.form ? styles.err : ""} ${
                        styles.inputBox
                      }`}
                    >
                      <input type="string" {...register("form")} />
                    </div>
                  </div>

                  {errors.form?.message && (
                    <p className={styles.errorMsg}>{errors.form?.message}</p>
                  )}
                </div>
              </li>

              <li>
                <div className={styles.keyBox}>
                  <p className={styles.key}>채용기간</p>
                </div>

                <div className={styles.valueBox}>
                  <div className={styles.inputBar}>
                    <div
                      className={`${errors.terms ? styles.err : ""} ${
                        styles.inputBox
                      }`}
                    >
                      <input type="string" {...register("terms")} />
                    </div>
                  </div>

                  {errors.terms?.message && (
                    <p className={styles.errorMsg}>{errors.terms?.message}</p>
                  )}
                </div>
              </li>

              <li>
                <div className={styles.keyBox}>
                  <p className={styles.key}>근무시간</p>
                </div>

                <div className={styles.valueBox}>
                  <div className={styles.inputBar}>
                    <div
                      className={`${errors.time ? styles.err : ""} ${
                        styles.inputBox
                      }`}
                    >
                      <input type="string" {...register("time")} />
                    </div>
                  </div>

                  {errors.time?.message && (
                    <p className={styles.errorMsg}>{errors.time?.message}</p>
                  )}
                </div>
              </li>

              <li>
                <div className={styles.keyBox}>
                  <p className={styles.key}>근무요일</p>
                </div>

                <div className={styles.valueBox}>
                  <div className={styles.inputBar}>
                    <div
                      className={`${errors.dayOfWeek ? styles.err : ""} ${
                        styles.inputBox
                      }`}
                    >
                      <input type="string" {...register("dayOfWeek")} />
                    </div>
                  </div>

                  {errors.dayOfWeek?.message && (
                    <p className={styles.errorMsg}>{errors.dayOfWeek?.message}</p>
                  )}
                </div>
              </li>

              <li>
                <div className={styles.keyBox}>
                  <p className={styles.key}>급여</p>
                </div>

                <div className={styles.valueBox}>
                  <div className={styles.inputBar}>
                    <div
                      className={`${errors.pay ? styles.err : ""} ${
                        styles.inputBox
                      }`}
                    >
                      <input type="string" {...register("pay")} />
                    </div>
                  </div>

                  {errors.pay?.message && (
                    <p className={styles.errorMsg}>{errors.pay?.message}</p>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </article>

        <article className={`${styles.personArea} ${styles.contArea}`}>
          <h1 className={styles.areaTitle}>채용자 정보</h1>

          <div className={styles.valueCont}>
            <ul className={styles.infoList}>
              <li>
                <p className={styles.key}>이름</p>
                <hr />
                <p className={styles.value}>김둘리</p>
              </li>

              <li>
                <p className={styles.key}>근무형태</p>
                <hr />
                <p className={styles.value}>정규직</p>
              </li>

              <li>
                <p className={styles.key}>경력</p>
                <hr />
                <p className={styles.value}>10년 2개월</p>
              </li>
            </ul>
          </div>
        </article>

        <article className={styles.btnArea}>
          <button className={styles.confirmBtn}>
            <p>{Intl.NumberFormat().format(120000)}원 결제하기</p>
          </button>
        </article>
      </form>
    </section>
  );
}
