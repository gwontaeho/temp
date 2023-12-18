import styles from "./resumeOfList.module.scss";
import { ReactComponent as WriteGray } from "assets/images/icon/WriteGray.svg";
import { ReactComponent as DeleteGray } from "assets/images/icon/DeleteGray.svg";
import { ReactComponent as LockGray } from "assets/images/icon/LockGray.svg";
import { ReactComponent as Unlock } from "assets/images/icon/Unlock.svg";
import { toast } from "react-toastify";
import { useState } from "react";
import PopupBg from "components/common/popupBg";
import BottomSheetPopup from "components/common/bottomSheetPopup";
import { useNavigate } from "react-router-dom";

interface Iprops {
  index: number;
  list: IresumeSimple[];
  setList: Function;
  toggleFunc: Function
  delFunc: Function
  uuid?: string;
}

export default function ResumeOfList({ index, list, setList, toggleFunc, delFunc, uuid }: Iprops) {
  const data = list[index];

  const navigate = useNavigate();

  const [delPopup, setDelPopup] = useState<boolean>(false);

  function onClickDelBtn() {
    let _list = list;
    _list.splice(index, 1);
    setList([..._list]);
    toast("이력서가 삭제되었습니다.");
  }

  return (
    <>
      <li className={styles.resumeOfList}>
        <button
          className={`${styles.toggleLockBtn} ${data.lock ? styles.on : ""}`}
          onClick={() => toggleFunc(data)}
        >
          <span className={styles.thumb}>
            {data.lock ? <Unlock /> : <LockGray />}
          </span>
        </button>

        <div className={styles.infoCont}>
          <p className={styles.date}>
            작성일 <span className={styles.blue}>{data.date} </span>
          {data.iscomplete || <span className={styles.gray}>- 작성 중</span>}
          </p>

          <p className={styles.name}>{data.name}</p>

          <ul className={styles.detailInfoList}>
            <li>
              <p className={styles.key}>희망지역</p>
              <hr />
              <p className={styles.value}>{data.location}</p>
            </li>
            <li>
              <p className={styles.key}>희망직종</p>
              <hr />
              <p className={styles.value}>{data.category}</p>
            </li>
          </ul>
        </div>

        <div className={styles.btnBar}>
          <button
            className={styles.editBtn}
            onClick={() => navigate("/mypage/resume/enroll", {state: {resume_uuid : uuid}})}
          >
            <WriteGray />
            <p>수정</p>
          </button>

          <button className={styles.delBtn} onClick={() => setDelPopup(true)}>
            <DeleteGray />
            <p>삭제</p>
          </button>
        </div>
      </li>

      {delPopup && (
        <>
          <BottomSheetPopup
            title="이력서를 삭제하시겠습니까?"
            cancelText="취소"
            cancelFunc={() => setDelPopup(false)}
            confirmText="확인"
            confirmFunc={() => delFunc(data.id)}
            off={() => setDelPopup(false)}
          />
          <PopupBg bg off={() => setDelPopup(false)} />
        </>
      )}
    </>
  );
}
