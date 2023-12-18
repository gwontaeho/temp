import BottomNavBar from "components/bottomBar/bottomNavBar";
import FloatingActBtns from "components/common/floatingAction/floatingActBtns";
import HireDetailHeader from "components/header/hireDetailHeader";
import { useJobPost } from "hooks/useJobPost";
import { useUuid } from "hooks/useUuid";
import { Suspense } from "react";
import ReactQuill from "react-quill";
import styles from "./index.module.scss";

export default function DetailContent() {
  return (
    <>
      <HireDetailHeader title="상세모집요강" />

      <main className={styles.detailContent}>
        <Suspense>
          <Resolved />
        </Suspense>
      </main>

      <FloatingActBtns upBtn />
      <BottomNavBar activeLabel="채용" />
    </>
  );
}

function Resolved() {
  const uuid = useUuid();
  const {
    data: { note },
  } = useJobPost(uuid);

  return (
    <div className={styles.contPlace}>
      <ReactQuill value={note} readOnly={true} theme={"bubble"} />
    </div>
  );
}
