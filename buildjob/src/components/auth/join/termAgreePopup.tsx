import { D_termPopupList } from "data/auth/D_join";
import styles from "./termAgreePopup.module.scss";
import { ReactComponent as ChkCircleGray } from "assets/images/icon/ChkCircleGray.svg";
import { ReactComponent as ChevronRight } from "assets/images/icon/ChevronRight.svg";
import { useState } from "react";
import TermPopup from "../termPopup/termPopup";
import { useNavigate } from "react-router-dom";

export default function TermAgreePopup() {
  const navigate = useNavigate();

  const [agreeList, setAgreeList] = useState<boolean[]>(
    new Array(D_termPopupList.length).fill(false)
  );
  const [detailPopup, setDetailPopup] = useState<ItermCategory | "">("");

  function onClickAgreeAll() {
    let _agreeList = agreeList;
    if (_agreeList.indexOf(false) !== -1)
      setAgreeList([...new Array(agreeList.length).fill(true)]);
    else setAgreeList([...new Array(agreeList.length).fill(false)]);
  }

  function onClickAgree(index: number) {
    let _agreeList = agreeList;
    _agreeList[index] = !_agreeList[index];
    setAgreeList([...agreeList]);
  }

  function onClickDetailBtn(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    category: ItermCategory
  ) {
    e.stopPropagation();
    setDetailPopup(category);
  }

  return (
    <>
      <section className={styles.termAgreePopup}>
        <article className={styles.topBar}>
          <h1 className={styles.popupTitle}>서비스 이용을 위해 동의해주세요</h1>
        </article>

        <article className={styles.contArea}>
          <div className={styles.agreeCont}>
            <button
              className={`${styles.allAgreeBtn} ${
                agreeList.indexOf(false) === -1 ? styles.on : ""
              }`}
              onClick={onClickAgreeAll}
            >
              <ChkCircleGray className={styles.chk} />

              <p>전체동의</p>
            </button>

            <ul className={styles.agreeList}>
              {D_termPopupList.map((v, i) => (
                <li
                  key={i}
                  className={`${agreeList[i] ? styles.on : ""} ${
                    v.required ? styles.required : ""
                  }`}
                  onClick={() => onClickAgree(i)}
                >
                  <ChkCircleGray className={styles.chk} />

                  <p>{`${v.cont} ${v.required ? "(필수)" : ""}`}</p>

                  <button
                    className={styles.detailBtn}
                    onClick={(e) => onClickDetailBtn(e, v.category)}
                  >
                    <ChevronRight className={styles.chevron} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            className={styles.submitBtn}
            disabled={!(agreeList[0] && agreeList[1])}
            onClick={() => navigate("/home")}
          >
            가입하기
          </button>
        </article>
      </section>

      {detailPopup && (
        <TermPopup category={detailPopup} off={() => setDetailPopup("")} />
      )}
    </>
  );
}
