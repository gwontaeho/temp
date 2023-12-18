import { Link, useLocation } from "react-router-dom";
import { Stack, Typography, Divider, Drawer, useMediaQuery, useTheme } from "@mui/material";

import { Icon } from "../../assets/icons/";

export const Nav = ({ menuOpen, setMenuOpen }) => {
    const { pathname } = useLocation();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const management = [
        {
            name: "team",
            title: "기관 정보",
            path: "/management/team",
        },
        {
            name: "member",
            title: "멤버 관리",
            path: "/management/member",
        },
        {
            name: "subscribe",
            title: "멤버 이용현황",
            path: "/management/subscribe",
        },
    ];

    const subscribe = [
        {
            name: "fee",
            title: "실시간 이용요금",
            path: "/subscribe/fee",
        },
        {
            name: "bill",
            title: "결제 금액",
            path: "/subscribe/bill",
        },
        {
            name: "subscribe",
            title: "구독 관리",
            path: "/subscribe/list",
        },
    ];

    const support = [
        {
            name: "notice",
            title: "공지사항",
            path: "/support/notice",
        },
        {
            name: "qna",
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
            elevation={0}
            variant={matches ? "permanent" : "temporary"}
            PaperProps={{ sx: { border: 0, width: 300, ...(matches && { height: "calc(100% - 80px)", mt: "80px" }) } }}
        >
            <Stack p={5} spacing={3} overflow="auto">
                <Stack bgcolor="primary.main" p={1.5} borderRadius={3} direction="row" justifyContent="space-between">
                    <Typography color="#fff">U2알리미 바로가기</Typography>
                    <Icon name={"alimi"} size={24} />
                </Stack>
                <Link to="/user">
                    <Stack p={1} direction="row" spacing={2} borderRadius={2} alignItems="center" sx={{ "&:hover": { bgcolor: "#f2f3f7" } }}>
                        <Icon name={"user"} size={24} $p={pathname.startsWith("/user")} />
                        <Typography
                            variant="subtitle1"
                            borderRadius={2}
                            {...(pathname.startsWith("/user") && { color: "primary", fontWeight: "bold" })}
                            sx={{ "&:hover": { bgcolor: "#f2f3f7" } }}
                        >
                            내 정보
                        </Typography>
                    </Stack>
                </Link>
                <Divider />
                {navOptions.map(({ title, option }, i) => {
                    return (
                        <Stack key={title} spacing={3}>
                            <Stack spacing={2}>
                                <Typography variant="body2" fontWeight="bold" px={1}>
                                    {title}
                                </Typography>
                                {option.map((v) => (
                                    <Link key={v.title} to={v.path}>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            borderRadius={2}
                                            alignItems="center"
                                            sx={{ "&:hover": { bgcolor: "#f2f3f7" } }}
                                            p={1}
                                        >
                                            <Icon name={v.name} size={24} $p={pathname.startsWith(v.path)} />
                                            <Typography variant="subtitle1" {...(pathname.startsWith(v.path) && { color: "primary", fontWeight: "bold" })}>
                                                {v.title}
                                            </Typography>
                                        </Stack>
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
