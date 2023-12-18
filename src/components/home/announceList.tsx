import { ReactComponent as PlusSmallGray } from "assets/images/icon/PlusSmallGray.svg";
import { useState } from "react";
import styles from "./announceList.module.scss";

import Announce from "./announce";

interface Iprops {
  title: string;
  list: IannounceList[];
  marginTop?: number;
}

export default function AnnounceList({ title, list, marginTop = 40 }: Iprops) {
  const maxPage = 8;

  const [page, setPage] = useState<number>(1);

  function onClickPageBtn() {
    if (page < maxPage) setPage(page + 1);
  }

  return (
    <section className={styles.announceSec} style={{ marginTop: marginTop }}>
      <article className={styles.titleArea}>
        <h1 className={styles.secTitle}>{title}</h1>

        <button className={styles.pageBtn} onClick={onClickPageBtn}>
          <p>
            {page}/{maxPage}
          </p>

          <PlusSmallGray />
        </button>
      </article>

      <ul className={styles.pageList}>
        {new Array(maxPage).fill("").map((v, i) => (
          <li key={i} className={styles.page}>
            <ul className={styles.announceList}>
              {list.map((detV, detI) => (
                <Announce key={detI} data={detV} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
