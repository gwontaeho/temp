import { getSocialUserOnLocalStorage } from "pages/auth/AuthMain/utils/socialUserOnLocalStorage";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api, eps } from "../../../utils/config";
import styles from "./joinFirst.module.scss";

interface Iprops {
  setJoinFirst: Function;
}

function Counter() {
  const [sec, setSec] = useState<number>(600);

  useEffect(() => {
    const interval = setInterval(() => {
      setSec((prev) => {
        if (prev <= 0) clearInterval(interval);
        return prev > 0 ? prev - 1 : prev;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const m = Math.floor(sec / 60);
  const s = sec % 60;
  const t = `유효시간 ${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;

  return <p className={styles.limitTime}>{t}</p>;
}

export default function JoinFirst({ setJoinFirst }: Iprops) {
  const navigate = useNavigate();

  const [code, setCode] = useState<number>();
  const [codeSuccess, setCodeSucess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
    setError,
    clearErrors,
  } = useForm<IjoinFirst>({});

  useEffect(() => {
    (async () => {
      const socialUser = await getSocialUserOnLocalStorage();
      if (socialUser) {
        reset({ username: socialUser.name });
      }
    })();
  }, [reset]);

  async function onSubmit() {
    if (!codeSuccess) return;
    setJoinFirst({
      username: watch("username"),
      dob: watch("dob"),
      phoneNumber: watch("phoneNumber"),
    });
    navigate("", { state: { process: 2 } });
  }

  async function onClickGetCodeBtn() {
    try {
      const { data } = await api.get(eps["VERIFYCODE"] + `?phonenumber=${encodeURIComponent("+" + watch("phoneNumber"))}`);
      const code = data.code;
      setCode(code);
    } catch (err) {
      console.log(err);
    }
  }

  async function onClickCertificationBtn() {
    try {
      const { data } = await api.post(eps["VERIFYCODE"], {
        phonenumber: "+" + watch("phoneNumber"),
        code: watch("code"),
      });
      if (data.status === "OK") {
        clearErrors("code");
        setCodeSucess(true);
      } else setError("code", { type: "custom", message: "인증번호가 일치하지 않습니다. 다시 입력해주세요." });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <article className={styles.joinFirst}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className={styles.inputList}>
          <li>
            <div className={styles.keyBox}>
              <p className={styles.key}>이름</p>
            </div>

            <div className={styles.valueBox}>
              <div className={styles.inputBar}>
                <div className={`${errors.username ? styles.err : ""} ${styles.inputBox}`}>
                  <input
                    type="string"
                    {...register("username", {
                      required: "이름은 필수 입력정보입니다.",
                    })}
                    placeholder="이름 입력"
                  />
                </div>
              </div>

              {errors.username?.message && <p className={styles.errorMsg}>{errors.username?.message}</p>}
            </div>
          </li>

          <li>
            <div className={styles.keyBox}>
              <p className={styles.key}>생년월일</p>

              <p className={styles.required}>만 15세 이상인지 확인이 필요해요</p>
            </div>

            <div className={styles.valueBox}>
              <div className={styles.inputBar}>
                <div className={`${errors.dob ? styles.err : ""} ${styles.inputBox}`}>
                  <input
                    type="number"
                    {...register("dob", {
                      required: "생년월일은 필수 입력정보입니다.",
                      min: {
                        value: 10000000,
                        message: "생년월일을 다시 확인해주세요.",
                      },
                      max: {
                        value: 99999999,
                        message: "생년월일을 다시 확인해주세요.",
                      },
                    })}
                    placeholder="YYYYMMDD"
                  />
                </div>
              </div>

              {errors.dob?.message && <p className={styles.errorMsg}>{errors.dob?.message}</p>}
            </div>
          </li>

          <li>
            <div className={styles.keyBox}>
              <p className={styles.key}>휴대폰</p>
            </div>
            <div className={styles.valueBox}>
              <div className={styles.inputBar}>
                <div className={`${errors.phoneNumber ? styles.err : ""} ${styles.inputBox}`}>
                  <input
                    type="number"
                    {...register("phoneNumber", {
                      required: "휴대폰 번호는 필수 입력정보입니다.",
                    })}
                    placeholder="821000000000"
                    disabled={codeSuccess}
                  />
                </div>

                <button className={styles.codeBtn} type="button" disabled={codeSuccess} onClick={onClickGetCodeBtn}>
                  {!!code ? "재전송" : "인증번호 받기"}
                </button>
              </div>

              {errors.phoneNumber?.message && <p className={styles.errorMsg}>{errors.phoneNumber?.message}</p>}

              {!!code && (
                <>
                  <div className={styles.inputBar}>
                    <div className={`${errors.code ? styles.err : ""} ${styles.inputBox}`}>
                      <input
                        type="string"
                        disabled={codeSuccess}
                        {...register("code", {
                          required: "인증번호가 일치하지 않습니다. 다시 입력해주세요.",
                        })}
                      />

                      <button className={styles.certificationBtn} type="button" disabled={codeSuccess} onClick={onClickCertificationBtn}>
                        {codeSuccess ? "인증완료" : "인증하기"}
                      </button>
                    </div>
                  </div>

                  {errors.code?.message && <p className={styles.errorMsg}>{errors.code?.message}</p>}
                  {codeSuccess && <p className={`${styles.success}`}>인증되었습니다.</p>}
                  {!(codeSuccess || errors.code) && <Counter />}
                </>
              )}
            </div>
          </li>
        </ul>

        <button className={`${styles.submitBtn} ${isValid && codeSuccess ? styles.able : ""}`} type="submit">
          가입하기
        </button>
      </form>
    </article>
  );
}
