import styles from "./franchiseeHeader.module.scss";

import { ReactComponent as LogoBlue } from "assets/images/logo/LogoBlue.svg";
import { ReactComponent as Magnifier } from "assets/images/icon/Magnifier.svg";
import { ReactComponent as Bell } from "assets/images/icon/Bell.svg";
import { ReactComponent as Smile } from "assets/images/icon/Smile.svg";
import { ReactComponent as ChevronDownGray } from "assets/images/icon/ChevronDownGray.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { D_centerList } from "data/D_franchisee";
import PopupBg from "components/common/popupBg";
import SelCenterPopup from "components/auth/person/selCenterPopup";

export default function FranchiseeHeader() {
  const navigate = useNavigate();

  const [center, setCenter] = useState<center>(D_centerList[0]);
  const [selCenterPopup, setSelCenterPopup] = useState<boolean>(false);
  const [open, setOpen] = useState(true);

  return (
    <header className={styles.franchiseeHeader}>
      <section className={styles.topBar}>
        <article className={styles.leftArea}>
          <button className={styles.logoBtn} onClick={() => navigate("/home")}>
            <LogoBlue className={styles.logo} />
          </button>
        </article>

        <article className={styles.rightArea}>
          <button className={`${styles.utilBtn} ${styles.searchBtn}`} onClick={() => navigate("/search")}>
            <Magnifier />

            <span className={styles.new} />
          </button>

          <button className={`${styles.utilBtn} ${styles.noticeBtn}`} onClick={() => navigate("/notice")}>
            <Bell />

            <span className={styles.new} />
          </button>

          <button className={`${styles.utilBtn} ${styles.profBtn}`} onClick={() => {}}>
            <Smile />
          </button>
        </article>
      </section>

      <section className={styles.filterBar}>
        <span className={styles.btnBox}>
          <button className={styles.filterBtn} onClick={() => setSelCenterPopup(true)}>
            <p>{center}</p>
            <ChevronDownGray />
          </button>

          {selCenterPopup && (
            <>
              <SelCenterPopup value={center} setValue={setCenter} off={() => setSelCenterPopup(false)} />

              <PopupBg off={() => setSelCenterPopup(false)} />
            </>
          )}
        </span>

        <span className={styles.btnBox}>
          <button
            className={`${open ? styles.on : ""} ${styles.boolBtn} ${styles.filterBtn}`}
            // onClick={() => setOpen(!open)}
          >
            <p>영업중</p>
          </button>
        </span>
      </section>
    </header>
  );
}
