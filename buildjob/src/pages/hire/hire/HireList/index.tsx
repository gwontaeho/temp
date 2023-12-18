import { ReactComponent as Flag } from "assets/images/icon/Flag.svg";
import { ReactComponent as FlagFillBlue } from "assets/images/icon/FlagFillBlue.svg";
import Pagenation from "components/common/pagenation";
import { FavoriteButton } from "pages/shared/FavoriteButton";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { formatAddress } from "utils/formatJobPostData";
import { useJobPosts } from "../hooks/useJobPosts";
import styles from "../index.module.scss";

interface Props {
  order: ISortKey;
  jobType?: string[];
  regionCode?: string[];
  career?: number[];
  form?: string;
}

export function HireList(props: Props) {
  return (
    <ErrorBoundary fallback={<>에러입니다.</>}>
      <Suspense>
        <Resolved {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

function Resolved({ order, jobType, regionCode, career, form }: Props) {
  const navigate = useNavigate();
  const { data: hireList, maxPage } = useJobPosts({
    order,
    jobType,
    regionCode,
    career,
    form,
  });

  return (
    <article className={styles.contArea}>
      <ul className={styles.hireList}>
        {hireList?.list.map((v, i) => (
          <li key={i} onClick={() => navigate(`${v.uuid}`)}>
            <div className={styles.favBtn}>
              <FavoriteButton
                uuid={v.uuid}
                savedIcon={<FlagFillBlue />}
                unsavedIcon={<Flag className={styles.flag} />}
              />
            </div>

            <p className={styles.company}>{v.corporationName}</p>

            <h2 className={styles.announceTitle}>{v.title}</h2>

            <div className={styles.bottomBar}>
              <p className={styles.info}>
                {`${formatAddress(v.streetAddress)} · `}
                <span className={styles.red}>{v.payType}</span> {v.payAmount}
                {v.payUnit}
              </p>

              <button
                className={styles.supportBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/hire/${v.uuid}/apply`);
                }}
              >
                지원하기
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Pagenation mt={30} max_page={maxPage} />
    </article>
  );
}
