import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Divider, Drawer, Avatar, useMediaQuery, useTheme, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Notification } from "./Notification";

const Header = ({ setMenuOpen }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const [open, setOpen] = useState(false);

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" height={100} px={5}>
                <Stack direction="row" alignItems="center">
                    {!matches && (
                        <IconButton onClick={() => setMenuOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h5" onClick={() => navigate("/home")}>
                        U2Cloud Portal
                    </Typography>
                </Stack>

                <Stack spacing={3} direction="row" alignItems="center">
                    <Button variant="contained" onClick={() => setOpen(true)}>
                        알림
                    </Button>
                    <Button variant="contained">로그아웃</Button>
                </Stack>
            </Stack>
            <Notification open={open} setOpen={setOpen} />
        </>
    );
};

const Nav = ({ menuOpen, setMenuOpen }) => {
    const { pathname } = useLocation();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const management = [
        {
            title: "기관 관리",
            path: "/management/team",
        },
        {
            title: "멤버 관리",
            path: "/management/member",
        },
        {
            title: "멤버 구독",
            path: "/management/subscribe",
        },
    ];

    const subscribe = [
        {
            title: "실시간 이용요금",
            path: "/subscribe/fee",
        },
        {
            title: "청구서",
            path: "/subscribe/bill",
        },
        {
            title: "구독 현황",
            path: "/subscribe/list",
        },
    ];

    const support = [
        {
            title: "공지사항",
            path: "/support/notice",
        },
        {
            title: "문의",
            path: "/support/qna",
        },
    ];

    const navOptions = [
        { title: "관리", option: management },
        { title: "구독", option: subscribe },
        { title: "고객지원", option: support },
    ];

    return (
        <Drawer
            onClose={() => setMenuOpen(false)}
            open={matches ? true : menuOpen}
            variant={matches ? "permanent" : "temporary"}
            PaperProps={{ sx: { width: 300, ...(matches && { height: "calc(100% - 100px)", mt: "100px" }) } }}
        >
            <Stack p={5} spacing={3} overflow="auto">
                <Link to="/user">
                    <Typography
                        p={1}
                        borderRadius={2}
                        {...(pathname.startsWith("/user") && { color: "primary", fontWeight: "bold" })}
                        sx={{ "&:hover": { bgcolor: "#f2f3f7" } }}
                    >
                        내 정보
                    </Typography>
                </Link>
                {navOptions.map(({ title, option }, i) => {
                    return (
                        <Stack key={title} spacing={3}>
                            <Stack spacing={1}>
                                <Typography variant="body2" fontWeight="bold" mb={1}>
                                    {title}
                                </Typography>
                                {option.map((v) => (
                                    <Link key={v.title} to={v.path}>
                                        <Typography
                                            p={1}
                                            borderRadius={2}
                                            {...(pathname.startsWith(v.path) && { color: "primary", fontWeight: "bold" })}
                                            sx={{ "&:hover": { bgcolor: "#f2f3f7" } }}
                                        >
                                            {v.title}
                                        </Typography>
                                    </Link>
                                ))}
                            </Stack>
                            {navOptions.length - 1 !== i && <Divider />}
                        </Stack>
                    );
                })}
            </Stack>
        </Drawer>
    );
};

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
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Stack width="100%" height="100%">
            <Header setMenuOpen={setMenuOpen} />
            <Stack direction="row" height="calc(100% - 100px)">
                <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <View />
            </Stack>
        </Stack>
    );
};
