import { Fragment, useState, useEffect } from "react";
import styles from "./career.module.scss";
import { D_careerTypeList } from "data/my/resume/D_enrollResume";
import { D_formList } from "data/hire/D_hire";
import { ReactComponent as ChkBlue } from "assets/images/icon/ChkBlue.svg";
import { ReactComponent as CircleXGray } from "assets/images/icon/CircleXGray.svg";
import { ReactComponent as PlusBlue } from "assets/images/icon/PlusBlue.svg";
import PopupBg from "components/common/popupBg";
import CareerPopup from "./careerPopup";
import BottomSheetPopup from "components/common/bottomSheetPopup";
import { useNavigate } from "react-router-dom";
import EnrollSuccessPopup from "./enrollResumeSuccessPopup";
import { api, eps } from "utils/config";
import moment from "moment";

interface Iprops {
  uuid: string;
}

export default function Career({ uuid }: Iprops) {
  const indtroduceMaxLength = 500;

  const navigate = useNavigate();

  type totalDateParams = {
    year: number,
    month: number,
  }

  const [careerType, setCareerType] = useState<string>(D_careerTypeList[0]);
  const [career, setCareer] = useState<IenrollCareer[]>([]);
  const [careerPopup, setCareerPopup] = useState<boolean>(false);
  const [introduce, setIntroduce] = useState<string>("");
  const [autoSavePopup, setAutoSavePopup] = useState<boolean>(false);
  const [enrollSuccessPopup, setEnrollSuccessPopup] = useState<boolean>(false);
  const [hireCode, setHireCode] = useState<string>('');
  const [totalDate, setTotalDate] = useState<totalDateParams>({year: 0, month: 0})

  function onClickCareerType(v: string) {
    setCareerType(v);

    if (v === "경력") setCareerPopup(true);
  }

  async function onClickDelCareerBtn(index: number) {
    let _career = career;
    _career[index].isbefore && 
      await api.delete(eps["DELETE_RESUME_CAREER"](_career[index].uuid));
    _career.splice(index, 1);
    setCareer([..._career]);
  }

  async function getCareers(resumeuuid: string) {
    try {
      let { data : {list} } = await api.get(eps["GET_RESUME_CAREER"](resumeuuid, 0, 1000));
      var careerList: IenrollCareer[] = [];
      list.forEach((e :any) => {
        var item = {
          companyName: e.employer,
          workForm: e.employtype,
          startDate: new Date(e.time0),
          endDate: new Date(e.time1),
          explain: e.note_,
          workCurrent: e.ispresent === 1 ? true : false,
          isbefore: true,
          uuid: e.uuid,
        }
        careerList.push(item)
      })
      setCareer(careerList)
    } catch (err) {
      console.log(err);
    }
  }

  async function getResume(uuid: string) {
    try {
      const {data: {respdata}} = await api.get(eps["GET_RESUME"](uuid));
      respdata?.experience && setCareerType(D_careerTypeList[parseInt(respdata?.experience)])
      respdata?.note_ && setIntroduce(respdata?.note_)
      respdata?.uuid && getCareers(respdata.uuid)
    } catch (err) {
      console.log(err);
    }
  }

  async function confirmToComplete(iscomplete?: number) {
    try {
      type Iparams = {
        experience: number;
        note_: string;
        iscomplete?: number;
      }
      let data: Iparams = {
        experience: D_careerTypeList.indexOf(careerType),
        note_: introduce,
      }
      if (career.length > 0) {
        type _Iparams = {
          employer?: string;
          employtype?: string;
          note_?: String;
          employtypecode?: string;
          time0?: string;
          time1?: string;
          ispresent?: number;
          resumeuuid?: string;
        }
        let _careerData: _Iparams = {}
        let i: any
        for (i in career) {
          if(!career[i].isbefore) {
            _careerData["employer"] = career[i]["companyName"];
            _careerData["employtype"] = career[i]["workForm"];
            _careerData["note_"] = career[i]["explain"];
            _careerData["employtypecode"] = hireCode;
            _careerData["time0"] = moment(career[i]["startDate"]).format("YYYY-MM-DD");
            _careerData["time1"] = moment(career[i]["endDate"]).format("YYYY-MM-DD");
            _careerData["ispresent"] = career[i]["workCurrent"] ? 1 : 0;
            _careerData["resumeuuid"] = uuid;
            await api.post(eps["REGISTER_CAREER"], _careerData);
          }
        }
      }
      if (iscomplete) {
        data["iscomplete"] = iscomplete;
        setEnrollSuccessPopup(true)
      } else {
        data["iscomplete"] = iscomplete;
        navigate("/home")
      }
      await api.put(eps["REGISTER_RESUME"] + `/uuid/${uuid}`, data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    uuid && getResume(uuid);
  }, [uuid]);

  useEffect(() => {
    var month = 1000*60*60*24*30;

    var total: number = 0
    career.forEach((e: any) => {
      var gap = e.endDate - e.startDate;
      total += Math.floor(gap/month) + 1;
    })
    setTotalDate({
      year: Math.floor(total/12),
      month: total%12
    })
  }, [career]);

  return (
    <>
      <article className={styles.career}>
        <div className={styles.titleCont}>
          <h1 className={styles.progressTitle}>경력을 입력해 주세요.</h1>

          <ul className={styles.explainList}>
            <li>
              등록하신 정보는 공고 지원 이외의 용도로는 활용되지 않습니다.
            </li>
          </ul>
        </div>

        <div className={styles.formCont}>
          <ul className={styles.formList}>
            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>
                  경력
                  <span className={styles.red}>*</span>
                </p>
              </div>

              <div className={styles.valueBox}>
                <ul className={styles.selectList}>
                  {D_careerTypeList.map((v, i) => (
                    <Fragment key={i}>
                      {i !== 0 && <hr />}
                      <li
                        className={v === careerType ? styles.on : ""}
                        onClick={() => onClickCareerType(v)}
                      >
                        <ChkBlue className={styles.chkBlue} />
                        <p>{v}</p>
                      </li>
                    </Fragment>
                  ))}
                </ul>

                {careerType === "경력" &&
                  (career.length === 0 ? (
                    <p className={styles.errorMsg}>경력을 추가해 주세요.</p>
                  ) : (
                    <div className={styles.careerCont}>
                      <div className={styles.totalBar}>총 {totalDate.year}년 {totalDate.month}개월</div>

                      <ul className={styles.careerList}>
                        {career.map((v, i) => (
                          <li key={i}>
                            <div className={styles.infoBox}>
                              <p className={styles.companyName}>
                                {v.companyName}
                              </p>

                              <p className={styles.term}>
                                {`${v.startDate.getFullYear()}.${v.startDate.getMonth() + 1
                                  }`}
                                ~
                                {`${v.endDate.getFullYear()}.${v.endDate.getMonth() + 1
                                  }`}
                              </p>
                            </div>

                            <button
                              className={styles.delBtn}
                              onClick={() => onClickDelCareerBtn(i)}
                            >
                              <CircleXGray />
                            </button>
                          </li>
                        ))}
                      </ul>

                      <button
                        className={styles.addBtn}
                        onClick={() => setCareerPopup(true)}
                      >
                        <PlusBlue />

                        <p>경력 추가</p>
                      </button>
                    </div>
                  ))}
              </div>
            </li>

            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>자기소개</p>

                <p className={styles.count}>
                  <span className={styles.current}>{introduce.length}</span>/
                  {indtroduceMaxLength}
                </p>
              </div>

              <div className={styles.valueBox}>
                <textarea
                  value={introduce}
                  onChange={(e) => setIntroduce(e.target.value)}
                  placeholder="자기소개 입력"
                  maxLength={indtroduceMaxLength}
                />
              </div>
            </li>
          </ul>
        </div>
      </article>

      <article className={styles.btnArea}>
        <button
          type="button"
          className={styles.autoSaveBtn}
          onClick={() => setAutoSavePopup(true)}
        >
          임시저장
        </button>

        <button
          className={styles.submitBtn}
          disabled={careerType === "경력" && !career.length}
          onClick={() => confirmToComplete(1)}
        >
          등록 완료
        </button>
      </article>

      {careerPopup && (
        <>
          <CareerPopup
            career={career}
            setCareer={setCareer}
            off={() => setCareerPopup(false)}
            setHireCode = {setHireCode}
          />
          <PopupBg bg off={() => setCareerPopup(false)} />
        </>
      )}

      {autoSavePopup && (
        <>
          <BottomSheetPopup
            title="임시저장 완료"
            subText="지금까지 작성된 내용이 임시저장되었습니다."
            cancelText="그만쓰기"
            cancelFunc={() => confirmToComplete(0)}
            confirmText="계속쓰기"
            confirmFunc={() => setAutoSavePopup(false)}
            off={() => setAutoSavePopup(false)}
          />
          <PopupBg bg off={() => setAutoSavePopup(false)} />
        </>
      )}

      {enrollSuccessPopup && (
        <>
          <EnrollSuccessPopup off={() => navigate("/mypage/resume")} />
          <PopupBg bg off={() => navigate("/mypage/resume")} />
        </>
      )}
    </>
  );
}
