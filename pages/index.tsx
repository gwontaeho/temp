import type { NextPageWithLayout } from "./_app";
import Layout from "components/Layout";
import type { ReactElement } from "react";
import { Stack, Grid, Typography } from "@mui/material";
import { Card } from "components";

const Page: NextPageWithLayout = () => {
    return (
        <Stack spacing={3}>
            <Typography>테스트12</Typography>
            <Stack>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Card p={5}>
                            <Typography>테스트1</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card p={5}>
                            <Typography>테스트2</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card p={5}>
                            <Typography>테스트2</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card p={5}>
                            <Typography>테스트2</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card p={5}>
                            <Typography>테스트2</Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Page;
