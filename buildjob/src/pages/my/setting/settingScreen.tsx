import { useMutation } from "@tanstack/react-query";
import { ReactComponent as ChevronRight } from "assets/images/icon/ChevronRight.svg";
import DetailHeader from "components/header/detailHeader";
import { restUserKey } from "constants/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userSelector } from "states/user";
import { api, eps } from "utils/config";
import styles from "./settingScreen.module.scss";

export default function SettingScreen() {
  const navigate = useNavigate();
  const { mutateAsync: onSignOut } = useSignOut();
  const user = useRecoilValue(userSelector);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <>
      <DetailHeader
        title="설정"
        bottomBorder
        closeBtn
        closeBtnFunc={() => navigate(-1)}
      />

      <main className={styles.settingScreen}>
        <ul className={styles.menuList}>
          <li onClick={() => navigate("/terms", { state: { category: 0 } })}>
            <p>이용약관</p>
            <ChevronRight />
          </li>

          <li onClick={() => navigate("/terms", { state: { category: 1 } })}>
            <p>개인정보 처리방침</p>
            <ChevronRight />
          </li>
        </ul>

        <button className={styles.logoutBtn} onClick={() => onSignOut()}>
          로그아웃
        </button>
      </main>
    </>
  );
}

function useSignOut() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userSelector);

  return useMutation(
    async () => {
      api.post(eps["SIGN_OUT"]);
    },
    {
      onSuccess: () => {
        setUser(null);
        toast("로그아웃 되었습니다.", { position: toast.POSITION.TOP_LEFT });
        const restUserData = localStorage.getItem(restUserKey);
        if (restUserData) {
          navigate("/auth/comeagain");
        } else {
          navigate("/auth");
        }
      },
    }
  );
}
