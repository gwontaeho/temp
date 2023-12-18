import ReferralBg from "assets/images/bg/mypage/referral/ReferralBg.svg";
import DetailHeader from "components/header/detailHeader";
import { D_noticeList } from "data/my/referral/D_referral";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userSelector } from "states/user";
import { api, eps } from "utils/config";
import styles from "./referral.module.scss";

export default function Referral() {
  const navigate = useNavigate();
  const user = useRecoilValue(userSelector);
  const setUser = useSetRecoilState(userSelector);
  const [code, setCode] = useState<string>("");
  const [myCode, setMyCode] = useState<string>();
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

  async function setUserInfo() {
    try {
      let data = await api.get(eps["USERINFO"]);
      var res = data.data.respdata;
      setUser({
        phoneNumber: res.phonenumber,
        password: res.password,
        userName: res.username,
        urlProfileImage: res.urlprofileimage,
        level: res.level,
        myRefererCode: res.myreferercode,
        parentCode: res.parentcode,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function postParentReferral() {
    try {
      let { data } = await api.post(eps["POST_PARENT_REFERRAL"](code));
      if (data.status === "ERR")
        toast("존재하지 않는 추천코드입니다.", {
          position: toast.POSITION.TOP_LEFT,
        });
      else {
        toast("추천등급이 반영되었습니다.", {
          position: toast.POSITION.TOP_LEFT,
        });
        setUserInfo();
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setMyCode(user?.myRefererCode);
    user?.parentCode && setDisabledBtn(true);
  }, [user]);

  return (
    <>
      <DetailHeader title="추천인" bottomBorder />

      <main
        className={styles.referral}
        style={{
          background: `url(${ReferralBg}) 0 50px no-repeat, ${styles.Orange1}`,
        }}
      >
        <article className={styles.titleArea}>
          <h1 className={styles.pageTitle}>친구초대</h1>

          <p className={styles.explain}>
            친구에게 추천받고
            <br />
            수수료 혜택 받으세요.
          </p>
        </article>

        <article className={styles.inputArea}>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="추천코드 입력"
          />

          <button
            disabled={disabledBtn}
            className={
              disabledBtn ? styles.disabledSubmitBtn : styles.submitBtn
            }
            onClick={() => postParentReferral()}
          >
            혜택받기
          </button>
        </article>

        <article className={styles.copyArea}>
          <fieldset>
            <legend>친구에게 내 추천코드를 공유해주세요!</legend>
            <CopyToClipboard
              text={
                myCode
                  ? "https://buildjob.co/#/auth/join?referer=" + myCode
                  : ""
              }
            >
              <button
                className={styles.link}
                onClick={() =>
                  toast("URL이 복사되었습니다.", {
                    position: toast.POSITION.TOP_LEFT,
                  })
                }
              >
                링크 복사하기
              </button>
            </CopyToClipboard>
            <CopyToClipboard text={myCode ? myCode : ""}>
              <button
                className={styles.code}
                onClick={() =>
                  toast("코드가 복사되었습니다.", {
                    position: toast.POSITION.TOP_LEFT,
                  })
                }
              >
                코드 복사하기
              </button>
            </CopyToClipboard>
          </fieldset>
        </article>
      </main>

      <footer className={styles.footer}>
        <h3 className={styles.noticeKey}>추천인 등급 유의사항</h3>

        <ul className={styles.noticeList}>
          {D_noticeList.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      </footer>
    </>
  );
}
