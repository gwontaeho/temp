import { accessTokenKey, restUserKey, userKey } from "constants/auth";
import { atom, selector } from "recoil";

const userAtom = atom<User | null>({
  key: "states/user",
  default: null,
});

export const userSelector = selector<User | null>({
  key: "states/userSelector",
  get: ({ get }) => {
    let user = get(userAtom);
    if (user) {
      return user;
    }

    const accessToken = localStorage.getItem(accessTokenKey);
    const storedUser = localStorage.getItem(userKey);
    if (storedUser && accessToken) {
      return JSON.parse(storedUser) as User;
    } else {
      return null;
    }
  },
  set: ({ set }, newValue) => {
    if (!newValue) {
      localStorage.removeItem(userKey);
      localStorage.removeItem(accessTokenKey);
    } else {
      localStorage.setItem(userKey, JSON.stringify(newValue));
      localStorage.setItem(restUserKey, JSON.stringify(newValue));
    }
    set(userAtom, newValue);
  },
});
