import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Grid, Typography, Divider, IconButton, Chip } from "@mui/material";
import { PageCard, PageTitle } from "../../components";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
            {
                x: "12",
                y: 100,
            },
        ],
    },
];

const MyResponsiveLine = ({ type }) => {
    const title = ["가입 회원수", "U2알리미 구독자수", "결제금액"];

    return (
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
                <Stack bgcolor="#fff" p={3} border="1px solid #eee" borderRadius={3} spacing={1}>
                    <Typography variant="caption">2022년 {point.data.x}월</Typography>
                    <Stack direction="row" spacing={5}>
                        <Typography variant="caption">{title[type]}</Typography>
                        <Typography variant="caption">{point.data.y}</Typography>
                    </Stack>
                </Stack>
            )}
        />
    );
};

export const Home = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>홍길동 님 반갑습니다</PageTitle>
            <Stack>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <PageCard position="relative">
                            <Typography>총 회원수</Typography>
                            <Typography>125</Typography>
                            <Stack width="100%" height={200}>
                                <MyResponsiveLine type={0} />
                            </Stack>
                            <Chip label="+10" sx={{ position: "absolute", right: 20 }} />
                        </PageCard>
                    </Grid>
                    <Grid item xs={4}>
                        <PageCard position="relative">
                            <Typography>U2알리미 구독자 수</Typography>
                            <Typography>125</Typography>
                            <Stack width="100%" height={200}>
                                <MyResponsiveLine type={1} />
                            </Stack>
                            <Chip label="+10" sx={{ position: "absolute", right: 20 }} />
                        </PageCard>
                    </Grid>
                    <Grid item xs={4}>
                        <PageCard position="relative">
                            <Typography>11월 결제금액</Typography>
                            <Typography>125,000</Typography>
                            <Stack width="100%" height={200}>
                                <MyResponsiveLine type={2} />
                            </Stack>
                            <Chip label="+10" sx={{ position: "absolute", right: 20 }} />
                        </PageCard>
                    </Grid>
                    <Grid item xs={6}>
                        <PageCard spacing={3}>
                            <Typography>U2Cloud 회원 현황</Typography>
                            <Divider />
                            <Stack direction="row" alignItems="center" sx={{ ">p": { flex: 1, textAlign: "right" } }}>
                                <Typography>발신번호 등록요청</Typography>
                                <Typography>0건</Typography>
                                <Typography>발신번호 관리</Typography>
                                <IconButton onClick={() => navigate("/member/caller")}>
                                    <ChevronRightIcon />
                                </IconButton>
                            </Stack>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ ">p": { flex: 1, textAlign: "right" } }}>
                                <Typography>탈퇴신청</Typography>
                                <Typography>0건</Typography>
                                <Typography>탈퇴 관리</Typography>
                                <IconButton onClick={() => navigate("/member/withdrawal")}>
                                    <ChevronRightIcon />
                                </IconButton>
                            </Stack>
                            <Stack bgcolor="_bg.main" p={3} borderRadius={3} spacing={3}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography>U2Cloud 회원 수 총</Typography>
                                    <Typography>125명</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography>사용중</Typography>
                                    <Typography>120명</Typography>
                                </Stack>
                            </Stack>
                        </PageCard>
                    </Grid>
                    <Grid item xs={6}>
                        <PageCard spacing={3} height="100%">
                            <Typography>서비스 이용 현황</Typography>
                            <Divider />
                            <Typography>11월 U2알리미</Typography>
                            <Stack direction="row" sx={{ ">p": { flex: 1, textAlign: "right" } }}>
                                <Typography>정기결제</Typography>
                                <Typography>5명</Typography>
                                <Typography>99,999 원</Typography>
                            </Stack>
                            <Stack direction="row" sx={{ ">p": { flex: 1, textAlign: "right" } }}>
                                <Typography>U2Check x 정기결제</Typography>
                                <Typography>5명</Typography>
                                <Typography>99,999 원</Typography>
                            </Stack>
                        </PageCard>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={3}>
                            <PageCard spacing={3} height="100%">
                                <Typography>결제금액</Typography>
                                <Divider />
                                <Stack direction="row" sx={{ ">p": { flex: 1, textAlign: "right" } }}>
                                    <Typography>5월</Typography>
                                    <Typography>결제금액</Typography>
                                    <Typography>99,999 원</Typography>
                                </Stack>
                                <Stack direction="row" sx={{ ">p": { flex: 1, textAlign: "right" } }}>
                                    <Typography>6월</Typography>
                                    <Typography>결제예정</Typography>
                                    <Typography>99,999 원</Typography>
                                </Stack>
                                <Stack bgcolor="_bg.main" direction="row" p={3} borderRadius={3} sx={{ ">p": { flex: 1, textAlign: "right" } }}>
                                    <Typography>정산일</Typography>
                                    <Typography>125명</Typography>
                                    <Typography>11월 정산 금액</Typography>
                                    <Typography>401,000원</Typography>
                                </Stack>
                            </PageCard>
                            <PageCard direction="row" alignItems="center" justifyContent="space-between" position="relative">
                                <Typography>공지사항</Typography>
                                <Typography onClick={() => navigate("/support/notice/detail")}>유투알리미 오픈 안내</Typography>
                                <Typography>22-10-14</Typography>
                                <div />
                                <IconButton onClick={() => navigate("/support/notice")} sx={{ position: "absolute", right: 10 }}>
                                    <ChevronRightIcon />
                                </IconButton>
                            </PageCard>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={3} height="100%">
                            <PageCard spacing={3} flex={1}>
                                <Stack direction="row" alignItems="center" position="relative">
                                    <Typography>문의내역</Typography>
                                    <IconButton onClick={() => navigate("/support/qna")} sx={{ position: "absolute", right: 0 }}>
                                        <ChevronRightIcon />
                                    </IconButton>
                                </Stack>
                                <Divider />
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography onClick={() => navigate("/support/qna/detail")}>환불가능한가요?</Typography>
                                    <Typography>22-11-10</Typography>
                                </Stack>
                            </PageCard>
                            <PageCard spacing={3}>
                                <Stack direction="row" alignItems="center" position="relative">
                                    <Typography>최근알림</Typography>
                                    <IconButton onClick={() => navigate("/member/withdrawal")} sx={{ position: "absolute", right: 0 }}>
                                        <ChevronRightIcon />
                                    </IconButton>
                                </Stack>
                                <Divider />
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography>발신번호가 등록되었습니다</Typography>
                                    <Typography>22-11-10</Typography>
                                </Stack>
                            </PageCard>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
};
