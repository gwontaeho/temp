import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import { Dispatch, SetStateAction } from "react";
import styles from "./autoSavePopup.module.scss";

interface Props {
  handleClickNext: () => void;
}

export default function AutoSavePopup({ handleClickNext }: Props) {
  const navigate = useNavigate();
  const user = useRecoilValue(userSelector);

  return (
    <section className={styles.autoSavePopup}>
      <article className={styles.textArea}>
        <p className={styles.name}>{user?.userName}님</p>
        <p className={styles.explain}>작성중이던 공고가 있어요</p>
      </article>

      <article className={styles.btnBar}>
        <button className={styles.freshBtn} onClick={() => navigate("enroll")}>
          새로 작성할게요
        </button>
        <button className={styles.continueBtn} onClick={handleClickNext}>
          이어서 작성할게요
        </button>
      </article>
    </section>
  );
}
