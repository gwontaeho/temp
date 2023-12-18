import { useForm } from "react-hook-form";
import styles from "./payInfo.module.scss";
import { ReactComponent as ChkCircleGray } from "assets/images/icon/ChkCircleGray.svg";
import { useState } from "react";
import DepositInfo from "./depositInfo";

export default function PayInfo() {
  const [process, setProcess] = useState<Number>(0);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IpayFormFormProps>({
    defaultValues: {
      payment: "무통장입금",
    },
  });

  function onSubmit() {
    setProcess(1);
  }

  return (
    <>
      {process === 0 && (
        <section className={styles.payInfo}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <article className={`${styles.paymentArea} ${styles.contArea}`}>
              <h1 className={styles.areaTitle}>결제 정보</h1>

              <div className={styles.valueBox}>
                <ul className={styles.payList}>
                  <li>
                    <p className={styles.key}>채용금액</p>
                    <p className={styles.value}>
                      {Intl.NumberFormat().format(3000000)}원
                    </p>
                  </li>

                  <li>
                    <p className={styles.key}>수수료</p>
                    <p className={styles.value}>
                      {Intl.NumberFormat().format(120000)}원
                    </p>
                  </li>
                </ul>

                <hr />

                <div className={styles.totalPay}>
                  <p className={styles.key}>총 결제금액</p>
                  <p className={styles.value}>
                    {Intl.NumberFormat().format(3120000)}원
                  </p>
                </div>
              </div>
            </article>

            <article className={`${styles.paymentArea} ${styles.contArea}`}>
              <h1 className={styles.areaTitle}>결제 수단</h1>

              <div className={styles.valueBox}>
                <ul className={styles.paymentList}>
                  <li
                    className={` ${
                      watch("payment") === "무통장입금" ? styles.on : ""
                    } ${styles.chkBtn}`}
                  >
                    <span className={styles.chkBox}>
                      <span />
                    </span>

                    <p>무통장입금</p>
                  </li>
                </ul>
              </div>
            </article>

            <article className={`${styles.receiptArea} ${styles.contArea}`}>
              <h1 className={styles.areaTitle}>현금영수증</h1>

              <div className={styles.valueBox}>
                <ul className={styles.receiptList}>
                  <li
                    className={` ${watch("receipt") ? "" : styles.on} ${
                      styles.chkBtn
                    }`}
                    onClick={() => setValue("receipt", false)}
                  >
                    <span className={styles.chkBox}>
                      <span />
                    </span>

                    <p>미신청</p>
                  </li>

                  <li
                    className={` ${watch("receipt") ? styles.on : ""} ${
                      styles.chkBtn
                    }`}
                    onClick={() => setValue("receipt", true)}
                  >
                    <span className={styles.chkBox}>
                      <span />
                    </span>

                    <p>신청</p>
                  </li>
                </ul>

                {watch("receipt") && (
                  <div className={styles.inputCont}>
                    <p className={styles.key}>휴대폰 번호</p>

                    <div
                      className={`${errors.cellNumber ? styles.err : ""} ${
                        styles.inputBox
                      }`}
                    >
                      <input
                        {...register("cellNumber", {
                          required: "휴대폰 번호를 입력해 주세요.",
                          minLength: {
                            value: 9,
                            message: "전화번호의 글자 수는 9-16자 입니다.",
                          },
                          maxLength: {
                            value: 16,
                            message: "전화번호의 글자 수는 9-16자 입니다.",
                          },
                        })}
                        placeholder="010-0000-0000"
                      />
                    </div>

                    {errors.cellNumber?.message && (
                      <p className={styles.errorMsg}>
                        {errors.cellNumber.message}
                      </p>
                    )}
                  </div>
                )}

                <div className={styles.termCont}>
                  <p className={styles.key}>빌드잡 이용약관</p>

                  <button
                    type="button"
                    className={`${styles.agreeBtn} ${
                      watch("tremAgree") ? styles.on : ""
                    }`}
                    onClick={() => setValue("tremAgree", !watch("tremAgree"))}
                  >
                    <ChkCircleGray className={styles.chk} />
                    <p>
                      (필수)빌드잡 <strong>이용약관</strong>에 동의합니다.
                    </p>

                    <input
                      hidden
                      type="checkbox"
                      {...register("tremAgree", {
                        required: "이용약관에 동의 해 주세요,",
                      })}
                    />
                  </button>

                  {errors.tremAgree?.message && (
                    <p className={styles.errorMsg}>
                      {errors.tremAgree.message}
                    </p>
                  )}

                  <div className={styles.explainBox}>
                    <p>
                      <strong>빌드잡</strong>을 배제하고 빌드잡에서 채용한
                      인재와 직접 계약을 진행할 경우,{" "}
                      <strong>
                        서비스 이용 제한 및 계약금의 10%에 해당하는 위약금
                      </strong>
                      이 발생합니다.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article className={styles.btnArea}>
              <button className={styles.confirmBtn}>
                <p>{Intl.NumberFormat().format(120000)}원 결제하기</p>
              </button>
            </article>
          </form>
        </section>
      )}

      {process === 1 && <DepositInfo />}
    </>
  );
}
