import { socialLoginUserKey } from "constants/auth";

export function storeSocialUserOnLocalStorage(user: ISocialUser) {
  localStorage.setItem(socialLoginUserKey, JSON.stringify(user));
}

export function getSocialUserOnLocalStorage() {
  const user = localStorage.getItem(socialLoginUserKey);
  if (user) {
    return JSON.parse(user);
  }
  return null;
}
