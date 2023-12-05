import { Fragment, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import classNames from "classnames";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import { IconButton, Button } from "@/com/components";
import { modalState } from "@/com/recoil";

const MODAL_SIZES = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-[70vw]",
  xl: "max-w-[90vw]",
};

export type ModalProps = {
  id: string;
  content?: React.ReactNode;
  backdrop?: boolean;
  size?: keyof typeof MODAL_SIZES;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const Modal = (props: ModalProps) => {
  const { id, onConfirm, onCancel, content, backdrop = true, size = "sm" } = props;

  const ref = useRef<HTMLDivElement>(null);

  const setModal = useSetRecoilState(modalState);

  const handleClose = () => {
    setModal((prev) => prev.filter((v) => id !== v.id));
  };

  const handleCancel = () => {
    if (onCancel instanceof Function) onCancel();
    handleClose();
  };

  const handleConfirm = () => {
    if (onConfirm instanceof Function) onConfirm();
    handleClose();
  };

  return createPortal(
    <Fragment key={id}>
      {backdrop && (
        <motion.div
          className="fixed w-full h-full z-[1000]"
          initial={{ opacity: 0.5 }}
          animate={{ background: "#00000080", opacity: 1 }}
          onClick={() => handleClose()}
        />
      )}
      <Draggable nodeRef={ref} handle=".handle" positionOffset={{ x: "-50%", y: "-50%" }}>
        <motion.div
          ref={ref}
          className={classNames(
            "absolute top-1/2 left-1/2 w-full border rounded bg-background z-[1001]",
            MODAL_SIZES[size]
          )}>
          <div className="handle cursor-move flex items-center justify-between px-4 h-16">
            <div className="text-lg">알림</div>
            <IconButton icon="close" onClick={() => handleClose()} />
          </div>
          <div className="p-4">{content}</div>
          <div className="p-4 flex space-x-2 justify-end">
            <Button onClick={() => handleCancel()}>닫기</Button>
            {onConfirm && <Button onClick={() => handleConfirm()}>확인</Button>}
          </div>
        </motion.div>
      </Draggable>
    </Fragment>,
    document.body
  );
};

export const CommonModal = () => {
  const modal = useRecoilValue(modalState);

  useEffect(() => {
    if (modal.length) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [modal]);

  return (
    <Fragment>
      {modal.map((props) => {
        return <Modal key={props.id} {...props} />;
      })}
    </Fragment>
  );
};
