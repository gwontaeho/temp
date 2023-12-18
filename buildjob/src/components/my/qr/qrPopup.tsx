import styles from "./qrPopup.module.scss";
import { ReactComponent as LogoWhite } from "assets/images/logo/LogoWhite.svg";
import { ReactComponent as Rotate } from "assets/images/icon/Rotate.svg";
import Qr from "assets/images/example/my/qr/Qr.png";
import { useEffect, useRef, useState } from "react";

export default function QrPopup() {
  const timeOutRef = useRef<any>();

  const [timeLimit, setTimeLimit] = useState<boolean>(true);

  function displayQr() {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    setTimeLimit(true);

    timeOutRef.current = setTimeout(() => {
      setTimeLimit(false);
    }, 3000);
  }

  useEffect(() => {
    displayQr();
  }, []);

  return (
    <section className={styles.qrPopup}>
      <hr className={styles.headerBar} />

      <article className={styles.contArea}>
        <div className={styles.logoBox}>
          <LogoWhite />
        </div>

        <div
          className={`${timeLimit ? "" : styles.off} ${styles.qrBox}`}
          onClick={displayQr}
        >
          <img className={styles.qrImg} src={Qr} alt="" />

          <Rotate className={styles.reloadImg} />
        </div>

        <div className={styles.pointCont}>
          <p className={styles.contTitle}>포인트</p>

          <ul className={styles.pointList}>
            <li>
              <p className={styles.key}>보유잔액</p>
              <p className={styles.value}>20,000P</p>
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
}
