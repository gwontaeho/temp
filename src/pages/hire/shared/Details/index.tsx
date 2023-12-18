import { ReactComponent as MagnifierPlus } from "assets/images/icon/MagnifierPlus.svg";
import { useJobPost } from "hooks/useJobPost";
import { useUuid } from "hooks/useUuid";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

export default function Details() {
  const navigate = useNavigate();
  const uuid = useUuid();
  const {
    data: { note },
  } = useJobPost(uuid);

  return (
    <div className={styles.details}>
      <div className={styles.keyBar}>
        <p className={styles.contKey}>상세요강</p>

        <button
          className={styles.moreBtn}
          onClick={() => navigate("detailcontent")}
        >
          <MagnifierPlus />
        </button>
      </div>

      <div className={styles.contValue}>
        <p className={styles.placeholder}>
          상세요강을 <span className={styles.blue}>확대</span>할 수 있습니다.
        </p>

        <div className={styles.contPlace}>
          <ReactQuill value={note} readOnly={true} theme={"bubble"} />
        </div>
      </div>
    </div>
  );
}
