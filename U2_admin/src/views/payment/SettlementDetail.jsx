import { useNavigate } from "react-router-dom";
import { Typography, Stack, Chip, Grid, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { PageCard, PageTitle } from "../../components";

export const SettlementDetail = () => {
    const navigate = useNavigate();
    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center">
                <IconButton onClick={() => navigate(-1)}>
                    <ChevronLeftIcon />
                </IconButton>
                <PageTitle>정산 상세</PageTitle>
            </Stack>

            <PageCard spacing={5}>
                <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography>홍길동</Typography>
                        <Typography>hong@u2blo.com</Typography>
                        <Chip label="입금완료" />
                    </Stack>
                    <Stack
                        sx={{
                            "& >div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3 },
                            "& > div": { flexDirection: "row", alignItems: "center" },
                        }}
                    >
                        <Stack>
                            <Typography>이름</Typography>
                            <Typography>홍길동</Typography>
                        </Stack>
                        <Stack>
                            <Typography>이메일</Typography>
                            <Typography>hong@u2bio.com</Typography>
                        </Stack>
                        <Stack>
                            <Typography>휴대전화</Typography>
                            <Typography>010-1234-1234</Typography>
                        </Stack>
                        <Stack>
                            <Typography>기관명</Typography>
                            <Typography>유투바이오</Typography>
                        </Stack>
                        <Stack>
                            <Typography>구독서비스</Typography>
                            <Typography>U2알리미 정기결제</Typography>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack spacing={3}>
                    <Typography>정산 정보</Typography>
                    <Stack
                        sx={{
                            "& >div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3 },
                            "& > div": { flexDirection: "row", alignItems: "center" },
                        }}
                    >
                        <Stack>
                            <Typography>정산ID</Typography>
                            <Typography>202202020</Typography>
                        </Stack>
                        <Stack>
                            <Typography>결제금액</Typography>
                            <Typography>5,000원</Typography>
                        </Stack>
                        <Stack>
                            <Typography>수수료</Typography>
                            <Typography>23,000원</Typography>
                        </Stack>
                        <Stack>
                            <Typography>부가세</Typography>
                            <Typography>2,000원</Typography>
                        </Stack>
                        <Stack>
                            <Typography>정산예정</Typography>
                            <Typography>2,800원 (2022-05-23)</Typography>
                        </Stack>
                        <Stack>
                            <Typography>실 지급액</Typography>
                            <Typography>30,800원</Typography>
                        </Stack>
                        <Stack>
                            <Typography>정산일</Typography>
                            <Typography>2022-02-02</Typography>
                        </Stack>
                        <Stack>
                            <Typography>상태</Typography>
                            <Typography>입금완료</Typography>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack spacing={3}>
                    <Typography>거래정보</Typography>
                    <Stack direction="row" spacing={5}>
                        <Typography>주문번호</Typography>
                        <Typography fontWeight="bold">202020202</Typography>
                    </Stack>
                    <Stack direction="row">
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <Stack border="1px solid #eee" p={1} spacing={1} alignItems="center" borderRadius={2}>
                                    <Typography>결제수단</Typography>
                                    <Typography fontWeight="bold">신용카드</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={3}>
                                <Stack border="1px solid #eee" p={1} spacing={1} alignItems="center" borderRadius={2}>
                                    <Typography>결제일</Typography>
                                    <Typography fontWeight="bold">2022년 22월 22일</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={3}>
                                <Stack border="1px solid #eee" p={1} spacing={1} alignItems="center" borderRadius={2}>
                                    <Typography>결제금액</Typography>
                                    <Typography fontWeight="bold">80,000원</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>
            </PageCard>
        </Stack>
    );
};
