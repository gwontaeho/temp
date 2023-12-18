import DetailHeader from "components/header/detailHeader";
import styles from "./enrollCompany.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api, eps } from "utils/config";

export default function EnrollCompany() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IenrollCompany>({});

  const onSubmit: SubmitHandler<IenrollCompany> = async (data) => {
    const { corpname, businessregnumber } = data;
    if (!corpname || businessregnumber.length !== 10) return;
    const b = `${businessregnumber.slice(0, 3)}-${businessregnumber.slice(3, 5)}-${businessregnumber.slice(5, 10)}`;

    try {
      await api.post(eps["REGISTER_COMPANY"], { corpname, businessregnumber: b });
      navigate("/mypage/company");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DetailHeader title="기업등록" bottomBorder />

      <main className={styles.companyEnroll}>
        <section>
          <h1>기업 정보를 등록해 주세요.</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul className={styles.formList}>
              <li>
                <div className={styles.keyBox}>
                  <p className={styles.key}>
                    회사명
                    <span className={styles.red}>*</span>
                  </p>
                </div>
                <div className={styles.valueBox}>
                  <div className={styles.inputBar}>
                    <div className={`${errors.corpname ? styles.err : ""} ${styles.inputBox}`}>
                      <input {...register("corpname", { required: true })} placeholder="회사명 입력" />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={styles.keyBox}>
                  <p className={styles.key}>
                    사업자번호
                    <span className={styles.red}>*</span>
                  </p>
                </div>
                <div className={styles.valueBox}>
                  <div className={styles.inputBar}>
                    <div className={`${errors.businessregnumber ? styles.err : ""} ${styles.inputBox}`}>
                      <input
                        {...register("businessregnumber", {
                          required: true,
                          minLength: { value: 10, message: "10자리의 번호를 입력해주세요" },
                        })}
                        placeholder="사업자번호 입력"
                        maxLength={10}
                      />
                    </div>
                  </div>
                </div>
                {errors.businessregnumber?.message && <p className={styles.errorMsg}>{errors.businessregnumber.message}</p>}
              </li>
            </ul>
            <article className={styles.buttonArea}>
              <button type="submit">등록하기</button>
            </article>
          </form>
        </section>
      </main>
    </>
  );
}
