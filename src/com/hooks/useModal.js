import uuid from "react-uuid";
import { useSetRecoilState } from "recoil";
import { modalState } from "@/com/recoil";

export const useModal = () => {
    const setModal = useSetRecoilState(modalState);

    /**
     * @param {object} props
     * @param {('sm'|'md'|'lg')} props.size
     */
    const showModal = ({ size, message, type, onConfirm, onCancel, render }) => {
        setModal((prev) => [
            ...prev,
            {
                id: uuid(),
                isOpen: true,
                message,
                size,
                type,
                onConfirm,
                onCancel,
                render,
            },
        ]);
    };

    const hideModal = () => {
        setModal([]);
    };

    return { showModal, hideModal };
};
