import Link from "next/link";
import { Stack, Button, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { DescriptionOutlined as DescriptionOutlinedIcon, Add as AddIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";

export const Nav = () => {
    const router = useRouter();
    const { pathname } = router;
    const auth = useSelector((state) => state.auth);

    const handleClickLogout = () => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        router.push("/signin");
    };

    const options = [
        {
            href: "/settings",
            primary: "의료진/검사자 관리",
            icon: <DescriptionOutlinedIcon color="primary" fontSize="small" sx={{ mr: 3 }} />,
        },
        {
            href: "/settings/examinees",
            primary: "피검사자 관리",
            icon: <DescriptionOutlinedIcon color="primary" fontSize="small" sx={{ mr: 3 }} />,
        },
        {
            href: "/settings/examinees/registration",
            primary: "피검사자 등록",
            icon: <AddIcon color="primary" fontSize="small" sx={{ mr: 3 }} />,
        },
    ];

    return (
        <Stack component="nav" minWidth={320} width={320} p={3} spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>{auth.name}</Typography>
                <Button size="small" variant="text" onClick={handleClickLogout}>
                    로그아웃
                </Button>
            </Stack>
            <Divider sx={{ bgcolor: "primary.bg" }} />
            <List>
                {options.map(({ href, primary, icon }) => (
                    <Link href={href} key={href}>
                        <ListItem disablePadding>
                            {pathname === href && <Stack position="absolute" height="100%" bgcolor="primary.main" width={3} />}
                            <ListItemButton selected={pathname === href}>
                                {icon}
                                <ListItemText primary={primary} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Stack>
    );
};
