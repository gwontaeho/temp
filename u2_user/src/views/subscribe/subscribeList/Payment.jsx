import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Select, Chip, Grid, Dialog, Radio, RadioGroup, FormControlLabel, FormControl, TextField, Checkbox } from "@mui/material";

import { Regist } from "../Regist";

const Delete = ({ open, setOpen }) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
            <Stack p={3} spacing={3} alignItems="center">
                <Typography>결제수단을 삭제하시겠습니까?</Typography>
                <Button>확인</Button>
            </Stack>
        </Dialog>
    );
};

export const Payment = () => {
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    return (
        <>
            <Stack spacing={3}>
                <Typography fontWeight="bold">결제수단</Typography>
                <Stack bgcolor="#fff" borderRadius={3} p={3} direction="row" alignItems="center" justifyContent="space-between">
                    <Typography>결제수단을 등록해주세요.</Typography>
                    <Button onClick={() => setOpen(true)}>결제수단 등록</Button>
                </Stack>
                <Stack bgcolor="#fff" borderRadius={3} p={3} direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Typography variant="body2">신용카드</Typography>
                        <Typography variant="body2" fontWeight="bold">
                            신한카드 ******** 1234
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Chip label="사용불가" variant="outlined" color="_gray" />
                            <Typography color="_red.main" variant="caption" fontWeight="bold">
                                결제수단 정보를 수정해주세요
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={3}>
                        <Button color="_gray" onClick={() => setOpenDelete(true)}>
                            삭제
                        </Button>
                        <Button onClick={() => setOpen(true)}>변경</Button>
                    </Stack>
                </Stack>
            </Stack>

            <Regist open={open} setOpen={setOpen} />
            <Delete open={openDelete} setOpen={setOpenDelete} />
        </>
    );
};
