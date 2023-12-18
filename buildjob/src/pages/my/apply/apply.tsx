import { useState } from "react";
import styles from "./apply.module.scss";
import DetailHeader from "components/header/detailHeader";
import { D_applyList } from "data/my/apply/D_apply";
import { ReactComponent as SearchDoc } from "assets/images/icon/SearchDoc.svg";
import { ReactComponent as DisableRed } from "assets/images/icon/DisableRed.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Apply() {
  const navigate = useNavigate();
  
  const [applyList, setApplyList] = useState(D_applyList);

  function onClickCancelBtn(index: number) {
    let _applyList = applyList;
    _applyList.splice(index, 1);
    setApplyList([..._applyList]);
    toast("이력서가 삭제되었습니다.");
  }

  return (
    <>
      <DetailHeader title="지원현황" bottomBorder />

      <main className={styles.apply}>
        <article className={styles.countBar}>
          <p className={styles.count}>
            전체 <strong>{applyList.length}</strong>건
          </p>
        </article>

        <article className={styles.listArea}>
          <ul className={styles.applyList}>
            {applyList.map((v, i) => (
              <li key={i}>
                <div className={styles.infoCont}>
                  <div className={styles.statusBar}>
                    <p className={styles.timeFormBox}>
                      {v.date} · {v.form}
                    </p>

                    {v.form === "온라인지원" && (
                      <p
                        className={`${styles.seen} ${
                          v.seen ? styles.blue : styles.red
                        }`}
                      >
                        {v.seen ? "열람" : "미열람"}
                      </p>
                    )}
                  </div>

                  <p className={styles.companyName}>{v.companyName}</p>

                  <p className={styles.hireTitle}>{v.hireTitle}</p>

                  <p className={styles.locationPay}>
                    {v.location} ·{" "}
                    <strong className={styles.red}>{v.payForm}</strong> {v.pay}
                  </p>
                </div>

                {v.form === "온라인지원" && (
                  <div className={styles.actionBar}>
                    <button
                      className={styles.resumeBtn}
                      onClick={() => navigate(`${i}/resume`)}
                    >
                      <SearchDoc />
                      <p>지원이력서</p>
                    </button>

                    <hr />

                    <button
                      className={styles.cancelBtn}
                      onClick={() => onClickCancelBtn(i)}
                    >
                      <DisableRed />
                      <p>지원취소</p>
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </article>
      </main>
    </>
  );
}
