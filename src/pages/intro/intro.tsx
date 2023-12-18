import styles from "./intro.module.scss";
import IntroBg from "assets/images/bg/intro/IntroBg.png";
import { ReactComponent as LogoWhite } from "assets/images/logo/LogoWhite.svg";
import PopupBg from "components/common/popupBg";
import AuthorityPopup from "components/intro/authorityPopup";
import { useEffect, useState } from "react";

export default function Intro() {
  const [authorityPopup, setAuthorityPopup] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setAuthorityPopup(true);
    }, 1400);
  }, []);

  return (
    <>
      <main className={styles.intro}>
        <section className={styles.contSec}>
          <img className={styles.bgImg} src={IntroBg} alt="" />

          <LogoWhite />
        </section>
      </main>

      {authorityPopup && (
        <>
          <AuthorityPopup />
          <PopupBg bg off={() => setAuthorityPopup(false)} />
        </>
      )}
    </>
  );
}
