import { Fragment, useState } from "react";
import styles from "./payHire.module.scss";
import DetailHeader from "components/header/detailHeader";
import { useLocation } from "react-router-dom";
import { D_payHireProcessList } from "data/D_notice";
import { ReactComponent as ChevronRight } from "assets/images/icon/ChevronRight.svg";

import PayInfo from "components/notice/payHire/payInfo";
import DefaultPay from "components/notice/payHire/defaultPay";

export default function PayHire() {
  const location = useLocation();

  const [process, setProcess] = useState<number>(location.state?.process || 1);

  return (
    <>
      <DetailHeader title="채용 결제" bottomBorder />

      <main className={styles.payHire}>
        <article className={styles.processArea}>
          <ul className={styles.processList}>
            {D_payHireProcessList.map((v, i) => (
              <Fragment key={i}>
                {i !== 0 && <ChevronRight />}

                <li key={i} className={i + 1 === process ? styles.on : ""}>
                  <span className={styles.index}>{i + 1}</span>

                  <p className={styles.label}>{v}</p>
                </li>
              </Fragment>
            ))}
          </ul>
        </article>

        {process === 1 && <DefaultPay setProcess={setProcess} />}
        {process === 2 && <PayInfo />}
      </main>
    </>
  );
}
