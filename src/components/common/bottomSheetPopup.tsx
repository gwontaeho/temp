import styles from "./bottomSheetPopup.module.scss";
import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";

interface Iprops {
  title?: string;
  subText?: string;
  cancelText: string;
  cancelFunc: Function;
  confirmText: string;
  confirmFunc: Function;
  off: Function;
}

export default function BottomSheetPopup({
  title,
  subText,
  cancelText,
  cancelFunc,
  confirmText,
  confirmFunc,
  off,
}: Iprops) {
  function onClickConfirmBtn() {
    confirmFunc();
    off();
  }

  return (
    <section className={styles.bottomSheetPopup}>
      <button className={styles.closeBtn} onClick={() => off()}>
        <XGray />
      </button>

      <article className={styles.contArea}>
        <p className={styles.cont}>{title}</p>
        <p className={styles.subText}>{subText}</p>
      </article>

      <article className={styles.btnArea}>
        <button className={styles.cancelBtn} onClick={() => cancelFunc()}>
          {cancelText}
        </button>
        <button className={styles.confirmBtn} onClick={onClickConfirmBtn}>
          {confirmText}
        </button>
      </article>
    </section>
  );
}
