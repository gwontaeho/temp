import { Button, Stack, TextField, Dialog } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { signAdmin } from "@/apis";

export default function Signin() {
    const router = useRouter();

    const [phone, setPhone] = useState("");
    const [device, setDevice] = useState("");

    const { mutate } = useMutation({
        mutationFn: () => signAdmin({ phone, device }),
        onSuccess: (data) => {
            const token = data?.token;
            setCookie("token", token);
            router.replace("/");
        },
    });

    return (
        <Dialog open={true}>
            <Stack p={3} spacing={3} width={300}>
                <TextField value={phone} onChange={(e) => setPhone(e.target.value)} inputProps={{ maxLength: 20 }} />
                <TextField
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    type="password"
                    inputProps={{ maxLength: 20 }}
                    onKeyDown={(e) => {
                        if (e.code === "Enter") mutate();
                    }}
                />
                <Button variant="contained" size="large" onClick={mutate}>
                    로그인
                </Button>
            </Stack>
        </Dialog>
    );
}

export const getServerSideProps = ({ req, res }) => {
    const token = getCookie("token", { req, res });

    if (token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return { props: {} };
};
