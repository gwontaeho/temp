import DetailHeader from "components/header/detailHeader";
import styles from "./penalty.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { api, eps } from "utils/config";
import { toast } from "react-toastify";

export default function Penalty() {
  const navigate = useNavigate();
  const location = useLocation();
  const [account, setAccount] = useState<any>();
  const [detail, setDetail] = useState<any>();
  const type = location?.state?.type

  async function getAccount() {
    try {
      let {data : {respdata}} = await api.get(eps["GET_PENALTY"]);
      respdata.value_ = JSON.parse(respdata.value_)
      setAccount(respdata)
    } catch (err) {
      console.log(err);
    }
  }

  async function getPenaltyDetail() {
    try {
      let {data : {baninfo}} = await api.get(eps["GET_BAN_INFO"](type));
      setDetail(baninfo)
    } catch (err) {
      console.log(err);
    }
  }

  async function checkBanPaid() {
    try {
      let {data : {status}} = await api.post(eps["BAN_PAID"](type));
      if (status === 'OK') toast("관리자 확인 후 처리하겠습니다. 다소 시간이 소요될 수 있습니다.", { position: toast.POSITION.TOP_LEFT })
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAccount();
    getPenaltyDetail();
  }, [])

  return (
    <>
      <DetailHeader
        title="위약금 납부"
        bottomBorder
        closeBtn
        closeBtnFunc={() => navigate(-1)}
      />

      <main className={styles.penalty}>
        <section className={styles.depositInfo}>
          <article className={styles.contArea}>
            <h1 className={styles.areaTitle}>
              위약금을
              <br />
              아래 계좌로 입금해 주세요.
            </h1>

            <ul className={styles.payList}>
              <li>
                <p className={styles.key}>입금기간</p>
                <p className={styles.value}>{detail?.duetime?.replace('T', ' ')}</p>
              </li>

              <li>
                <p className={styles.key}>가상계좌</p>
                <p className={styles.value}>{account?.value_.bank} {account?.value_.account}</p>
              </li>

              <li>
                <p className={styles.key}>가상계좌</p>
                <p className={styles.value}>{account?.value_.accountholder}</p>
              </li>

              <li>
                <p className={styles.key}>입금금액</p>
                <p className={styles.value}>
                  {Intl.NumberFormat().format(detail?.sumamount)}원
                </p>
              </li>
            </ul>

            <p className={styles.explain}>
              입금 검토 후 정지 해제가 완료됩니다.
              <br />
              승인 결과를 빠르게 안내하겠습니다.
            </p>

            <button
              className={styles.primaryBtn}
              onClick={() => {checkBanPaid()}}
            >
              입금 완료 하였습니다.
            </button>
          </article>
        </section>
      </main>
    </>
  );
}
