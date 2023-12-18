import type { NextPageWithLayout } from "../_app";
import { AdminLayout } from "../../layouts";
import { ReactElement, useEffect } from "react";
import Link from "next/link";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
    return <Stack border="1px solid black"></Stack>;
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
