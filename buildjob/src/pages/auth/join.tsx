import JoinFirst from "components/auth/join/joinFirst";
import JoinSecond from "components/auth/join/joinSecond";
import DetailHeader from "components/header/detailHeader";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./join.module.scss";

export default function Join() {
  const location = useLocation();
  const process = location.state?.process || 1;
  const [joinFirst, setJoinFirst] = useState<IjoinFirst>();

  return (
    <>
      <DetailHeader title="회원가입" />
      <main className={styles.join}>
        <section className={styles.formSec}>
          <article className={styles.topBar}>
            <h1 className={styles.title}>본인 확인을 해주세요</h1>

            <p className={styles.countBox}>
              <span className={styles.count}>{process}</span>/2
            </p>
          </article>

          {process === 1 && <JoinFirst setJoinFirst={setJoinFirst} />}
          {process === 2 && <JoinSecond joinFirst={joinFirst} />}
        </section>
      </main>
    </>
  );
}
