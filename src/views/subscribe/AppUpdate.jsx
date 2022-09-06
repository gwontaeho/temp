import { useCallback, useState } from "react";
import { Typography, Stack, TextField, Select, Button, MenuItem, Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageCard, PageTitle } from "../../components";

const CancelButton = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(true);
    }, []);

    return (
        <>
            <Button color="_gray" onClick={handleClick}>
                취소
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3} alignItems="center">
                    <Typography textAlign="center">
                        취소하시면 입력된 내용이 삭제됩니다.
                        <br />
                        그래도 취소하시겠습니까?
                    </Typography>
                    <Stack direction="row" spacing={3}>
                        <Button color="_gray" onClick={() => setOpen(false)}>
                            닫기
                        </Button>
                        <Button onClick={() => navigate(-1)}>확인</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

export const AppUpdate = () => {
    return (
        <Stack spacing={3}>
            <PageTitle>앱 정보 수정</PageTitle>
            <PageCard spacing={3}>
                <Stack
                    sx={{
                        "& >div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3 },
                        "& > div": { flexDirection: "row", alignItems: "center" },
                    }}
                >
                    <Stack>
                        <Typography>앱 ID</Typography>
                        <Typography>앱 ID</Typography>
                    </Stack>
                    <Stack>
                        <Typography>앱 이름</Typography>
                        <TextField inputProps={{ maxLength: 30 }} />
                    </Stack>
                    <Stack>
                        <Typography>상태</Typography>
                        <Select defaultValue={0}>
                            <MenuItem value={0}>사용중</MenuItem>
                            <MenuItem value={1}>미사용</MenuItem>
                            <MenuItem value={2}>사용 중지</MenuItem>
                        </Select>
                    </Stack>
                    <Stack>
                        <Typography>앱 설명</Typography>
                        <Typography>검진 대상자 전용 검진안내 문자 발송 및 카카오 알림톡 발송 서비스</Typography>
                    </Stack>
                    <Stack>
                        <Typography>소개 문구</Typography>
                        <Typography>지금 구독하면 첫달 무료 이용</Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="flex-end" spacing={3}>
                    <CancelButton />
                    <Button>저장</Button>
                </Stack>
            </PageCard>
        </Stack>
    );
};
