import { ReactComponent as SendBlue } from "assets/images/icon/SendBlue.svg";
import { ReactComponent as SendGray } from "assets/images/icon/SendGray.svg";
import DetailHeader from "components/header/detailHeader";
import { Suspense, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import { useAddComment } from "../hooks/useAddComment";
import { useComments } from "../hooks/useComments";
import Inquiry from "../shared/Inquiry";
import styles from "./index.module.scss";

export default function Comment() {
  return (
    <>
      <DetailHeader title="댓글" bottomBorder />
      <Suspense>
        <Resolved />
      </Suspense>
    </>
  );
}

function Resolved() {
  const param = useParams();
  const navigate = useNavigate();
  const { data: comments } = useComments();
  const { mutateAsync: onAddComment } = useAddComment();
  const user = useRecoilValue(userSelector);

  const [comment, setComment] = useState<string>("");

  const inputTextRef = useRef<HTMLInputElement>(null);

  const commentId = param?.commentId;
  const data = useMemo(
    () => comments.find((comment) => comment.id === commentId),
    [commentId, comments]
  );

  return (
    <main className={styles.comment}>
      <section className={styles.commentSec}>
        {data && (
          <Inquiry
            toggleReplyDefault={true}
            data={data}
            onClickReplyButton={() => inputTextRef.current?.focus()}
          />
        )}
      </section>

      <section className={styles.submitSec}>
        <article className={styles.inputBar}>
          <div className={styles.inputBox}>
            {user && (
              <input
                ref={inputTextRef}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="문의내용을 작성해주세요."
              />
            )}
            {!user && (
              <input
                onClick={() => navigate("/auth")}
                placeholder="로그인이 필요한 서비스입니다."
              />
            )}
          </div>
          <button
            disabled={!comment}
            className={styles.sendBtn}
            onClick={async () => {
              const threadId = comments.find(
                (comment) => commentId === comment.id
              )?.threadId;
              if (threadId != null) {
                await onAddComment({ inquiry: comment, threadId });
                setComment("");
              }
            }}
          >
            {comment ? <SendBlue /> : <SendGray />}
          </button>
        </article>
      </section>
    </main>
  );
}
