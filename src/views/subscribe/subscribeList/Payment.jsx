import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Select, Chip, Grid, Dialog, Radio, RadioGroup, FormControlLabel, FormControl, TextField, Checkbox } from "@mui/material";

const Regist = ({ open, setOpen }) => {
    const [type, setType] = useState(0);

    const [openResult, setOpenResult] = useState(false);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <Stack p={3} spacing={5}>
                <Typography fontWeight="bold">결제수단 등록</Typography>
                <Stack direction="row" spacing={3}>
                    <Stack bgcolor="#f2f3f7" py={2} px={3} borderRadius={1} onClick={() => setType(1)}>
                        <Typography>신용카드</Typography>
                    </Stack>
                    <Stack bgcolor="#f2f3f7" py={2} px={3} borderRadius={1} onClick={() => setType(0)}>
                        <Typography>계좌이체</Typography>
                    </Stack>
                </Stack>
                {type ? (
                    <Stack spacing={1}>
                        <FormControl>
                            <RadioGroup row defaultValue="female">
                                <FormControlLabel value="female" control={<Radio />} label="개인" />
                                <FormControlLabel value="male" control={<Radio />} label="법인" />
                            </RadioGroup>
                        </FormControl>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>카드사</Typography>
                            <Select></Select>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>카드번호</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <TextField placeholder="0000" />
                                <Typography>-</Typography>
                                <TextField placeholder="0000" />
                                <Typography>-</Typography>
                                <TextField placeholder="0000" />
                                <Typography>-</Typography>
                                <TextField placeholder="0000" />
                            </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>유효기간</Typography>
                            <TextField fullWidth placeholder="MM/YY" />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>생년월일</Typography>
                            <TextField fullWidth placeholder="YYMMDD" />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>카드 비밀번호</Typography>
                            <TextField fullWidth placeholder="비밀번호 앞 2자리 숫자" />
                        </Stack>
                    </Stack>
                ) : (
                    <Stack spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>이름</Typography>
                            <TextField fullWidth />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>생년월일</Typography>
                            <TextField fullWidth />
                        </Stack>
                    </Stack>
                )}
                <Stack direction="row" alignItems="center">
                    <FormControlLabel control={<Checkbox />} label="본인의 개인정보를 결제 서비스 업체에 제공하는 데에 동의합니다" />
                    <Typography color="primary">(필수)</Typography>
                </Stack>
                <Stack direction="row" spacing={3} justifyContent="center">
                    <Button color="_gray" onClick={() => setOpen(false)}>
                        취소
                    </Button>
                    <Button onClick={() => setOpenResult(true)}>확인</Button>
                </Stack>
            </Stack>
            <Dialog open={openResult} onClose={() => setOpenResult(false)} fullWidth>
                <Stack py={5} spacing={3} alignItems="center">
                    <Typography>카드등록이 완료되었습니다.</Typography>
                    <Button>확인</Button>
                </Stack>
            </Dialog>
        </Dialog>
    );
};

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
