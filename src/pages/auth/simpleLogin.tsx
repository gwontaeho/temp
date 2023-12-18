import { ReactComponent as Eye } from "assets/images/icon/Eye.svg";
import { ReactComponent as EyeOff } from "assets/images/icon/EyeOff.svg";
import { useSignIn } from "hooks/useSignIn";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./simpleLogin.module.scss";

export default function SimpleLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Ilogin>({});
  const { mutateAsync } = useSignIn();
  const [showPw, setShowPw] = useState<boolean>(false);

  async function onSubmit(inputs: Ilogin) {
    await mutateAsync(inputs);
    navigate("/home");
  }

  return (
    <main className={styles.main}>
      <h1>로그인</h1>
      <article className={styles.joinFirst}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className={styles.inputList}>
            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>전화번호</p>
              </div>

              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.phoneNumber ? styles.err : ""} ${
                      styles.inputBox
                    }`}
                  >
                    <input
                      type="string"
                      {...register("phoneNumber", {
                        required: "이미 사용중인 아이디입니다.",
                      })}
                      placeholder="전화번호 입력 | +821000000000"
                    />
                  </div>
                </div>

                {errors.phoneNumber?.message && (
                  <p className={styles.errorMsg}>
                    {errors.phoneNumber?.message}
                  </p>
                )}
              </div>
            </li>

            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>비밀번호</p>
              </div>

              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.password ? styles.err : ""} ${
                      styles.inputBox
                    }`}
                  >
                    <input
                      type={showPw ? "text" : "password"}
                      {...register("password", {
                        required: "올바르지 않은 비밀번호입니다.",
                        minLength: {
                          value: 6,
                          message: "6-16자리 비밀번호 입력해주세요",
                        },
                        maxLength: {
                          value: 16,
                          message: "6-16자리 비밀번호 입력해주세요",
                        },
                      })}
                      placeholder="6-16자리 비밀번호 입력"
                    />
                    {showPw ? (
                      <div
                        className={styles.inputIcon}
                        onClick={() => setShowPw(!showPw)}
                      >
                        <Eye />
                      </div>
                    ) : (
                      <div
                        className={styles.inputIcon}
                        onClick={() => setShowPw(!showPw)}
                      >
                        <EyeOff />
                      </div>
                    )}
                  </div>
                </div>

                {errors.password?.message && (
                  <p className={styles.errorMsg}>{errors.password?.message}</p>
                )}
              </div>
            </li>
          </ul>

          <button
            className={`${styles.submitBtn} ${isValid ? styles.able : ""}`}
            type="submit"
          >
            로그인 하기
          </button>
        </form>
      </article>
    </main>
  );
}
