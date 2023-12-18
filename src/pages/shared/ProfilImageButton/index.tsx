import defaultProfileImage from "assets/images/icon/DefaultProfImg.svg";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import styles from "./index.module.scss";

export function ProfilImageButton() {
  const navigate = useNavigate();
  const user = useRecoilValue(userSelector);

  return (
    <button className={styles.utilBtn} onClick={() => navigate("/mypage")}>
      {user?.urlProfileImage && (
        <img src={user.urlProfileImage} alt="profileImage" />
      )}
      {!user?.urlProfileImage && (
        <img src={defaultProfileImage} alt="profileImage" />
      )}
    </button>
  );
}
