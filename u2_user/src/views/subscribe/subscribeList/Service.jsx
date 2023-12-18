import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Chip, Dialog } from "@mui/material";

const ExButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>체험해지</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3}>
                    <Stack alignItems="center" spacing={3}>
                        <Typography>U2알리미 서비스 체험을 종료하시겠습니까 ?</Typography>
                        <Button>확인</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

export const Service = () => {
    const navigate = useNavigate();
    return (
        <Stack spacing={3}>
            <Typography fontWeight="bold">U2Cloud 서비스</Typography>
            <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            U2알리미
                        </Typography>
                        <Chip label="구독중" size="small" color="_gray" variant="outlined" />
                    </Stack>
                    <Button variant="text">서비스 상세보기</Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Stack>
                        <Typography color="primary" fontWeight="bold">
                            지금 구독하면 첫달 무료 이용
                        </Typography>
                        <Typography>검진대상자 전용 검진안내 문자 발송 및 카카오 알림톡 발송 서비스</Typography>
                    </Stack>
                    <Stack direction="row" spacing={3}>
                        <Button onClick={() => navigate("/subscribe/list/create")}>구독신청</Button>
                        <Button onClick={() => navigate("/application")}>무료체험</Button>
                        <ExButton />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
