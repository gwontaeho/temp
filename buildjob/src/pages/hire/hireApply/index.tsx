import { ReactComponent as ChkCircleGray } from "assets/images/icon/ChkCircleGray.svg";
import PopupBg from "components/common/popupBg";
import DetailHeader from "components/header/detailHeader";
import { D_appltResumeList } from "data/hire/D_hireDetail";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplyCompletePopup from "../shared/ApplyCompletePopup";
import styles from "./index.module.scss";

export default function HireApply() {
  const navigate = useNavigate();

  const [applyCompletePopup, setApplyCompletePopup] = useState<boolean>(false);
  const [selResume, setSelResume] = useState<number>();

  return (
    <>
      <DetailHeader title="지원하기" bottomBorder />

      <main className={styles.hireApply}>
        <section className={styles.applySec}>
          <article className={`${styles.infoArea} ${styles.contArea}`}>
            <h1 className={styles.areaTitle}>지원내용</h1>

            <ul className={styles.infoList}>
              <li>
                <p className={styles.key}>회사명</p>
                <p className={styles.value}>(주)위베네베네</p>
              </li>
              <li>
                <p className={styles.key}>업무내용</p>
                <p className={`${styles.multiLine} ${styles.value}`}>
                  베네베네 직영점 [신세계 강남점] 정규직 모집
                </p>
              </li>
            </ul>
          </article>

          <article className={`${styles.infoArea} ${styles.contArea}`}>
            <h1 className={styles.areaTitle}>지원정보</h1>

            <ul className={styles.infoList}>
              <li>
                <p className={styles.key}>이름</p>
                <p className={styles.value}>김둘리</p>
              </li>
              <li>
                <p className={styles.key}>전화번호</p>
                <p className={styles.value}>010-2345-6789</p>
              </li>
            </ul>
          </article>

          <article className={`${styles.resumeArea} ${styles.contArea}`}>
            <h1 className={styles.areaTitle}>이력서 선택</h1>

            <ul className={styles.resumeList}>
              {D_appltResumeList.map((v, i) => (
                <li
                  key={i}
                  className={i === selResume ? styles.on : ""}
                  onClick={() => setSelResume(i)}
                >
                  <ChkCircleGray className={styles.chk} />

                  <div className={styles.infoCont}>
                    <p className={styles.name}>{v.name}</p>

                    <div className={styles.utilBar}>
                      <p
                        className={styles.date}
                      >{`작성일 : ${v.date.getFullYear()}.${
                        v.date.getMonth() + 1
                      }.${v.date.getDate()}`}</p>

                      <button
                        className={styles.watchBtn}
                        onClick={() => navigate("/mypage/resume")}
                      >
                        보기
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <button
          disabled={selResume === undefined}
          className={styles.submitBtn}
          onClick={() => setApplyCompletePopup(true)}
        >
          <p>지원하기</p>
        </button>
      </main>

      {applyCompletePopup && (
        <>
          <ApplyCompletePopup off={() => setApplyCompletePopup(false)} />
          <PopupBg bg off={() => setApplyCompletePopup(false)} />
        </>
      )}
    </>
  );
}
