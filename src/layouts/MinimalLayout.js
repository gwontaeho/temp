import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Stack, Typography, Button, Divider, Snackbar, Dialog } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { closeToast } from "../redux/features/toast/toastSlice";

const Header = () => {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" height={100} px={5}>
            <Typography variant="h5">U2Cloud Portal Admin</Typography>
        </Stack>
    );
};

const View = () => {
    return (
        <Stack flex={1} height="100%" p={3} overflow="auto" bgcolor="#f2f3f7">
            <Outlet />
        </Stack>
    );
};

export const MinimalLayout = () => {
    const dispatch = useDispatch();
    const toast = useSelector((state) => state.toast);

    return (
        <>
            <Stack width="100%" height="100%">
                <Header />
                <View />
            </Stack>
            <Snackbar open={toast.open} onClose={() => dispatch(closeToast())} autoHideDuration={3000} message={toast.message} />
        </>
    );
};
