import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactComponent as DeleteGray } from "assets/images/icon/DeleteGray.svg";
import { ReactComponent as WriteGray } from "assets/images/icon/WriteGray.svg";
import BottomSheetPopup from "components/common/bottomSheetPopup";
import PopupBg from "components/common/popupBg";
import DetailHeader from "components/header/detailHeader";
import AutoSavePopup from "components/my/company/jobOpening/enroll/autoSavePopup";
import { useMyStatus } from "hooks/useMyStatus";
import { queryClient } from "providers/ReactQueryProvider";
import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import { api, eps } from "utils/config";
import styles from "./jobOpening.module.scss";

export default function Jobopening() {
  return (
    <>
      <DetailHeader title="공고 관리" bottomBorder />
      <Suspense>
        <Resolved />
      </Suspense>
    </>
  );
}

function Resolved() {
  const navigate = useNavigate();

  const {
    data: { countjobpostsincomplete },
  } = useMyStatus();
  const [iscomplete, setIscomplete] = useState<number>(1);
  const { data: jobOpeningList } = useJobPosts(iscomplete);
  const [autoSave, setAutoSave] = useState<boolean>(
    countjobpostsincomplete > 0
  );
  const [deletePopupIndex, setDeletePopupIndex] = useState(-1);

  const { mutateAsync: onDeleteJobPost } = useDeleteJobPost();

  const handleClickNext = () => {
    setIscomplete(0);
    setAutoSave(false);
  };

  function handleOpenDeletePopup(index: number | null) {
    if (index === null) {
      setDeletePopupIndex(-1);
    } else {
      setDeletePopupIndex(index);
    }
  }

  function handleCloseDeletePopup() {
    setDeletePopupIndex(-1);
  }

  return (
    <main className={styles.jobOpening}>
      {autoSave && <AutoSavePopup handleClickNext={handleClickNext} />}

      <section className={styles.jobOpeningSec}>
        <ul className={styles.jobOpeningList}>
          {jobOpeningList?.map((v, i) => {
            const { id, title, pay, location, workhours, uuid } = v;
            return (
              <>
                <li key={i}>
                  <div className={styles.infoCont}>
                    <h1 className={styles.title}>{title}</h1>

                    <ul className={styles.infoList}>
                      <li>
                        <p className={styles.key}>급여</p>
                        <hr />
                        <p className={styles.value}>{pay}</p>
                      </li>

                      <li>
                        <p className={styles.key}>근무지</p>
                        <hr />
                        <p className={styles.value}>{location}</p>
                      </li>

                      <li>
                        <p className={styles.key}>근무기간</p>
                        <hr />
                        <p className={styles.value}>{workhours}</p>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.btnBar}>
                    <button
                      className={styles.editBtn}
                      onClick={() =>
                        navigate("/mypage/company/jobopening/enroll", {
                          state: { uuid },
                        })
                      }
                    >
                      <WriteGray />
                      <p>수정</p>
                    </button>

                    <button
                      className={styles.delBtn}
                      onClick={() => handleOpenDeletePopup(i)}
                    >
                      <DeleteGray />
                      <p>삭제</p>
                    </button>
                  </div>
                </li>
                {deletePopupIndex === i && (
                  <>
                    <BottomSheetPopup
                      title="공고를 삭제하시겠습니까?"
                      cancelText="취소"
                      cancelFunc={handleCloseDeletePopup}
                      confirmText="확인"
                      confirmFunc={() => onDeleteJobPost({ id, uuid })}
                      off={handleCloseDeletePopup}
                    />
                    <PopupBg bg off={handleCloseDeletePopup} />
                  </>
                )}
              </>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

function useJobPosts(iscomplete: number) {
  const user = useRecoilValue(userSelector);

  const { data, ...rest } = useQuery(
    ["GET_JOBPOSTS", iscomplete, user?.phoneNumber ?? user?.socialId],
    async () => {
      const { data } = await api.get(eps["GET_JOBPOSTS"](0, 1000, iscomplete));

      const list = data.list.map((item: any) => {
        const {
          id,
          title,
          paytype,
          payamount,
          payunit,
          workhours,
          streetaddress,
          detailaddress,
          uuid,
        } = item;
        const pay = `${paytype} ${payamount}${payunit}`;
        const location = `${streetaddress || ""}${
          detailaddress ? ", " + detailaddress : ""
        }`;
        return {
          id,
          title,
          pay,
          location,
          workhours,
          uuid,
        };
      });

      return list as IjobOpeningSimple[];
    },
    { enabled: user != null }
  );

  return { data, ...rest };
}

function useDeleteJobPost() {
  const user = useRecoilValue(userSelector);

  return useMutation(async ({ id, uuid }: { id: number; uuid: string }) => {
    await api.delete(eps["JOB_POSTS"](id));

    await queryClient.invalidateQueries([
      "GET_JOBPOSTS",
      user?.phoneNumber ?? user?.socialId,
    ]);
    await queryClient.invalidateQueries(["GET_JOB_DETAIL", uuid]);
    toast("공고가 삭제되었습니다.");
  });
}
