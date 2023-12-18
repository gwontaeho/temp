import { useNavigate } from "react-router-dom";
import styles from "./authorityPopup.module.scss";

export default function AuthorityPopup() {
  const navigate = useNavigate();

  return (
    <section className={styles.authorityPopup}>
      <article className={styles.titleArea}>
        <h1 className={styles.title}>앱 권한 설정 안내</h1>
        <p className={styles.explain}>
          빌드잡은 서비스에 꼭 필요한 권한만
          <br />
          선택적으로 접근 권한을 받고 있습니다.
        </p>
      </article>

      <article className={styles.authorArea}>
        <p className={styles.areaTitle}>선택적 접근 권한</p>

        <ul className={styles.authorList}>
          <li>
            <div className={styles.innerBox}>
              <p className={styles.key}>사진촬영 및 갤러리</p>
              <p className={styles.value}>이력서 사진을 위한 접근</p>
            </div>
          </li>
          <li>
            <div className={styles.innerBox}>
              <p className={styles.key}>주소록</p>
              <p className={styles.value}>구글 소셜 로그인을 위한 접근</p>
            </div>
          </li>

          <li>
            <div className={styles.innerBox}>
              <p className={styles.key}>캘린더</p>
              <p className={styles.value}>공고일 기록을 위한 접근</p>
            </div>
          </li>
        </ul>
      </article>

      <article className={styles.btnArea}>
        <button className={styles.confirmBtn} onClick={() => navigate("/auth")}>
          내용을 확인했습니다
        </button>
      </article>
    </section>
  );
}
