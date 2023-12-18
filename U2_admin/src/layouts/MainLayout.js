import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Divider, Snackbar, Dialog } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { closeToast } from "../redux/features/toast/toastSlice";
import logo from "../assets/images/logo_admin.png";
import { Notification } from "./Notification";

const LogoutButton = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>
                로그아웃
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3} alignItems="center">
                    <Typography>U2Cloud 로그아웃이 완료되었습니다</Typography>
                    <Button onClick={() => navigate("/login")}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

const Header = () => {
    const navigate = useNavigate();
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" height={100} px={5}>
            <img src={logo} width={160} style={{ cursor: "pointer" }} onClick={() => navigate("/")} />
            <Stack spacing={3} direction="row" alignItems="center">
                <Notification />
                <LogoutButton />
            </Stack>
        </Stack>
    );
};

const Nav = () => {
    const { pathname } = useLocation();

    const member = [
        {
            name: "member",
            title: "회원 관리",
            path: "/member/user",
        },
        {
            name: "member",
            title: "기관 관리",
            path: "/member/team",
        },
        {
            name: "member",
            title: "체험 회원",
            path: "/member/experience",
        },
        {
            name: "member",
            title: "탈퇴 관리",
            path: "/member/withdrawal",
        },
        {
            name: "member",
            title: "휴먼 회원",
            path: "/member/dormancy",
        },
        {
            name: "member",
            title: "발신번호 관리",
            path: "/member/caller",
        },
    ];

    const payment = [
        {
            name: "payment",
            title: "결제 관리",
            path: "/payment/management",
        },
        {
            name: "payment",
            title: "정산 관리",
            path: "/payment/settlement",
        },
    ];

    const subscribe = [
        {
            name: "subscribe",
            title: "앱 / 요금제 관리",
            path: "/subscribe/app",
        },
        {
            name: "subscribe",
            title: "구독 회원 관리",
            path: "/subscribe/management",
        },
    ];

    const support = [
        {
            name: "support",
            title: "공지 사항",
            path: "/support/notice",
        },
        {
            name: "support",
            title: "알림 관리",
            path: "/support/notification",
        },
        {
            name: "support",
            title: "문의 관리",
            path: "/support/qna",
        },
    ];

    const admin = [
        {
            name: "admin",
            title: "운영자 관리",
            path: "/admin",
        },
    ];

    const history = [
        {
            name: "history",
            title: "접속 기록",
            path: "/history/connect",
        },
        {
            name: "history",
            title: "데이터 파기기록",
            path: "/history/destruction",
        },
    ];

    const navOptions = [
        { title: "회원 관리", option: member },
        { title: "결제 / 정산", option: payment },
        { title: "요금제 / 구독", option: subscribe },
        { title: "고객 지원", option: support },
        { title: "Admin 운영자", option: admin },
        { title: "이용내역 조회", option: history },
    ];

    return (
        <Stack width={300} height="100%" p={5} spacing={3} overflow="auto">
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
                                        sx={{ "&:hover": { bgcolor: "#eeeeee88" } }}
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

const View = () => {
    return (
        <Stack flex={1} height="100%" p={3} overflow="auto" bgcolor="#f2f3f7">
            <Outlet />
        </Stack>
    );
};

export const MainLayout = () => {
    const dispatch = useDispatch();
    const toast = useSelector((state) => state.toast);

    return (
        <>
            <Stack width="100%" height="100%">
                <Header />
                <Stack direction="row" height="calc(100% - 100px)">
                    <Nav />
                    <View />
                </Stack>
            </Stack>
            <Snackbar open={toast.open} onClose={() => dispatch(closeToast())} autoHideDuration={3000} message={toast.message} />
        </>
    );
};
