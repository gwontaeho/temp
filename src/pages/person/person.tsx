import { ReactComponent as ChevronDownGray } from "assets/images/icon/ChevronDownGray.svg";
import { ReactComponent as StarFill } from "assets/images/icon/StarFill.svg";
import BottomNavBar from "components/bottomBar/bottomNavBar";
import FloatingActBtns from "components/common/floatingAction/floatingActBtns";
import OrderPopup from "components/common/orderPopup";
import Pagenation from "components/common/pagenation";
import PopupBg from "components/common/popupBg";
import defaultProfImg from "assets/images/icon/DefaultProfImg.svg";
import { sortMapP } from "data/hire/D_hire";
import FilterHeader from "pages/shared/FilterHeader";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api, eps } from "utils/config";
import styles from "./person.module.scss";

export default function Person() {
  const navigate = useNavigate();
  const location_ = useLocation();

  const [order, setOrder] = useState<ISortKeyP>("DESC");
  const [orderPopup, setOrderPopup] = useState<boolean>(false);
  const [applicants, setApplicants] = useState<any>([]);
  const [maxCount, setMaxCount] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>();

  const [category, setCategory] = useState<any>([]);
  const [location, setLocation] = useState<any>([]);
  const [career, setCareer] = useState<number[] | null>(null);
  const [form, setForm] = useState<any | null>(null);

  async function getApplicants(page: number) {
    try {
      let query = `?`;

      let category_arr: string[] = [];
      category && category.map((e: any) => category_arr.push(`"${e.code}"`));
      query += category_arr.length > 0 ? `&jobtypecode2=[${category_arr}]` : "";

      location && location.map((e: any) => (query += `&regioncode=${e.code}`));

      query += career
        ? `&workexperienceduration=${career[0]}_${career[1]}`
        : "";

      query += form ? `&hiretypecode=${form.code}` : "";

      let { data } = await api.get(
        eps["GET_APPLICANTS"](page, 10) + sortMapP[order].value + query
      );

      setApplicants(data.list);
      setMaxCount(data.payload.count);
      setMaxPage(Math.ceil(data.payload.count / 10));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (location_?.search) {
      var pageNum: number = parseInt(location_?.search.replace("?page=", ""));
      getApplicants((pageNum - 1) * 10);
    } else {
      getApplicants(0);
    }
  }, [location_, category, location, career, form, order]);

  return (
    <>
      <FilterHeader
        category={category}
        location={location}
        career={career}
        form={form}
        setCategory={setCategory}
        setLocation={setLocation}
        setCareer={setCareer}
        setForm={setForm}
      />

      <main className={styles.person}>
        <section className={styles.personSec}>
          <article className={styles.topBar}>
            <p className={styles.count}>
              <span className={styles.value}>
                {Intl.NumberFormat().format(maxCount)}
              </span>
              건
            </p>

            <span className={styles.btnBox}>
              <button
                className={styles.sortBtn}
                onClick={() => setOrderPopup(true)}
              >
                <p>{sortMapP[order].label}</p>

                <ChevronDownGray />
              </button>

              {orderPopup && (
                <OrderPopup
                  order={order}
                  setOrder={setOrder}
                  off={() => setOrderPopup(false)}
                  isPerson={true}
                />
              )}
            </span>
          </article>

          <article className={styles.contArea}>
            <ul className={styles.personList}>
              {applicants?.map((v: any, i: number) => (
                <li
                  key={i}
                  onClick={() => navigate(`${i}`, { state: { uuid: v.uuid } })}
                >
                  <div className={styles.profBar}>
                    <img
                      className={styles.profImg}
                      src={v.urlprofileimage || defaultProfImg}
                      alt=""
                    />

                    <div className={styles.infoBox}>
                      <div className={styles.nameBar}>
                        <h1 className={styles.name}>{v.username ? v.username : 'Null'}</h1>

                        {v.isseeking === 1 && (
                          <p className={styles.selfFind}>셀프구직중</p>
                        )}
                      </div>

                      <p className={styles.message}>{v.note_}</p>
                    </div>
                  </div>

                  <div className={styles.scoreBar}>
                    {v.rating && (
                      <ul className={styles.scoreList}>
                        {new Array(Math.round(parseFloat(v.rating)))
                          .fill("")
                          .map((v, i) => (
                            <StarFill key={i} />
                          ))}
                      </ul>
                    )}

                    <p className={styles.label}>
                      <strong className={styles.score}>{v.rating ? v.rating : 0}</strong> /{" "}
                      {v.level ? v.level : 0}등급
                    </p>
                  </div>

                  <div className={styles.categoryBar}>
                    <p className={styles.key}>직종</p>

                    <ul className={styles.categoryList}>
                      {v.jobtype ? 
                      <>
                        <li># {v.jobtype}</li>
                        <li># {v.jobtype2}</li>
                      </> : <li>미 설정</li>}
                      {/* {v.category.map((detV, detI) => (
                        <li key={detI}># {detV}</li>
                      ))} */}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            <Pagenation mt={30} max_page={maxPage} />
          </article>
        </section>
      </main>

      <FloatingActBtns upBtn />
      <BottomNavBar activeLabel="인재찾기" />

      {orderPopup && (
        <PopupBg bg opacity={0.6} off={() => setOrderPopup(false)} />
      )}
    </>
  );
}
