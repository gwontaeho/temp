import { v4 as uuid } from "uuid";
import { useSetRecoilState } from "recoil";
import { toastState } from "@/com/recoil";

type toastProps = {
  message: string;
  type: string;
  onConfirm: Function;
  onCancel: Function;
};

export const useToast = () => {
  const setToast = useSetRecoilState(toastState);

  const showToast = (props: toastProps) => {
    const { message, type, onConfirm, onCancel } = props || {};

    setToast((prev) => [
      ...prev,
      {
        id: uuid(),
        isOpen: true,
        message,
        type,
        onConfirm,
        onCancel,
      },
    ]);
  };

  const hideToast = () => {
    setToast([]);
  };

  return { showToast, hideToast };
};
