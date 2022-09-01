import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, useMediaQuery, useTheme, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Notification } from "./Notification";

import logo from "../../assets/icons/logo_portal.png";
import { Icon } from "../../assets/icons/";

export const Header = ({ setMenuOpen }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const [open, setOpen] = useState(false);

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
                    <IconButton onClick={() => setOpen(true)}>
                        <Icon name="alarm" size={24} />
                    </IconButton>
                    <IconButton onClick={() => navigate("/user")}>
                        <Icon name="user" size={24} />
                    </IconButton>
                    <Typography>홍길동 님</Typography>
                </Stack>
            </Stack>
            <Notification open={open} setOpen={setOpen} />
        </>
    );
};
