import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useJobPosts } from "../hooks/useJobPosts";
import styles from "../index.module.scss";

interface Props {
  order: ISortKey;
  jobType?: string[];
  regionCode?: string[];
  career?: number[];
  form?: string;
}

export function JobPostsCount(props: Props) {
  return (
    <ErrorBoundary fallback={<>error</>}>
      <p className={styles.count}>
        <Suspense fallback={"0"}>
          <Resolved {...props} />
        </Suspense>
        건
      </p>
    </ErrorBoundary>
  );
}

function Resolved({ order, jobType, regionCode, career, form }: Props) {
  const { data } = useJobPosts({
    order,
    jobType,
    regionCode,
    career,
    form,
  });

  return (
    <span className={styles.value}>
      {Intl.NumberFormat().format(data?.count)}
    </span>
  );
}
