import { ReactComponent as Call } from "assets/images/icon/Call.svg";
import PopupBg from "components/common/popupBg";
import CallPopup from "pages/hire/shared/CallPopup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

interface Props {
  phoneNumber: string;
}

export default function HireDetailBottomBar({ phoneNumber }: Props) {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState<Number>(0);
  const [callPopup, setCallPopup] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    setScroll(window.scrollY);
  }

  return (
    <>
      <section
        className={`${styles.hireDetailBottomBar} ${
          scroll === 0 ? "" : styles.scroll
        }`}
      >
        <button className={styles.resetBtn} onClick={() => setCallPopup(true)}>
          <Call />

          <p>전화하기</p>
        </button>

        <button className={styles.confirmBtn} onClick={() => navigate("apply")}>
          지원하기
        </button>
      </section>

      {callPopup && (
        <>
          <CallPopup
            off={() => setCallPopup(false)}
            phoneNumber={phoneNumber}
          />
          <PopupBg bg off={() => setCallPopup(false)} />
        </>
      )}
    </>
  );
}
