import styles from "./terms.module.scss";
import { useEffect, useState } from "react";
import { D_termsCategory, D_terms1, D_terms2, D_terms3, D_terms4 } from "data/terms/D_terms";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoBlack } from "assets/images/logo/LogoBlack.svg";
import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";
import { useLocation } from "react-router-dom";
//components
import TermsDetail from "components/terms/termsDetail";

export default function Terms() {
  const navigate = useNavigate();
  const location = useLocation();

  const [category, setCategory] = useState<string>(
    D_termsCategory[location.state?.category || 0]
  );

  const [detail, setDetail] = useState<any>([]);

  useEffect(() => {
    switch (category) {
      case D_termsCategory[0]:
        setDetail(D_terms1)
        break
      case D_termsCategory[1]:
        setDetail(D_terms2)
        break
      case D_termsCategory[2]:
        setDetail(D_terms3)
        break
      case D_termsCategory[3]:
        setDetail(D_terms4)
        break

    }
  }, [category])

  return (
    <>
      <header className={styles.header}>
        <button className={styles.exitBtn} onClick={() => navigate(-1)}>
          <XGray />
        </button>
        <LogoBlack />
        <span className={styles.blank} />
      </header>
      <main className={styles.terms}>
        <article className={styles.categoryArea}>
          <ul className={styles.categoryList}>
            {D_termsCategory.map((v, i) => (
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
        <TermsDetail
          detail={detail}
        />
      </main>
    </>
  );
}
