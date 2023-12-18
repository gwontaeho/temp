import type { NextPageWithLayout } from "./_app";
import { MainLayout } from "../layouts";
import type { ReactElement } from "react";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";

const Page: NextPageWithLayout = () => {
    const router = useRouter();
    return <Stack>홈화면</Stack>;
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default Page;
