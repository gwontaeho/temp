import { useCallback, useState } from "react";
import { Typography, Stack, TextField, Select, Button, MenuItem, Dialog, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageCard, PageTitle } from "../../components";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";

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
                    <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                    <Typography textAlign="center">
                        취소하시면 입력된 내용이 삭제됩니다.
                        <br />
                        그래도 취소하시겠습니까?
                    </Typography>
                    <Button onClick={() => navigate(-1)}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const AppUpdate = () => {
    const navigate = useNavigate();
    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center">
                <IconButton onClick={() => navigate(-1)}>
                    <ChevronLeftIcon />
                </IconButton>
                <PageTitle>앱 정보 수정</PageTitle>
            </Stack>
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
                        <TextField />
                    </Stack>
                    <Stack>
                        <Typography>소개 문구</Typography>
                        <TextField />
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
