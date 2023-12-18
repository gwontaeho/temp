import { ReactComponent as ChevronDown } from "assets/images/icon/ChevronDown.svg";
import PopupBg from "components/common/popupBg";
import SelPopup from "components/common/selPopup";
import { D_formList, D_largeLocationList } from "data/hire/D_hire";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api, eps } from "utils/config";
import { getOptionsFromArray } from "utils/options";
import styles from "./condition.module.scss";
import SelLocationPopup from "./selLocationPopup";
import { useRecoilValue } from "recoil";
import { hireSelector } from "states/categories/hire";
import { regionSelector } from "states/categories/region";

interface Iprops {
  uuid: string;
  confirmFunc: Function;
}

export default function Condition({ uuid, confirmFunc }: Iprops) {
  const hire = useRecoilValue(hireSelector);
  const region = useRecoilValue(regionSelector);

  const [selFormPopup, setSelFormPopup] = useState<boolean>(false);
  const [selLocationPopup, setSelLocationPopup] = useState<boolean>(false);
  const [hireList, setHireList] = useState<any>([]);
  const [hireCode, setHireCode] = useState<string>('');
  const [regionCode, setRegionCode] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<IenrollResumeSecond>({});

  async function getResume(uuid: string) {
    try {
      const {data: {respdata}} = await api.get(eps["GET_RESUME"](uuid));
      setValue("form", respdata?.hiretype);
      setValue("location", respdata?.region.split(' ', 2)[0]);
      setValue("detailLocation", respdata?.region.replace(respdata?.region.split(' ', 2)[0] + ' ', ''));
    } catch (err) {
      console.log(err);
    }
  }

  async function onSubmit() {
    try {
      let data = {
        hiretype: watch("form"),
        hiretypecode: hireCode,
        region: `${watch("location")} ${watch("detailLocation")}`,
        regioncode: regionCode,
      };
      await api.put(eps["REGISTER_RESUME"] + `/uuid/${uuid}`, data);
    } catch (err) {
      console.log(err);
    }
    confirmFunc();
  }

  useEffect(() => {
    uuid && getResume(uuid);
  }, [uuid]);

  useEffect(() => {
    var hList = hire?.map((e) => {return e.name})
    setHireList(hList)
  }, [hire]);

  useEffect(() => {
    watch('form') &&
      hire?.forEach(e => e.name === watch('form') && e.code && setHireCode(e.code))
  }, [watch('form')]);

  useEffect(() => {
    watch('detailLocation') &&
      region?.forEach(e => {
        if (e.name === watch('location')) {
          e.subgroup?.forEach(ele => 
            ele.name === watch('detailLocation') && 
            ele.code && 
            setRegionCode(ele.code)
          )
        }
      })
  }, [watch('detailLocation')]);


  return (
    <article className={styles.condition}>
      <div className={styles.titleCont}>
        <h1 className={styles.progressTitle}>근무 조건을 선택해 주세요.</h1>

        <ul className={styles.explainList}>
          <li>등록하신 정보는 공고 지원 이외의 용도로는 활용되지 않습니다.</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className={styles.formList}>
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
                  className={`${errors.form ? styles.err : ""} ${
                    selFormPopup ? styles.focusOn : ""
                  } ${styles.inputBox}`}
                  onClick={() => setSelFormPopup(true)}
                >
                  <input
                    disabled
                    {...register("form", {
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
                선호 근무지역
                <span className={styles.red}>*</span>
              </p>
            </div>

            <div className={styles.valueBox}>
              <div className={styles.inputBar}>
                <div
                  className={`${errors.detailLocation ? styles.err : ""} ${
                    selLocationPopup ? styles.focusOn : ""
                  } ${styles.inputBox}`}
                  onClick={() => setSelLocationPopup(true)}
                >
                  <input
                    disabled
                    {...register("detailLocation", {
                      required: "선호 근무지역을 선택해 주세요.",
                    })}
                    value={
                      watch("detailLocation") &&
                      `${watch("location") || ""} ${watch("detailLocation")}`
                    }
                    placeholder="선호 근무지역 선택"
                  />
                  <ChevronDown className={styles.chevronDown} />
                </div>

                {selLocationPopup && (
                  <>
                    <SelLocationPopup
                      watch={watch}
                      setValue={setValue}
                      off={() => setSelLocationPopup(false)}
                    />
                    <PopupBg off={() => setSelLocationPopup(false)} />
                  </>
                )}
              </div>

              {errors.detailLocation?.message && (
                <p className={styles.errorMsg}>
                  {errors.detailLocation.message}
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
