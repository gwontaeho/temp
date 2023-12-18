import PopupBg from "components/common/popupBg";
import { accessTokenKey, socialLoginUserKey } from "constants/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { userSelector } from "states/user";
import { api, eps } from "utils/config";
import { useSocialLoginUser } from "./hooks/useSocialLoginUser";
import styles from "./joinSecond.module.scss";
import TermAgreePopup from "./termAgreePopup";

export default function JoinSecond({ joinFirst }: any) {
  const { socialLoginUser, isSocialSignInUser } = useSocialLoginUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<IjoinSecond>({});
  const setUser = useSetRecoilState(userSelector);
  const [termAgreePopup, setTermAgreePopup] = useState<boolean>(false);

  async function onSubmit() {
    try {
      if (socialLoginUser) {
        localStorage.removeItem(socialLoginUserKey);
        await localStorage.setItem(accessTokenKey, socialLoginUser.token);

        await api.put(eps["SIGN_UP_SOCIAL"](socialLoginUser.uuid), {
          username: joinFirst["username"],
          nickname: watch("nickname"),
          dob: joinFirst["bio"],
          phonenumber: "+" + joinFirst["phoneNumber"],
        });
        setUser({
          phoneNumber: joinFirst["phoneNumber"],
          nickName: watch("nickname"),
          userName: joinFirst["username"],
        });
      } else {
        const {
          data: {
            respdata: { token },
          },
        } = await api.post(eps["SIGNUP"], {
          username: joinFirst["username"],
          nickname: watch("nickname"),
          dob: joinFirst["bio"],
          phonenumber: "+" + joinFirst["phoneNumber"],
          password: watch("password"),
        });
        setUser({
          phoneNumber: joinFirst["phoneNumber"],
          userName: joinFirst["name"],
        });
        localStorage.setItem(accessTokenKey, token);
      }
    } catch (err) {
      console.log(err);
    }
    setTermAgreePopup(true);
  }

  return (
    <>
      <article className={styles.joinFirst}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className={styles.inputList}>
            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>아이디</p>
              </div>

              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.nickname ? styles.err : ""} ${
                      styles.inputBox
                    }`}
                  >
                    <input
                      type="string"
                      {...register("nickname", {
                        required: "이미 사용중인 아이디입니다.",
                      })}
                      placeholder="김둘리"
                    />
                  </div>
                </div>

                {errors.nickname?.message && (
                  <p className={styles.errorMsg}>{errors.nickname?.message}</p>
                )}
              </div>
            </li>

            {!isSocialSignInUser && (
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
                        type="password"
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
                    </div>
                  </div>

                  {errors.password?.message && (
                    <p className={styles.errorMsg}>
                      {errors.password?.message}
                    </p>
                  )}

                  <div className={styles.inputBar}>
                    <div
                      className={`${errors.confirmPassword ? styles.err : ""} ${
                        styles.inputBox
                      }`}
                    >
                      <input
                        type="password"
                        {...register("confirmPassword", {
                          required: "올바르지 않은 비밀번호입니다.",
                          minLength: {
                            value: 6,
                            message: "6-16자리 비밀번호 입력해주세요",
                          },
                          maxLength: {
                            value: 16,
                            message: "6-16자리 비밀번호 입력해주세요",
                          },
                          validate: {
                            chkPw: () =>
                              watch("password") === watch("confirmPassword") ||
                              "비밀번호가 서로 일치하지 않습니다.",
                          },
                        })}
                        placeholder="비밀번호 다시 입력"
                      />
                    </div>

                    {errors.confirmPassword?.message && (
                      <p className={styles.errorMsg}>
                        {errors.confirmPassword?.message}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            )}
          </ul>

          <button
            className={`${styles.submitBtn} ${isValid ? styles.able : ""}`}
            type="submit"
          >
            가입하기
          </button>
        </form>
      </article>

      {termAgreePopup && (
        <>
          <TermAgreePopup />
          <PopupBg bg off={() => setTermAgreePopup(false)} />
        </>
      )}
    </>
  );
}
