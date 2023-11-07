import { createPortal } from "react-dom";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

import { toastState } from "@/recoil";
import { Button } from "./Button";
import { useEffect } from "react";

const Toast = (props) => {
  const [toast, setToast] = useRecoilState(toastState);

  const { id, message, onConfirm, onCancel } = props;

  const handleCancle = (id, onCancel) => {
    if (onCancel instanceof Function) onCancel();
    handleClose(id);
  };

  const handleConfirm = (id, onConfirm) => {
    if (onConfirm instanceof Function) onConfirm();
    handleClose(id);
  };
  const handleClose = (id) => {
    setToast((prev) => prev.filter((v) => id !== v.id));
  };

  useEffect(() => {
    const sto = setTimeout(() => {
      console.log("a");
      handleClose(id);
    }, 2000);

    return () => {
      clearTimeout(sto);
    };
  }, []);

  return (
    <motion.div initial={{ translateX: 30, opacity: 0.5 }} animate={{ translateX: 0, opacity: 1 }}>
      <div className="w-96 shadow border rounded bg-bg">
        <div className="p-4 text-lg">{message}</div>
        <div className="p-4 flex justify-end">
          <div className="flex space-x-2">
            <Button onClick={() => handleCancle(id, onCancel)}>닫기</Button>
            {onConfirm && <Button onClick={() => handleConfirm(id, onConfirm)}>확인</Button>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CommonToast = () => {
  const [toast, setToast] = useRecoilState(toastState);

  return createPortal(
    <div className="fixed right-4 bottom-4 space-y-2">
      {toast.map((props) => {
        return <Toast key={props.id} {...props} />;
      })}
    </div>,
    document.body
  );
};
