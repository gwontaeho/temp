import styles from "./franchisee.module.scss";
import BottomNavBar from "components/bottomBar/bottomNavBar";
import FranchiseeHeader from "components/header/franchiseeHeader";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useState, Dispatch, SetStateAction } from "react";
import Pagenation from "components/common/pagenation";
import { api, eps } from "utils/config";

interface Props {
  geoStatus: number;
  setGeoStatus: Dispatch<SetStateAction<number>>;
}

function GeoModal({ geoStatus, setGeoStatus }: Props) {
  return (
    <section className={styles.geomodal}>
      <article className={styles.textArea}>
        <p className={styles.explain}>위치 권한을 허용해주세요</p>
      </article>

      <article className={styles.btnBar}>
        <button className={styles.continueBtn} onClick={() => setGeoStatus(0)}>
          확인
        </button>
      </article>
    </section>
  );
}

function useFranchisee(coords: any) {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));
  const limit = 10;
  const offset = Number(page - 1) * limit;

  const ep = !!coords ? eps["GET_FRANCHISEE_BY_DISTANCE"](offset, limit, coords.latitude, coords.longitude) : eps["GET_FRANCHISEE"](offset, limit);

  const { data, ...rest } = useQuery(
    ["GET_FRANCHISEE", offset, limit, coords],
    async () => {
      const { data } = await api.get(ep);
      return data.list.map((item: any) => ({
        hasCoords: !!coords,
        name: item.name,
        status: item.isopen ? "영업 중" : "영업 종료",
        businessHour: `${item.closeoftoday}:00에 영업종료`,
        distance: `${item.distance}km`,
        location: `${item.streetaddress} ${item.detailaddress}`,
        cellNumber: item.phonenumber,
        img: item.urlprofileimage,
      })) as IfranchiseeSimple[];
    },
    { placeholderData: [] }
  );

  return { data: data!, ...rest };
}

function List() {
  const [coords, setCoords] = useState<any>();
  const [geoStatus, setGeoStatus] = useState<number>(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setCoords({ latitude, longitude });
        },
        () => setGeoStatus(1)
      );
    } else setGeoStatus(2);
  }, []);

  const { data } = useFranchisee(coords);

  function onClickCellNumber(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, tel: string) {
    e.stopPropagation();
    window.open(`tel:${tel}`);
  }

  return (
    <>
      {!!geoStatus && <GeoModal geoStatus={geoStatus} setGeoStatus={setGeoStatus} />}
      <article className={styles.topBar}>
        <p className={styles.count}>
          <span className={styles.value}>{Intl.NumberFormat().format(185121)}</span>건
        </p>
      </article>
      <article className={styles.contArea}>
        <ul className={styles.franchiseeList}>
          {data.map((v, i) => (
            <li key={i} onClick={() => window.open(naverMapUrl)}>
              <div className={styles.infoCont}>
                <h1 className={styles.companyName}>{v.name}</h1>
                <div className={styles.timeBar}>
                  <strong className={styles.status}>{v.status}</strong> ·{v.businessHour}
                </div>
                <div className={styles.locationBar}>
                  {v.hasCoords && (
                    <>
                      <strong className={styles.status}>{v.distance}</strong>
                      <span> · </span>
                    </>
                  )}
                  {v.location}
                </div>
                <button className={styles.cellBtn} onClick={(e) => onClickCellNumber(e, v.cellNumber)}>
                  <p className={styles.cellNumber}>{v.cellNumber}</p>
                </button>
              </div>
              <img className={styles.companyImg} src={v.img} alt="" />
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}

export default function Franchisee() {
  return (
    <>
      <FranchiseeHeader />
      <main className={styles.franchisee}>
        <section className={styles.franchiseeSec}>
          <Suspense>
            <List />
          </Suspense>
          <Pagenation mt={10} />
        </section>
      </main>
      <BottomNavBar activeLabel="가맹점" />
    </>
  );
}

const naverMapUrl: string = "https://m.map.naver.com/search2/search.naver?query=%EB%A1%9C%EC%A6%88%ED%95%A0%EC%9D%B8%EB%A7%88%ED%8A%B8#/map/1/38226335";
