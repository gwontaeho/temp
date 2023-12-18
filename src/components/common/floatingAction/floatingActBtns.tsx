import { ReactComponent as ArrowUp } from "assets/images/icon/ArrowUp.svg";
import { ReactComponent as PlusWhite } from "assets/images/icon/PlusWhite.svg";
import PopupBg from "components/common/popupBg";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import styles from "./floatingActBtns.module.scss";
import FloatingMorePopup from "./floatingMorePopup";

interface Iprops {
  moreBtn?: boolean;
  upBtn?: boolean;
  bottom?: number;
}

export default function FloatingActBtns({ moreBtn, upBtn, bottom }: Iprops) {
  const [morePopup, setMorePopup] = useState<boolean>(false);
  const user = useRecoilValue(userSelector);

  function scrollTop() {
    window.scroll({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {user && (
        <>
          <ul className={styles.btnList} style={{ bottom: bottom }}>
            {moreBtn && (
              <button
                className={styles.moreBtn}
                onClick={() => setMorePopup(true)}
              >
                <PlusWhite />
              </button>
            )}

            {upBtn && (
              <button className={styles.upBtn} onClick={scrollTop}>
                <ArrowUp />
              </button>
            )}
          </ul>

          {morePopup && (
            <>
              <FloatingMorePopup off={() => setMorePopup(false)} />
              <PopupBg bg opacity={0.8} off={() => setMorePopup(false)} />
            </>
          )}
        </>
      )}
    </>
  );
}
