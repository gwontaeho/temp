import { useState } from "react";
import styles from "./checkApply.module.scss";
import DetailHeader from "components/header/detailHeader";
import { D_applyResumeList } from "data/my/apply/D_apply";
import { ReactComponent as SearchDoc } from "assets/images/icon/SearchDoc.svg";
import { ReactComponent as ConfirmBlue } from "assets/images/icon/ConfirmBlue.svg";
import { useNavigate } from "react-router-dom";

export default function CheckApply() {
  const navigate = useNavigate();

  const [applyList, setApplyList] =
    useState<IapplyResumeSimple[]>(D_applyResumeList);

  return (
    <>
      <DetailHeader title="지원확인" bottomBorder />

      <main className={styles.checkApply}>
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

                    <p
                      className={`${styles.seen} ${
                        v.status === "미열람" ? styles.red : ""
                      } 
                       ${v.status === "채용 제안중" ? styles.blue : ""}
                       ${v.status === "제안거절" ? styles.blue : ""}
                      `}
                    >
                      {v.status}
                    </p>
                  </div>

                  <p className={styles.name}>{v.name}</p>

                  <ul className={styles.infoList}>
                    <li>
                      <p className={styles.key}>근무형태</p>
                      <hr />
                      <p className={styles.value}>{v.workForm}</p>
                    </li>

                    <li>
                      <p className={styles.key}>경력</p>
                      <hr />
                      <p className={styles.value}>{v.career}</p>
                    </li>
                  </ul>
                </div>

                <div className={styles.actionBar}>
                  <button
                    className={styles.resumeBtn}
                    onClick={() => navigate(`${i}`)}
                  >
                    <SearchDoc />
                    <p>지원이력서</p>
                  </button>

                  <hr />

                  <button
                    className={styles.confirmBtn}
                    onClick={() => window.open(`tel:050-0000-0000`)}
                    disabled={
                      v.status === "채용 제안중" || v.status === "제안거절"
                    }
                  >
                    <ConfirmBlue />
                    <p>채용하기</p>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </main>
    </>
  );
}
