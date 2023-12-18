export const kakaoMapUrl = ({
  latitude,
  longitude,
  displayAddress,
}: {
  latitude: string;
  longitude: string;
  displayAddress: string;
}) =>
  `https://map.kakao.com/link/map/${displayAddress.replaceAll(
    ",",
    " "
  )},${latitude},${longitude}`;
