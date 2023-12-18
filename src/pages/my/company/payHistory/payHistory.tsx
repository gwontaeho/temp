import { useQuery } from "@tanstack/react-query";
import DetailHeader from "components/header/detailHeader";
import moment from "moment";
import { Suspense } from "react";
import { api, eps } from "utils/config";
import styles from "./payHistory.module.scss";

const statusMap: Record<
  IPayHistoryStatus,
  { indexKey: number; key: IPayHistoryStatus; label: string }
> = {
  DONE: {
    indexKey: 1,
    key: "DONE",
    label: "결제완료",
  },
  CANCELED: {
    indexKey: 2,
    key: "CANCELED",
    label: "결제취소",
  },
  WAITING: {
    indexKey: 3,
    key: "WAITING",
    label: "결제대기",
  },
};

const titleMap = {
  "POST-JOB": "채용 결제",
  "PAY-PENALTY": "위약금 결제",
};

export default function PayHistory() {
  return (
    <>
      <DetailHeader title="결제내역" bottomBorder />

      <main className={styles.payHistory}>
        <h1 className={styles.count}>
          전체{" "}
          <Suspense>
            <Count />
          </Suspense>
          건
        </h1>

        <Suspense>
          <PayHistoryList />
        </Suspense>
      </main>
    </>
  );
}

function Count() {
  const { data } = usePayHistory();

  return <strong>{data.list.length}</strong>;
}

function PayHistoryList() {
  const { data } = usePayHistory();

  return (
    <ul className={styles.historyList}>
      {data.list.map((v, i) => {
        const label = statusMap[v.status].label;
        return (
          <li key={i} className={label === "입금취소" ? styles.gray : ""}>
            <div className={styles.topBar}>
              <p className={styles.date}>
                {moment(v.date).format("YYYY.MM.DD")}
              </p>

              <p
                className={`${
                  label === "결제완료" ? styles.blue : styles.red
                } ${styles.status}`}
              >
                {label}
              </p>
            </div>

            <p className={styles.title}>{titleMap[v.title]}</p>

            <ul className={styles.infoList}>
              <li>
                <p className={styles.key}>가상계좌</p>
                <hr />
                <p className={styles.value}>{v.account}</p>
              </li>

              <li>
                <p className={styles.key}>입금금액</p>
                <hr />
                <p className={styles.value}>
                  {Intl.NumberFormat().format(v.amount)}원
                </p>
              </li>

              <li>
                <p className={styles.key}>입금기한</p>
                <hr />
                <p className={styles.value}>
                  {moment(v.deadline).format("YYYY.MM.DD")}
                </p>
              </li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

function usePayHistory() {
  const { data, ...rest } = useQuery(
    ["PAYMENT_HISTORY"],
    async () => {
      const { data } = await api.get(eps["PAYMENT_HISTORY"](0, 1000));

      if (data.status === "ERR") {
        throw new Error("invalid request");
      }

      const fetchedList = data.list;

      const newList = fetchedList.map((list: any) => ({
        date: list.createdat,
        status: list.statusstr,
        title: list.typestr,
        account: `${list.bank0} ${list.account0}`,
        amount: list.amount,
        deadline: list.expiry,
      })) as IpayHistorySimple[];

      return { count: data.payload.count, list: newList };
    },
    { suspense: true }
  );

  return { data: data!, ...rest };
}
