import { D_largeLocationList, D_smallLocationList } from "data/hire/D_hire";
import styles from "./selLocationPopup.module.scss";
import { ReactComponent as ChkBlue } from "assets/images/icon/ChkBlue.svg";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { regionSelector } from "states/categories/region";

interface Iprops {
  watch: Function;
  setValue: Function;
  off: Function;
}

export default function SelLocationPopup({ watch, setValue, off }: Iprops) {
  const region = useRecoilValue(regionSelector);
  const bigLocation = watch("location");
  const smallLocation = watch("detailLocation");
  const [regionList, setRegionList] = useState<any>([]);
  const [smRegionList, setSMRegionList] = useState<any>([]);

  useEffect(() => {
    var rList = region?.map((e) => {return e.name})
    setRegionList(rList)
  }, [region]);

  useEffect(() => {
    bigLocation &&
      region?.forEach(e => {
        if (e.name === bigLocation) {
          var rList = e.subgroup?.map((e) => {return e.name})
          setSMRegionList(rList)
        }
      })
  }, [bigLocation]);

  return (
    <section className={styles.selLocationPopup}>
      <ul className={styles.bigLocation}>
        {regionList?.map((v: any, i: number) => (
          <li
            key={i}
            className={v === bigLocation ? styles.on : ""}
            onClick={() => {setValue("location", v); setValue("detailLocation", '')}}
          >
            <p>{v}</p>
          </li>
        ))}
      </ul>

      {bigLocation && (
        <ul className={styles.smallLocation}>
          {smRegionList.map((v: any, i: number) => (
            <li
              key={i}
              className={v === smallLocation ? styles.on : ""}
              onClick={() => {
                setValue("detailLocation", v);
                off();
              }}
            >
              <p>{v}</p>

              <ChkBlue />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
