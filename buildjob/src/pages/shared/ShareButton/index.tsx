import { ReactComponent as Share } from "assets/images/icon/Share.svg";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import styles from "./index.module.scss";

export function ShareButton() {
  return (
    <CopyToClipboard text={window.location.href}>
      <button
        className={styles.utilBtn}
        onClick={() => {
          toast("링크가 복사되었습니다.", {
            position: toast.POSITION.TOP_LEFT,
          });
        }}
      >
        <Share />
      </button>
    </CopyToClipboard>
  );
}
