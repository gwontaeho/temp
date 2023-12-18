import styles from "./hireSituation.module.scss";
import DetailHeader from "components/header/detailHeader";
import { D_hireSituation } from "data/my/D_hireSituation";
import { useNavigate } from "react-router-dom";

export default function HireSituation() {
  const navigate = useNavigate();

  return (
    <>
      <DetailHeader title="채용현황" bottomBorder />

      <main className={styles.hireSituation}>
        <h1 className={styles.count}>
          전체 <strong>{D_hireSituation.length}</strong>건
        </h1>

        <ul className={styles.historyList}>
          {D_hireSituation.map((v, i) => (
            <li key={i}>
              <div className={styles.contArea}>
                <div className={styles.topBar}>
                  <p className={styles.date}>{v.date}</p>

                  <p
                    className={`${v.status === "채용중" ? styles.blue : ""} ${
                      styles.status
                    }`}
                  >
                    {v.status}
                  </p>
                </div>

                <p className={styles.title}>{v.personName}</p>

                <ul className={styles.infoList}>
                  <li>
                    <p className={styles.key}>가상계좌</p>
                    <hr />
                    <p className={styles.value}>{v.form}</p>
                  </li>

                  <li>
                    <p className={styles.key}>가상계좌</p>
                    <hr />
                    <p className={styles.value}>{v.terms}</p>
                  </li>

                  <li>
                    <p className={styles.key}>가상계좌</p>
                    <hr />
                    <p className={styles.value}>{v.time}</p>
                  </li>

                  <li>
                    <p className={styles.key}>가상계좌</p>
                    <hr />
                    <p className={styles.value}>{v.dayOfWeek}</p>
                  </li>

                  <li>
                    <p className={styles.key}>가상계좌</p>
                    <hr />
                    <p className={styles.value}>{v.pay}</p>
                  </li>
                </ul>
              </div>

              {v.status === "채용중" && (
                <div className={styles.btnBar}>
                  <button onClick={() => navigate(`cancel_hire/${i}`)}>
                    채용취소
                  </button>

                  <button
                    className={styles.blue}
                    onClick={() => navigate(`/notice/payHire/${i}`)}
                  >
                    계약연장
                  </button>
                </div>
              )}

              {v.status === "계약만료" && (
                <div className={styles.btnBar}>
                  <button
                    className={styles.blue}
                    onClick={() => navigate(`review_hire/${i}`)}
                  >
                    리뷰남기기
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
