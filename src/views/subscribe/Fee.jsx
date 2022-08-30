import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Divider } from "@mui/material";

export const Fee = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="subtitle1">실시간 이용요금</Typography>
            </Stack>
            <Stack spacing={5}>
                <Stack spacing={3}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography fontWeight="bold">이용현황</Typography>
                        <Stack direction="row" spacing={3}>
                            <Typography>2월</Typography>
                            <Typography>2022.12.12 ~ 2022.12.12</Typography>
                        </Stack>
                    </Stack>
                    <Stack spacing={3}>
                        <Stack bgcolor="#fff" borderRadius={3} p={3} direction="row" alignItems="center">
                            <Stack flex={1} justifyContent="center" alignItems="center" spacing={2}>
                                <Stack direction="row" spacing={5} alignItems="center">
                                    <Typography variant="body2">U2알리미 월 정기 결제</Typography>
                                    <Typography fontWeight="bold">5,000 원</Typography>
                                </Stack>
                                <Stack direction="row" spacing={5} alignItems="center">
                                    <Typography variant="body2">발송 이용요금</Typography>
                                    <Typography fontWeight="bold">100,000 원</Typography>
                                </Stack>
                            </Stack>
                            <Divider orientation="vertical" flexItem />
                            <Stack flex={1} justifyContent="center" alignItems="center" spacing={2}>
                                <Typography variant="body2">22.12.12 결제예정</Typography>
                                <Typography variant="h6" fontWeight="bold">
                                    총 105,000 원
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack bgcolor="#fff" borderRadius={3} p={3} direction="row" alignItems="center">
                            <Stack flex={1} alignItems="center" spacing={2}>
                                <Typography variant="body2">총 발송량</Typography>
                                <Typography fontWeight="bold">2,000 건</Typography>
                            </Stack>
                            <Divider orientation="vertical" flexItem />
                            <Stack flex={1} alignItems="center" spacing={2}>
                                <Typography variant="body2">발송 이용 요금</Typography>
                                <Typography fontWeight="bold">130,000 원</Typography>
                            </Stack>
                            <Divider orientation="vertical" flexItem />
                            <Stack flex={2} alignItems="center" spacing={2}>
                                <Stack direction="row" spacing={3} alignItems="center">
                                    <Typography variant="body2">SMS</Typography>
                                    <Typography variant="body2">10원 x 1000 건</Typography>
                                    <Typography fontWeight="bold">10,000 원</Typography>
                                </Stack>
                                <Stack direction="row" spacing={3} alignItems="center">
                                    <Typography variant="body2">LMS</Typography>
                                    <Typography variant="body2">10원 x 1000 건</Typography>
                                    <Typography fontWeight="bold">10,000 원</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack spacing={3}>
                    <Typography fontWeight="bold">발송현황</Typography>
                    <Stack bgcolor="#fff" borderRadius={3} p={3}>
                        <Stack height={40} direction="row">
                            <Stack border="1px solid pink" flex={7 / 10} alignItems="center" justifyContent="center">
                                70%
                            </Stack>
                            <Stack border="1px solid gray" flex={2 / 10} alignItems="center" justifyContent="center">
                                20%
                            </Stack>
                            <Stack border="1px solid lightgreen" flex={1 / 10} alignItems="center" justifyContent="center">
                                10%
                            </Stack>
                        </Stack>
                        <Stack p={3}>
                            <Stack direction="row" spacing={5}>
                                <Typography>발송완료</Typography>
                                <Typography flex={1}>70% | 100,500 건</Typography>
                                <Typography>이용금액</Typography>
                                <Typography>130,000 원</Typography>
                            </Stack>
                            <Stack direction="row" spacing={5}>
                                <Typography>발송대기</Typography>
                                <Typography flex={1}>20% | 100,500 건</Typography>
                                <Typography>이용예정금액</Typography>
                                <Typography>약 130,000 원</Typography>
                            </Stack>
                            <Stack direction="row" spacing={5}>
                                <Typography>발송실패</Typography>
                                <Typography>10% | 100,500 건</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
