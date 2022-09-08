import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Divider, Chip, TextField, Dialog, FormControl, Radio, RadioGroup, FormControlLabel, Select, Checkbox } from "@mui/material";

const Regist = ({ open, setOpen }) => {
    const [type, setType] = useState(0);

    const [openResult, setOpenResult] = useState(false);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <Stack p={3} spacing={5}>
                <Typography fontWeight="bold">결제수단 등록</Typography>
                <Stack direction="row" spacing={3}>
                    <Stack bgcolor="#f2f3f7" py={2} px={3} borderRadius={1} onClick={() => setType(0)}>
                        <Typography>신용카드</Typography>
                    </Stack>
                    <Stack bgcolor="#f2f3f7" py={2} px={3} borderRadius={1} onClick={() => setType(1)}>
                        <Typography>계좌이체</Typography>
                    </Stack>
                </Stack>
                {!type ? (
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

export const Payment = () => {
    const [open, setOpen] = useState(false);
    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={3}>
                <Typography fontWeight="bold">22년 5월 결제금액</Typography>
                <Typography variant="h5" fontWeight="bold">
                    48,400 원
                </Typography>
                <Chip label="결제대기" />
            </Stack>
            <Stack bgcolor="#fff" borderRadius={3} p={3} overflow="auto">
                <Stack spacing={5} minWidth={900}>
                    <Stack direction="row" alignItems="center">
                        <Stack direction="row" flex={2} alignItems="center" justifyContent="center" spacing={2}>
                            <Typography variant="body2">결제수단</Typography>
                            <Typography fontWeight="bold">신한 카드(1234-****-****-5678)</Typography>
                            <Button variant="outlined" onClick={() => setOpen(true)}>
                                변경
                            </Button>
                        </Stack>
                        <Divider orientation="vertical" />
                        <Stack direction="row" flex={1} justifyContent="center" alignItems="center" spacing={2}>
                            <Typography variant="body2">결제일</Typography>
                            <Typography fontWeight="bold">2022년 06월 05일</Typography>
                        </Stack>
                        <Divider orientation="vertical" />
                        <Stack direction="row" flex={1} justifyContent="center" alignItems="center" spacing={2}>
                            <Typography variant="body2">금액</Typography>
                            <Typography fontWeight="bold">48,400 원</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row">
                        <Stack flex={2}>
                            <Typography p={1} textAlign="center" bgcolor="#f2f3f7" fontWeight="bold">
                                서비스명
                            </Typography>
                            <Stack p={2} alignItems="center" spacing={2}>
                                <Typography>U2알리미</Typography>
                                <Stack p={1} bgcolor="#f2f3f7" borderRadius={1}>
                                    <Typography variant="body2">이용기간</Typography>
                                    <Typography variant="caption">2022.12.12 ~ 2022.12.12</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Divider orientation="vertical" flexItem />
                        <Stack flex={2}>
                            <Typography p={1} textAlign="center" bgcolor="#f2f3f7" fontWeight="bold">
                                월정액
                            </Typography>
                            <Stack p={2} alignItems="center">
                                <Typography>U2알리미 정기결제 5,000 원</Typography>
                            </Stack>
                        </Stack>
                        <Divider orientation="vertical" flexItem />
                        <Stack flex={2}>
                            <Typography p={1} textAlign="center" bgcolor="#f2f3f7" fontWeight="bold">
                                옵션 사용료
                            </Typography>
                            <Stack alignItems="center" p={2} spacing={2}>
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="body2">SMS</Typography>
                                    <Typography variant="body2">10원 x 1,000 건</Typography>
                                    <Typography variant="body2">10,000 원</Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="body2">SMS</Typography>
                                    <Typography variant="body2">10원 x 1,000 건</Typography>
                                    <Typography variant="body2">10,000 원</Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="body2">SMS</Typography>
                                    <Typography variant="body2">10원 x 1,000 건</Typography>
                                    <Typography variant="body2">10,000 원</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Divider orientation="vertical" flexItem />
                        <Stack flex={1}>
                            <Typography p={1} textAlign="center" bgcolor="#f2f3f7" fontWeight="bold">
                                부가세 (10%)
                            </Typography>
                            <Stack p={2} alignItems="center">
                                <Typography>4,400원</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Regist open={open} setOpen={setOpen} />
        </Stack>
    );
};
