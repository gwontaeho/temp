import { ReactComponent as ChevronRight } from "assets/images/icon/ChevronRight.svg";
import { ReactComponent as DefaultProfImg } from "assets/images/icon/DefaultProfImg.svg";
import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";
import { ReactComponent as LogoBlack } from "assets/images/logo/LogoBlack.svg";
import { restUserKey } from "constants/auth";
import { useSignIn } from "hooks/useSignIn";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocialSignIn } from "./AuthMain/hooks/useSocialSignIn";
import styles from "./comeAgain.module.scss";

export default function ComeAgain() {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useSignIn();
  const [restUser, setRestUser] = useState<User>();
  const { mutateAsync: onSocialSignIn } = useSocialSignIn();

  useEffect(() => {
    const user = localStorage.getItem(restUserKey);
    if (user) {
      const _user = JSON.parse(user);
      setRestUser(_user);
    } else {
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <>
      <header className={styles.header}>
        <button className={styles.exitBtn} onClick={() => navigate("/auth")}>
          <XGray />
        </button>

        <LogoBlack />

        <span className={styles.blank} />
      </header>
      <main className={styles.comeAgain}>
        <section className={styles.contSec}>
          <div className={styles.greetingBox}>
            <p>다시 만나서 반가워요,</p>
            <p>{restUser?.userName}님</p>
          </div>

          <div className={styles.profBox}>
            {!restUser?.urlProfileImage && <DefaultProfImg />}
            {restUser?.urlProfileImage && (
              <img src={restUser?.urlProfileImage} alt="userImage" />
            )}
            {false && <p>KAKAO_UUID...</p>}
          </div>

          <div className={styles.authBox}>
            <button
              className={styles.loginBtn}
              disabled={isLoading}
              onClick={async () => {
                if (restUser?.socialId) {
                  await onSocialSignIn({
                    type: restUser!.socialType as ISocialLoginPlatform,
                    id: restUser!.socialId as string,
                  });
                  return;
                }

                const result = await mutateAsync({
                  phoneNumber: restUser!.phoneNumber,
                  password: restUser!.password!,
                });

                if (result) {
                  navigate("/home");
                } else {
                  navigate("/auth");
                }
              }}
            >
              기존 계정으로 로그인
            </button>

            <button
              className={styles.joinBtn}
              onClick={() => navigate("/auth")}
            >
              <p>아직 회원이 아니세요?</p>
              <ChevronRight />
            </button>
          </div>
        </section>
      </main>
      ;
    </>
  );
}
