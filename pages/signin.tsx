import type { NextPageWithLayout } from "./_app";
import { SubLayout } from "../layouts";
import { ReactElement, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const validationSchema = yup.object({
    email: yup.string().email("Enter a valid email").required("Email is required"),
    password: yup.string().min(8, "Password should be of minimum 8 characters length").required("Password is required"),
});

const Page: NextPageWithLayout = () => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") router.replace("/");
    }, [status]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
            const response = await signIn("credentials", values);
            console.log(response);
        },
    });

    if (status !== "unauthenticated") return null;

    return (
        <Stack>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                    <Stack spacing={1}>
                        <Typography variant="body2">이메일</Typography>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="body2">비밀번호</Typography>
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Stack>
                    <Button variant="outlined" fullWidth type="submit">
                        로그인
                    </Button>
                </Stack>
            </form>
            <Button variant="outlined" fullWidth onClick={() => signIn("kakao")}>
                카카오 로그인
            </Button>
            <Button fullWidth onClick={() => router.push("/signup")}>
                회원가입
            </Button>
        </Stack>
    );
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <SubLayout>{page}</SubLayout>;
};

export default Page;
