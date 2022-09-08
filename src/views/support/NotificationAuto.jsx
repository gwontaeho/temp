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
import { Edit as EditIcon, DeleteOutlineOutlined as DeleteOutlineOutlinedIcon } from "@mui/icons-material";

import { PageCard, PageTitle, CountCard } from "../../components";

const DeleteButton = forwardRef(({ icon }, ref) => {
    const [open, setOpen] = useState(false);
    const [check, setCheck] = useState(false);
    return (
        <>
            {icon ? (
                <IconButton onClick={(e) => setOpen(true)}>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            ) : (
                <Button onClick={() => setOpen(true)}>선택 삭제</Button>
            )}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3} alignItems="center">
                    <Typography>선택하신 공지사항을 삭제하시겠습니까?</Typography>
                    <Button onClick={() => setCheck(true)}>삭제</Button>
                </Stack>
            </Dialog>
        </>
    );
});

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
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <FormControlLabel control={<Switch defaultChecked />} label="청구일 도래 알림" />
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack>
                    <Typography>U2알리미</Typography>
                    <Stack direction="row" alignItems="center">
                        <FormControlLabel control={<Switch defaultChecked />} label="발신번호 등록 알림" />
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </PageCard>
        </Stack>
    );
};
