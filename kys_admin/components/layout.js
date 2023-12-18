import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { useMutation } from "@tanstack/react-query";

import {
    Stack,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

import { updatePassword } from "@/apis";

const PasswordDialog = () => {
    const [open, setOpen] = useState(false);

    const [device, setDevice] = useState("");

    const [password, setPassword] = useState("");
    const [check, setCheck] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const { mutate } = useMutation({
        mutationFn: () => updatePassword({ device, password }),
        onSuccess: () => {
            setDevice("");
            setPassword("");
            setCheck("");
            setErrorMsg("");
            setOpen(false);
        },
        onError: (error) => {
            if (error.response.status === 400) setErrorMsg("* 비밀번호가 틀렸습니다");
        },
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickSubmit = () => {
        if (password !== check) return setErrorMsg("* 새 비밀번호가 서로 일치하지 않습니다");
        mutate();
    };

    return (
        <>
            <ListItemButton onClick={() => setOpen(true)}>
                <ListItemText primary="비밀번호 변경" />
            </ListItemButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>비밀번호 변경</DialogTitle>
                <DialogContent>
                    <Stack spacing={1}>
                        <Typography>비밀번호</Typography>
                        <TextField
                            type="password"
                            sx={{ width: 300 }}
                            inputProps={{ maxLength: 20 }}
                            value={device}
                            onChange={(e) => setDevice(e.target.value)}
                        />
                        <Typography>새 비밀번호</Typography>
                        <TextField
                            type="password"
                            sx={{ width: 300 }}
                            inputProps={{ maxLength: 20 }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Typography>새 비밀번호 확인</Typography>
                        <TextField
                            type="password"
                            sx={{ width: 300 }}
                            inputProps={{ maxLength: 20 }}
                            value={check}
                            onChange={(e) => setCheck(e.target.value)}
                        />
                        {!!errorMsg && (
                            <Typography fontSize="body2" color="red">
                                {errorMsg}
                            </Typography>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleClickSubmit}>변경</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const Nav = () => {
    const router = useRouter();

    const options = [
        { pathname: "/", primary: "대시보드" },
        { pathname: "/companies", primary: "업체관리" },
        { pathname: "/users", primary: "회원관리" },
        { pathname: "/inquiries", primary: "업체문의" },
        { pathname: "/requests", primary: "요청목록" },
        { pathname: "/settings", primary: "설정" },
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
                        <Link key={pathname} href={pathname}>
                            <ListItem disablePadding>
                                <ListItemButton selected={pathname === router.pathname}>
                                    <ListItemText primary={primary} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    );
                })}
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleClickSignout}>
                        <ListItemText primary="로그아웃" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <PasswordDialog />
                </ListItem>
            </List>
        </Stack>
    );
};

export default function Layout({ children }) {
    return (
        <Stack direction="row" height="100vh" overflow="auto">
            <Nav />
            <Divider orientation="vertical" />
            <Stack component="main" minWidth={1000}>
                {children}
            </Stack>
        </Stack>
    );
}
