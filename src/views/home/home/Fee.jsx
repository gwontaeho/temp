import { useNavigate } from "react-router-dom";
import { Typography, Stack, Divider, IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const Fee = () => {
    const navigate = useNavigate();
    return (
        <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography fontWeight="bold">실시간 이용요금</Typography>
                <IconButton onClick={() => navigate("/subscribe/fee")}>
                    <ChevronRightIcon />
                </IconButton>
            </Stack>
            <Divider />
            <Stack direction="row" spacing={3}>
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
