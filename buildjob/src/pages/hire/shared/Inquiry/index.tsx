import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import { getDateDiffFromNow } from "utils/date";
import styles from "./index.module.scss";

interface Iprops {
  toggleReplyDefault?: boolean;
  data: IinquryList;
  onClickReplyButton: () => void;
}

export default function Inquiry({
  toggleReplyDefault = false,
  data,
  onClickReplyButton,
}: Iprops) {
  const user = useRecoilValue(userSelector);
  const [toggleReply, setToggleReply] = useState<boolean>(toggleReplyDefault);

  return (
    <li className={styles.inqury}>
      <img className={styles.profImg} src={data.profImg} alt="" />

      <div className={styles.inquryBox}>
        <div className={styles.contBar}>
          <p className={styles.nickname}>{data.nickname}</p>

          <p className={styles.content}>{data.content}</p>
        </div>

        {user && (
          <div className={styles.utilBar}>
            <p>{getDateDiffFromNow(new Date(data.time)).text}</p>

            <button className={styles.replyBtn} onClick={onClickReplyButton}>
              답글달기
            </button>
          </div>
        )}

        {data.reply && data.reply?.length > 0 && (
          <div className={styles.replyBar}>
            <hr />

            <button
              className={styles.displayBtn}
              onClick={() => setToggleReply(!toggleReply)}
            >
              {toggleReply ? "답글숨기기" : `답글보기(${data.reply.length}개)`}
            </button>
          </div>
        )}

        {toggleReply && (
          <ul className={styles.replyList}>
            {data.reply &&
              data.reply.map((replyV, i) => (
                <li key={i} className={styles.reply}>
                  <img className={styles.profImg} src={replyV.profImg} alt="" />

                  <div className={styles.inquryBox}>
                    <div className={styles.contBar}>
                      <p className={styles.nickname}>{replyV.nickname}</p>

                      <p className={styles.content}>{replyV.content}</p>
                    </div>

                    <div className={styles.utilBar}>
                      <p>{getDateDiffFromNow(new Date(replyV.time)).text}</p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </li>
  );
}
