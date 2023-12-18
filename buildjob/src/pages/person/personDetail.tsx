import styles from "./personDetail.module.scss";
import { ReactComponent as LogoWhite } from "assets/images/logo/LogoWhite.svg";
import { ReactComponent as ChevronLeftBig } from "assets/images/icon/ChevronLeftBig.svg";
import { ReactComponent as NavMarkerGray } from "assets/images/icon/NavMarkerGray.svg";
import { ReactComponent as FlagBlue } from "assets/images/icon/FlagBlue.svg";
import { ReactComponent as ChkBlue } from "assets/images/icon/ChkBlue.svg";
import { ReactComponent as StarFill } from "assets/images/icon/StarFill.svg";
import defaultProfImg from "assets/images/icon/DefaultProfImg.svg";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavBar from "components/bottomBar/bottomNavBar";
import PersonDetailBg from "assets/images/bg/person/PersonDetailBg.svg";
import { api, eps } from "utils/config";
import moment from 'moment';
import { useEffect, useState } from "react";

export default function PersonDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  interface Iapplicant {
    urlprofileimage: string;
    username: string;
    isseeking: string;
    region: string;
    jobtype: string;
    jobtype2: string;
    rating: string;
    level: number;
  }

  const [applicantInfo, setApplicantInfo] = useState<Iapplicant>();
  const [resumeInfo, setResumeInfo] = useState<any>();
  const [listCareer, setListCareer] = useState<any>();

  function handleClickOffer() {
    navigate("offer");
  }

  async function getApplicants() {
    try {
      let { data } = await api.get(eps["GET_APPLICANT_INFO"](location?.state.uuid));
      data.applicant && setApplicantInfo(data.applicant);
      data.resume && setResumeInfo(data.resume);
      data.listcareer && setListCareer(data.listcareer);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getApplicants();
  }, []);

  return (
    <>
      <header
        className={styles.header}
        style={{
          background: `url(${PersonDetailBg}),
      linear-gradient(89.93deg, #6977f9 0.05%, #5f4cf1 104.09%)`,
        }}
      >
        <section className={styles.headerSec}>
          <article className={styles.leftArea}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
              <ChevronLeftBig />
            </button>
          </article>

          <LogoWhite />

          <article className={styles.rightArea}></article>
        </section>
      </header>

      <main className={styles.personDetail}>
        <section className={styles.innerSec}>
          <span className={styles.profImgBox}>
            <img className={styles.profImg} src={applicantInfo?.urlprofileimage || defaultProfImg} alt="" />
          </span>

          <article className={styles.initArea}>
            <div className={styles.nameBar}>
              <h1 className={styles.name}>{applicantInfo?.username ? applicantInfo?.username : 'Null'}</h1>

              {applicantInfo?.isseeking && <p className={styles.selfFind}>셀프구직중</p>}
            </div>

            <div className={styles.infoCont}>
              <div className={`${styles.location} ${styles.infoBox}`}>
                <p className={styles.key}>희망지역</p>
                <div className={styles.value}>
                  <NavMarkerGray />
                  <p>{applicantInfo?.region ? applicantInfo?.region : '미 설정'}</p>
                </div>
              </div>

              <div className={`${styles.category} ${styles.infoBox}`}>
                <p className={styles.key}>직종</p>

                <ul className={styles.value}>
                  {/* {["서빙", "주방장·조리사"].map((v, i) => (
                    <li key={i}># {v}</li>
                  ))} */}
                  {applicantInfo?.jobtype ? 
                    <>
                      <li># {applicantInfo?.jobtype}</li> 
                      <li># {applicantInfo?.jobtype2}</li> 
                    </>
                    : 
                    <li>미 설정</li>
                  }
                </ul>
              </div>
            </div>

            {/* 제안 상태에 따른 분기 */}
            {true ? (
              <button className={styles.callBtn} onClick={handleClickOffer}>
                <FlagBlue />
                <p>제안하기</p>
              </button>
            ) : (
              <button className={styles.callBtn} onClick={handleClickOffer}>
                <ChkBlue />
                <p>제안완료</p>
              </button>
            )}
          </article>

          <article className={styles.scoreArea}>
            <p className={styles.areaTitle}>평균 평점</p>

            <div className={styles.scoreBar}>
              <ul className={styles.scoreList}>
                {applicantInfo?.rating && new Array(Math.round(parseFloat(applicantInfo?.rating))).fill("").map((v, i) => <StarFill key={i} />)}
              </ul>

              <p className={styles.label}>
                <strong className={styles.score}>
                  {applicantInfo?.rating ? applicantInfo?.rating : 0} 
                </strong> / {applicantInfo?.level ? applicantInfo?.level : 0}등급
              </p>
            </div>
          </article>

          <article className={styles.introduceArea}>
            <p className={styles.areaTitle}>자기소개서</p>

            <div className={styles.valueBox}>
              <p className={styles.introduce}>{resumeInfo?.note_}</p>
            </div>
          </article>

          <article className={styles.careerArea}>
            <p className={styles.areaTitle}>경력</p>

            <ul className={styles.careerList}>
              {listCareer?.map((v: any, i: number) => (
                <li key={i}>
                  <p className={styles.company}>{v.employer}</p>
                  <p className={styles.location}>{v.note_}</p>
                  <p className={styles.period}>
                    {moment(v.time0).format('YYYY-MM')} - {moment(v.time1).format('YYYY-MM')}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>

      <BottomNavBar activeLabel="인재찾기" />
    </>
  );
}
