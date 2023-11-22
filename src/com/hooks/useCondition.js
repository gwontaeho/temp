import { useRecoilState } from "recoil";
import { conditionState } from "@/com/recoil";
import { useLocation } from "react-router-dom";

export const useCondition = () => {
  const { pathname } = useLocation();
  const [_condition, _setCondition] = useRecoilState(conditionState);

  const condition = _condition[pathname];
  const setCondition = (data) => {
    _setCondition((prev) => ({ ...prev, [pathname]: data }));
  };

  return { condition, setCondition };
};
