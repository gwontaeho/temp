import { ReactComponent as XGray } from "assets/images/icon/XGray.svg";
import { Suspense } from "react";
import styles from "../index.module.scss";
import { useDeleteRecentSearchKeyword } from "./useDeleteRecentSearchKeyword";
import { useRecentSearchKeywords } from "./useRecentSearchKeywords";

interface Props {
  onSearch: (keyword: string) => void;
}

export function RecentSearchKeywords(props: Props) {
  return (
    <Suspense>
      <Resolved {...props} />
    </Suspense>
  );
}

function Resolved({ onSearch }: Props) {
  const { data: recentSearchKeywords } = useRecentSearchKeywords();
  const { mutateAsync: onDeleteRecentSearchKeyword } =
    useDeleteRecentSearchKeyword();
  function delRecentSearch(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) {
    e.stopPropagation();
    onDeleteRecentSearchKeyword(id);
  }

  return (
    <>
      {recentSearchKeywords.map((v, i) => (
        <li key={i} onClick={() => onSearch(v.word)}>
          <p>{v.word}</p>

          <button
            className={styles.delBtn}
            onClick={(e) => delRecentSearch(e, v.id)}
          >
            <XGray />
          </button>
        </li>
      ))}
    </>
  );
}
