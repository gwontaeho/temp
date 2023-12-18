import { ReactComponent as LogoWhite } from "assets/images/logo/LogoWhite.svg";
import { NoticeButton } from "pages/shared/NoticeButton";
import { ProfilImageButton } from "pages/shared/ProfilImageButton";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import styles from "./index.module.scss";

export default function Header() {
  const navigate = useNavigate();
  const user = useRecoilValue(userSelector);

  return (
    <header className={styles.header}>
      <article className={styles.leftArea}>
        <button className={styles.logoBtn} onClick={() => navigate("/home")}>
          <LogoWhite className={styles.logo} />
        </button>
      </article>

      <article className={styles.rightArea}>
        {user && (
          <>
            <NoticeButton />
            <ProfilImageButton />
          </>
        )}
      </article>
    </header>
  );
}
