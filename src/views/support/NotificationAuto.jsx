import { useCallback, useEffect, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Switch,
    Button,
    Select,
    Dialog,
    Checkbox,
    IconButton,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

import { PageCard, PageTitle, CountCard } from "../../components";

const UpdateButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography>자동알림 메시지 수정</Typography>
                    <Stack
                        sx={{
                            "&>div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3, height: "100%" },
                            "&>div": { flexDirection: "row", alignItems: "center" },
                        }}
                    >
                        <Stack>
                            <Typography>알림명</Typography>
                            <Typography>알림명</Typography>
                        </Stack>
                        <Stack>
                            <Typography>제목</Typography>
                            <TextField fullWidth />
                        </Stack>
                        <Stack height={120}>
                            <Typography>내용</Typography>
                            <TextField fullWidth multiline rows={3} />
                        </Stack>
                    </Stack>
                    <Button sx={{ alignSelf: "center" }}>수정</Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const NotificationAuto = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>자동알림 설정</PageTitle>
            <PageCard spacing={5}>
                <Stack spacing={1}>
                    <Typography>U2Cloud</Typography>
                    <Stack>
                        <Stack direction="row" alignItems="center">
                            <FormControlLabel control={<Switch defaultChecked />} label="회원가입 축하" />
                            <UpdateButton />
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <FormControlLabel control={<Switch defaultChecked />} label="청구일 도래 알림" />
                            <UpdateButton />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack>
                    <Typography>U2알리미</Typography>
                    <Stack direction="row" alignItems="center">
                        <FormControlLabel control={<Switch defaultChecked />} label="발신번호 등록 알림" />
                        <UpdateButton />
                    </Stack>
                </Stack>
            </PageCard>
        </Stack>
    );
};
