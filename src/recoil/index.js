import { RecoilRoot, atom } from "recoil";

const theme = {
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
