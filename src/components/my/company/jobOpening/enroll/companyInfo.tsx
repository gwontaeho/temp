import { ReactComponent as ChkCircleGray } from "assets/images/icon/ChkCircleGray.svg";
import BottomSheetPopup from "components/common/bottomSheetPopup";
import PopupBg from "components/common/popupBg";
import { useJobPost } from "hooks/useJobPost";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api, eps } from "utils/config";
import styles from "./companyInfo.module.scss";
import EnrollHireSuccessPopup from "./enrollHireSuccessPopup";
import ProcessBarArea from "./prodessBarArea";

interface Iprops {
  uuid: string;
  process: number;
  setProcess: Function;
}

export default function CompanyInfo({ uuid, process, setProcess }: Iprops) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = useJobPost(state?.uuid);

  const [autoSavePopup, setAutoSavePopup] = useState<boolean>(false);
  const [enrollSuccessPopup, setEnrollSuccessPopup] = useState<boolean>(false);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IenrollHireCompanyInfo>({});

  const isEditMode = !!state?.uuid;

  useEffect(() => {
    if (data) {
      reset({
        companyName: data.corporationName,
        managerName: data.managerName,
        cellNumber: data.phoneNumber.replace("+82", "0"),
        agreeTerm: data.isAgree,
      });
    }
  }, [data, reset]);

  async function onSubmit() {
    try {
      type Iparams = {
        corpname: string;
        managername: string;
        phonenumber: string;
        isagree: number;
        iscomplete?: number;
      };
      let data: Iparams = {
        corpname: watch("companyName"),
        managername: watch("managerName"),
        phonenumber: "+82" + watch("cellNumber").slice(1).replaceAll("-", ""),
        isagree: watch("agreeTerm") ? 1 : 0,
      };
      data["iscomplete"] = 1;
      setEnrollSuccessPopup(true);

      await api.put(eps["REGISTER_JOB"] + `/uuid/${uuid}`, data);
    } catch (err) {
      console.log(err);
    }
    setEnrollSuccessPopup(true);
  }

  return (
    <>
      <main className={styles.defaultInfo}>
        <section className={styles.titleSec}>
          <h1 className={styles.processTitle}>모집내용을 입력해 주세요.</h1>
        </section>

        <section className={styles.contSec}>
          <ProcessBarArea process={process} />

          <form onSubmit={handleSubmit(() => onSubmit())}>
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
                    <div
                      className={`${errors.companyName ? styles.err : ""} ${
                        styles.inputBox
                      }`}
                    >
                      <input
                        {...register("companyName", {
                          required: "회사명(사업자명)을 입력해 주세요.",
                        })}
                        placeholder="회사명 입력"
                      />
                    </div>
                  </div>

                  {errors.companyName?.message && (
                    <p className={styles.errorMsg}>
                      {errors.companyName.message}
                    </p>
                  )}
                </div>
              </li>

              <li>
                <div className={styles.keyBox}>
                  <p className={styles.key}>
                    담당자명
                    <span className={styles.red}>*</span>
                  </p>
                </div>

                <div className={styles.valueBox}>
                  <div className={styles.inputBar}>
                    <div
                      className={`${errors.managerName ? styles.err : ""} ${
                        styles.inputBox
                      }`}
                    >
                      <input
                        {...register("managerName", {
                          required: "담당자명을 입력해 주세요.",
                        })}
                        placeholder="담당자명 입력"
                      />
                    </div>
                  </div>

                  {errors.managerName?.message && (
                    <p className={styles.errorMsg}>
                      {errors.managerName.message}
                    </p>
                  )}
                </div>
              </li>

              <li>
                <div className={styles.keyBox}>
                  <p className={styles.key}>
                    연락처
                    <span className={styles.red}>*</span>
                  </p>
                </div>

                <div className={styles.valueBox}>
                  <div className={styles.inputBar}>
                    <div
                      className={`${errors.cellNumber ? styles.err : ""} ${
                        styles.inputBox
                      }`}
                    >
                      <input
                        {...register("cellNumber", {
                          required:
                            "지원, 계약 관련 안내가 해당 연락처로 전달되오니 사용 중인 연락처를 기재해 주세요.",
                          pattern: {
                            value:
                              /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
                            message: "올바른 연락처를 입력해주세요",
                          },
                        })}
                        placeholder="연락처 입력"
                      />
                    </div>
                  </div>

                  {errors.cellNumber?.message && (
                    <p className={styles.errorMsg}>
                      {errors.cellNumber.message}
                    </p>
                  )}
                </div>
              </li>
            </ul>

            <div className={styles.termCont}>
              <p className={styles.key}>빌드잡 이용약관</p>

              <button
                type="button"
                className={`${styles.agreeBtn} ${
                  watch("agreeTerm") ? styles.on : ""
                }`}
                onClick={() => setValue("agreeTerm", !watch("agreeTerm"))}
              >
                <ChkCircleGray className={styles.chk} />
                <p>
                  (필수)빌드잡 <strong>이용약관</strong>에 동의합니다.
                </p>

                <input
                  hidden
                  type="checkbox"
                  {...register("agreeTerm", {
                    required: "이용약관에 동의 해 주세요,",
                  })}
                />
              </button>

              {errors.agreeTerm?.message && (
                <p className={styles.errorMsg}>{errors.agreeTerm.message}</p>
              )}

              <div className={styles.explainBox}>
                <p>
                  <strong>빌드잡</strong>을 배제하고 빌드잡에서 채용한 인재와
                  직접 계약을 진행할 경우,{" "}
                  <strong>
                    서비스 이용 제한 및 계약금의 10%에 해당하는 위약금
                  </strong>
                  이 발생합니다.
                </p>
              </div>
            </div>

            <article className={styles.btnArea}>
              <button
                type="button"
                className={styles.autoSaveBtn}
                onClick={() => {
                  setAutoSavePopup(true);
                  api.put(eps["TEMP_SAVE_JOB_POST"](uuid), {
                    corpname: watch("companyName"),
                    // businessregnumber: watch("companyNumber"),
                    managername: watch("managerName"),
                    phonenumber: watch("cellNumber"),
                    isagree: 1,
                  });
                }}
              >
                임시저장
              </button>

              <button
                type="submit"
                className={styles.submitBtn}
                onClick={() => {
                  if (!watch("agreeTerm")) {
                    toast("이용약관에 동의해주세요.", {
                      position: toast.POSITION.TOP_LEFT,
                    });
                  }
                }}
              >
                {isEditMode ? "수정완료" : "등록완료"}
              </button>
            </article>
          </form>
        </section>
      </main>

      {autoSavePopup && (
        <>
          <BottomSheetPopup
            title="임시저장 완료"
            subText="지금까지 작성된 내용이 임시저장되었습니다."
            cancelText="그만쓰기"
            cancelFunc={() => {
              navigate(-1);
            }}
            confirmText="계속쓰기"
            confirmFunc={() => setAutoSavePopup(false)}
            off={() => setAutoSavePopup(false)}
          />
          <PopupBg bg off={() => setAutoSavePopup(false)} />
        </>
      )}

      {enrollSuccessPopup && (
        <>
          <EnrollHireSuccessPopup off={() => navigate("/person")} uuid={uuid} />
          <PopupBg bg off={() => navigate("/mypage/resume")} />
        </>
      )}
    </>
  );
}
