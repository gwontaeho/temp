import { useQuery } from "@tanstack/react-query";
// import { ReactComponent as ChevronRightWhite } from "assets/images/icon/ChevronRightWhite.svg";
import { Suspense } from "react";
import Slider from "react-slick";
import { api, eps } from "utils/config";
import styles from "./index.module.scss";

const settings = {
  arrows: false,
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
  centerMode: true,
  className: "homeSlick",
  centerPadding: "20px",
};

export function AdBanners() {
  return (
    <Suspense>
      <Resolved />
    </Suspense>
  );
}

function Resolved() {
  const { data: banners } = useAdBanners();

  return (
    <Slider {...settings} className={styles.slickArea}>
      {banners.map((v, i) => (
        <div
          key={i}
          className={styles.contBox}
          onClick={() => {
            window.open(v.linkToUrl);
          }}
        >
          {/* <article className={styles.leftArea}>
            <p className={styles.title}>광고 띠 배너 영역</p>

            <button
              className={styles.pushBtn}
              onClick={() => {
                window.location.href = v.linkToUrl;
              }}
            >
              <p>바로보기</p>
              <ChevronRightWhite />
            </button>
          </article> */}
          {/* <div className={styles.contBox}> */}
          <img src={v.imageUrl} alt="" />
          {/* </div> */}
        </div>
      ))}
    </Slider>
  );
}

function useAdBanners() {
  const { data, ...rest } = useQuery(["GET_ADS_BANNERS"], async () => {
    const { data } = await api.get(eps["GET_ADS_BANNERS"](0, 10));

    return data.list.map((item: any) => ({
      imageUrl: item.urlimage,
      linkToUrl: item.urllinkto,
    })) as { imageUrl: string; linkToUrl: string }[];
  });

  return { data: data!, ...rest };
}
