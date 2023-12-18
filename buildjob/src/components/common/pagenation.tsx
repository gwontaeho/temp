import { ReactComponent as ChevronRight } from "assets/images/icon/ChevronRight.svg";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./pagenation.module.scss";

interface Iprops {
  mt?: number;
  max_page?: number;
}

export default function Pagenation({ mt = 0, max_page = 5 }: Iprops) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState<number>(1);
  const [pageList, setPageList] = useState<number[]>(new Array(5).fill(0));

  const pageParams = parseInt(`${searchParams.get("page")}`) || 1;

  useEffect(() => {
    setPage(pageParams);
  }, [pageParams]);

  useEffect(() => {
    patchPageList();
  }, [page, max_page]);

  useEffect(() => {
    setPage(1);
    onClickPageBtn(1);
  }, [max_page]);

  function patchPageList() {
    if (page === null) return;

    let _pageList = pageList;

    var maxPageList = Array.from({ length: max_page }, (_, i) => i + 1);
    if (max_page <= 5) _pageList = maxPageList;
    else {
      if (page < 3) _pageList = maxPageList.slice(0, 5);
      else if (page + 1 === max_page)
        _pageList = maxPageList.slice(page - 4, page + 1);
      else if (page === max_page) _pageList = maxPageList.slice(page - 5, page);
      else _pageList = maxPageList.slice(page - 3, page + 2);
    }

    setPageList([..._pageList]);
  }

  function onClickPageBtn(newPage: number) {
    const { pathname, search } = location;
    let _newSearch: string;

    if (search) {
      if (search.indexOf("page=") === -1)
        _newSearch = search + `&page=${newPage}`;
      else _newSearch = search.replace(`page=${page}`, `page=${newPage}`);
    } else _newSearch = `?page=${newPage}`;

    navigate(pathname + _newSearch);
    setPage(newPage);
  }

  return (
    <article className={styles.pagenation} style={{ marginTop: mt }}>
      <button
        className={`${styles.preBtn} ${styles.chevronBtn}`}
        onClick={() => {
          page > 1 && onClickPageBtn(page - 1);
        }}
      >
        <ChevronRight />
      </button>

      <ul className={styles.pageList}>
        {pageList.map((v, i) => (
          <li key={i}>
            <button
              className={`${styles.pageBtn} ${v === page ? styles.on : ""}`}
              onClick={() => onClickPageBtn(v)}
            >
              {v}
            </button>
          </li>
        ))}
      </ul>

      <button
        className={`${styles.nextBtn} ${styles.chevronBtn}`}
        onClick={() => {
          page < max_page && onClickPageBtn(page + 1);
        }}
      >
        <ChevronRight />
      </button>
    </article>
  );
}
