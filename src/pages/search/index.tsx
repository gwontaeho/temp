import { ReactComponent as ChevronLeftBig } from "assets/images/icon/ChevronLeftBig.svg";
import { ReactComponent as CircleXGray } from "assets/images/icon/CircleXGray.svg";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PopularSearchKeywords } from "./PopularSearchKeywords";
import { RecentSearchKeywords } from "./RecentSearchKeywords";
import { useSearch } from "./hooks/useSearch";
import styles from "./index.module.scss";

export default function Search() {
  const inputref = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { mutateAsync } = useSearch();

  const [search, setSearch] = useState<string>("");
  const [searchResultList, setSearchResultList] = useState<IrecomendedList[]>();

  const fetchSearchResults = debounce(async (input) => {
    const data = await mutateAsync(input);
    setSearchResultList(data);
  }, 500);

  function getHilightBySearch(data: IrecomendedList): any {
    let _highlightedName =
      `<p class=${styles.name}>` +
      data.name.replaceAll(search, `<mark>${search}</mark>`) +
      "</p>";
    let _category = "<p> · " + data.category + "</p>";

    let textTag = _highlightedName + _category;
    return textTag;
  }

  useEffect(() => {
    if (!inputref.current) return;

    inputref.current.focus();
  }, [inputref]);

  useEffect(() => {
    if (search) {
      fetchSearchResults(search);
    } else {
      setSearchResultList([]);
    }
  }, [search]);

  return (
    <main className={styles.search}>
      <header className={styles.searchHeader}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ChevronLeftBig />
        </button>
        <input
          ref={inputref}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
        {search && (
          <button className={styles.delBtn} onClick={() => setSearch("")}>
            <CircleXGray />
          </button>
        )}
      </header>

      {search && (
        <section className={styles.searchSec}>
          <article className={styles.recommendedArea}>
            <ul className={styles.recommendedList}>
              {searchResultList?.map((v, i) => (
                <li
                  key={i}
                  onClick={() =>
                    navigate(`/hire?search=${v.name}`, {
                      state: { isOpenCategoryModal: false },
                    })
                  }
                  dangerouslySetInnerHTML={{
                    __html: getHilightBySearch(v),
                  }}
                />
              ))}
            </ul>
          </article>
        </section>
      )}
      {!search && (
        <section className={styles.searchNullSec}>
          <article className={`${styles.popularArea} ${styles.searchArea}`}>
            <h1 className={styles.areaTitle}>인기 검색어</h1>

            <ul className={styles.popularList}>
              <PopularSearchKeywords onSearch={setSearch} />
            </ul>
          </article>

          <article className={`${styles.recentArea} ${styles.searchArea}`}>
            <h1 className={styles.areaTitle}>최근 검색어</h1>
            <ul className={styles.recentList}>
              <RecentSearchKeywords onSearch={setSearch} />
            </ul>
          </article>
        </section>
      )}
    </main>
  );
}
