import { useRecoilState } from "recoil";
import { themeState } from "@/recoil";

export const useTheme = () => {
  const [_theme, _setTheme] = useRecoilState(themeState);

  const setTheme = (key, value) => {
    localStorage.setItem(key, value);
    _setTheme((prev) => ({ ...prev, [key]: value }));
  };

  const theme = _theme;
  return { theme, setTheme };
};
