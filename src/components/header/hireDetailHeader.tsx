import { ReactComponent as ChevronLeftBig } from "assets/images/icon/ChevronLeftBig.svg";
import { Fragment, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./hireDetailHeader.module.scss";

interface Iprops {
  title: string;
  utilElements?: ReactNode[];
}

export default function HireDetailHeader({ title, utilElements }: Iprops) {
  const navigate = useNavigate();

  return (
    <header className={styles.hireDetailHeader}>
      <article className={styles.leftArea}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ChevronLeftBig />
        </button>

        <h1 className={styles.pageTitle}>{title}</h1>
      </article>

      {utilElements && (
        <article className={styles.rightArea}>
          {utilElements.map((element, index) => (
            <Fragment key={index}>{element}</Fragment>
          ))}
        </article>
      )}
    </header>
  );
}
