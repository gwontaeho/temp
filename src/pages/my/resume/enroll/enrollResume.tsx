import { useState } from "react";
import styles from "./enrollResume.module.scss";
import DetailHeader from "components/header/detailHeader";
import { D_enrollResumeProgressList } from "data/my/resume/D_enrollResume";
import DefaultInfo from "components/my/resume/enroll/defaultInfo";
import Condition from "components/my/resume/enroll/condition";
import Career from "components/my/resume/enroll/career";
import { useLocation } from "react-router-dom";

export default function EnrollResume() {
  const location = useLocation();
  const [resumeUUID, setResumeUUID] = useState<string>("");
  const [progress, setProgress] = useState<number>(
    location.state?.progress || 1
  );

  return (
    <>
      <DetailHeader title="이력서 등록" bottomBorder />

      <main className={styles.enrollResume}>
        <section className={styles.innerSec}>
          <article className={styles.progressBar}>
            <ul className={styles.progressList}>
              {D_enrollResumeProgressList.map((v, i) => {
                if (progress === i + 1)
                  return (
                    <li className={styles.current} key={i}>
                      <span className={styles.index}>{progress}</span>
                      <p>{D_enrollResumeProgressList[i]}</p>
                    </li>
                  );
                else
                  return (
                    <li
                      key={i}
                      className={`${styles.dot} ${progress <= i ? "" : styles.on
                        }`}
                    />
                  );
              })}
            </ul>
          </article>

          {progress === 1 && <DefaultInfo setResumeUUID={setResumeUUID} confirmFunc={() => setProgress(2)} />}
          {progress === 2 && <Condition uuid={resumeUUID} confirmFunc={() => setProgress(3)} />}
          {progress === 3 && <Career uuid={resumeUUID} />}
        </section>
      </main>
    </>
  );
}
