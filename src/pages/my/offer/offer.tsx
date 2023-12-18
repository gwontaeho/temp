import { useState } from "react";
import styles from "./offer.module.scss";
import DetailHeader from "components/header/detailHeader";
import { D_offerList } from "data/my/D_offer";
import { useNavigate } from "react-router-dom";

export default function Offer() {
  const navigate = useNavigate();

  const [offerList, setOfferList] = useState<IofferSimple[]>(D_offerList);

  function onClickActionBtn(index: number) {
    let _offerList = offerList;
    _offerList.splice(index, 1);
    setOfferList([..._offerList]);
  }

  return (
    <>
      <DetailHeader title="받은제안" />

      <main className={styles.offer}>
        <h1 className={styles.count}>
          전체 <strong>{offerList.length}</strong>건
        </h1>

        <ul className={styles.offerList}>
          {offerList.map((v, i) => (
            <li key={i}>
              <div className={styles.infoCont} onClick={() => navigate("/hire/0/apply")}>
                <p className={styles.companyName}>{v.companyName}</p>

                <p className={styles.hireTitle}>{v.hireTitle}</p>

                <p className={styles.locationPay}>
                  {v.location} · <strong className={styles.red}>{v.payForm}</strong> {v.pay}
                </p>
              </div>

              <div className={styles.actionBar}>
                <button className={styles.resumeBtn} onClick={() => onClickActionBtn(i)}>
                  <p>거절하기</p>
                </button>

                <hr />

                <button className={styles.confirmBtn} onClick={() => navigate("1")}>
                  <p>상세보기</p>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
