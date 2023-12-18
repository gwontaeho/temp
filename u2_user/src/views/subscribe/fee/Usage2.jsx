import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Divider } from "@mui/material";

export const Usage2 = () => {
    const navigate = useNavigate();
    return (
        <Stack>
            <Stack direction="row" bgcolor="#fff" flex={1} p={3} sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <Stack flex={1} alignItems="center" spacing={1}>
                    <Typography>총 발송량</Typography>
                    <Stack direction="row">
                        <Typography>2,000</Typography>
                        <Typography>건</Typography>
                    </Stack>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Stack flex={1} alignItems="center" spacing={1}>
                    <Typography>발송 이용 요금</Typography>
                    <Stack direction="row">
                        <Typography>130,000</Typography>
                        <Typography>원</Typography>
                    </Stack>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Stack flex={2} alignItems="center" spacing={1}>
                    <Stack direction="row" spacing={2}>
                        <Typography>SMS</Typography>
                        <Typography>10원 x 1000 건</Typography>
                        <Typography>10,000 원</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Typography>LMS</Typography>
                        <Typography>120원 x 1000 건</Typography>
                        <Typography>120,000 원</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                alignItems="center"
                justifyContent="space-evenly"
                direction="row"
                bgcolor="#eee"
                p={1}
                sx={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
            >
                <Typography variant="caption">무료체험 이용</Typography>
                <Stack direction="row" spacing={1}>
                    <Typography variant="caption">사용건수</Typography>
                    <Typography variant="caption">256건</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Typography variant="caption">잔여건수</Typography>
                    <Typography variant="caption">25건</Typography>
                </Stack>
                <Button onClick={() => navigate("/subscribe/list/create")}>구독 신청</Button>
            </Stack>
        </Stack>
    );
};
