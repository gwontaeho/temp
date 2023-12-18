import DetailHeader from "components/header/detailHeader";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { formatPay } from "utils/formatJobPostData";
import { FavoriteButton } from "./FavoriteButton";
import { useFavorites } from "./hooks/useFavorites";
import styles from "./index.module.scss";

export default function Scrab() {
  return (
    <>
      <DetailHeader title="스크랩" bottomBorder />

      <Suspense>
        <Resolved />
      </Suspense>
    </>
  );
}

function Resolved() {
  const { data: scrabList } = useFavorites();
  const navigate = useNavigate();

  return (
    <main className={styles.scrab}>
      <h1 className={styles.count}>
        전체 <strong>{scrabList.length}</strong>건
      </h1>

      <ul className={styles.scrabList}>
        {scrabList.map((v, i) => (
          <li
            key={i}
            onClick={() => {
              navigate(`/hire/${v.uuid}`);
            }}
          >
            <div className={styles.row}>
              <p className={styles.companyName}>{v.companyName}</p>
              <FavoriteButton uuid={v.uuid} />
            </div>

            <p className={styles.hireTitle}>{v.hireTitle}</p>

            <p className={styles.info}>
              {`${v.loc} · `}
              <span className={styles.red}>{v.payType}</span> {formatPay(v.pay)}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
