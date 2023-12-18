import { ReactComponent as SendBlue } from "assets/images/icon/SendBlue.svg";
import { ReactComponent as SendGray } from "assets/images/icon/SendGray.svg";
import { D_ruleList } from "data/hire/D_hireDetail";
import { useAddComment } from "pages/hire/hooks/useAddComment";
import { useComments } from "pages/hire/hooks/useComments";
import Inquiry from "pages/hire/shared/Inquiry";
import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import styles from "./index.module.scss";

export default function Inquiries() {
  const user = useRecoilValue(userSelector);
  const { mutateAsync: onAddComment } = useAddComment();
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState<string>("");

  return (
    <div className={styles.inquiries}>
      <div className={styles.keyBar}>
        <p className={styles.contKey}>문의</p>
      </div>

      <div className={styles.contValue}>
        <ul className={styles.ruleList}>
          {D_ruleList.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>

        <div className={styles.inputBar}>
          <div className={styles.inputBox}>
            {user && (
              <input
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                placeholder="문의내용을 작성해주세요."
              />
            )}
            {!user && (
              <input
                onClick={() => {
                  navigate("/auth");
                }}
                placeholder="로그인이 필요한 서비스입니다."
              />
            )}
          </div>

          <button
            className={styles.sendBtn}
            onClick={async () => {
              await onAddComment({ inquiry });
              setInquiry("");
            }}
          >
            {inquiry ? <SendBlue /> : <SendGray />}
          </button>
        </div>

        <Suspense>
          <Items />
        </Suspense>
      </div>
    </div>
  );
}

function Items() {
  const { data: comments } = useComments();
  const navigate = useNavigate();

  return (
    <ul className={styles.inquryList}>
      {comments.map((v, i) => (
        <Inquiry
          key={i}
          data={v}
          onClickReplyButton={() => navigate(`comment/${v.id}`)}
        />
      ))}
    </ul>
  );
}
