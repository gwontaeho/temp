import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./inqury.module.scss";

interface Iprops {
  data: IinquryList;
  index: number;
}

export default function Inquiry({ data, index }: Iprops) {
  const navigate = useNavigate();

  const [toggleReply, setToggleReply] = useState<boolean>(false);

  return (
    <li className={styles.inqury}>
      <img className={styles.profImg} src={data.profImg} alt="" />

      <div className={styles.inquryBox}>
        <div className={styles.contBar}>
          <p className={styles.nickname}>{data.nickname}</p>

          <p className={styles.content}>{data.content}</p>
        </div>

        <div className={styles.utilBar}>
          <p className={styles.time}>{data.time}</p>

          <button
            className={styles.replyBtn}
            onClick={() => navigate(`comment/${index}`)}
          >
            답글달기
          </button>
        </div>

        {data.reply && (
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
                      <p className={styles.time}>{replyV.time}</p>
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
