import styles from "./formPopup.module.scss";
import { ReactComponent as ChkBlue } from "assets/images/icon/ChkBlue.svg";
import { useRecoilValue } from "recoil";
import { hireSelector } from "states/categories/hire";

interface IProps {
  form: string | null;
  setForm: Function;
  off: Function;
}

export default function FormPopup({ form, setForm, off }: IProps) {
  const hire = useRecoilValue(hireSelector);

  function onClickOption(v: any | null) {
    setForm(v);
    off();
  }

  return (
    <section className={styles.formPopup}>
      <ul className={styles.formList}>
        <li className={form === null ? styles.on : ""}>
          <button onClick={() => onClickOption(null)}>
            <span className={styles.chkBox}>
              <ChkBlue className={styles.chkBlue} />
            </span>

            <p>고용형태</p>
          </button>
        </li>

        {hire?.map((v:any, i:number) => (
          <li key={i} className={v === form ? styles.on : ""}>
            <button onClick={() => onClickOption(v)}>
              <span className={styles.chkBox}>
                <ChkBlue className={styles.chkBlue} />
              </span>
              <p>{v.name}</p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
