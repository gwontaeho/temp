import { ReactComponent as Bell } from "assets/images/icon/Bell.svg";
import { ReactComponent as BellWhite } from "assets/images/icon/BellWhite.svg";
import { useMyStatus } from "hooks/useMyStatus";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

interface Props {
  borderColor?: "grey" | "black";
}

export function NoticeButton(props: Props) {
  return (
    <Suspense fallback={<BellWhite />}>
      <Resolved {...props} />
    </Suspense>
  );
}

function Resolved({ borderColor = "grey" }: Props) {
  const navigate = useNavigate();
  const { data: myStatus } = useMyStatus();

  return (
    <button
      className={`${styles.utilBtn} ${styles.noticeBtn}`}
      onClick={() => navigate("/notice")}
    >
      {borderColor === "grey" && <BellWhite />}
      {borderColor === "black" && <Bell />}

      {myStatus.notifiesunread > 0 && (
        <span
          className={styles.new}
          style={{ ...(borderColor === "black" && { background: "#6977f9" }) }}
        />
      )}
    </button>
  );
}
