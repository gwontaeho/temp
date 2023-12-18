import DetailHeader from "components/header/detailHeader";
import styles from "./applyResume.module.scss";
import ProfImg1 from "assets/images/example/my/apply/ProfImg1.png";
import { D_resumeCareerList } from "data/my/apply/D_applyResume";

export default function ApplyResume() {
  return (
    <>
      <DetailHeader title="이력서 보기" bottomBorder />
      <main className={styles.applyResume}>
        <section className={styles.innerSec}>
          <article className={styles.profArea}>
            <img className={styles.profImg} src={ProfImg1} alt="" />

            <h1 className={styles.profName}>김둘리</h1>
          </article>

          <article className={styles.infoArea}>
            <ul className={styles.infoList}>
              <li className={styles.workConditionCont}>
                <h2 className={styles.infoTitle}>희망근무조건</h2>

                <div className={styles.contCont}>
                  <ul className={styles.conditionList}>
                    <li>
                      <p className={styles.key}>희망직종</p>
                      <p className={styles.value}>매장관리·판매</p>
                    </li>
                    <li>
                      <p className={styles.key}>근무형태</p>
                      <p className={styles.value}>정규직, 아르바이트</p>
                    </li>
                    <li>
                      <p className={styles.key}>희망지역</p>
                      <p className={styles.value}>서울전체</p>
                    </li>
                    <li>
                      <p className={styles.key}>희망급여</p>
                      <p className={styles.value}>300만원</p>
                    </li>
                  </ul>
                </div>
              </li>

              <li className={styles.careerCont}>
                <h2 className={styles.infoTitle}>경력 (10년 2개월)</h2>

                <div className={styles.contCont}>
                  <ul className={styles.careerList}>
                    {D_resumeCareerList.map((v, i) => (
                      <li key={i}>
                        <p className={styles.companyName}>{v.companyName}</p>
                        <p className={styles.position}>{v.position}</p>
                        <p className={styles.term}>{v.term}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li className={styles.introduceCont}>
                <h2 className={styles.infoTitle}>자기소개서</h2>

                <div className={styles.contCont}>
                  <p
                    className={styles.introduce}
                  >{`반갑습니다~! 저는 경력 10년차로 OO호텔에서 헤드셰프로 6년간 근무한 경험이 있습니다. 그 외에도 서비스직 경험이 다수 있으며 항상 최고가 되려고 노력하고 있습니다.

.
.
.

감사합니다.`}</p>
                </div>
              </li>
            </ul>
          </article>
        </section>
      </main>
    </>
  );
}
