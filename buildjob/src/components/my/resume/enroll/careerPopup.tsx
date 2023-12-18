import { ReactComponent as CalenderSimple } from "assets/images/icon/CalenderSimple.svg";
import { ReactComponent as ChevronDown } from "assets/images/icon/ChevronDown.svg";
import { ReactComponent as ChkCircleGray } from "assets/images/icon/ChkCircleGray.svg";
import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";
import PopupBg from "components/common/popupBg";
import SelPopup from "components/common/selPopup";
import { D_formList } from "data/hire/D_hire";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { getOptionsFromArray } from "utils/options";
import styles from "./careerPopup.module.scss";
import { useRecoilValue } from "recoil";
import { hireSelector } from "states/categories/hire";

interface Iprops {
  career: IenrollCareer[];
  setCareer: Function;
  off: Function;
  setHireCode?: Function;
}

export default function CareerPopup({ career, setCareer, off, setHireCode }: Iprops) {
  const explainMaxLength = 500;
  const hire = useRecoilValue(hireSelector);

  const [selFormPopup, setSelFormPopup] = useState<boolean>(false);
  const [workCurrent, setWorkCurrent] = useState<boolean>(false);
  const [hireList, setHireList] = useState<any>([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    watch,
    reset,
  } = useForm<IenrollCareer>({});

  function onSubmit() {
    let _career = career;
    let obj = getValues();
    obj["workCurrent"] = workCurrent;
    obj['isbefore'] = false;
    _career.push(obj);

    setCareer([..._career]);
    off();
  }

  useEffect(() => {
    var hList = hire?.map((e) => {return e.name})
    setHireList(hList)
  }, [hire]);

  useEffect(() => {
    watch('workForm') &&
      hire?.forEach(e => e.name === watch('workForm') && setHireCode && e.code && setHireCode(e.code));
  }, [watch('workForm')]);

  return (
    <section className={styles.careerPopup}>
      <article className={styles.titleBar}>
        <span className={styles.blank} />

        <h1 className={styles.popupTitle}>경력사항</h1>

        <button className={styles.closeBtn} onClick={() => off()}>
          <XGray />
        </button>
      </article>

      <article className={styles.contArea}>
        <h2 className={styles.areaTitle}>
          실제 근무하신 회사와 기간을 입력해주세요.
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className={styles.formList}>
            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  회사
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
                        required: "회사명은 필수 입력정보입니다.",
                      })}
                      placeholder="회사명"
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
                  근무형태
                  <span className={styles.red}>*</span>
                </p>
              </div>

              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.workForm ? styles.err : ""} ${
                      selFormPopup ? styles.focusOn : ""
                    } ${styles.inputBox}`}
                    onClick={() => setSelFormPopup(true)}
                  >
                    <input
                      disabled
                      {...register("workForm", {
                        required: "근무형태를 선택해 주세요.",
                      })}
                      placeholder="근무형태 선택"
                    />
                    <ChevronDown className={styles.chevronDown} />
                  </div>

                  {selFormPopup && (
                    <>
                      <SelPopup
                        options={getOptionsFromArray(hireList)}
                        values={[watch("workForm")]}
                        onSelect={(v: string[]) => {
                          setValue("workForm", v[0]);
                          setSelFormPopup(false);
                        }}
                      />
                      <PopupBg off={() => setSelFormPopup(false)} />
                    </>
                  )}
                </div>

                {errors.workForm?.message && (
                  <p className={styles.errorMsg}>{errors.workForm.message}</p>
                )}
              </div>
            </li>

            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  근무형태
                  <span className={styles.red}>*</span>
                </p>
              </div>

              <div className={`${styles.valueBox} ${styles.termValueBox}`}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.startDate ? styles.err : ""} ${
                      styles.inputBox
                    }`}
                  >
                    <DatePicker
                      selected={watch("startDate")}
                      {...register("startDate", {
                        required: "근무시작일은 필수 입력정보입니다.",
                      })}
                      onChange={(date) => date && setValue("startDate", date)}
                      dateFormat="yyyy년MM월"
                      showMonthYearPicker
                      placeholderText="근무시작일"
                      maxDate={watch("startDate") || new Date()}
                      customInput={<CustomInput />}
                    />
                  </div>

                  <p>~</p>

                  <div
                    className={`${errors.endDate ? styles.err : ""} ${
                      styles.inputBox
                    }`}
                  >
                    <DatePicker
                      disabled={workCurrent}
                      selected={watch("endDate")}
                      {...register("endDate", {
                        required: "근무종료일은 필수 입력정보입니다.",
                      })}
                      onChange={(date) => date && setValue("endDate", date)}
                      dateFormat="yyyy년MM월"
                      showMonthYearPicker
                      placeholderText="근무종료일"
                      minDate={watch("startDate")}
                      maxDate={new Date()}
                      customInput={<CustomInput />}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className={`${styles.workNowBtn} ${
                    workCurrent ? styles.on : ""
                  }`}
                  onClick={() => {
                    setWorkCurrent(!workCurrent);
                    setValue("endDate", new Date());
                  }}
                >
                  <ChkCircleGray />

                  <p>재직중</p>
                </button>

                {errors.startDate?.message && (
                  <p className={styles.errorMsg}>{errors.startDate.message}</p>
                )}
                {errors.endDate?.message && (
                  <p className={styles.errorMsg}>{errors.endDate.message}</p>
                )}
              </div>
            </li>

            <li className={styles.textAreaCont}>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  담당업무
                  <span className={styles.red}>*</span>
                </p>

                <p className={styles.count}>
                  <span className={styles.current}>
                    {watch("explain")?.length || "".length}
                  </span>
                  /{explainMaxLength}
                </p>
              </div>

              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.explain ? styles.err : ""} ${
                      styles.inputBox
                    }`}
                  >
                    <textarea
                      {...register("explain", {
                        required: "담당업무는 필수 입력정보입니다.",
                      })}
                      placeholder="담당업무 입력"
                      maxLength={explainMaxLength}
                    />
                  </div>
                </div>

                {errors.explain?.message && (
                  <p className={styles.errorMsg}>{errors.explain.message}</p>
                )}
              </div>
            </li>
          </ul>

          <div className={styles.btnCont}>
            <button type="submit" className={styles.saveBtn}>
              저장
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

const CustomInput = (
  props: React.HTMLProps<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>
) => (
  <div className={styles.customDatePicker}>
    <input {...props} />
    <CalenderSimple className={styles.iconCalender} />
  </div>
);
