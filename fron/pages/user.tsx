import type { NextPageWithLayout } from "./_app";
import { MainLayout } from "../layouts";
import { ReactElement, useEffect } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") router.replace("/");
    }, [status]);

    if (status !== "authenticated") return null;

    return <Stack border="1px solid black"></Stack>;
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default Page;
