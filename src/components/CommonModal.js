import { createPortal } from "react-dom";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

import { modalState } from "@/recoil";
import { Button } from "./Button";
import { useEffect } from "react";

export const CommonModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const handleClose = (id) => {
    setModal((prev) => prev.filter((v) => id !== v.id));
  };

  const handleCancle = (id, onCancel) => {
    if (onCancel instanceof Function) onCancel();
    handleClose(id);
  };

  const handleConfirm = (id, onConfirm) => {
    if (onConfirm instanceof Function) onConfirm();
    handleClose(id);
  };

  useEffect(() => {
    if (modal.length) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [modal]);

  return modal.map((props) => {
    const { id, message, onConfirm, onCancel } = props;
    return createPortal(
      <motion.div
        key={id}
        className="fixed w-full h-full flex items-center justify-center z-[9999]"
        initial={{ translateY: 10, opacity: 0.5 }}
        animate={{ background: "#00000080", translateY: 0, opacity: 1 }}>
        <div className="w-96 border rounded bg-bg">
          <div className="text-xl p-4">알림</div>
          <div className="p-4 text-lg">{message}</div>
          <div className="p-4 flex space-x-2">
            <Button onClick={() => handleCancle(id, onCancel)}>취소</Button>
            {onConfirm && <Button onClick={() => handleConfirm(id, onConfirm)}>확인</Button>}
          </div>
        </div>
      </motion.div>,
      document.body
    );
  });
};
