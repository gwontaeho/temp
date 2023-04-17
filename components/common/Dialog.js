import { Dialog as MuiDialog, Stack, Typography, Button } from "@mui/material";
import Image from "next/image";
import logo from "@/public/logo.svg";

export const Dialog = ({ open, setOpen, content, cancel = "취소", confirm = "확인", onConfirm }) => {
    return (
        <MuiDialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
            <Stack p={3} spacing={5}>
                <Image priority src={logo} alt="logo" width={160} />
                {!!content && <Typography textAlign="center">{content}</Typography>}
                <Stack direction="row" spacing={3}>
                    <Button color="secondary" fullWidth onClick={() => setOpen(false)}>
                        {cancel}
                    </Button>
                    {!!onConfirm && (
                        <Button fullWidth onClick={onConfirm}>
                            {confirm}
                        </Button>
                    )}
                </Stack>
            </Stack>
        </MuiDialog>
    );
};
