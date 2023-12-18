import { useNavigate } from "react-router-dom";
import styles from "./limited.module.scss";
import { ReactComponent as TriangleNoticeWhite } from "assets/images/icon/TriangleNoticeWhite.svg";
import { useState, useEffect } from "react";
import { api, eps } from "utils/config";

export default function Limited() {
  const navigate = useNavigate();
  const [detailList, setDetailList] = useState<any>([])
  const [lastLogin, setLastLogin] = useState<string>();

  function setDateFormat(date: string) {
    return date.slice(0,4) + '.' + date.slice(4,6) + '.' + date.slice(6,8)
  }

  async function getBanDetail() {
    try {
      let {data : {list}} = await api.get(eps["GET_BAN"](3, 0, 10));
      setDetailList(list)
    } catch (err) {
      console.log(err);
    }
  }

  async function getLastLogin() {
    try {
      let {data: {list}} = await api.get(eps["GET_LAST_LOGIN"]);
      setLastLogin(list[0].timestr0);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBanDetail();
    getLastLogin();
  }, [])

  return (
    <>
      <header className={styles.header}>
        <TriangleNoticeWhite />

        <h1 className={styles.key}>서비스 이용제한 되었습니다.</h1>

        <p className={styles.value}>
          직접 계약한 내역이 적발되어
          <br />
          빌드잡 서비스 이용에 제한이 있습니다.
        </p>
      </header>

      <main className={styles.limited}>
        <section className={`${styles.infoSec} ${styles.contSec}`}>
          <h1 className={styles.contTitle}>이용제한 사유 안내</h1>

          <article className={styles.contArea}>
            {
              detailList?.map((e:any, i: number) => {
                return(
                  <div key={i} style={{marginBottom: 40}}>
                    <p className={styles.cont}>
                      {e.strdisp}
                    </p>
        
                    <ul className={styles.infoList}>
                      <li>
                        <p>정지 기간 : {setDateFormat(e.time0)} ~ {setDateFormat(e.time1)}</p>
                      </li>
                      <li>
                        <p>
                          하향 등급 : {e.level0 ? e.level0 : 0}등급 {"> "}
                          <span className={styles.red}> {e.level1 ? e.level1 : 0}등급</span>
                        </p>
                      </li>
                      <li>
                        <p>보유 포인트 : {e.pointdeduct === -1 ? '몰수' : e.pointdeduct + '차감'}</p>
                      </li>
                      <li>
                        <p>본 계정의 추천인 : {e.isimpactparent === 0 ? '등급 변경없음' : '하향등급 적용'}</p>
                      </li>
                    </ul>
                  </div>
                )
              })
            }
            <div className={styles.lastLogin}>
              <p className={styles.key}>마지막 로그인</p>&nbsp;
              <p className={styles.value}>{lastLogin?.slice(0, 10)}</p>
            </div>
          </article>
        </section>

        <section className={`${styles.actionSec} ${styles.contSec}`}>
          <h1 className={styles.contTitle}>위약금 입금</h1>

          <article className={styles.contArea}>
            <p className={styles.cont}>
              서비스 이용제한에 대한 위약금 입금 시 계정정지가 해소됩니다.
            </p>

            <div className={styles.actionCont}>
              <button
                className={styles.primaryBtn}
                onClick={() => navigate("/mypage/block/penalty", { state: {type: 3} })}
              >
                위약금 납부하기
              </button>

              <button className={styles.laterBtn} onClick={() => {navigate("/")}}>
                다음에 하기
              </button>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
