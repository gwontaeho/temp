import FacebookImage from "assets/images/logo/Facebook.png";
import GoogleImage from "assets/images/logo/Google.png";
import KakaoImage from "assets/images/logo/Kakao.png";
import { ReactComponent as LogoBlue } from "assets/images/logo/LogoBlue.svg";
import NaverImage from "assets/images/logo/Naver.png";
import { useNavigate } from "react-router-dom";
import { SignInForm } from "./SignInForm";
import { useSocialSignIn } from "./hooks/useSocialSignIn";
import styles from "./index.module.scss";
import FacebookLogin from "./shared/FacebookLogin";
import GoogleLogin from "./shared/GoogleLogin";
import KakaoLogin from "./shared/KakaoLogin";
import NaverLogin from "./shared/NaverLogin";

export default function AuthMain() {
  const navigate = useNavigate();
  const { mutateAsync: onSocialSignIn } = useSocialSignIn();

  return (
    <main className={styles.auth}>
      <section className={styles.titleSec}>
        <LogoBlue className={styles.logo} />
        <h1 className={styles.title}>추천받은 인재와 함께</h1>
      </section>

      <SignInForm />

      <section className={styles.contSec}>
        <article className={styles.joinArea}>
          <button className={styles.joinBtn} onClick={() => navigate("join")}>
            회원가입
          </button>
        </article>
        <article className={styles.socialArea}>
          <div className={styles.topBar}>
            <hr />
            <h2 className={styles.socialTitle}>소셜 계정으로 시작하기</h2>
            <hr />
          </div>

          <ul className={styles.socialList}>
            <KakaoLogin
              onSuccess={({ profile }) => {
                if (profile) {
                  onSocialSignIn({
                    type: "kakao",
                    id: profile.id,
                  });
                }
              }}
            >
              <button className={styles.snsBtn}>
                <img src={KakaoImage} alt={`kakao login`} />
              </button>
            </KakaoLogin>
            <NaverLogin
              onSuccess={(response) => {
                const user = response.user;
                onSocialSignIn({
                  type: "naver",
                  id: user.getId(),
                });
              }}
            >
              <button className={styles.snsBtn}>
                <img src={NaverImage} alt={`naver login`} />
              </button>
            </NaverLogin>
            <FacebookLogin
              onSuccess={(response) => {
                onSocialSignIn({
                  type: "facebook",
                  id: response.id,
                });
              }}
            >
              <button className={styles.snsBtn}>
                <img src={FacebookImage} alt={`facebook login`} />
              </button>
            </FacebookLogin>
            <GoogleLogin
              onSuccess={(result) => {
                onSocialSignIn({
                  type: "google",
                  id: result.sub,
                });
              }}
            >
              <button className={styles.snsBtn}>
                <img src={GoogleImage} alt={`google login`} />
              </button>
            </GoogleLogin>
          </ul>
        </article>
      </section>
    </main>
  );
}
