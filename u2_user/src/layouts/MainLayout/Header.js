import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, useMediaQuery, useTheme, IconButton, Menu, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Notification } from "./Notification";

import logo from "../../assets/icons/logo_portal.png";
import { Icon } from "../../assets/icons/";

const MenuButton = () => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <Icon name="user" size={24} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <Stack px={4} py={2} spacing={3}>
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Avatar />
                        <Stack spacing={1}>
                            <Typography variant="body2">홍길동</Typography>
                            <Typography variant="body2">email@email.com</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="center" spacing={3}>
                        <Button onClick={() => navigate("/user")}>내 정보</Button>
                        <Button>로그아웃</Button>
                    </Stack>
                </Stack>
            </Menu>
        </>
    );
};

export const Header = ({ setMenuOpen }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" height={80} px={5}>
                <Stack direction="row" alignItems="center">
                    {!matches && (
                        <IconButton onClick={() => setMenuOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <img src={logo} width={160} style={{ cursor: "pointer" }} onClick={() => navigate("/")} />
                </Stack>

                <Stack spacing={1} direction="row" alignItems="center">
                    <Notification />
                    <MenuButton />
                    <Typography fontWeight="bold">홍길동 님</Typography>
                </Stack>
            </Stack>
        </>
    );
};
