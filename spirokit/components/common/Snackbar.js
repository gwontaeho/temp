import { useEffect, useState } from "react";
import { Snackbar as MuiSnackbar, Stack, Typography } from "@mui/material";
import Image from "next/image";

import logo from "@/public/logo.svg";

export const Snackbar = ({ status, content }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (status) setOpen(true);
    }, [status]);

    return (
        <MuiSnackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
            <Stack
                px={5}
                py={1.5}
                border="1px solid #ddd"
                bgcolor="#eee"
                borderRadius={1.5}
                flexDirection="column"
                alignItems="center"
                boxShadow="0px 3px 6px #0000001A"
            >
                <Image priority src={logo} alt="logo" width={120} />
                {!!content && <Typography mt={3}>{content}</Typography>}
            </Stack>
        </MuiSnackbar>
    );
};
