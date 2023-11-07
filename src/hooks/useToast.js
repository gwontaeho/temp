import uuid from "react-uuid";
import { useSetRecoilState } from "recoil";
import { toastState } from "@/recoil";

export const useToast = () => {
  const setToast = useSetRecoilState(toastState);

  const showToast = (props) => {
    const { message, type, onConfirm, onCancle } = props || {};
    setToast((prev) => [
      ...prev,
      {
        id: uuid(),
        isOpen: true,
        message,
        type,
        onConfirm,
        onCancle,
      },
    ]);
  };

  const hideToast = () => {
    setToast([]);
  };

  return { showToast, hideToast };
};
