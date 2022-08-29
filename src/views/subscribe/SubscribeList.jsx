import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Select, Dialog, Radio, RadioGroup, FormControlLabel, FormControl, TextField, Checkbox } from "@mui/material";

const Payment = ({ open, setOpen }) => {
    const [type, setType] = useState(0);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <Stack p={3} spacing={5}>
                <Typography>결제수단 등록</Typography>
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
                            <Select size="small"></Select>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>카드번호</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <TextField size="small" />
                                <Typography>-</Typography>
                                <TextField size="small" />
                                <Typography>-</Typography>
                                <TextField size="small" />
                                <Typography>-</Typography>
                                <TextField size="small" />
                            </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>유효기간</Typography>
                            <TextField size="small" fullWidth />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>생년월일</Typography>
                            <TextField size="small" fullWidth />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>카드 비밀번호</Typography>
                            <TextField size="small" fullWidth />
                        </Stack>
                    </Stack>
                ) : (
                    <Stack spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>이름</Typography>
                            <TextField size="small" fullWidth />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>생년월일</Typography>
                            <TextField size="small" fullWidth />
                        </Stack>
                    </Stack>
                )}
                <Stack direction="row" alignItems="center">
                    <FormControlLabel control={<Checkbox />} label="본인의 개인정보를 결제 서비스 업체에 제공하는 데에 동의합니다" />
                    <Typography color="primary">(필수)</Typography>
                </Stack>
                <Stack direction="row" spacing={3} justifyContent="center">
                    <Button variant="contained" size="small">
                        취소
                    </Button>
                    <Button variant="contained" size="small">
                        확인
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    );
};

export const SubscribeList = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                    <Typography variant="h6">구독현황</Typography>
                </Stack>
                <Stack spacing={5}>
                    <Stack spacing={3}>
                        <Typography fontWeight="bold">구독중인 요금제</Typography>
                        <Stack bgcolor="#fff" borderRadius={3} p={3} direction="row" alignItems="center" justifyContent="space-between">
                            <Typography>서비스를 구독해주세요.</Typography>
                            <Button variant="contained" size="small" onClick={() => navigate("/subscribe/list/create")}>
                                구독신청
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack spacing={3}>
                        <Typography fontWeight="bold">결제수단</Typography>
                        <Stack bgcolor="#fff" borderRadius={3} p={3} direction="row" alignItems="center" justifyContent="space-between">
                            <Typography>결제수단을 등록해주세요.</Typography>
                            <Button variant="contained" size="small" onClick={() => setOpen(true)}>
                                결제수단 등록
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack spacing={3}>
                        <Typography fontWeight="bold">U2Cloud 서비스</Typography>
                        <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3}>
                            <Typography>결제수단을 등록해주세요.</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            <Payment open={open} setOpen={setOpen} />
        </>
    );
};
