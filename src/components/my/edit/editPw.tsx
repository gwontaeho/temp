import styles from "./editPw.module.scss";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api, eps } from "utils/config";
import { useState } from "react";
import { ReactComponent as Eye } from "assets/images/icon/Eye.svg";
import { ReactComponent as EyeOff } from "assets/images/icon/EyeOff.svg";

export default function EditPw() {
  const {
    register,
    handleSubmit,

    formState: { errors },
    watch,
    reset,
  } = useForm<IeditPw>({});

  const [showPw, setShowPw] = useState({
    first: false,
    second: false,
    third: false,
  });

  async function handleEditPassword() {
    type pwBody = {
      pw0: string,
      pw1: string,
    }

    let body: pwBody = {
      pw0: watch('currentPw'),
      pw1: watch('newPw'),
    }

    try {
      let {data} = await api.put(eps["EDIT_PASSWORD"], body);
      if (data?.status === 'OK') {
        reset();
        toast("비밀번호가 변경되었습니다.", {position: toast.POSITION.TOP_LEFT});
      }
      else if (data?.status === 'ERR' && data?.message === 'INCORRECT-PW') {
        toast("현재 비밀번호를 확인해주세요.", {position: toast.POSITION.TOP_LEFT})
      }
      else {
        toast("비밀번호가 변경에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.", {position: toast.POSITION.TOP_LEFT});
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className={styles.editPw}>
      <form onSubmit={handleSubmit(handleEditPassword)}>
        <ul className={styles.formList}>
          <li>
            <div className={styles.keyBox}>
              <p className={styles.key}>현재 비밀번호</p>
            </div>

            <div className={styles.valueBox}>
              <div className={styles.inputBar}>
                <div
                  className={`${errors.currentPw ? styles.err : ""} ${
                    styles.inputBox
                  }`}
                >
                  <input
                    type={showPw.first ? "text" : "password"}
                    {...register("currentPw", {
                      required: "비밀번호를 입력해 주세요.",
                    })}
                  >
                  </input>
                  {
                    showPw.first ?
                    <div className={styles.inputIcon} onClick={() => setShowPw((prev) => ({...prev, first: !showPw.first}))}>
                      <Eye/>
                    </div> :
                    <div className={styles.inputIcon} onClick={() => setShowPw((prev) => ({...prev, first: !showPw.first}))}>
                      <EyeOff/>
                    </div>
                  }
                </div>
              </div>

              {errors.currentPw?.message && (
                <p className={styles.errorMsg}>{errors.currentPw.message}</p>
              )}
            </div>
          </li>

          <li>
            <div className={styles.keyBox}>
              <p className={styles.key}>새 비밀번호</p>
            </div>

            <div className={styles.valueBox}>
              <div className={styles.inputBar}>
                <div
                  className={`${errors.newPw ? styles.err : ""} ${
                    styles.inputBox
                  }`}
                >
                  <input
                    type={showPw.second ? "text" : "password"}
                    {...register("newPw", {
                      required: "비밀번호를 입력해 주세요.",
                      validate: {
                        checkL: () => (watch("newPw").length >= 6 && watch("newPw").length <= 30) ||
                        "비밀번호는 6자 이상, 30자 이내로 입력해주세요."
                      }
                    })}
                  />
                  {
                    showPw.second ?
                    <div className={styles.inputIcon} onClick={() => setShowPw((prev) => ({...prev, second: !showPw.second}))}>
                      <Eye/>
                    </div> :
                    <div className={styles.inputIcon} onClick={() => setShowPw((prev) => ({...prev, second: !showPw.second}))}>
                      <EyeOff/>
                    </div>
                  }
                </div>
              </div>
              <div className={styles.inputBar}>
                <div
                  className={`${errors.newPwChk ? styles.err : ""} ${
                    styles.inputBox
                  }`}
                >
                  <input
                    type={showPw.third ? "text" : "password"}
                    {...register("newPwChk", {
                      required: "비밀번호를 입력해 주세요.",
                      validate: {
                        chkPw: () =>
                          watch("newPw") === watch("newPwChk") ||
                          "비밀번호가 서로 일치하지 않습니다.",
                      },
                    })}
                  />
                  {
                    showPw.third ?
                    <div className={styles.inputIcon} onClick={() => setShowPw((prev) => ({...prev, third: !showPw.third}))}>
                      <Eye/>
                    </div> :
                    <div className={styles.inputIcon} onClick={() => setShowPw((prev) => ({...prev, third: !showPw.third}))}>
                      <EyeOff/>
                    </div>
                  }
                </div>
              </div>

              {errors.newPw?.message && (
                <p className={styles.errorMsg}>{errors.newPw.message}</p>
              )}

              {errors.newPwChk?.message && (
                <p className={styles.errorMsg}>{errors.newPwChk.message}</p>
              )}
            </div>
          </li>
        </ul>

        <button className={styles.submitBtn}>수정완료</button>
      </form>
    </section>
  );
}
