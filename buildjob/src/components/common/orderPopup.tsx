import { ReactComponent as ChkBlue } from "assets/images/icon/ChkBlue.svg";
import { sortKeyList, sortKeyListP, sortMap, sortMapP } from "data/hire/D_hire";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./orderPopup.module.scss";

interface IProps {
  order: ISortKey | ISortKeyP;
  setOrder: Function;
  off: Function;
  isPerson?: boolean;
}

export default function OrderPopup({ order, setOrder, off, isPerson }: IProps) {
  const { pathname } = useLocation();
  const params = queryString.parse(window.location.search);
  const navigate = useNavigate();

  function onClickOption(v: ISortKey | ISortKeyP) {
    // 나머지 params는 유지하고 page만 없애기
    navigate(`${pathname}?${queryString.stringify({ ...params, page: 1 })}`);
    setOrder(v);
    off();
  }

  return (
    <section className={styles.orderPopup}>
      <ul className={styles.orderList}>
        {/* <li className={order === null ? styles.on : ""}>
          <button onClick={() => onClickOption(null)}>
            <span className={styles.chkBox}>
              <ChkBlue className={styles.chkBlue} />
            </span>

            <p>고용형태</p>
          </button>
        </li> */}

        {isPerson
          ? sortKeyListP.map((key, i) => (
              <li key={i} className={key === order ? styles.on : ""}>
                <button onClick={() => onClickOption(key)}>
                  <span className={styles.chkBox}>
                    <ChkBlue className={styles.chkBlue} />
                  </span>

                  <p>{sortMapP[key].label}</p>
                </button>
              </li>
            ))
          : sortKeyList.map((key, i) => (
              <li key={i} className={key === order ? styles.on : ""}>
                <button onClick={() => onClickOption(key)}>
                  <span className={styles.chkBox}>
                    <ChkBlue className={styles.chkBlue} />
                  </span>

                  <p>{sortMap[key].label}</p>
                </button>
              </li>
            ))}
      </ul>
    </section>
  );
}
