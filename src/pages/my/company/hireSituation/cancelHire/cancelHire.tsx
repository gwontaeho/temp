import DetailHeader from "components/header/detailHeader";
import styles from "./cancelHire.module.scss";
import Person1 from "assets/images/example/my/company/Person1.png";
import { useRef, useState } from "react";
import { ReactComponent as StarFill } from "assets/images/icon/StarFill.svg";
import { ReactComponent as StarFillGray } from "assets/images/icon/StarFillGray.svg";
import { ReactComponent as CameraBlue } from "assets/images/icon/CameraBlue.svg";
import { ReactComponent as XWhite } from "assets/images/icon/XWhite.svg";

export default function CancelHire() {
  const imgInputRef = useRef<HTMLInputElement>(null);

  const [score, setScore] = useState<number>(1);
  const [reason, setReason] = useState<string>("");
  const [imgList, setImgList] = useState<string[]>([]);

  function onChangeImg(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (!reader.result) return;
      console.log(reader.result);

      setImgList([...imgList, `${reader.result}`]);
    };
  }

  function onClickDelImgBtn(i: number) {
    let _imgList = imgList;
    _imgList.splice(i, 1);
    setImgList([..._imgList]);
  }

  return (
    <>
      <DetailHeader title="채용취소" bottomBorder />

      <main className={styles.cancelHire}>
        <section className={styles.reviewSec}>
          <article className={styles.profArea}>
            <span className={styles.profImgBox}>
              <img src={Person1} alt="" />
            </span>

            <h1 className={styles.name}>김유재</h1>
          </article>

          <ul className={styles.scoreBtnList}>
            {new Array(5).fill("").map((v, i) => (
              <li key={i}>
                <button
                  className={styles.scoreBtn}
                  onClick={() => setScore(i + 1)}
                >
                  {i + 1 <= score ? <StarFill /> : <StarFillGray />}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.reasonSec}>
          <article className={styles.topBar}>
            <h2 className={styles.secTitle}>취소 사유를 입력해 주세요.</h2>

            <p className={styles.count}>
              <span className={styles.blue}>{reason.length}</span>
              /500
            </p>
          </article>

          <article className={styles.contArea}>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="최소 10자 이상 입력해 주세요."
            />

            <button
              className={styles.enrollImgBtn}
              onClick={() => imgInputRef.current?.click()}
            >
              <CameraBlue />

              <p>사진/동영상 첨부하기</p>
            </button>

            <input
              ref={imgInputRef}
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => onChangeImg(e)}
            />
            {imgList.length > 0 && (
              <>
                <ul className={styles.imgList}>
                  {imgList.map((v, i) => (
                    <li key={i}>
                      <img src={v} alt="" />

                      <button
                        className={styles.delBtn}
                        onClick={() => onClickDelImgBtn(i)}
                      >
                        <XWhite />
                      </button>
                    </li>
                  ))}
                </ul>

                <p className={styles.notice}>
                  인재와 무관한 사유 및 사진은 관리자 검토 후 불이익이 있을 수
                  있습니다.
                </p>
              </>
            )}
          </article>
        </section>

        <section className={styles.btnSec}>
          <button className={styles.actionBtn} onClick={() => {}}>
            취소하기
          </button>
        </section>
      </main>
    </>
  );
}
