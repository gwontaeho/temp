import { D_centerList } from "data/D_franchisee";
import styles from "./selCenterPopup.module.scss";
import { ReactComponent as ChkBlue } from "assets/images/icon/ChkBlue.svg";

interface Iprops {
  value: string;
  setValue: Function;
  off: Function;
}

export default function SelCenterPopup({ value, setValue, off }: Iprops) {
  function onClickOption(v: string) {
    setValue(v);
    off();
  }

  return (
    <section className={styles.selCenterPopup}>
      <ul className={styles.optList}>
        {D_centerList.map((v, i) => (
          <li key={i} className={v === value ? styles.on : ""}>
            <button onClick={() => onClickOption(v)}>
              <span className={styles.chkBox}>
                <ChkBlue className={styles.chkBlue} />
              </span>

              <p>{v}</p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
