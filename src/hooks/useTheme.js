import { useRecoilState } from "recoil";
import { themeState } from "@/recoil";

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const _setTheme = (key, value) => {
    localStorage.setItem(key, value);
    setTheme((prev) => ({ ...prev, [key]: value }));
  };

  return { theme, setTheme: _setTheme };
};
