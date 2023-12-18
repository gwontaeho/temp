import styles from "./personOffer.module.scss";
import { ReactComponent as ChevronDown } from "assets/images/icon/ChevronDown.svg";
import DetailHeader from "components/header/detailHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SelPopup from "components/common/selPopup";
import PopupBg from "components/common/popupBg";
import { getOptionsFromArray } from "utils/options";
import DatePicker from "react-datepicker";
import { ReactComponent as CalenderSimple } from "assets/images/icon/CalenderSimple.svg";
import { useForm } from "react-hook-form";

const Form = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { register, handleSubmit, setValue, getValues, watch, reset } = useForm<Imeeting>({});

  const handleSelect = (v: string[]) => {
    setValue("m", v[0]);
    setOpen(false);
  };

  const hs = (e: any) => {
    e.preventDefault();
  };

  return (
    <main className={styles.personOffer}>
      <form>
        <section>
          <ul className={styles.formList}>
            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>미팅방식</p>
              </div>
              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div className={styles.inputBox} onClick={() => setOpen(true)}>
                    <input disabled {...register("m")} />
                    <ChevronDown className={styles.chevronDown} />
                  </div>
                  {open && (
                    <>
                      <SelPopup options={getOptionsFromArray(["대면", "비대면"])} values={[watch("m")]} onSelect={handleSelect} />
                      <PopupBg off={() => setOpen(false)} />
                    </>
                  )}
                </div>
              </div>
            </li>

            <li>
              <div className={styles.keyBox}>
                <p className={styles.key}>미팅 희망 날짜</p>
              </div>
              <div className={`${styles.valueBox} ${styles.termValueBox}`}>
                <div className={styles.inputBar}>
                  <div className={styles.inputBox}>
                    <DatePicker
                      // selected={watch("startDate")}
                      // {...register("startDate", {
                      //   required: "근무시작일은 필수 입력정보입니다.",
                      // })}
                      onChange={(date) => {}}
                      dateFormat="yyyy년MM월"
                      showMonthYearPicker
                      placeholderText="근무시작일"
                      // maxDate={watch("startDate") || new Date()}
                      maxDate={new Date()}
                      customInput={<CustomInput />}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div className={styles.inputBox}>
                    <input />
                  </div>
                </div>
              </div>
            </li>

            {watch("m") === "비대면" && (
              <li>
                <div className={styles.keyBox}>
                  <p className={styles.key}>미팅 URL</p>
                </div>
                <div className={styles.valueBox}>
                  <div className={styles.inputBar}>
                    <div className={styles.inputBox}>
                      <input />
                    </div>
                  </div>
                </div>
              </li>
            )}

            <li className={styles.textAreaCont}>
              <div className={styles.keyBox}>
                <p className={styles.key}>전달 사항</p>
              </div>
              <div className={styles.valueBox}>
                <div className={styles.inputBar}>
                  <div className={styles.inputBox}>
                    <textarea />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <div className={styles.buttons}>
          <button className={styles.accept} onClick={hs}>
            미팅 요청하기
          </button>
        </div>
      </form>
    </main>
  );
};

const Complete = () => {
  return (
    <main className={styles.personOffer}>
      <section className={styles.complete}>
        <h2>미팅 요청이 완료되었습니다.</h2>
        <article>
          <h3>미팅 요청 내용</h3>
          <ul>
            <li>
              <span className={styles.title}>미팅 방식</span>
              <i>비대면</i>
            </li>
            <li>
              <span className={styles.title}>미팅 희망 날짜</span>
              <i>2023-06-04 19:00</i>
            </li>
            <li>
              <span className={styles.title}>미팅 URL</span>
              <a>
                <i>http://</i>
              </a>
            </li>
            <li>
              <span className={styles.title}>전달 사항</span>
              <i>복장은 자유입니다.</i>
            </li>
          </ul>
        </article>
      </section>
      <div className={styles.buttons}>
        <button className={styles.accept}>확인 완료</button>
      </div>
    </main>
  );
};

export default function PersonOffer() {
  const navigate = useNavigate();

  return (
    <>
      <DetailHeader title="채용제안" bottomBorder />
      {/* <Form /> */}
      <Complete />
    </>
  );
}

const CustomInput = (props: React.HTMLProps<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => (
  <div className={styles.customDatePicker}>
    <input {...props} />
    <CalenderSimple className={styles.iconCalender} />
  </div>
);
