import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Divider } from "@mui/material";

export const Usage = () => {
    return (
        <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="bold">이용현황</Typography>
                <Stack direction="row" spacing={3}>
                    <Typography>2월</Typography>
                    <Typography>2022.12.12 ~ 2022.12.12</Typography>
                </Stack>
            </Stack>

            <Stack bgcolor="#fff" borderRadius={3} p={3} direction="row" alignItems="center" spacing={3}>
                <Stack flex={1} justifyContent="center" alignItems="center" spacing={5} direction="row">
                    <Typography flex={0.5} textAlign="center">
                        5월
                    </Typography>
                    <Stack spacing={1} flex={2}>
                        <Stack direction="row" alignItems="center" bgcolor="_bg.main" p={1} borderRadius={2} justifyContent="space-between">
                            <Typography variant="body2">U2알리미 월 정기 결제</Typography>
                            <Typography fontWeight="bold">5,000 원</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" bgcolor="_bg.main" p={1} borderRadius={2} justifyContent="space-between">
                            <Typography variant="body2">발송 이용요금</Typography>
                            <Typography fontWeight="bold">100,000 원</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Stack flex={1} justifyContent="center" alignItems="center" spacing={5} direction="row">
                    <Typography flex={0.5} textAlign="center">
                        현재 총
                    </Typography>
                    <Stack spacing={1} flex={2}>
                        <Stack direction="row" alignItems="center" bgcolor="_bg.main" p={1} borderRadius={2} justifyContent="space-between">
                            <Typography variant="body2">결제예정</Typography>
                            <Typography fontWeight="bold">5,000 원</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" p={1} borderRadius={2} justifyContent="space-between">
                            <Typography variant="body2">이용예정</Typography>
                            <Typography fontWeight="bold">100,000 원</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
