import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Divider, Drawer, Avatar } from "@mui/material";
import { Notification } from "./Notification";

const Header = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" height={100} px={5}>
                <Typography variant="h5" onClick={() => navigate("/home")}>
                    U2Cloud Portal
                </Typography>
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

const Nav = () => {
    const { pathname } = useLocation();

    console.log(pathname);

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
        <Stack width={300} height="100%" p={5} spacing={3} overflow="auto">
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
                    <>
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
                    </>
                );
            })}
        </Stack>
    );
};

export const View = () => {
    return (
        <Stack flex={1} height="100%" p={3} overflow="auto" bgcolor="#f2f3f7">
            <Stack maxWidth="lg">
                <Outlet />
            </Stack>
        </Stack>
    );
};

export const MainLayout = () => {
    return (
        <Stack width="100%" height="100%">
            <Header />
            <Stack direction="row" height="calc(100% - 100px)">
                <Nav />
                <View />
            </Stack>
        </Stack>
    );
};
