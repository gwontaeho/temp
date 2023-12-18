import styles from "./termPopup.module.scss";
import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";
import { ReactComponent as LogoBlack } from "assets/images/logo/LogoBlack.svg";
import { D_termPopupList } from "data/auth/D_join";
import { D_termList } from "data/auth/D_terPopup";
import { Fragment, useState } from "react";

interface Iprops {
  category: ItermCategory;
  off: Function;
}

export default function TermPopup({ category, off }: Iprops) {
  const [selCategory, setSelCategory] = useState<ItermCategory>(category);

  return (
    <section className={styles.termPopup}>
      <header>
        <article className={styles.titleBar}>
          <div className={styles.leftCont}>
            <button className={styles.closeBtn} onClick={() => off()}>
              <XGray />
            </button>
          </div>

          <LogoBlack />

          <div className={styles.rightCont}></div>
        </article>

        <article className={styles.categoryBar}>
          <ul className={styles.categoryList}>
            {D_termPopupList.map((v, i) => {
              return (
                <Fragment key={i}>
                  {i !== 0 && <hr />}

                  <li
                    className={v.category === selCategory ? styles.on : ""}
                    onClick={() => setSelCategory(v.category)}
                  >
                    {v.category}
                  </li>
                </Fragment>
              );
            })}
          </ul>
        </article>
      </header>

      <article className={styles.contArea}>
        <div className={styles.termCont}>
          <ul className={styles.termList}>
            {D_termList.map((v, i) => (
              <li key={i}>
                {v.title && <p className={styles.title}>{v.title}</p>}
                {v.cont && <p className={styles.cont}>{v.cont}</p>}
              </li>
            ))}
          </ul>
        </div>

        <footer className={styles.bottomBar}>
          <p>
            ⓒ<strong className={styles.companyName}>Buld Job</strong> Corp.
          </p>
        </footer>
      </article>
    </section>
  );
}
