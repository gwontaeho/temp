import { ReactNode } from "react";
import { Divider, Stack } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";

const Nav = () => {
    const option = [
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
        <Stack component="nav" width={200} height="100vh">
            <List>
                {option.map(({ primary, href }) => {
                    return (
                        <Link key={href} href={href}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={primary} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    );
                })}
            </List>
        </Stack>
    );
};

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Stack direction="row">
            <Nav />
            <Divider orientation="vertical" flexItem />
            <Stack component="main" p={3}>
                {children}
            </Stack>
        </Stack>
    );
};

export default Layout;
