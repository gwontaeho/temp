import { ReactComponent as Calender } from "assets/images/icon/Calender.svg";
import { ReactComponent as CalenderClock } from "assets/images/icon/CalenderClock.svg";
import { ReactComponent as Clock } from "assets/images/icon/Clock.svg";
import { ReactComponent as Flag } from "assets/images/icon/Flag.svg";
import { ReactComponent as FlagFillBlue } from "assets/images/icon/FlagFillBlue.svg";
import { ReactComponent as Won } from "assets/images/icon/Won.svg";
import FloatingActBtns from "components/common/floatingAction/floatingActBtns";
import HireDetailHeader from "components/header/hireDetailHeader";
import { D_detailCategoryList } from "data/hire/D_hireDetail";
import { useJobPost } from "hooks/useJobPost";
import { useUuid } from "hooks/useUuid";
import Inquiries from "pages/hire/hireDetail/Inquiries";
import { FavoriteButton } from "pages/shared/FavoriteButton";
import { ShareButton } from "pages/shared/ShareButton";
import { Suspense, useState } from "react";
import { formatPay } from "utils/formatJobPostData";
import Condition from "../shared/Condition";
import Details from "../shared/Details";
import HireDetailBottomBar from "./HireDetailBottomBar";
import styles from "./index.module.scss";

export default function HireDetail() {
  const uuid = useUuid();

  return (
    <>
      <HireDetailHeader
        title="채용정보"
        utilElements={[
          <FavoriteButton
            uuid={uuid}
            savedIcon={<FlagFillBlue />}
            unsavedIcon={<Flag />}
          />,
          <ShareButton />,
        ]}
      />
      <Suspense>
        <Resolved />
      </Suspense>
    </>
  );
}

function Resolved() {
  const [category, setCategory] = useState<string>(D_detailCategoryList[0]);
  const uuid = useUuid();
  const {
    data: {
      corporationName,
      title,
      payAmount,
      durationOfhire,
      workdaysOfweek,
      workHours,
      phoneNumber,
    },
  } = useJobPost(uuid);

  return (
    <>
      <main className={styles.hireDetail}>
        <section className={styles.initSec}>
          <article className={styles.titleArea}>
            <h2 className={styles.company}>{corporationName}</h2>

            <h1 className={styles.hireTitle}>{title}</h1>
          </article>

          <article className={styles.initArea}>
            <ul className={styles.initList}>
              <li>
                <span className={styles.iconBox}>
                  <Won />
                </span>

                <div className={styles.infoBox}>
                  <p className={styles.key}>월급</p>
                  <p className={`${styles.value} ${styles.blue}`}>
                    {formatPay(payAmount)}
                  </p>
                </div>
              </li>

              <li>
                <span className={styles.iconBox}>
                  <CalenderClock />
                </span>

                <div className={styles.infoBox}>
                  <p className={styles.key}>기간</p>
                  <p className={styles.value}>{durationOfhire}</p>
                </div>
              </li>

              <li>
                <span className={styles.iconBox}>
                  <Calender />
                </span>

                <div className={styles.infoBox}>
                  <p className={styles.key}>요일</p>
                  <p className={styles.value}>{workdaysOfweek.join(", ")}</p>
                </div>
              </li>

              <li>
                <span className={styles.iconBox}>
                  <Clock />
                </span>

                <div className={styles.infoBox}>
                  <p className={styles.key}>시간</p>
                  <p className={styles.value}>{workHours}</p>
                </div>
              </li>
            </ul>
          </article>
        </section>

        <section className={styles.contSec}>
          <article className={styles.tabBar}>
            <ul className={styles.categoryList}>
              {D_detailCategoryList.map((v, i) => (
                <li
                  key={i}
                  className={v === category ? styles.on : ""}
                  onClick={() => setCategory(v)}
                >
                  <p>{v}</p>
                </li>
              ))}
            </ul>
          </article>

          {category === D_detailCategoryList[0] && <Condition />}
          {category === D_detailCategoryList[1] && <Details />}
          {category === D_detailCategoryList[2] && <Inquiries />}
        </section>
      </main>

      <FloatingActBtns upBtn bottom={114} />
      <HireDetailBottomBar phoneNumber={phoneNumber} />
    </>
  );
}
