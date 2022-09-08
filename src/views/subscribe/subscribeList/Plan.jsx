import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Grid, Dialog, RadioGroup, FormControlLabel, Radio, Snackbar } from "@mui/material";

const ChangeButton = () => {
    const [open, setOpen] = useState(false);
    const [toast, setToast] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>구독 변경</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography fontWeight="bold">구독 변경</Typography>
                    <Stack alignItems="center" spacing={3}>
                        <Typography>현재 구독하고 있는 요금제를 변경하시겠습니까 ?</Typography>
                        <RadioGroup defaultValue="0">
                            <FormControlLabel value="0" control={<Radio />} label="즉시 구독 변경" />
                            <FormControlLabel value="1" control={<Radio />} label="남은기간 종료 후 구독 변경" />
                        </RadioGroup>
                        <Typography variant="body2">구독 종료일 : 2022.04.22</Typography>
                        <Button>확인</Button>
                    </Stack>
                </Stack>
            </Dialog>
            <Snackbar
                open={toast}
                autoHideDuration={3000}
                message="의 요금제가 {}로 변경되었습니다."
                onClose={() => setToast(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            />
        </>
    );
};

const UnsubscribeButton = () => {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);
    const [toast, setToast] = useState(false);

    return (
        <>
            <Button color="_gray" onClick={() => setOpen(true)}>
                구독 해지
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography fontWeight="bold">구독 취소</Typography>
                    <Stack alignItems="center" spacing={3}>
                        <Typography>U2알리미 구독을 취소하시겠습니까?</Typography>
                        <RadioGroup defaultValue="0">
                            <FormControlLabel value="0" control={<Radio />} label="즉시 구독 취소" />
                            <FormControlLabel value="1" control={<Radio />} label="남은기간 종료 후 구독 취소" />
                        </RadioGroup>
                        <Typography variant="body2">구독 종료일 : 2022.04.22</Typography>
                        <Button onClick={() => setAlert(true)}>확인</Button>
                    </Stack>
                </Stack>
            </Dialog>
            <Dialog open={alert} onClose={() => setAlert(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Stack alignItems="center" spacing={3}>
                        <Typography>발송예약 내역이 (발송예약 건수) 건 있습니다.</Typography>
                        <Typography variant="body2">구독취소시 모두 발송 취소 됩니다.</Typography>
                        <Button onClick={() => setToast(true)}>구독취소</Button>
                    </Stack>
                </Stack>
            </Dialog>
            <Snackbar
                open={toast}
                autoHideDuration={3000}
                message="구독이 취소되었습니다."
                onClose={() => setToast(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            />
        </>
    );
};

export const Plan = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Typography fontWeight="bold">구독중인 요금제</Typography>
            <Stack bgcolor="#fff" borderRadius={3} p={3} direction="row" alignItems="center" justifyContent="space-between">
                <Typography fontWeight="bold">서비스를 구독해주세요.</Typography>
                <Button variant="contained" size="small" onClick={() => navigate("/subscribe/list/create")}>
                    구독신청
                </Button>
            </Stack>
            <Stack>
                <Grid container spacing={3}>
                    {[0, 1].map((v) => {
                        return (
                            <Grid item xs={6} key={v}>
                                <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={3}>
                                    <Typography fontWeight="bold">U2알리미</Typography>
                                    <Typography>매월 정기 결제 중</Typography>
                                    <Stack spacing={1}>
                                        <Stack direction="row">
                                            <Typography width={80} variant="body2">
                                                이용기간
                                            </Typography>
                                            <Typography variant="body2">2022.01.05 ~ 2022.02.05</Typography>
                                        </Stack>
                                        <Stack direction="row">
                                            <Typography width={80} variant="body2">
                                                결제 예정일
                                            </Typography>
                                            <Typography variant="body2">2022.01.05</Typography>
                                        </Stack>
                                        <Stack direction="row">
                                            <Typography width={80} variant="body2">
                                                구독금액
                                            </Typography>
                                            <Typography variant="body2">5,000원</Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack direction="row" spacing={3} justifyContent="center">
                                        <UnsubscribeButton />
                                        <ChangeButton />
                                    </Stack>
                                </Stack>
                            </Grid>
                        );
                    })}
                </Grid>
            </Stack>
        </Stack>
    );
};
