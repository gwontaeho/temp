import { useRouter } from "next/router";
import { useState } from "react";
import { Stack, TextField, InputAdornment, Button, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { setCookie, hasCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import Image from "next/image";

import logo from "@/public/logo.svg";
import { signin } from "@/apis";
import { setAuth } from "@/redux/authSlice";

export default function Signin() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");

    const { mutate } = useMutation({
        mutationFn: () => signin({ loginId, password }),
        onSuccess: async (data) => {
            const { response } = data;
            const { accessToken, refreshToken } = response;
            dispatch(setAuth({ loginId }));
            setCookie("accessToken", accessToken);
            setCookie("refreshToken", refreshToken);
            router.replace("/");
        },
    });

    const handleClickSignin = () => {
        mutate();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleClickSignin();
    };

    return (
        <Stack minWidth={1920} minHeight={1074} width="100vw" height="100vh" alignItems="center" justifyContent="center" bgcolor="spirokit.bg">
            <Stack
                direction="row"
                border="1px solid"
                borderColor="spirokit.border"
                borderRadius={1.5}
                width={800}
                bgcolor="#fff"
                boxShadow="0px 3px 6px #0000001A"
            >
                <Stack flex={1} alignItems="center" justifyContent="center">
                    <Image priority src={logo} alt="logo" width={180} />
                </Stack>
                <Stack p={5} spacing={3} flex={1}>
                    <Stack spacing={1.5}>
                        <TextField
                            variant="standard"
                            placeholder="ID"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Typography color="#000" width={80}>
                                            아이디
                                        </Typography>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="standard"
                            placeholder="password"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Typography color="#000" width={80}>
                                            비밀번호
                                        </Typography>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>
                    <Stack spacing={1.5}>
                        <Button onClick={handleClickSignin}>로그인</Button>
                        <Button onClick={() => router.push("/signup")}>회원가입</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}

export const getServerSideProps = ({ req, res }) => {
    const accessToken = hasCookie("accessToken", { req, res });

    if (accessToken) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return { props: {} };
};
