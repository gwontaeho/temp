import { Outlet, Link, useLocation } from "react-router-dom";
import { Stack, Typography, Button, Divider } from "@mui/material";

const Header = () => {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" height={100} px={5}>
            <Typography variant="h5">U2Cloud Portal Admin</Typography>
            <Stack spacing={3} direction="row" alignItems="center">
                <Button variant="contained">알림</Button>
                <Button variant="contained">로그아웃</Button>
            </Stack>
        </Stack>
    );
};

const Nav = () => {
    const { pathname } = useLocation();

    const member = [
        {
            title: "회원 관리",
            path: "/member/user",
        },
        {
            title: "기관 관리",
            path: "/member/team",
        },
        {
            title: "체험 회원",
            path: "/member/experience",
        },
        {
            title: "탈퇴 관리",
            path: "/member/withdrawal",
        },
        {
            title: "휴먼 회원",
            path: "/member/dormancy",
        },
        {
            title: "발신번호 관리",
            path: "/member/caller",
        },
    ];

    const payment = [
        {
            title: "결제 관리",
            path: "/payment",
        },
        {
            title: "정산 관리",
            path: "/payment/settlement",
        },
    ];

    const subscribe = [
        {
            title: "앱 / 요금제 관리",
            path: "/subscribe/plan",
        },
        {
            title: "구독 관리",
            path: "/subscribe",
        },
    ];

    const support = [
        {
            title: "공지 사항",
            path: "/support",
        },
        {
            title: "알림 관리",
            path: "/support/notification",
        },
        {
            title: "문의 관리",
            path: "/support/qna",
        },
    ];

    const admin = [
        {
            title: "운영자 관리",
            path: "/admin",
        },
    ];

    const history = [
        {
            title: "접속 기록",
            path: "/history/connect",
        },
        {
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
                                        {...(pathname === v.path && { color: "primary", fontWeight: "bold" })}
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

export const View = () => {
    return (
        <Stack flex={1} height="100%" p={5} overflow="auto" bgcolor="#f2f3f7">
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={5}>
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
