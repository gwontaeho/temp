import { useRecoilState } from "recoil";
import { themeState } from "@/recoil";

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  return { theme, setTheme };
};
