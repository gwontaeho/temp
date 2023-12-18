import { ReactComponent as ChevronDown } from "assets/images/icon/ChevronDown.svg";
import PopupBg from "components/common/popupBg";
import SelPopup from "components/common/selPopup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api, eps } from "utils/config";
import { useLocation } from "react-router-dom";
import { getOptionsFromArray } from "utils/options";
import styles from "./defaultInfo.module.scss";
import { useRecoilValue } from "recoil";
import { jobtypeSelector } from "states/categories/jobtype";

interface Iprops {
  confirmFunc: Function;
  setResumeUUID: Function;
}

export default function DefaultInfo({ confirmFunc, setResumeUUID }: Iprops) {
  const jobtype = useRecoilValue(jobtypeSelector);
  const { state } = useLocation();

  const [selCatrgoryPopup, setSelCatrgoryPopup] = useState<boolean>(false);
  const [jobFirstList, setJobFirstList] = useState<any>([]);
  const [jobSecondList, setJobSecondList] = useState<any>([]);
  const [jobTypeCode, setJobTypeCode] = useState<string>('');
  const [jobTypeCode2, setJobTypeCode2] = useState<string>('');
  const [selDetailCategoryPopup, setSelDetailCategoryPopup] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<IenrollResumeFirst>({});

  async function getResume(uuid: string) {
    try {
      const {data: {respdata}} = await api.get(eps["GET_RESUME"](uuid));
      setValue("category", respdata?.jobtype);
      setValue("detailCategory", respdata?.jobtype2);
      jobtype?.forEach(e => {
        if (e.name === watch('category')) {
          var jobList = e.subgroup?.map((e) => {return e.name})
          e.code && setJobTypeCode(e.code)
          setJobSecondList(jobList)
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

  async function queryUserCredentials() {
    try {
      const {
        data: {
          respdata: { username, phonenumber },
        },
      } = await api.get(eps["USERINFO"]);
      setValue("name", username);
      setValue("cellNumber", phonenumber);
    } catch (err) {
      console.log(err);
    }
  }

  async function onSubmit() {
    try {
      let data: {
        jobtype: string;
        jobtypecode: string;
        jobtype2: string;
        jobtypecode2: string;
      };
      data = {
        jobtype: watch("category"),
        jobtypecode: jobTypeCode,
        jobtype2: watch("detailCategory"),
        jobtypecode2: jobTypeCode2,
      };

      if(state?.resume_uuid) {
        await api.put(eps["REGISTER_RESUME"] + `/uuid/${state?.resume_uuid}`, data);
        setResumeUUID(state?.resume_uuid);
      }
      else {
        const {
          data: { uuid },
        } = await api.post(eps["REGISTER_RESUME"], data);
        setResumeUUID(uuid);
      }
    } catch (err) {
      console.log(err);
    }
    confirmFunc();
  }

  useEffect(() => {
    queryUserCredentials();
  }, []);

  useEffect(() => {
    state?.resume_uuid && getResume(state?.resume_uuid);
  }, [state]);

  useEffect(() => {
    var jobList = jobtype?.map((e) => {return e.name})
    setJobFirstList(jobList)
  }, [jobtype]);

  useEffect(() => {
    watch('category') &&
      jobtype?.forEach(e => {
        if (e.name === watch('category')) {
          var jobList = e.subgroup?.map((e) => {return e.name})
          e.code && setJobTypeCode(e.code)
          setJobSecondList(jobList)
        }
      })
  }, [watch('category')]);

  useEffect(() => {
    watch('detailCategory') &&
      jobtype?.forEach(e => {
        if (e.name === watch('category')) {
          e.subgroup?.forEach(ele => 
            ele.name === watch('detailCategory') && 
            ele.code && 
            setJobTypeCode2(ele.code)
          )
        }
      })
  }, [watch('detailCategory')]);

  return (
    <article className={styles.defaultInfo}>
      <div className={styles.titleCont}>
        <h1 className={styles.progressTitle}>기본 정보를 입력해 주세요.</h1>

        <ul className={styles.explainList}>
          <li>등록하신 정보는 공고 지원 이외의 용도로는 활용되지 않습니다.</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className={styles.formList}>
          <li>
            <div className={styles.keyBox}>
              <p className={styles.key}>
                이름
                <span className={styles.red}>*</span>
              </p>
            </div>

            <div className={styles.valueBox}>
              <div className={styles.inputBar}>
                <div
                  className={`${errors.name ? styles.err : ""} ${
                    styles.inputBox
                  }`}
                >
                  <input
                    {...register("name", {
                      required: "이름은 필수 입력정보입니다.",
                    })}
                  />
                </div>
              </div>

              {errors.name?.message && (
                <p className={styles.errorMsg}>{errors.name.message}</p>
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
                      required: "전화번호의 글자 수는 9-16자 입니다.",
                      minLength: {
                        value: 9,
                        message: "전화번호의 글자 수는 9-16자 입니다.",
                      },
                      maxLength: {
                        value: 16,
                        message: "전화번호의 글자 수는 9-16자 입니다.",
                      },
                    })}
                  />
                </div>
              </div>

              {errors.cellNumber?.message ? (
                <p className={styles.errorMsg}>{errors.cellNumber.message}</p>
              ) : (
                <p className={styles.explain}>
                  *지원 관련 안내가 해당 연락처로 전달되오니 사용 중인 연락처를
                  기재해 주세요.
                </p>
              )}
            </div>
          </li>

          <li>
            <div className={styles.keyBox}>
              <p className={styles.key}>
                직군/직무
                <span className={styles.red}>*</span>
              </p>
            </div>

            <div className={styles.valueBox}>
              <div className={styles.inputBar}>
                <div
                  className={`${errors.category ? styles.err : ""} ${
                    selCatrgoryPopup ? styles.focusOn : ""
                  } ${styles.inputBox}`}
                  onClick={() => setSelCatrgoryPopup(true)}
                >
                  <input
                    disabled
                    {...register("category", {
                      required: "직군을 선택해 주세요.",
                    })}
                    placeholder="직군 선택"
                  />
                  <ChevronDown className={styles.chevronDown} />
                </div>

                {selCatrgoryPopup && (
                  <>
                    <SelPopup
                      options={getOptionsFromArray(jobFirstList)}
                      values={[watch("category")]}
                      onSelect={(v: string[]) => {
                        setValue("category", v[0]);
                        setValue("detailCategory", '');
                        setSelCatrgoryPopup(false);
                      }}
                    />
                    <PopupBg off={() => setSelCatrgoryPopup(false)} />
                  </>
                )}
              </div>

              {errors.category?.message && (
                <p className={styles.errorMsg}>{errors.category.message}</p>
              )}

              {watch("category") && (
                <div className={styles.inputBar}>
                  <div
                    className={`${errors.detailCategory ? styles.err : ""} ${
                      selCatrgoryPopup ? styles.focusOn : ""
                    } ${styles.inputBox}`}
                    onClick={() => setSelDetailCategoryPopup(true)}
                  >
                    <input
                      disabled
                      {...register("detailCategory", {
                        required: "직무를 선택해 주세요.",
                      })}
                      placeholder="직무 선택"
                    />
                    <ChevronDown className={styles.chevronDown} />
                  </div>

                  {selDetailCategoryPopup && (
                    <>
                      <SelPopup
                        options={getOptionsFromArray(jobSecondList)}
                        values={[watch("detailCategory")]}
                        onSelect={(v: string[]) => {
                          setValue("detailCategory", v[0]);
                          setSelDetailCategoryPopup(false);
                        }}
                      />
                      <PopupBg off={() => setSelDetailCategoryPopup(false)} />
                    </>
                  )}
                </div>
              )}

              {errors.detailCategory?.message && (
                <p className={styles.errorMsg}>
                  {errors.detailCategory.message}
                </p>
              )}
            </div>
          </li>
        </ul>

        <article className={styles.btnArea}>
          <button className={styles.nextBtn} type="submit">
            다음 단계
          </button>
        </article>
      </form>
    </article>
  );
}
