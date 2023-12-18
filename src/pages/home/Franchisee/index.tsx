import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { api, eps } from "utils/config";
import { kakaoMapUrl } from "utils/mapUrl";
import styles from "../index.module.scss";

export function Franchisee() {
  return (
    <Suspense>
      <Resolved />
    </Suspense>
  );
}

function Resolved() {
  const { data: franchisee } = useFranchisee();

  return (
    <ul className={styles.companyList}>
      {franchisee.map((v, i) => (
        <li
          key={i}
          onClick={() => {
            window.open(
              kakaoMapUrl({
                latitude: v.latitude,
                longitude: v.longitude,
                displayAddress: `${v.companyName}: ${v.location}`,
              })
            );
          }}
        >
          <img className={styles.companyImg} src={v.img} alt="" />
          <p className={styles.name}>{v.name}</p>
          <p className={styles.location}>{v.location}</p>
          <p
            className={styles.tel}
            onClick={(e) => {
              e.stopPropagation();
              window.open(`tel:${v.tel}`);
            }}
          >
            {v.tel}
          </p>
        </li>
      ))}
    </ul>
  );
}

function useFranchisee() {
  const { data, ...rest } = useQuery(
    ["GET_STORES", "GET_STORES_BY_DISTANCE"],
    async () => {
      return new Promise<IcompanyList[]>(async (resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
              const { latitude, longitude } = coords;
              resolve(await fetchStoresByDistance(latitude, longitude));
            },
            async () => {
              resolve(await fetchStoresWithoutPosition());
            }
          );
        } else {
          resolve(await fetchStoresWithoutPosition());
        }
      });
    }
  );

  return { data: data!, ...rest };
}

async function fetchStoresByDistance(latitude: number, longitude: number) {
  const { data } = await api.get(
    eps["GET_STORES_BY_DISTANCE"](0, 4, latitude, longitude)
  );

  const list = data.list.map((item: any) => ({
    uuid: item.uuid,
    img: item.urlprofileimage,
    location: `${item.streetaddress} ${item.detailaddress}`,
    tel: item.phonenumber,
    latitude: item.latitude,
    longitude: item.longitude,
    companyName: item.name,
  })) as IcompanyList[];

  return list;
}

async function fetchStoresWithoutPosition() {
  const { data } = await api.get(eps["GET_STORES"](0, 4));

  const list = data.list.map((item: any) => ({
    uuid: item.uuid,
    img: item.urlprofileimage,
    location: `${item.streetaddress} ${item.detailaddress}`,
    tel: item.phonenumber,
    latitude: item.latitude,
    longitude: item.longitude,
    companyName: item.name,
  })) as IcompanyList[];

  return list;
}
