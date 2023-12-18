import DetailHeader from "components/header/detailHeader";
import styles from "./reviewHire.module.scss";
import Person1 from "assets/images/example/my/company/Person1.png";
import { useState } from "react";
import { ReactComponent as StarFill } from "assets/images/icon/StarFill.svg";
import { ReactComponent as StarFillGray } from "assets/images/icon/StarFillGray.svg";

export default function ReviewHire() {
  const [score, setScore] = useState<number>(1);

  return (
    <>
      <DetailHeader title="인재 평가 및 리뷰" bottomBorder />

      <main className={styles.reviewHire}>
        <section className={styles.reviewSec}>
          <article className={styles.profArea}>
            <span className={styles.profImgBox}>
              <img src={Person1} alt="" />
            </span>

            <h1 className={styles.name}>김유재</h1>
          </article>

          <ul className={styles.scoreBtnList}>
            {new Array(5).fill("").map((v, i) => (
              <li key={i}>
                <button
                  className={styles.scoreBtn}
                  onClick={() => setScore(i + 1)}
                >
                  {i + 1 <= score ? <StarFill /> : <StarFillGray />}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.btnSec}>
          <button className={styles.actionBtn} onClick={() => {}}>
            등록하기
          </button>
        </section>
      </main>
    </>
  );
}
