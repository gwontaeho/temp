import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Dialog, FormControlLabel, Radio } from "@mui/material";
import { ViewTitle } from "../../components/";
export const SubscribeCreate = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3} mb="120px">
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <ViewTitle icon="subscribe" title="구독 신청" />
            </Stack>

            <Stack spacing={1}>
                <Typography>서비스</Typography>
                <Stack spacing={3}>
                    <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={3}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <FormControlLabel value="female" control={<Radio />} label="U2알리미" />
                                <Typography variant="body2" color="primary">
                                    지금 구독하면 첫달 무료 이용, 200건 무료
                                </Typography>
                            </Stack>
                            <Button size="small" variant="contained">
                                서비스 상세보기
                            </Button>
                        </Stack>
                        <Typography>검진대상자 전용 검진안내 문자 발송 및 카카오 알림톡 발송 서비스</Typography>
                        <Stack px={3} spacing={1}>
                            <Typography>요금제</Typography>
                            <Stack p={3} bgcolor="#f2f3f7" borderRadius={1} spacing={3}>
                                <Stack>
                                    <FormControlLabel value="female" control={<Radio />} label="U2Check x 정기결제" />
                                    <Typography variant="body2">U2Check 이용 고객 전용 요금제</Typography>
                                </Stack>
                                <Stack>
                                    <FormControlLabel value="female" control={<Radio />} label="정기 결제" />
                                    <Typography variant="body2">U2알리미 일반 요금제</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack px={3} spacing={1}>
                            <Typography>옵션</Typography>
                            <Stack p={3} bgcolor="#f2f3f7" borderRadius={1} spacing={3}>
                                <Stack>
                                    <FormControlLabel value="female" control={<Radio />} label="발송 과금 월 정기결제" />
                                    <Typography variant="body2">U2Check 이용 고객 전용 요금제</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={3}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <FormControlLabel value="female" control={<Radio />} label="U2Survey" />
                                <Typography variant="body2" color="primary">
                                    지금 구독하면 첫달 무료 이용, 200건 무료
                                </Typography>
                            </Stack>
                            <Button size="small" variant="contained">
                                서비스 상세보기
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                direction="row"
                position="fixed"
                width="calc(100% - 300px)"
                right={0}
                bottom={0}
                height={120}
                bgcolor="#555"
                p={3}
                color="#fff"
                alignItems="center"
                spacing={3}
            >
                <Stack spacing={1} flex={1}>
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Typography variant="h6" fontWeight="bold">
                            U2알리미
                        </Typography>
                        <Typography variant="body2">U2Check x 정기결제</Typography>
                    </Stack>
                    <Typography variant="body2">U2Check x 정기결제 + 발송과금 월 정기결제</Typography>
                </Stack>
                <Stack>
                    <Typography>월 구독 금액</Typography>
                    <Typography variant="body2">(부가 과금 미포함)</Typography>
                </Stack>
                <Typography variant="h6" fontWeight="bold">
                    10,000 원
                </Typography>
                <Button variant="contained">구독</Button>
            </Stack>
        </Stack>
    );
};
