import { D_historyCatgoryList } from "data/my/history/D_history";
import styles from "./history.module.scss";
import DetailHeader from "components/header/detailHeader";
import { useState } from "react";
import Point from "components/my/point/point";
import Payment from "components/my/point/payment";
import { useLocation } from "react-router-dom";

export default function History() {
  const location = useLocation();

  const [category, setCategory] = useState(
    location.state?.category || D_historyCatgoryList[0]
  );

  return (
    <>
      <DetailHeader title="내역" bottomBorder />

      <main className={styles.history}>
        <article className={styles.categoryBar}>
          <ul className={styles.categoryList}>
            {D_historyCatgoryList.map((v, i) => (
              <li
                key={i}
                className={v === category ? styles.on : ""}
                onClick={() => setCategory(v)}
              >
                {v}
              </li>
            ))}
          </ul>
        </article>

        {category === D_historyCatgoryList[0] && <Point />}
        {category === D_historyCatgoryList[1] && <Payment />}
      </main>
    </>
  );
}
