import type { ReactElement } from "react";
import { Stack, Typography } from "@mui/material";

import Layout from "components/Layout";
import { Card } from "components";

import type { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
    return (
        <Stack>
            <Card>
                <Typography>card</Typography>
                <Typography>card</Typography>
                <Typography>card</Typography>
            </Card>
        </Stack>
    );
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Page;
