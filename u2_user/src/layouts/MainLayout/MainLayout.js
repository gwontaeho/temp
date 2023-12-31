import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Snackbar, Stack, Typography, Button, Divider, Drawer, Avatar, useMediaQuery, useTheme, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Nav } from "./Nav";
import { Notification } from "./Notification";
import { Header } from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { closeToast } from "../../redux/features/toast/toastSlice";

export const View = () => {
    return (
        <Stack flex={1} height="100%" p={3} overflow="auto" bgcolor="#f2f3f7" ml={[, , "300px"]}>
            <Stack maxWidth="lg">
                <Outlet />
            </Stack>
        </Stack>
    );
};

export const MainLayout = () => {
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const toast = useSelector((state) => state.toast);
    return (
        <Stack width="100%" height="100%">
            <Header setMenuOpen={setMenuOpen} />
            <Stack direction="row" height="calc(100% - 80px)">
                <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <View />
            </Stack>
            <Snackbar open={toast.open} onClose={() => dispatch(closeToast())} autoHideDuration={3000} message={toast.message} />
        </Stack>
    );
};
