import styles from "./offerDetail.module.scss";
import DetailHeader from "components/header/detailHeader";
import { useNavigate } from "react-router-dom";

export default function OfferDetail() {
  const navigate = useNavigate();

  return (
    <>
      <DetailHeader title="채용제안" bottomBorder />

      <main className={styles.offerDetail}>
        <section>
          <h2>
            <span>빌드잡</span>에서 미팅을 요청했습니다.
          </h2>
          <article>
            <h3>미팅 요청 내용</h3>
            <ul>
              <li>
                <span className={styles.title}>미팅 방식</span>
                <i>비대면</i>
              </li>
              <li>
                <span className={styles.title}>미팅 희망 날짜</span>
                <i>2023-06-04 19:00</i>
              </li>
              <li>
                <span className={styles.title}>미팅 URL</span>
                <a>
                  <i>http://</i>
                </a>
              </li>
              <li>
                <span className={styles.title}>전달 사항</span>
                <i>복장은 자유입니다.</i>
              </li>
            </ul>
          </article>
        </section>
        <div className={styles.buttons}>
          <button className={styles.reject}>거절하기</button>
          <button className={styles.accept}>수락하기</button>
        </div>
      </main>
    </>
  );
}
