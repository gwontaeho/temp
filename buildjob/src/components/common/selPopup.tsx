import { ReactComponent as ChkBlue } from "assets/images/icon/ChkBlue.svg";
import styles from "./selPopup.module.scss";

interface Iprops {
  options: IOption[];
  values: any[];
  onSelect: (values: any[]) => void;
  multiple?: boolean;
}

export default function SelPopup<T>({
  options,
  values,
  onSelect,
  multiple,
}: Iprops) {
  function onClickOpt(v: T) {
    if (multiple) {
      let newValues = values ?? [];
      if (newValues.indexOf(v) === -1) newValues.push(v);
      else newValues = newValues.filter((e) => e !== v);
      onSelect(newValues);
    } else {
      onSelect([v]);
    }
  }

  return (
    <section className={styles.selPopup}>
      <ul className={styles.optList}>
        {options.map(({ value, label }, i) => (
          <li
            key={i}
            className={values && values?.indexOf(value) !== -1 ? styles.on : ""}
            onClick={() => onClickOpt(value)}
          >
            <p>{label}</p>

            <ChkBlue className={styles.chkBlue} />
          </li>
        ))}
      </ul>
    </section>
  );
}
