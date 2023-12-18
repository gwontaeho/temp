import { useQuery } from "@tanstack/react-query";
import { ReactComponent as ChevronLeftBig } from "assets/images/icon/ChevronLeftBig.svg";
import { ReactComponent as Gear } from "assets/images/icon/Gear.svg";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import { api, eps } from "utils/config";
import styles from "./notice.module.scss";

export default function Notice() {
  const navigate = useNavigate();
  const { data: notices } = useNotices();

  return (
    <main className={styles.notice}>
      <header className={styles.searchHeader}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ChevronLeftBig />
        </button>

        <h1 className={styles.pageTitle}>알림센터</h1>

        <button
          className={styles.setBtn}
          onClick={() => navigate("/alarm/setting")}
        >
          <Gear />
        </button>
      </header>

      <section className={styles.innerSec}>
        <ul className={styles.noticeList}>
          {notices.map((v, i) => (
            <li key={i} onClick={() => navigate(v.content)}>
              <p className={styles.category}>{v.category}</p>

              <p className={styles.content}>{v.content}</p>

              <p className={styles.date}>{v.date}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function useNotices() {
  const user = useRecoilValue(userSelector);

  const { data, ...rest } = useQuery(
    ["GET_NOTIFICATIONS", user?.phoneNumber],
    async () => {
      const { data } = await api.get(eps["GET_NOTIFICATIONS"](0, 1000));

      return (
        data.list.map((item: any) => ({
          id: item.id,
          category: item.title,
          content: item.note_,
          date: moment(item.createdat).format("YYYY.MM.DD (dd)"),
        })) as InoticeList[]
      ).sort(
        (a: any, b: any) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
  );

  return { data: data!, ...rest };
}
