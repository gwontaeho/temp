import { Typography, Stack, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageCard, PageTitle } from "../../components";

export const Plan = () => {
    const navigate = useNavigate();
    return (
        <Stack spacing={3}>
            <PageTitle>요금제 정보</PageTitle>
            <PageCard spacing={5}>
                <Stack direction="row" alignItems="flex-end" spacing={3}>
                    <Typography>U2알리미</Typography>
                    <Typography>U12</Typography>
                </Stack>
                <Stack
                    sx={{
                        "&>div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3, height: "100%" },
                        "&>div": { flexDirection: "row", alignItems: "center" },
                    }}
                >
                    <Stack>
                        <Typography>요금제 이름</Typography>
                        <Typography>U2Check x 정기 결제</Typography>
                    </Stack>
                    <Stack>
                        <Typography>소개 문구</Typography>
                        <Typography>U2Check 이용 고객 전용 요금제</Typography>
                    </Stack>
                    <Divider />
                    <Stack>
                        <Typography>가격</Typography>
                        <Typography>5000원</Typography>
                    </Stack>
                    <Stack>
                        <Typography>기간</Typography>
                        <Typography>2022-04-22 ~ 2022-04-22</Typography>
                    </Stack>
                    <Stack>
                        <Typography>할인</Typography>
                        <Typography>첫달 프로모션 할인</Typography>
                        <Typography>5,000원</Typography>
                    </Stack>
                    <Divider />
                    <Stack>
                        <Typography>옵션</Typography>
                        <Typography>결과리포트 수신 발송료</Typography>
                        <Typography>5,000원</Typography>
                    </Stack>
                    <Stack>
                        <Typography>
                            기본사용료
                            <br />
                            (필수과금)
                        </Typography>
                        <Typography>발송과금 월 정기 결제</Typography>
                    </Stack>
                    <Divider />
                    <Stack>
                        <Typography>구독단위</Typography>
                        <Typography>1개월</Typography>
                    </Stack>
                    <Stack>
                        <Typography>이용범위</Typography>
                        <Typography></Typography>
                    </Stack>
                    <Divider />
                    <Stack>
                        <Typography>구독조건</Typography>
                        <Typography>U2Check 회원</Typography>
                    </Stack>
                </Stack>
                <Button sx={{ alignSelf: "center" }} onClick={() => navigate("/subscribe/app/plan/update")}>
                    수정
                </Button>
            </PageCard>
        </Stack>
    );
};
