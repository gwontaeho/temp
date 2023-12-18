import { useState } from "react";
import styles from "./selectDatePopup.module.scss";
import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";

interface Iprops {
  date: Date;
  setDate: Function;
  off: Function;
}

export default function SelectDatePopup({ date, setDate, off }: Iprops) {
  const yearList: number[] = Array.from(new Array(12), (x, i) => i + 2012);
  const monthList: number[] = Array.from(
    Array.from(new Array(12), (x, i) => i + 1)
  );

  const [popupDate, setPopupDate] = useState<Date>(date);

  function onClickYearPicker(value: number) {
    let _popupDate = new Date(popupDate.getTime());
    _popupDate.setFullYear(value);
    setPopupDate(_popupDate);
  }

  function onClickMonthPicker(value: number) {
    let _popupDate = new Date(popupDate.getTime());
    _popupDate.setMonth(value);
    setPopupDate(_popupDate);
  }

  function onClickConfirmBtn() {
    setDate(popupDate);
    off();
  }

  return (
    <section className={styles.selectDatePopup}>
      <article className={styles.topBar}>
        <h1 className={styles.popupTitle}>날짜 선택</h1>

        <button className={styles.closeBtn} onClick={() => {}}>
          <XGray />
        </button>
      </article>

      <article className={styles.contArea}>
        <div className={styles.selCont}>
          <ul className={`${styles.yearList} ${styles.pickerList}`}>
            {yearList.map((v, i) => (
              <li
                key={i}
                className={v === popupDate.getFullYear() ? styles.on : ""}
                onClick={() => onClickYearPicker(v)}
              >
                {v}년
              </li>
            ))}
          </ul>

          <ul className={`${styles.monthList} ${styles.pickerList}`}>
            {monthList.map((v, i) => (
              <li
                key={i}
                className={v === popupDate.getMonth() + 1 ? styles.on : ""}
                onClick={() => onClickMonthPicker(v - 1)}
              >
                {v}월
              </li>
            ))}
          </ul>
        </div>

        <button className={styles.confirmBtn} onClick={onClickConfirmBtn}>
          <p>확인</p>
        </button>
      </article>
    </section>
  );
}
