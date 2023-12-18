import { useQuery } from "@tanstack/react-query";
import { ReactComponent as ChevronDown } from "assets/images/icon/ChevronDown.svg";
import NextBtnArea from "components/common/enroll/nextBtnArea";
import PopupBg from "components/common/popupBg";
import SelPopup from "components/common/selPopup";
import { D_formList, D_payFormList } from "data/hire/D_hire";
import { useJobPost } from "hooks/useJobPost";
import { Suspense, useEffect, useReducer, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { api, eps } from "utils/config";
import { getOptionsFromArray, getOptionsFromObject } from "utils/options";
import styles from "./defaultInfo.module.scss";
import ProcessBarArea from "./prodessBarArea";

interface Iprops {
  process: number;
  setProcess: Function;
  setUUID: Function;
}

export default function DefaultInfo(props: Iprops) {
  return (
    <Suspense>
      <Resolved {...props} />
    </Suspense>
  );
}

function Resolved({ process, setProcess, setUUID }: Iprops) {
  const { state } = useLocation();
  const { data } = useJobPost(state?.uuid);
  const {
    data: { jobTypeDetailMap, jobTypeMap },
  } = useJobTypes();

  const [selFormPopup, setSelFormPopup] = useState<boolean>(false);
  const [selPayFormPopup, setSelPayFormPopup] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    control,
    reset,
  } = useForm<IenrollHireDefaultInfo>();

  const [isOpenCategory, toggleCategory] = useReducer((open) => !open, false);
  const [isOpenDetailCategory, toggleDetailCategory] = useReducer(
    (open) => !open,
    false
  );

  const isEditMode = !!state?.uuid;
  const isErrorCategory = errors.category != null;
  const isErrorDetailCategory = errors.detailCategory != null;

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        category: {
          label: data.jobType,
          type: data.jobTypeCode,
        },
        detailCategory: {
          label: data.jobType2,
          type: data.jobTypeCode2,
        },
        form: data.employType,
        payform: data.payType,
        pay: data.payAmount,
      });
    }
  }, [data, reset]);

  async function onSubmit() {
    try {
      let data = {
        title: watch("title"),
        jobtype: watch("category")!.label,
        jobtypecode: watch("category")!.type,
        jobtype2: watch("detailCategory")!.label,
        jobtypecode2: watch("detailCategory")!.type,
        employtype: watch("form"),
        employtypecode: D_formList.indexOf(watch("form")) + 1,
        paytype: watch("payform"),
        paytypecode: D_payFormList.indexOf(watch("payform")) + 1,
        payamount: watch("pay"),
        payunit: "만원",
      };

      if (isEditMode) {
        await api.put(eps["REGISTER_JOB"] + `/uuid/${state?.uuid}`, data);
        setUUID(state?.uuid);
      } else {
        let {
          data: { uuid },
        } = await api.post(eps["REGISTER_JOB"], data);
        setUUID(uuid);
      }
    } catch (err) {
      console.log(err);
    }
    setProcess(20);
  }

  return (
    <main className={styles.defaultInfo}>
      <section className={styles.titleSec}>
        <h1 className={styles.processTitle}>모집내용을 입력해 주세요.</h1>
      </section>

      <section className={styles.contSec}>
        <ProcessBarArea process={process} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className={styles.formList}>
            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  공고제목
                  <span className={styles.red}>*</span>
                </p>
              </div>

              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.title ? styles.err : ""} ${
                      styles.inputBox
                    }`}
                  >
                    <input
                      {...register("title", {
                        required: "공고제목을 입력해 주세요.",
                        maxLength: {
                          message: "150자 이내로 입력해 주세요.",
                          value: 150,
                        },
                      })}
                      placeholder="공고제목 입력"
                    />
                  </div>
                </div>

                {errors.title?.message && (
                  <p className={styles.errorMsg}>{errors.title.message}</p>
                )}
              </div>
            </li>

            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  모집분야
                  <span className={styles.red}>*</span>
                </p>
              </div>
              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${isErrorCategory ? styles.err : ""} ${
                      isOpenCategory ? styles.focusOn : ""
                    } ${styles.inputBox}`}
                    onClick={toggleCategory}
                  >
                    <input
                      disabled
                      {...register("category.label", {
                        required: "직무를 선택해 주세요.",
                      })}
                      value={watch("category")?.label}
                      placeholder="직무 선택"
                    />
                    <ChevronDown className={styles.chevronDown} />
                  </div>

                  {isOpenCategory && (
                    <>
                      <SelPopup
                        options={getOptionsFromObject(jobTypeMap)}
                        values={[watch("category")?.type]}
                        onSelect={(v: string[]) => {
                          setValue("category", {
                            label: jobTypeMap[v[0]],
                            type: v[0],
                          });
                          setValue("detailCategory", { label: "", type: "" });
                          toggleCategory();
                        }}
                      />
                      <PopupBg off={toggleCategory} />
                    </>
                  )}
                </div>

                {isErrorCategory && (
                  <p className={styles.errorMsg}>{errors.category!.message}</p>
                )}

                {watch("category.type") && (
                  <div className={styles.inputBar}>
                    <div
                      className={`${isErrorDetailCategory ? styles.err : ""} ${
                        isOpenDetailCategory ? styles.focusOn : ""
                      } ${styles.inputBox}`}
                      onClick={toggleDetailCategory}
                    >
                      <Controller
                        name="detailCategory"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            disabled
                            value={watch("detailCategory")?.label}
                            placeholder="직무 상세 선택"
                          />
                        )}
                        rules={{ required: "직무 상세를 선택해 주세요." }}
                      />
                      <ChevronDown className={styles.chevronDown} />
                    </div>

                    {isOpenDetailCategory && (
                      <>
                        <SelPopup
                          options={getOptionsFromObject(
                            jobTypeDetailMap[watch("category")?.type ?? ""]
                          )}
                          values={[watch("detailCategory")?.type]}
                          onSelect={(v: string[]) => {
                            setValue("detailCategory", {
                              label:
                                jobTypeDetailMap[watch("category")?.type ?? ""][
                                  v[0]
                                ],
                              type: v[0],
                            });
                            toggleDetailCategory();
                          }}
                        />
                        <PopupBg off={toggleDetailCategory} />
                      </>
                    )}
                  </div>
                )}

                {isErrorDetailCategory && (
                  <p className={styles.errorMsg}>
                    {errors.detailCategory!.message}
                  </p>
                )}
              </div>
            </li>

            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  고용형태
                  <span className={styles.red}>*</span>
                </p>
              </div>

              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.form ? styles.err : ""} ${
                      selFormPopup ? styles.focusOn : ""
                    } ${styles.inputBox}`}
                    onClick={() => setSelFormPopup(true)}
                  >
                    <input
                      disabled
                      {...register("form", {
                        required: "고용형태를 선택해 주세요.",
                      })}
                      placeholder="고용형태 선택"
                    />
                    <ChevronDown className={styles.chevronDown} />
                  </div>

                  {selFormPopup && (
                    <>
                      <SelPopup
                        options={getOptionsFromArray(D_formList)}
                        values={[watch("form")]}
                        onSelect={(v: string[]) => {
                          setValue("form", v[0]);
                          setSelFormPopup(false);
                        }}
                      />
                      <PopupBg off={() => setSelFormPopup(false)} />
                    </>
                  )}
                </div>

                {errors.form?.message && (
                  <p className={styles.errorMsg}>{errors.form.message}</p>
                )}
              </div>
            </li>

            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  급여 지급방식
                  <span className={styles.red}>*</span>
                </p>
              </div>

              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.payform ? styles.err : ""} ${
                      selPayFormPopup ? styles.focusOn : ""
                    } ${styles.inputBox}`}
                    onClick={() => setSelPayFormPopup(true)}
                  >
                    <input
                      disabled
                      {...register("payform", {
                        required: "지급방식을 선택해 주세요.",
                      })}
                      placeholder="지급방식 선택"
                    />
                    <ChevronDown className={styles.chevronDown} />
                  </div>

                  {selPayFormPopup && (
                    <>
                      <SelPopup
                        options={getOptionsFromArray(D_payFormList)}
                        values={[watch("payform")]}
                        onSelect={(v: string[]) => {
                          setValue("payform", v[0]);
                          setSelPayFormPopup(false);
                        }}
                      />
                      <PopupBg off={() => setSelPayFormPopup(false)} />
                    </>
                  )}
                </div>

                {errors.payform?.message && (
                  <p className={styles.errorMsg}>{errors.payform.message}</p>
                )}

                {watch("payform") && (
                  <>
                    <div className={styles.inputBar}>
                      <div
                        className={`${errors.pay ? styles.err : ""} ${
                          styles.inputBox
                        }`}
                      >
                        <Controller
                          name="pay"
                          control={control}
                          rules={{ required: "급여를 입력해 주세요." }}
                          render={({ field }) => (
                            <input
                              {...field}
                              onChange={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                field.onChange(e);
                              }}
                              placeholder="1"
                            />
                          )}
                        />
                        <p className={styles.unit}>만원</p>
                      </div>
                    </div>

                    {errors.pay?.message && (
                      <p className={styles.errorMsg}>{errors.pay.message}</p>
                    )}
                  </>
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

function useJobTypes() {
  const { data, ...rest } = useQuery(["GET_JOBTYPES"], async () => {
    const { data } = await api.get(eps["GET_JOBTYPES"]);

    const jobTypeDetailMap: Record<string, any> = {};
    const jobTypeMap = data.list.reduce((acc: any, cur: any) => {
      const { code, name } = cur;
      const detailItemMap = JSON.parse(cur.elements ?? []).reduce(
        (acc: any, cur: any) => {
          const [key, value] = Object.entries(cur)[0];
          acc[key] = value;
          return acc;
        },
        {}
      );

      jobTypeDetailMap[code] = detailItemMap;

      return {
        ...acc,
        [code]: name,
      };
    }, {});

    return {
      jobTypeDetailMap,
      jobTypeMap,
    };
  });

  return { data: data!, ...rest };
}
