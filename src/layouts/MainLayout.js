import { Outlet, Link } from "react-router-dom";
import { Stack, Typography, Button, Divider } from "@mui/material";

const Header = () => {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" height={100} px={5}>
            <Typography variant="h5">U2Cloud Admin</Typography>
            <Stack spacing={3} direction="row" alignItems="center">
                <Button variant="contained">알림</Button>
                <Button variant="contained">로그아웃</Button>
            </Stack>
        </Stack>
    );
};

const Nav = () => {
    const member = [
        {
            title: "회원 관리",
            path: "/member",
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
            title: "탈퇴 / 휴먼 회원",
            path: "/member/withdrawal",
        },
        {
            title: "발신번호 관리",
            path: "/member/caller",
        },
    ];

    const billing = [
        {
            title: "청구 관리",
            path: "/billing",
        },
        {
            title: "정산 관리",
            path: "/billing/settlement",
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
            title: "문의 응대",
            path: "/support/qna",
        },
    ];

    return (
        <Stack width={300} height="100%" p={5} spacing={3} overflow="auto">
            <Typography>회원 관리</Typography>
            {member.map((v) => (
                <Link key={v.title} to={v.path}>
                    <Typography>{v.title}</Typography>
                </Link>
            ))}
            <Divider />
            <Typography>청구 / 정산</Typography>
            {billing.map((v) => (
                <Link key={v.title} to={v.path}>
                    <Typography>{v.title}</Typography>
                </Link>
            ))}
            <Divider />
            <Typography>요금제 / 구독</Typography>
            {subscribe.map((v) => (
                <Link key={v.title} to={v.path}>
                    <Typography>{v.title}</Typography>
                </Link>
            ))}
            <Divider />
            <Typography>고객 지원</Typography>
            {support.map((v) => (
                <Link key={v.title} to={v.path}>
                    <Typography>{v.title}</Typography>
                </Link>
            ))}
            <Divider />
            <Typography>Admin 운영자</Typography>
            <Link to="/admin">
                <Typography>운영자 관리</Typography>
            </Link>
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
