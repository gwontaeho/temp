interface Ilogin {
  phoneNumber: string;
  password: string;
}

type ISocialLoginPlatform = "kakao" | "naver" | "facebook" | "google";

interface ISocialUser {
  type: ISocialLoginPlatform;
  id: string;
  token?: string;
  uuid?: string;
}
