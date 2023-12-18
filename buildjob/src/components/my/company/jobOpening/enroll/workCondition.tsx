import { useQuery } from "@tanstack/react-query";
import { ReactComponent as ChevronDown } from "assets/images/icon/ChevronDown.svg";
import NextBtnArea from "components/common/enroll/nextBtnArea";
import PopupBg from "components/common/popupBg";
import SelPopup from "components/common/selPopup";
import { D_dayOfWeek, D_enrollHireTerm } from "data/my/hire/D_enrollHire";
import { useJobPost } from "hooks/useJobPost";
import { Suspense, useEffect, useReducer, useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import {
  Controller,
  UseControllerProps,
  useController,
  useForm,
} from "react-hook-form";
import { useLocation } from "react-router-dom";
import { api, eps } from "utils/config";
import { getOptionsFromObject } from "utils/options";
import ProcessBarArea from "./prodessBarArea";
import styles from "./workCondition.module.scss";

interface Iprops {
  uuid: string;
  process: number;
  setProcess: Function;
}

export default function WorkCondition({ uuid, process, setProcess }: Iprops) {
  const { state } = useLocation();
  const { data } = useJobPost(state?.uuid);
  const [selTermPopup, setSelFormPopup] = useState<boolean>(false);
  const [selDayOfWeekFormPopup, setSelDayOfWeekFormPopup] =
    useState<boolean>(false);
  const [selDayOfWeekPopup, setSelDayOfWeekPopup] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    control,
    reset,
  } = useForm<IenrollHireWorkCondition>({
    defaultValues: {
      dayOfWeek: [],
    },
  });

  useEffect(() => {
    if (data) {
      const [startTime, endTime] = data.workHours.split("~");
      const dayOfWeekForm =
        data.workdaysOfweek.length > 1 &&
        data.workdaysOfweek.some((item) => item !== "-1")
          ? "요일 선택"
          : "요일 협의";

      reset({
        dayOfWeekForm,
        startTime,
        endTime,
        location: data.streetAddress,
        detailLocation: data.detailAddress,
        restHoursInMinutes: `${data.restHoursInMinutes}`,
        commuteType: {
          label: data.commuteType,
          type: data.commuteTypeCode as ICommute,
        },
      });
    }
  }, [data, reset]);

  async function onSubmit() {
    try {
      const dayOfWeekForm = watch("dayOfWeekForm");

      const commute = watch("commuteType");

      const dayOfWeek = watch("dayOfWeek") ?? data?.workdaysOfweekCodes;
      dayOfWeek.sort();

      let inputData = {
        durationofhire: watch("term") ?? data.durationOfhireCode,
        workdaysofweek:
          dayOfWeekForm === "요일 협의" ? [-1] : watch("dayOfWeek"),
        workhours: `${watch("startTime")}~${watch("endTime")}`,
        streetaddress: watch("location"),
        detailaddress: watch("detailLocation") ?? null,
        resthoursinminutes: watch("restHoursInMinutes") ?? 0,
        commutetype: commute.label,
        commutetypecode: commute.type,
      };
      await api.put(eps["REGISTER_JOB"] + `/uuid/${uuid}`, inputData);
    } catch (err) {
      console.log(err);
    }
    setProcess(50);
  }

  const inputPriceFormat = (str: any, valueType: "startTime" | "endTime") => {
    const comma = (str: any) => {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, "$1:");
    };
    const uncomma = (str: any) => {
      str = String(str);
      return str.replace(/[^\d]+/g, "");
    };
    return setValue(valueType, comma(uncomma(str)));
  };

  return (
    <main className={styles.condition}>
      <section className={styles.titleSec}>
        <h1 className={styles.processTitle}>근무 조건을 선택해 주세요.</h1>
      </section>

      <section className={styles.contSec}>
        <ProcessBarArea process={process} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className={styles.formList}>
            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  근무기간
                  <span className={styles.red}>*</span>
                </p>
              </div>

              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.term ? styles.err : ""} ${
                      selTermPopup ? styles.focusOn : ""
                    } ${styles.inputBox}`}
                    onClick={() => setSelFormPopup(true)}
                  >
                    <input
                      disabled
                      {...register(
                        "term",
                        data?.durationOfhireCode
                          ? {}
                          : {
                              required: "근무기간을 선택해 주세요.",
                            }
                      )}
                      value={
                        D_enrollHireTerm[
                          data?.durationOfhireCode && !watch("term")
                            ? (data?.durationOfhireCode as IHire)
                            : watch("term")
                        ]
                      }
                      placeholder="근무기간 선택"
                    />
                    <ChevronDown className={styles.chevronDown} />
                  </div>

                  {selTermPopup && (
                    <>
                      <SelPopup
                        options={getOptionsFromObject(D_enrollHireTerm)}
                        values={[watch("term")]}
                        onSelect={(v: IHire[]) => {
                          setValue("term", v[0]);
                          setSelFormPopup(false);
                        }}
                      />
                      <PopupBg off={() => setSelFormPopup(false)} />
                    </>
                  )}
                </div>

                {errors.term?.message && (
                  <p className={styles.errorMsg}>{errors.term.message}</p>
                )}
              </div>
            </li>

            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  근무요일
                  <span className={styles.red}>*</span>
                </p>
              </div>

              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.dayOfWeekForm ? styles.err : ""} ${
                      selDayOfWeekFormPopup ? styles.focusOn : ""
                    } ${styles.inputBox}`}
                    onClick={() => setSelDayOfWeekFormPopup(true)}
                  >
                    <input
                      disabled
                      {...register("dayOfWeekForm", {
                        required: "근무요일을 선택해 주세요.",
                      })}
                      placeholder="근무요일 선택"
                    />
                    <ChevronDown className={styles.chevronDown} />
                  </div>

                  {selDayOfWeekFormPopup && (
                    <>
                      <SelPopup
                        options={[
                          { label: "요일 선택", value: "요일 선택" },
                          { label: "요일 협의", value: "요일 협의" },
                        ]}
                        values={[watch("dayOfWeekForm")]}
                        onSelect={(v: string[]) => {
                          setValue("dayOfWeekForm", v[0]);
                          setSelDayOfWeekFormPopup(false);
                        }}
                      />
                      <PopupBg off={() => setSelDayOfWeekFormPopup(false)} />
                    </>
                  )}
                </div>

                {errors.dayOfWeekForm?.message && (
                  <p className={styles.errorMsg}>
                    {errors.dayOfWeekForm.message}
                  </p>
                )}

                {watch("dayOfWeekForm") === "요일 선택" && (
                  <div className={styles.inputBar}>
                    <div
                      className={`${errors.dayOfWeek ? styles.err : ""} ${
                        selDayOfWeekPopup ? styles.focusOn : ""
                      } ${styles.inputBox}`}
                      onClick={() => setSelDayOfWeekPopup(true)}
                    >
                      <input
                        disabled
                        {...register(
                          "dayOfWeek",
                          data?.workdaysOfweekCodes
                            ? {}
                            : { required: "근무요일을 선택해 주세요." }
                        )}
                        value={(watch("dayOfWeek") ?? data?.workdaysOfweekCodes)
                          ?.map((v) => D_dayOfWeek[v])
                          .join(", ")}
                        placeholder="근무 요일"
                      />
                      <ChevronDown className={styles.chevronDown} />
                    </div>

                    {selDayOfWeekPopup && (
                      <>
                        <SelPopup
                          options={getOptionsFromObject(D_dayOfWeek)}
                          values={watch("dayOfWeek")}
                          onSelect={(v: IDayOfWeek[]) => {
                            setValue("dayOfWeek", v);
                          }}
                          multiple
                        />
                        <PopupBg off={() => setSelDayOfWeekPopup(false)} />
                      </>
                    )}
                  </div>
                )}

                {errors.dayOfWeek?.message && (
                  <p className={styles.errorMsg}>{errors.dayOfWeek.message}</p>
                )}
              </div>
            </li>

            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  근무시간
                  <span className={styles.red}>*</span>
                </p>
              </div>

              <div className={`${styles.valueBox} ${styles.timeValueBox}`}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.startTime ? styles.err : ""} ${
                      styles.inputBox
                    }`}
                  >
                    <input
                      maxLength={5}
                      {...register("startTime", {
                        required: "근무시간을 입력해 주세요.",
                        minLength: {
                          value: 5,
                          message: "근무시간을 입력해 주세요.",
                        },
                      })}
                      placeholder="--:--"
                      onChange={(e) =>
                        inputPriceFormat(e.target.value, "startTime")
                      }
                    />
                  </div>

                  <p>~</p>

                  <div
                    className={`${errors.endTime ? styles.err : ""} ${
                      styles.inputBox
                    }`}
                  >
                    <input
                      maxLength={5}
                      {...register("endTime", {
                        required: "근무시간을 입력해 주세요.",
                        minLength: {
                          value: 5,
                          message: "근무시간을 입력해 주세요.",
                        },
                      })}
                      placeholder="--:--"
                      onChange={(e) =>
                        inputPriceFormat(e.target.value, "endTime")
                      }
                    />
                  </div>
                </div>

                {errors.startTime?.message && (
                  <p className={styles.errorMsg}>{errors.startTime.message}</p>
                )}
                {errors.endTime?.message && (
                  <p className={styles.errorMsg}>{errors.endTime.message}</p>
                )}
              </div>
              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.location ? styles.err : ""} ${
                      styles.inputBox
                    }`}
                  >
                    <Controller
                      name="restHoursInMinutes"
                      control={control}
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
                          placeholder="휴게시간 입력(분 단위)"
                        />
                      )}
                      rules={{ required: false }}
                    />
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  근무지 주소
                  <span className={styles.red}>*</span>
                </p>
              </div>
              <div className={styles.valueBox}>
                <AddressInput
                  name="location"
                  control={control}
                  rules={{ required: "근무지 주소를 입력해 주세요." }}
                />

                <div className={styles.inputBar}>
                  <div
                    className={`${errors.detailLocation ? styles.err : ""} ${
                      styles.inputBox
                    }`}
                  >
                    <input
                      {...register("detailLocation")}
                      placeholder="상세주소 입력"
                    />
                  </div>
                </div>

                {errors.detailLocation?.message && (
                  <p className={styles.errorMsg}>
                    {errors.detailLocation.message}
                  </p>
                )}
              </div>
            </li>
            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  근무 방식
                  <span className={styles.red}>*</span>
                </p>
              </div>
              <Suspense>
                <SelectCommuteType
                  name="commuteType"
                  control={control}
                  rules={{ required: "근무 방식을 선택해주세요." }}
                />
              </Suspense>
            </li>
          </ul>

          <NextBtnArea />
        </form>
      </section>
    </main>
  );
}

const SCRIPT_URL =
  "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
function AddressInput(props: UseControllerProps<IenrollHireWorkCondition>) {
  const open = useDaumPostcodePopup(SCRIPT_URL);
  const { field, fieldState } = useController(props);
  const isError = fieldState.error != null;

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    field.onChange(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <>
      <div className={styles.inputBar}>
        <div
          className={`${isError ? styles.err : ""} ${styles.inputBox}`}
          onClick={handleClick}
        >
          <input
            {...field}
            value={field.value as string}
            placeholder="주소 찾기"
          />
        </div>
      </div>

      {isError && (
        <p className={styles.errorMsg}>{fieldState.error!.message}</p>
      )}
    </>
  );
}

function SelectCommuteType(
  props: UseControllerProps<IenrollHireWorkCondition>
) {
  const { data } = useCommuteType();
  const { field, fieldState } = useController(props);
  const [isOpen, toggle] = useReducer((open) => !open, false);

  const isError = fieldState.error != null;

  return (
    <div className={styles.valueBox}>
      <div className={styles.inputBar}>
        <div
          className={`${isError ? styles.err : ""} ${
            isOpen ? styles.focusOn : ""
          } ${styles.inputBox}`}
          onClick={toggle}
        >
          <input
            disabled
            {...field}
            value={(field.value as { label: string })?.label}
            placeholder="근무방식 선택"
          />
          <ChevronDown className={styles.chevronDown} />
        </div>

        {isOpen && (
          <>
            <SelPopup
              options={getOptionsFromObject(data)}
              values={[field.value]}
              onSelect={(v: string[]) => {
                field.onChange({
                  label: data[v[0] as ICommute],
                  type: v[0],
                });
                toggle();
              }}
            />
            <PopupBg off={toggle} />
          </>
        )}
      </div>

      {isError && (
        <p className={styles.errorMsg}>{fieldState.error!.message}</p>
      )}
    </div>
  );
}

function useCommuteType() {
  const { data, ...rest } = useQuery(["COMMUTE_TYPE_LIST"], async () => {
    const { data } = await api.get(eps["COMMUTE_TYPE_LIST"]);

    return data.list.reduce((acc: any, cur: any) => {
      return {
        ...acc,
        [cur.code]: cur.name,
      };
    }, {}) as Record<ICommute, string>;
  });

  return { data: data!, ...rest };
}
