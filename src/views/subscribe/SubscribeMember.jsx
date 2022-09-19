import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, IconButton, Stack, Chip, Grid, Button, Divider, Dialog, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { openToast } from "../../redux/features/toast/toastSlice";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { PageCard, PageTitle } from "../../components";

const UnsubscribeButton = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [check, setCheck] = useState(false);
    const [type, setType] = useState("0");

    const handleClick = () => {
        setOpen(false);
        if (type === "0") return dispatch(openToast("구독이 해지되었습니다"));
        return setCheck(true);
    };

    const handleClickCheck = () => {
        setCheck(false);
        dispatch(openToast("구독이 해지되었습니다"));
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>구독 취소</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography>구독 취소</Typography>
                    <Typography textAlign="center">
                        홍길동 hong@u2bio.com 님의 U2알리미 구독을
                        <br />
                        취소하시겠습니까?
                    </Typography>
                    <Stack>
                        <RadioGroup value={type} onChange={(e) => setType(e.target.value)} sx={{ alignSelf: "center" }}>
                            <FormControlLabel value="0" control={<Radio />} label="즉시 구독 취소" />
                            <FormControlLabel value="1" control={<Radio />} label="남은 기간 종료 후 구독취소" />
                        </RadioGroup>
                        <Typography variant="body2" textAlign="center">
                            구독 종료일 : 2022.02.03
                        </Typography>
                    </Stack>
                    <Button sx={{ alignSelf: "center" }} onClick={handleClick}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
            <Dialog open={check} onClose={() => setCheck(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography>구독 취소</Typography>
                    <Typography textAlign="center">
                        구독중인 U2알리미 서비스에서 발송 예약 569 건이 있습니다.
                        <br />
                        구독취소 시 예약된 내역이 취소됩니다. 구독취소 하시겠습니까?
                    </Typography>
                    <Button sx={{ alignSelf: "center" }} onClick={handleClickCheck}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const SubscribeMember = () => {
    const navigate = useNavigate();
    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center">
                <IconButton onClick={() => navigate(-1)}>
                    <ChevronLeftIcon />
                </IconButton>
                <PageTitle>구독 회원 정보</PageTitle>
            </Stack>

            <PageCard spacing={5}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography>홍길동</Typography>
                    <Typography>hong@u2blo.com</Typography>
                    <Chip label="구독중" />
                </Stack>

                <Stack direction="row">
                    <Stack
                        sx={{
                            flex: 1,
                            ">div": {
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 3,

                                ">:first-child": {
                                    minWidth: 160,
                                    bgcolor: "_bg.main",
                                    p: 3,
                                },
                            },
                        }}
                    >
                        <Stack>
                            <Typography>휴대전화</Typography>
                            <Typography>010-1234-1234</Typography>
                        </Stack>
                        <Stack>
                            <Typography>역할</Typography>
                            <Typography>관리자</Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        sx={{
                            flex: 1,
                            ">div": {
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 3,

                                ">:first-child": {
                                    minWidth: 160,
                                    bgcolor: "_bg.main",
                                    p: 3,
                                },
                            },
                        }}
                    >
                        <Stack>
                            <Typography>기관명</Typography>
                            <Typography>유투검진센터</Typography>
                        </Stack>
                        <Stack>
                            <Typography>대표자명</Typography>
                            <Typography>홍길동</Typography>
                        </Stack>
                        <Stack>
                            <Typography>대표 전화번호</Typography>
                            <Typography>010-1234-1234</Typography>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>구독 정보</Typography>
                        <UnsubscribeButton />
                    </Stack>
                    <Stack direction="row">
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <Stack border="1px solid #eee" p={1} spacing={1} alignItems="center" borderRadius={2}>
                                    <Typography>이용멤버</Typography>
                                    <Typography>8</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={3}>
                                <Stack border="1px solid #eee" p={1} spacing={1} alignItems="center" borderRadius={2}>
                                    <Typography>구독시작일</Typography>
                                    <Typography>2021-04-05</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={3}>
                                <Stack border="1px solid #eee" p={1} spacing={1} alignItems="center" borderRadius={2}>
                                    <Typography>이번달 결제금액</Typography>
                                    <Typography>15,000원</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={3}>
                                <Stack border="1px solid #eee" p={1} spacing={1} alignItems="center" borderRadius={2}>
                                    <Typography>누적 결제금액</Typography>
                                    <Typography>8,000원</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                    <Stack
                        sx={{
                            "& >div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3 },
                            "& > div": { flexDirection: "row", alignItems: "center" },
                        }}
                    >
                        <Stack>
                            <Typography>서비스</Typography>
                            <Typography>U2알리미</Typography>
                        </Stack>
                        <Stack>
                            <Typography>요금제</Typography>
                            <Typography>U2알리미 x 정기결제</Typography>
                        </Stack>
                        <Stack>
                            <Typography>이용기간</Typography>
                            <Typography>2022.01.01 ~ 2022.01.01</Typography>
                        </Stack>
                        <Stack>
                            <Typography>결제(예정)일</Typography>
                            <Typography>2022.01.03</Typography>
                        </Stack>
                        <Stack>
                            <Typography>결제금액</Typography>
                            <Typography>15,000원</Typography>
                        </Stack>
                        <Stack>
                            <Typography>결제수단</Typography>
                            <Typography>신한카드 1111-1111</Typography>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>이용 현황</Typography>
                        <Typography>[결제일 ~ 어제]</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>U2알리미</Typography>
                        <Typography>2022.01.02 ~ 2022.01.03</Typography>
                    </Stack>
                    <Stack direction="row" border="1px solid #eee" borderRadius={2} p={3}>
                        <Stack flex={1} alignItems="center" spacing={1}>
                            <Typography>총 발송량</Typography>
                            <Typography>2,000 건</Typography>
                        </Stack>
                        <Divider orientation="vertical" />
                        <Stack flex={1} alignItems="center" spacing={1}>
                            <Typography>발송 이용 요금</Typography>
                            <Typography>130,000 원</Typography>
                        </Stack>

                        <Divider orientation="vertical" />

                        <Stack flex={2} alignItems="center" spacing={1}>
                            <Stack direction="row">
                                <Typography>SMS</Typography>
                                <Typography>10원 x 1,000 건</Typography>
                                <Typography>10,000 원</Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography>SMS</Typography>
                                <Typography>10원 x 1,000 건</Typography>
                                <Typography>10,000 원</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </PageCard>
        </Stack>
    );
};
