import uuid from "react-uuid";
import { useSetRecoilState } from "recoil";
import { modalState } from "@/com/recoil";

export const useModal = () => {
  const setModal = useSetRecoilState(modalState);

  const showModal = ({ message, type, onConfirm, onCancel } = {}) => {
    setModal((prev) => [
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

  const hideModal = () => {
    setModal([]);
  };

  return { showModal, hideModal };
};
