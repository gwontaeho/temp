import { useQuery } from "@tanstack/react-query";
import { ReactComponent as CalenderSimple } from "assets/images/icon/CalenderSimple.svg";
import { ReactComponent as ChevronDown } from "assets/images/icon/ChevronDown.svg";
import NextBtnArea from "components/common/enroll/nextBtnArea";
import PopupBg from "components/common/popupBg";
import SelPopup from "components/common/selPopup";
import {
  D_WorkExperienceDuration,
  D_gender,
  D_oldList,
} from "data/my/hire/D_enrollHire";
import { useJobPost } from "hooks/useJobPost";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { api, eps } from "utils/config";
import { getOptionsFromObject } from "utils/options";
import ProcessBarArea from "./prodessBarArea";
import styles from "./supportCondition.module.scss";

interface Iprops {
  uuid: string;
  process: number;
  setProcess: Function;
}

export default function SupportCondition({
  uuid,
  process,
  setProcess,
}: Iprops) {
  const { data: supportTypeList } = useSupportTypeList();
  const { state } = useLocation();
  const { data } = useJobPost(state?.uuid);

  const [selGenderPopup, setSelGenderPopup] = useState<boolean>(false);
  const [selOldPopup, setSelOldPopup] = useState<boolean>(false);
  const [selWorkExperiencePopup, setSelWorkExperiencePopup] =
    useState<boolean>(false);
  const [selSupportTypePopup, setSelSupportTypePopup] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
    control,
  } = useForm<IenrollHireSupportCondition>({});

  useEffect(() => {
    if (data && supportTypeList) {
      reset({
        gender: data.genderCode as IGender,
        old: data.agesCode as IOld,
        workExperienceDuration: data.workExperienceDurationValue,
        supportType: data.interviewTypeCode,
        limitDate: new Date(data.expiresAt),
      });
    }
  }, [data, reset, supportTypeList]);

  async function onSubmit() {
    try {
      let inputData = {
        gender: watch("gender") ?? data.genderCode,
        ages: watch("old") ?? data.agesCode,
        expiresat: watch("limitDate"),
        interviewtype:
          data && !watch("supportType")
            ? data.interviewType
            : supportTypeList[watch("supportType")],
        interviewtypecode:
          data && !watch("supportType")
            ? data.interviewTypeCode
            : watch("supportType"),
        workexperienceduration:
          data && !watch("workExperienceDuration")
            ? data.workExperienceDurationValue
            : watch("workExperienceDuration"),
      };
      await api.put(eps["REGISTER_JOB"] + `/uuid/${uuid}`, inputData);
    } catch (err) {
      console.log(err);
    }
    setProcess(75);
  }

  return (
    <main className={styles.condition}>
      <section className={styles.titleSec}>
        <h1 className={styles.processTitle}>지원조건·기간을 선택해 주세요.</h1>
      </section>

      <section className={styles.contSec}>
        <ProcessBarArea process={process} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className={styles.formList}>
            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  성별
                  <span className={styles.red}>*</span>
                </p>
              </div>

              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.gender ? styles.err : ""} ${
                      selGenderPopup ? styles.focusOn : ""
                    } ${styles.inputBox}`}
                    onClick={() => setSelGenderPopup(true)}
                  >
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled
                          value={D_gender[watch("gender")]}
                          placeholder="성별 선택"
                        />
                      )}
                      rules={{ required: "성별을 선택해 주세요." }}
                    />
                    <ChevronDown className={styles.chevronDown} />
                  </div>

                  {selGenderPopup && (
                    <>
                      <SelPopup
                        options={getOptionsFromObject(D_gender)}
                        values={[watch("gender")]}
                        onSelect={(v: IGender[]) => {
                          setValue("gender", v[0]);
                          setSelGenderPopup(false);
                        }}
                      />
                      <PopupBg off={() => setSelGenderPopup(false)} />
                    </>
                  )}
                </div>

                {errors.gender?.message && (
                  <p className={styles.errorMsg}>{errors.gender.message}</p>
                )}
              </div>
            </li>

            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  연령
                  <span className={styles.red}>*</span>
                </p>
              </div>

              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.old ? styles.err : ""} ${
                      selOldPopup ? styles.focusOn : ""
                    } ${styles.inputBox}`}
                    onClick={() => setSelOldPopup(true)}
                  >
                    <Controller
                      name="old"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled
                          value={D_oldList[watch("old")]}
                          placeholder="연령 선택"
                        />
                      )}
                      rules={{ required: "연령을 선택해 주세요." }}
                    />
                    <ChevronDown className={styles.chevronDown} />
                  </div>

                  {selOldPopup && (
                    <>
                      <SelPopup
                        options={getOptionsFromObject(D_oldList)}
                        values={[watch("old")]}
                        onSelect={(v: IOld[]) => {
                          setValue("old", v[0]);
                          setSelOldPopup(false);
                        }}
                      />
                      <PopupBg off={() => setSelOldPopup(false)} />
                    </>
                  )}
                </div>

                {errors.old?.message && (
                  <p className={styles.errorMsg}>{errors.old.message}</p>
                )}
              </div>
            </li>

            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  경력
                  <span className={styles.red}>*</span>
                </p>
              </div>

              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${
                      errors.workExperienceDuration ? styles.err : ""
                    } ${selOldPopup ? styles.focusOn : ""} ${styles.inputBox}`}
                    onClick={() => setSelWorkExperiencePopup(true)}
                  >
                    <Controller
                      name="workExperienceDuration"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled
                          value={
                            D_WorkExperienceDuration[
                              watch(
                                "workExperienceDuration"
                              ) as keyof typeof D_WorkExperienceDuration
                            ]
                          }
                          placeholder="경력 선택"
                        />
                      )}
                      rules={{ required: "경력을 선택해 주세요." }}
                    />
                    <ChevronDown className={styles.chevronDown} />
                  </div>

                  {selWorkExperiencePopup && (
                    <>
                      <SelPopup
                        options={getOptionsFromObject(D_WorkExperienceDuration)}
                        values={[watch("workExperienceDuration")]}
                        onSelect={(v: string[]) => {
                          setValue("workExperienceDuration", v[0]);
                          setSelWorkExperiencePopup(false);
                        }}
                      />
                      <PopupBg off={() => setSelWorkExperiencePopup(false)} />
                    </>
                  )}
                </div>

                {errors.workExperienceDuration?.message && (
                  <p className={styles.errorMsg}>
                    {errors.workExperienceDuration.message}
                  </p>
                )}
              </div>
            </li>

            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  모잡 마감일
                  <span className={styles.red}>*</span>
                </p>
              </div>

              <div className={`${styles.limitValueBox} ${styles.valueBox}`}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.old ? styles.err : ""} ${
                      styles.inputBox
                    }`}
                  >
                    <ReactDatePicker
                      selected={watch("limitDate")}
                      {...register("limitDate", {
                        required: "마감일을 선택해 주세요.",
                      })}
                      onChange={(date) => date && setValue("limitDate", date)}
                      dateFormat="yyyy.MM.dd"
                      placeholderText="마감일 선택"
                      minDate={new Date()}
                      customInput={<CustomInput />}
                    />
                  </div>
                </div>

                {errors.limitDate?.message && (
                  <p className={styles.errorMsg}>{errors.limitDate.message}</p>
                )}
              </div>
            </li>

            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  지원방법
                  <span className={styles.red}>*</span>
                </p>
              </div>

              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.supportType ? styles.err : ""} ${
                      selSupportTypePopup ? styles.focusOn : ""
                    } ${styles.inputBox}`}
                    onClick={() => setSelSupportTypePopup(true)}
                  >
                    <Controller
                      name="supportType"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled
                          value={supportTypeList[watch("supportType")]}
                          placeholder="지원방법 선택"
                        />
                      )}
                      rules={{ required: "지원방법을 선택해 주세요." }}
                    />
                    <ChevronDown className={styles.chevronDown} />
                  </div>

                  {selSupportTypePopup && (
                    <>
                      <SelPopup
                        options={getOptionsFromObject(supportTypeList)}
                        values={[watch("supportType")]}
                        onSelect={(v: string[]) => {
                          setValue("supportType", v[0]);
                          setSelSupportTypePopup(false);
                        }}
                      />
                      <PopupBg off={() => setSelSupportTypePopup(false)} />
                    </>
                  )}
                </div>

                {errors.supportType?.message && (
                  <p className={styles.errorMsg}>
                    {errors.supportType.message}
                  </p>
                )}
              </div>
            </li>
          </ul>

          <NextBtnArea />
        </form>
      </section>
    </main>
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

function useSupportTypeList() {
  return useQuery(["SUPPORT_TYPES"], async () => {
    const response = await api.get(eps["SUPPORT_TYPES"]);
    return response.data.list
      .map((item: any) => ({
        code: item.code,
        name: item.name,
      }))
      .reduce((acc: any, cur: any) => {
        return {
          ...acc,
          [cur.code]: cur.name,
        };
      }, {});
  });
}
