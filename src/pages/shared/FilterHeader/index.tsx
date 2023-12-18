import { ReactComponent as ChevronDownGray } from "assets/images/icon/ChevronDownGray.svg";
import { ReactComponent as CircleXGray } from "assets/images/icon/CircleXGray.svg";
import { ReactComponent as Magnifier } from "assets/images/icon/Magnifier.svg";
import { ReactComponent as Reload } from "assets/images/icon/Reload.svg";
import { ReactComponent as LogoBlue } from "assets/images/logo/LogoBlue.svg";
import CareerPopup from "components/common/filter/careerPopup";
import CategroyPopup from "components/common/filter/categoryPopup";
import FormPopup from "components/common/filter/formPopup";
import LocationPopup from "components/common/filter/locationPopup";
import PopupBg from "components/common/popupBg";
import { NoticeButton } from "pages/shared/NoticeButton";
import { ProfilImageButton } from "pages/shared/ProfilImageButton";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userSelector } from "states/user";
import { getCareerStr } from "utils/filter";
import styles from "./index.module.scss";

interface Iprops {
  urlSearch?: string | null;
  autoCategory?: boolean;
  category: string[];
  location: string[];
  career: number[] | null;
  form: any | null;
  setCategory: Function;
  setLocation: Function;
  setCareer: Function;
  setForm: Function;
}

export default function FilterHeader({
  urlSearch,
  autoCategory = false,
  category,
  location,
  career,
  form,
  setCategory,
  setLocation,
  setCareer,
  setForm,
}: Iprops) {
  const { pathname } = useLocation();
  const user = useRecoilValue(userSelector);
  const urlLocation = useLocation();
  const navigate = useNavigate();

  const [searchMode, setSearchMode] = useState<boolean>(
    urlSearch ? true : false
  );
  const [search, setSearch] = useState(urlSearch || "");
  // const [category, setCategory] = useState<string[]>([]);
  const [categoryPopup, setCategoryPopup] = useState<boolean>(autoCategory);
  // const [location, setLocation] = useState<string[]>([]);
  const [locationPopup, setLocationPopup] = useState<boolean>(false);
  // const [career, setCareer] = useState<number[] | null>(null);
  const [careerPopup, setCareerPopup] = useState<boolean>(false);
  // const [form, setForm] = useState<string | null>(null);
  const [formPopup, setFormPopup] = useState<boolean>(false);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") navigate(`${urlLocation.pathname}?search=${search}`);
  }

  function onClickClearBtn() {
    setSearchMode(false);
    setSearch("");
  }

  function getFilterStr(selectList: any[], nullStr: string): string {
    switch (selectList.length) {
      case 0:
        return nullStr;
      case 1:
        return selectList[0].name;
      default:
        return `${selectList[0].name} 외 ${selectList.length - 1}`;
    }
  }

  return (
    <>
      <header className={styles.filterHeader}>
        <section className={styles.topBar}>
          <article className={styles.leftArea}>
            <button
              className={styles.logoBtn}
              onClick={() => navigate("/home")}
            >
              <LogoBlue className={styles.logo} />
            </button>
          </article>

          <article className={styles.rightArea}>
            {searchMode && (
              <div className={styles.inputBox}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="검색어를 입력하세요"
                  onKeyDown={handleKeyDown}
                />

                {search && (
                  <button className={styles.clearBtn} onClick={onClickClearBtn}>
                    <CircleXGray />
                  </button>
                )}
              </div>
            )}
            {!searchMode && (
              <>
                <button
                  className={`${styles.utilBtn} ${styles.searchBtn}`}
                  onClick={() => setSearchMode(true)}
                >
                  <Magnifier />

                  <span className={styles.new} />
                </button>

                {user && (
                  <>
                    <NoticeButton borderColor="black" />
                    <ProfilImageButton />
                  </>
                )}
              </>
            )}
          </article>
        </section>

        <section className={styles.filterBar}>
          <span className={styles.btnBox}>
            <button
              className={styles.clearBtn}
              onClick={() => {
                navigate(pathname + "?page=1");
                window.location.reload();
              }}
            >
              <Reload />
            </button>
          </span>

          <span className={styles.btnBox}>
            <button
              className={`${styles.filterBtn} ${
                category.length > 0 ? styles.on : ""
              }`}
              onClick={() => setCategoryPopup(true)}
            >
              <p>{getFilterStr(category, "직무")}</p>
              <ChevronDownGray />
            </button>
          </span>

          <span className={styles.btnBox}>
            <button
              className={`${styles.filterBtn} ${
                location.length > 0 ? styles.on : ""
              }`}
              onClick={() => setLocationPopup(true)}
            >
              <p>{getFilterStr(location, "지역")}</p>
              <ChevronDownGray />
            </button>
          </span>

          <span className={styles.btnBox}>
            <button
              className={`${styles.filterBtn} ${
                career?.length ? styles.on : ""
              }`}
              onClick={() => setCareerPopup(true)}
            >
              <p>{getCareerStr(career) || "경력"}</p>
              <ChevronDownGray />
            </button>
          </span>

          <span className={styles.btnBox}>
            <button
              className={`${styles.filterBtn} ${form ? styles.on : ""}`}
              onClick={() => setFormPopup(true)}
            >
              <p>{form?.name || "고용형태"}</p>
              <ChevronDownGray />
            </button>
          </span>
        </section>
      </header>

      {categoryPopup && (
        <>
          <CategroyPopup
            category={category}
            setCategory={setCategory}
            off={() => setCategoryPopup(false)}
          />
          <PopupBg bg opacity={0.6} off={() => setCategoryPopup(false)} />
        </>
      )}

      {locationPopup && (
        <>
          <LocationPopup
            location={location}
            setLocation={setLocation}
            off={() => setLocationPopup(false)}
          />
          <PopupBg bg opacity={0.6} off={() => setLocationPopup(false)} />
        </>
      )}

      {careerPopup && (
        <>
          <CareerPopup
            career={career}
            setCareer={setCareer}
            off={() => setCareerPopup(false)}
          />
          <PopupBg bg opacity={0.6} off={() => setCareerPopup(false)} />
        </>
      )}

      {formPopup && (
        <>
          <FormPopup
            form={form}
            setForm={setForm}
            off={() => setFormPopup(false)}
          />
          <PopupBg off={() => setFormPopup(false)} />
        </>
      )}
    </>
  );
}
