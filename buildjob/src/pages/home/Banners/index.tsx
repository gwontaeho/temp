import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import Slider from "react-slick";
import { api, eps } from "utils/config";
import styles from "../index.module.scss";

interface Props {
  setSlackIndex: (index: number) => void;
}

export function Banners(props: Props) {
  return (
    <Suspense>
      <Resolved {...props} />
    </Suspense>
  );
}

function Resolved({ setSlackIndex }: Props) {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    className: "homeSlick",
    centerPadding: "30px",
    afterChange: (index: number) => setSlackIndex(index),
  };

  const { data: banners } = useBanners();
  return (
    <Slider {...settings}>
      {banners.map((v, i) => (
        <div key={i} onClick={() => v.linkToUrl && window.open(v.linkToUrl)}>
          <div className={styles.contBox}>
            <img src={v.imageUrl} alt="" />
          </div>
        </div>
      ))}
    </Slider>
  );
}

function useBanners() {
  const { data, ...rest } = useQuery(["GET_BANNERS"], async () => {
    const { data } = await api.get(eps["GET_BANNERS"](0, 1000));

    return data.list.map((item: any) => ({
      imageUrl: item.url,
      linkToUrl: item.urllinkto,
    })) as { imageUrl: string; linkToUrl: string | null }[];
  });

  return { data: data!, ...rest };
}
