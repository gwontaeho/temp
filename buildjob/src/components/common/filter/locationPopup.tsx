import { ReactComponent as ChkBlue } from "assets/images/icon/ChkBlue.svg";
import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { regionSelector } from "states/categories/region";
import styles from "./locationPopup.module.scss";

interface IProps {
  location: string[];
  setLocation: Function;
  off: Function;
}

export default function LocationPopup({ location, setLocation, off }: IProps) {
  const region = useRecoilValue(regionSelector);
  const maxLength = 10;

  const [largeCategory, setLargeCategory] = useState<number>(0);
  const [subList, setSubList] = useState<IcategoryList[] | null>();
  const [smallCategory, setSmallCategory] = useState<string[]>(location);

  function onClickSmallCategory(v: any) {
    if (smallCategory.length >= maxLength) return;

    let _smallCategory = smallCategory;
    if (_smallCategory.indexOf(v) !== -1)
      _smallCategory = _smallCategory.filter((detV) => v !== detV);
    else _smallCategory.push(v);

    setSmallCategory([..._smallCategory]);
  }

  function delSmallCatrgory(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    v: string
  ) {
    e.stopPropagation();

    let _smallCategory = smallCategory;
    _smallCategory = _smallCategory.filter((detV) => v !== detV);
    setSmallCategory([..._smallCategory]);
  }

  function onClickResetBtn() {
    setLocation([]);
    off();
  }

  function onClickConfirmBtn() {
    setLocation([...smallCategory]);
    off();
  }

  useEffect(() => {
    region && setSubList(region[largeCategory].subgroup);
  }, [largeCategory, region]);

  return (
    <section className={styles.locationPopup}>
      <article className={styles.topBar}>
        <h1 className={styles.popupTitle}>지역</h1>

        <button className={styles.closeBtn} onClick={() => off()}>
          <XGray />
        </button>
      </article>

      <article className={styles.contArea}>
        <ul className={styles.largeCategoryList}>
          {region?.map((v: any, i: number) => (
            <li
              key={i}
              className={`${i === largeCategory ? styles.on : ""}`}
              onClick={() => setLargeCategory(i)}
            >
              <p>{v.name}</p>
            </li>
          ))}
        </ul>

        <ul className={styles.smallCategoryList}>
          {subList?.map((v: any, i: any) => (
            <li
              key={i}
              className={`${smallCategory.indexOf(v) !== -1 ? styles.on : ""}`}
              onClick={() => onClickSmallCategory(v)}
            >
              <p>{v.name}</p>

              <ChkBlue className={styles.chkBlue} />
            </li>
          ))}
        </ul>
      </article>

      <article
        className={`${styles.bottomBar} ${
          smallCategory.length > 0 ? styles.some : ""
        }`}
      >
        <div className={styles.resultCont}>
          <p className={styles.countBox}>
            <span className={styles.count}>{smallCategory.length}</span>/
            {maxLength}
          </p>

          <ul className={styles.resultList}>
            {smallCategory.map((v: any, i: number) => (
              <li key={i}>
                <p>{v.name}</p>

                <button
                  className={styles.delBtn}
                  onClick={(e) => delSmallCatrgory(e, v)}
                >
                  <XGray />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.btnBox}>
          <button className={styles.resetBtn} onClick={onClickResetBtn}>
            초기화
          </button>

          <button className={styles.confirmBtn} onClick={onClickConfirmBtn}>
            결과보기
          </button>
        </div>
      </article>
    </section>
  );
}
