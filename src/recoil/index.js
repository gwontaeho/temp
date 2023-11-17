import { RecoilRoot, atom } from "recoil";
import i18n from "@/locales/i18n";

const theme = {
  isInit: false,
  isDark: localStorage.getItem("isDark") || false,
  lang: localStorage.getItem("lang") || "ko",
};

const defaultValue = {
  theme,
  modal: [],
  toast: [],
};

export const themeState = atom({
  key: "themeState",
  default: defaultValue.theme,
  effects: [
    ({ onSet }) => {
      onSet((n, o) => {
        if (n.lang === o.lang) return;
        i18n.changeLanguage(n.lang);
      });
    },
  ],
});

export const modalState = atom({
  key: "modalState",
  default: defaultValue.modal,
});

export const toastState = atom({
  key: "toastState",
  default: defaultValue.toast,
});

const RecoilProvider = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;
