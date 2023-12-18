import { useForm } from "react-hook-form";
import styles from "./personalInfo.module.scss";
import { api, eps } from "utils/config";
import { useQuery } from "@tanstack/react-query";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { toast } from "react-toastify";

const Postcode = ({ onComplete }: { onComplete: (streetaddress: string) => void }) => {
  const open = useDaumPostcodePopup();

  const handleComplete = (data: any) => {
    let streetaddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") extraAddress += data.bname;
      if (data.buildingName !== "") extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      streetaddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    onComplete(streetaddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button type="button" className={styles.findLocationBtn} onClick={handleClick}>
      주소찾기
    </button>
  );
};

export default function PersonalInfo() {
  const { data, refetch } = useUser();

  const { uuid, username, gender, nickname, phone, dob, streetaddress, detailaddress } = data;
  const values = { streetaddress, detailaddress, dob, gender };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    getValues,
  } = useForm<IeditProfile>({ values });

  function onComplete(streetaddress: string) {
    setValue("streetaddress", streetaddress);
  }

  async function onSubmit() {
    try {
      await api.put(eps["UPDATE_USER"](uuid), getValues());
      toast("개인 정보 수정이 완료되었습니다.", { position: toast.POSITION.TOP_LEFT });
      refetch();
    } catch (error) {}
  }

  return (
    <section className={styles.personalInfo}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className={styles.formList}>
          <li>
            <div className={styles.keyBox}>
              <p className={styles.key}>아이디</p>
            </div>
            <div className={styles.valueBox}>
              <div className={styles.inputBar}>
                <div className={styles.inputBox}>
                  <input disabled value={username} />
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className={styles.keyBox}>
              <p className={styles.key}>이름</p>
            </div>

            <div className={styles.valueBox}>
              <div className={styles.inputBar}>
                <div className={styles.inputBox}>
                  <input disabled value={nickname} />
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className={styles.keyBox}>
              <p className={styles.key}>휴대폰</p>
            </div>

            <div className={styles.valueBox}>
              <div className={styles.inputBar}>
                <div className={styles.inputBox}>
                  <input disabled value={phone} />
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className={styles.keyBox}>
              <p className={styles.key}>생년월일</p>
            </div>
            <div className={styles.valueBox}>
              <div className={styles.inputBar}>
                <div className={`${errors.dob ? styles.err : ""} ${styles.inputBox}`}>
                  <input value={watch("dob")} {...register("dob")} />
                  <div className={styles.genderBtnBox}>
                    <button type="button" className={watch("gender") === "M" ? styles.on : ""} onClick={() => setValue("gender", "M")}>
                      남
                    </button>
                    <button type="button" className={watch("gender") === "F" ? styles.on : ""} onClick={() => setValue("gender", "F")}>
                      여
                    </button>
                  </div>
                </div>
              </div>
              {errors.dob?.message && <p className={styles.errorMsg}>{errors.dob.message}</p>}
            </div>
          </li>

          <li>
            <div className={styles.keyBox}>
              <p className={styles.key}>주소</p>
            </div>
            <div className={styles.valueBox}>
              <div className={styles.inputBar}>
                <div className={`${errors.streetaddress ? styles.err : ""} ${styles.inputBox}`}>
                  <input value={watch("streetaddress")} disabled />
                </div>
                <Postcode onComplete={onComplete} />
              </div>

              <div className={styles.inputBar}>
                <div className={`${errors.detailaddress ? styles.err : ""} ${styles.inputBox}`}>
                  <input disabled={!watch("streetaddress")} {...register("detailaddress")} />
                </div>
              </div>

              {errors.streetaddress?.message && <p className={styles.errorMsg}>{errors.streetaddress.message}</p>}
              {errors.detailaddress?.message && <p className={styles.errorMsg}>{errors.detailaddress.message}</p>}
            </div>
          </li>
        </ul>

        <button type="submit" className={styles.submitBtn}>
          수정완료
        </button>
      </form>
    </section>
  );
}

function useUser() {
  const { data, ...rest } = useQuery(["GET_USER"], async () => {
    const {
      data: { respdata },
    } = await api.get(eps["USERINFO"]);
    const { uuid, username, nickname, phone, dob, streetaddress, detailaddress, gender } = respdata;
    return {
      uuid,
      username: username || "",
      nickname: nickname || "",
      phone: phone || "",
      dob: dob || "",
      gender: gender || "",
      streetaddress: streetaddress || "",
      detailaddress: detailaddress || "",
    };
  });

  return { data: data!, ...rest };
}
