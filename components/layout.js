import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie, deleteCookie } from "cookies-next";

import { Stack, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";

const Nav = () => {
    const router = useRouter();

    const token = getCookie("token");

    const options = [
        { pathname: "/", primary: "대시보드" },
        { pathname: "/companies", primary: "업체관리" },
        { pathname: "/users", primary: "회원관리" },
        { pathname: "/inquiries", primary: "업체문의" },
    ];

    const handleClickSignout = () => {
        deleteCookie("token");
        router.replace("/signin");
    };

    return (
        <Stack component="nav" width={250} minWidth={250}>
            <List>
                {options.map(({ pathname, primary }) => {
                    return (
                        <Link href={pathname} key={pathname}>
                            <ListItem disablePadding>
                                <ListItemButton selected={pathname === router.pathname}>
                                    <ListItemText primary={primary} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    );
                })}

                {!!token && (
                    <>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleClickSignout}>
                                <ListItemText primary="로그아웃" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>
        </Stack>
    );
};

export default function Layout({ children }) {
    return (
        <>
            <Stack direction="row" height="100vh">
                <Nav />
                <Divider orientation="vertical" />
                <Stack component="main" overflow="auto" minWidth={1000}>
                    {children}
                </Stack>
            </Stack>
        </>
    );
}
