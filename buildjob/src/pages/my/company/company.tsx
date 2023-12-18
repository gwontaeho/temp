import DetailHeader from "components/header/detailHeader";
import styles from "./company.module.scss";
import { ReactComponent as ChevronRight } from "assets/images/icon/ChevronRight.svg";
import { useNavigate } from "react-router-dom";

export default function Company() {
  const navigate = useNavigate();

  return (
    <>
      <DetailHeader title="기업서비스" bottomBorder />

      <main className={styles.company}>
        <article className={styles.actionArea}>
          <ul className={styles.actionList}>
            <li onClick={() => navigate("jobopening")}>
              <p>공고관리</p>
              <ChevronRight />
            </li>

            <li onClick={() => navigate("jobopening/enroll")}>
              <p>공고등록</p>
              <ChevronRight />
            </li>

            <li onClick={() => navigate("apply")}>
              <p>지원확인</p>
              <ChevronRight />
            </li>

            <li onClick={() => navigate("hire_situation")}>
              <p>채용현황</p>
              <ChevronRight />
            </li>

            <li onClick={() => navigate("payhistory")}>
              <p>결제내역</p>
              <ChevronRight />
            </li>
          </ul>
        </article>
      </main>
    </>
  );
}
