import { ReactComponent as ChevronDownGray } from "assets/images/icon/ChevronDownGray.svg";
import BottomNavBar from "components/bottomBar/bottomNavBar";
import FloatingActBtns from "components/common/floatingAction/floatingActBtns";
import OrderPopup from "components/common/orderPopup";
import PopupBg from "components/common/popupBg";
import { sortMap } from "data/hire/D_hire";
import FilterHeader from "pages/shared/FilterHeader";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { JobPostsCount } from "./Count";
import { HireList } from "./HireList";
import styles from "./index.module.scss";

export default function Hire() {
  const params = new URLSearchParams(window.location.search);
  const location = useLocation();

  const [search, setSearch] = useState<string | null>();
  const [order, setOrder] = useState<ISortKey>("DESC");
  const [orderPopup, setOrderPopup] = useState<boolean>(false);

  const [category, setCategory] = useState<any>([]);
  const [locationList, setLocationList] = useState<any>([]);
  const [career, setCareer] = useState<number[] | null>(null);
  const [form, setForm] = useState<any | null>(null);

  const searchParam = params.get("search") || "";

  useEffect(() => {
    setSearch(searchParam);
  }, [searchParam]);

  return (
    <>
      <FilterHeader
        urlSearch={search}
        autoCategory={location.state?.isOpenCategoryModal ?? true}
        category={category}
        location={locationList}
        career={career}
        form={form}
        setCategory={setCategory}
        setLocation={setLocationList}
        setCareer={setCareer}
        setForm={setForm}
      />

      <main className={styles.hire}>
        <section className={styles.hireSec}>
          <article className={styles.topBar}>
            <JobPostsCount
              order={order}
              jobType={category?.map((v: any) => v.code) as string[]}
              regionCode={locationList?.map((v: any) => v.code) as string[]}
              career={career ?? undefined}
              form={form?.code}
            />

            <span className={styles.btnBox}>
              <button
                className={styles.sortBtn}
                onClick={() => setOrderPopup(true)}
              >
                <p>{sortMap[order].label}</p>

                <ChevronDownGray />
              </button>

              {orderPopup && (
                <OrderPopup
                  order={order}
                  setOrder={setOrder}
                  off={() => setOrderPopup(false)}
                />
              )}
            </span>
          </article>

          <HireList
            order={order}
            jobType={category.map((v: any) => v.code) as string[]}
            regionCode={locationList.map((v: any) => v.code) as string[]}
            career={career ?? undefined}
            form={form?.code}
          />
        </section>
      </main>

      <FloatingActBtns moreBtn upBtn />
      <BottomNavBar activeLabel="채용" />

      {orderPopup && (
        <PopupBg bg opacity={0.6} off={() => setOrderPopup(false)} />
      )}
    </>
  );
}
