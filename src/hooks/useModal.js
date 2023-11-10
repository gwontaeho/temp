import uuid from "react-uuid";
import { useSetRecoilState } from "recoil";
import { modalState } from "@/recoil";

export const useModal = () => {
  const setModal = useSetRecoilState(modalState);

  const showModal = ({ message, type, onConfirm, onCancle } = {}) => {
    setModal((prev) => [
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

  const hideModal = () => {
    setModal([]);
  };

  return { showModal, hideModal };
};
