import { ReactNode } from "react";
import { Divider, Stack } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";

const Nav = () => {
    const option = [
        {
            primary: "메인",
            href: "/",
        },
        {
            primary: "리스트",
            href: "list",
        },
        {
            primary: "리스트2",
            href: "list2",
        },
    ];

    return (
        <Stack component="nav" width={250} height="100vh">
            <List>
                {option.map(({ primary, href }) => {
                    return (
                        <Link key={href} href={href}>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemText primary={primary} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    );
                })}
                <Divider />
            </List>
        </Stack>
    );
};

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Stack width="100vw" height="100vh" alignItems="center">
            <Stack direction="row" width="100%" maxWidth="lg">
                <Nav />
                <Divider orientation="vertical" flexItem />
                <Stack component="main" p={3} flex={1}>
                    {children}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Layout;
