import { Fragment, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import Draggable from "react-draggable";

import { modalState } from "@/com/recoil";
import { Button } from "./Button";
import classNames from "classnames";

const MODAL_SIZES = {
    sm: "max-w-[30vw]",
    md: "max-w-[50vw]",
    lg: "max-w-[70vw]",
    xl: "max-w-[90vw]",
};

export const CommonModal = () => {
    const [modal, setModal] = useRecoilState(modalState);

    const handleClose = (id) => {
        setModal((prev) => prev.filter((v) => id !== v.id));
    };

    const handleCancel = (id, onCancel) => {
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
        const { id, message, onConfirm, onCancel, render, size = "sm" } = props;
        return createPortal(
            <Fragment key={id}>
                <motion.div
                    className="fixed w-full h-full z-[1000]"
                    initial={{ opacity: 0.5 }}
                    animate={{ background: "#00000080", opacity: 1 }}
                    onClick={() => handleClose(id)}
                />
                <Draggable positionOffset={{ x: "50%", y: "-50%" }}>
                    <motion.div
                        className={classNames("w-full border rounded bg-background z-[1001]", MODAL_SIZES[size])}
                        // initial={{ translateY: 10 }}
                        // animate={{ translateY: 0 }}
                    >
                        {render ? (
                            render
                        ) : (
                            <>
                                <div className="text-xl p-4">알림</div>
                                <div className="p-4 text-lg">{message}</div>
                                <div className="p-4 flex space-x-2 justify-end">
                                    <Button onClick={() => handleCancel(id, onCancel)}>취소</Button>
                                    {onConfirm && <Button onClick={() => handleConfirm(id, onConfirm)}>확인</Button>}
                                </div>
                            </>
                        )}
                    </motion.div>
                </Draggable>
            </Fragment>,
            document.body
        );
    });
};
{
    /* <motion.div
key={id}
className="fixed w-full h-full flex items-center justify-center z-[9999]"
initial={{ opacity: 0.5 }}
animate={{ background: "#00000080", opacity: 1 }}
></motion.div> */
}
