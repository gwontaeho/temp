import { ReactComponent as PlusSmallGray } from "assets/images/icon/PlusSmallGray.svg";
import { useRef, useState } from "react";
import styles from "./index.module.scss";

import Slider from "react-slick";
import Announce from "./announce";

const maxPage = 8;
const limit = 3;

interface Iprops {
  title: string;
  list: IannounceList[];
  marginTop?: number;
}

export default function AnnounceList({ title, list, marginTop = 40 }: Iprops) {
  const sliderRef = useRef<Slider | null>(null);
  const [page, setPage] = useState<number>(1);

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    autoplay: false,
    afterChange: (index: number) => setPage(index + 1),
  };

  function onClickPageBtn() {
    const ref = sliderRef.current;

    if (ref && page < maxPage) {
      setPage(page + 1);
      ref.slickGoTo(page);
    }
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

      <Slider ref={sliderRef} {...settings} className={styles.slickArea}>
        {new Array(maxPage).fill("").map((page, i) => (
          <li key={i} className={styles.contBox}>
            <ul className={styles.announceList}>
              {list.slice(i * limit, (i + 1) * limit).map((detV, detI) => (
                <Announce key={detI} data={detV} />
              ))}
            </ul>
          </li>
        ))}
      </Slider>
    </section>
  );
}
