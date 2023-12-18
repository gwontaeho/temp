import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api, eps } from "utils/config";
import styles from "./withdrawal.module.scss";

export default function Withdrawal() {
  const navigate = useNavigate();

  async function logout() {
    try {
      let response = await api.post(eps["SIGN_OUT"]);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleQuitUser() {
    try {
      let { status } = await api.post(eps["QUIT"]);
      if (status === 200) {
        logout();
        navigate("/auth");
        localStorage.removeItem("AUTH_TOKEN");
        localStorage.removeItem("USER");
      } else {
        toast("탈퇴 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleQuit() {
    if (window.confirm("탈퇴를 진행하시겠습니까?")) {
      handleQuitUser();
      toast("탈퇴가 정상적으로 완료되었습니다.", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  }

  return (
    <section className={styles.withdrawal}>
      <article className={styles.explainArea}>
        <h1 className={styles.areaTitle}>회원탈퇴 전 꼭 확인해주세요</h1>

        <ul className={styles.infoList}>
          <li>
            <h2 className={styles.key}>1.동일한 아이디로 재가입 불가</h2>

            <ul className={styles.valueList}>
              <li className={styles.value}>
                탈퇴 신청 시 즉시 처리되며, 해당 아이디로 재가입/로그인이
                불가능합니다.
              </li>
            </ul>
          </li>

          <li>
            <h2 className={styles.key}>2.탈퇴 즉시 회원정보 삭제</h2>

            <ul className={styles.valueList}>
              <li className={styles.value}>
                탈퇴 즉시 이력서 및 구직활동 정보가 모두 삭제되며, 삭제된 정보는
                복구되지 않습니다. 단, 공공적 성격의 게시물은 삭제되지 않으므로
                탈퇴 전 미리 삭제해주세요.
              </li>
            </ul>
          </li>
        </ul>

        <p className={styles.warning}>
          ※ 탈퇴 완료 24시간 이내에는 작업 후 반영시간 차이로 메일이 발송될 수
          있습니다.
        </p>
      </article>

      <button
        className={styles.submitBtn}
        onClick={() => {
          handleQuit();
        }}
      >
        탈퇴하기
      </button>
    </section>
  );
}
