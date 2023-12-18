import FacebookImage from "assets/images/logo/Facebook.png";
import GoogleImage from "assets/images/logo/Google.png";
import KakaoImage from "assets/images/logo/Kakao.png";
import NaverImage from "assets/images/logo/Naver.png";

export const D_snsList: { type: ISocialLoginPlatform; image: string }[] = [
  {
    type: "kakao",
    image: KakaoImage,
  },
  {
    type: "naver",
    image: NaverImage,
  },
  {
    type: "facebook",
    image: FacebookImage,
  },
  {
    type: "google",
    image: GoogleImage,
  },
];

export const D_termPopupList: IjoinTermList[] = [
  { cont: "이용약관 동의", category: "이용약관", required: true },
  { cont: "개인정보 수집 및 이용", category: "개인정보 약관", required: true },
  { cont: "위치기반서비스 이용 동의", category: "위치기반 이용약관" },
  {
    cont: "마케팅 정보 수신 동의 - 문자 메시지",
    category: "문자서비스 이용약관",
  },
];
