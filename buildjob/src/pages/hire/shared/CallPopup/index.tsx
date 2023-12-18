import { ReactComponent as CallFill } from "assets/images/icon/CallFill.svg";
import { useMemo } from "react";
import styles from "./index.module.scss";

interface Iprops {
  off: Function;
  phoneNumber?: string;
}

export default function CallPopup({ off, ...props }: Iprops) {
  const phoneNumber = useMemo(() => {
    return props.phoneNumber?.replaceAll(/-/g, "").replace("+82", "0");
  }, [props.phoneNumber]);
  function onClickCallBtn() {
    window.open(`tel:${phoneNumber}`);
  }

  return (
    <section className={styles.callPopup}>
      <button
        className={`${styles.actionBtn} ${styles.callBtn}`}
        onClick={onClickCallBtn}
      >
        <CallFill />
        <p>{phoneNumber}</p>
      </button>
      <button
        className={`${styles.actionBtn} ${styles.cancelBtn}`}
        onClick={() => off()}
      >
        <p>취소</p>
      </button>
    </section>
  );
}
