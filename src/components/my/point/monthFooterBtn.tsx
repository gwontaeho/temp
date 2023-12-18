import styles from "./monthFooterBtn.module.scss";
import { ReactComponent as ChevronLeft } from "assets/images/icon/ChevronLeft.svg";
import { ReactComponent as ChevronRight } from "assets/images/icon/ChevronRight.svg";
import { ReactComponent as TriangleDown } from "assets/images/icon/TriangleDown.svg";
import PopupBg from "components/common/popupBg";
import { useState } from "react";
import SelectDatePopup from "./selectDatePopup";

export default function MonthFooter() {
  const [date, setDate] = useState<Date>(new Date());
  const [selDatePopup, setSelDatePopup] = useState<boolean>(false);

  function onClickPreBtn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();

    let _date = new Date(date.getTime());
    _date.setMonth(_date.getMonth() - 1);
    setDate(_date);
  }

  function onClickNextBtn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();

    let _date = new Date(date.getTime());

    if (_date.getMonth() == 11) _date.setFullYear(_date.getFullYear() + 1, 0);
    else _date.setMonth(_date.getMonth() + 1);

    setDate(_date);
  }

  return (
    <>
      <button
        className={styles.monthFooterBtn}
        onClick={() => setSelDatePopup(true)}
      >
        <button className={styles.preBtn} onClick={onClickPreBtn}>
          <ChevronLeft />
        </button>

        <span className={styles.valueBox}>
          <p>
            {date.getFullYear()}년 {date.getMonth() + 1}월
          </p>

          <TriangleDown />
        </span>

        <button className={styles.nextBtn} onClick={onClickNextBtn}>
          <ChevronRight />
        </button>
      </button>

      {selDatePopup && (
        <>
          <SelectDatePopup
            date={date}
            setDate={setDate}
            off={() => setSelDatePopup(false)}
          />
          <PopupBg bg off={() => setSelDatePopup(false)} />
        </>
      )}
    </>
  );
}
