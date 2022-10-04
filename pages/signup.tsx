import type { NextPageWithLayout } from "./_app";
import { SubLayout } from "../layouts";
import type { ReactElement } from "react";
import { useFormik } from "formik";
import { useEffect } from "react";

import * as yup from "yup";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useMutation } from "@tanstack/react-query";
import { signup } from "../apis";

const validationSchema = yup.object({
    email: yup.string().email("Enter a valid email").required("Email is required"),
    password: yup.string().min(8, "Password should be of minimum 8 characters length").required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "password must match")
        .required("Password is required"),
});

const Page: NextPageWithLayout = () => {
    const { status } = useSession();
    const router = useRouter();

    const { mutate } = useMutation(signup, {
        onSuccess: () => router.replace("/"),
        onError: () => {},
    });

    useEffect(() => {
        if (status === "authenticated") router.replace("/");
    }, [status]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => mutate(values),
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
                    <Stack spacing={1}>
                        <Typography variant="body2">비밀번호 확인</Typography>
                        <TextField
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                    </Stack>
                    <Button variant="outlined" fullWidth type="submit">
                        회원가입
                    </Button>
                </Stack>
            </form>
        </Stack>
    );
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <SubLayout>{page}</SubLayout>;
};

export default Page;
