import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Grid, Typography, Divider } from "@mui/material";
import { PageCard, PageTitle, CountCard } from "../../components";

import { ResponsiveLine } from "@nivo/line";

const data = [
    {
        id: "a",
        color: "#177fff",
        data: [
            {
                x: "1",
                y: 50,
            },
            {
                x: "2",
                y: 120,
            },
            {
                x: "3",
                y: 70,
            },
            {
                x: "4",
                y: 130,
            },
            {
                x: "5",
                y: 100,
            },
            {
                x: "6",
                y: 120,
            },
            {
                x: "7",
                y: 80,
            },
            {
                x: "8",
                y: 120,
            },
            {
                x: "9",
                y: 140,
            },
            {
                x: "10",
                y: 130,
            },
            {
                x: "11",
                y: 100,
            },
        ],
    },
];

const MyResponsiveLine = () => (
    <ResponsiveLine
        data={data}
        margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
        yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={{ tickSize: 0 }}
        enablePoints={false}
        useMesh
        enableGridX={false}
        enableGridY={false}
        crosshairType="x"
        enableArea
        tooltip={({ point }) => (
            <Stack bgcolor="#fff" p={1} border="1px solid #eee" borderRadius={3}>
                <Typography variant="caption">2022년 7월</Typography>
                <Stack direction="row">
                    <Typography variant="caption">가입 회원수</Typography>
                    <Typography variant="caption">{point.data.y}</Typography>
                </Stack>
            </Stack>
        )}
    />
);

export const Home = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>홍길동 님 반갑습니다</PageTitle>
            <Stack>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <PageCard>
                            <Stack width="100%" height={200}>
                                <MyResponsiveLine />
                            </Stack>
                        </PageCard>
                    </Grid>
                    <Grid item xs={4}>
                        <PageCard>
                            <Stack width="100%" height={200}>
                                <MyResponsiveLine />
                            </Stack>
                        </PageCard>
                    </Grid>
                    <Grid item xs={4}>
                        <PageCard>
                            <Stack width="100%" height={200}>
                                <MyResponsiveLine />
                            </Stack>
                        </PageCard>
                    </Grid>
                    <Grid item xs={6}>
                        <PageCard spacing={3}>
                            <Typography>U2Cloud 회원 현황</Typography>
                            <Divider />
                            <Stack direction="row">
                                <Typography>발신번호 등록요청</Typography>
                                <Typography>발신번호 0건</Typography>
                                <Typography>발신번호 관리</Typography>
                                <Typography>아이콘</Typography>
                            </Stack>
                            <Stack bgcolor="_bg.main" p={3} borderRadius={3}>
                                <Stack direction="row">
                                    <Typography>U2Cloud 회원 수 총</Typography>
                                    <Typography>125명</Typography>
                                </Stack>
                            </Stack>
                        </PageCard>
                    </Grid>
                    <Grid item xs={6}>
                        <PageCard spacing={3}>
                            <Typography>서비스 이용 현황</Typography>
                            <Divider />
                            <Stack>
                                <Typography>11월 U2알리미</Typography>
                                <Stack direction="row">
                                    <Typography>정기결제</Typography>
                                    <Typography>5명</Typography>
                                    <Typography>99,999 원</Typography>
                                </Stack>
                                <Stack direction="row">
                                    <Typography>U2Check x 정기결제</Typography>
                                    <Typography>5명</Typography>
                                    <Typography>99,999 원</Typography>
                                </Stack>
                            </Stack>
                        </PageCard>
                    </Grid>
                    <Grid item xs={6}>
                        <PageCard></PageCard>
                    </Grid>
                    <Grid item xs={6}>
                        <PageCard></PageCard>
                    </Grid>
                    <Grid item xs={6}>
                        <PageCard></PageCard>
                    </Grid>
                    <Grid item xs={6}>
                        <PageCard></PageCard>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
};
