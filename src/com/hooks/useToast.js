import uuid from "react-uuid";
import { useSetRecoilState } from "recoil";
import { toastState } from "@/com/recoil";

export const useToast = () => {
  const setToast = useSetRecoilState(toastState);

  /**
   * @param {object} props
   * @param {string} props.message
   */
  const showToast = (props) => {
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
