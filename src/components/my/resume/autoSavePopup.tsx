import { useNavigate } from "react-router-dom";
import styles from "./autoSavePopup.module.scss";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";

interface Iprops {
  count: number;
  recentResumeUUID?: string;
}

export default function AutoSavePopup({count, recentResumeUUID}: Iprops) {
  const navigate = useNavigate();
  const user = useRecoilValue(userSelector);

  return (
    <section className={styles.autoSavePopup}>
      <article className={styles.textArea}>
        <p className={styles.name}>{user?.userName}님</p>
        <p className={styles.explain}>작성중이던 이력서가 있어요 ({count}개)</p>
      </article>

      <article className={styles.btnBar}>
        <button className={styles.freshBtn} onClick={() => navigate("enroll")}>
          새로 작성할게요
        </button>

        <button
          className={styles.continueBtn}
          onClick={() => navigate("enroll", {state: {resume_uuid : recentResumeUUID}})}
        >
          이어서 작성할게요
        </button>
      </article>
    </section>
  );
}
