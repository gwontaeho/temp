import { useCallback, useState } from "react";
import {
    Typography,
    Stack,
    TextField,
    Select,
    IconButton,
    Button,
    MenuItem,
    Dialog,
    Divider,
    Checkbox,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
import { PageCard, PageTitle } from "../../components";

const OptionButton = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(true);
    }, []);
    return (
        <>
            <Button color="_gray" sx={{ alignSelf: "flex-start" }} onClick={handleClick}>
                옵션 추가
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography>부가서비스 추가</Typography>
                    <Stack
                        sx={{
                            ">div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3, height: "100%" },
                            ">div": { flexDirection: "row", alignItems: "center" },
                        }}
                    >
                        <Stack>
                            <Typography>부가서비스 이름</Typography>
                            <TextField sx={{ mr: 3 }} />
                            <FormControlLabel control={<Checkbox />} label="사용" />
                        </Stack>
                        <Stack>
                            <Typography>소개 문구</Typography>
                            <TextField fullWidth />
                        </Stack>
                        <Stack height={120}>
                            <Typography>요금 유형</Typography>
                            <Stack spacing={3}>
                                <RadioGroup defaultValue={0} row>
                                    <FormControlLabel value={0} control={<Radio />} label="정액" />
                                    <FormControlLabel value={1} control={<Radio />} label="종량" />
                                </RadioGroup>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Typography>노출 기간</Typography>
                            <TextField fullWidth />
                        </Stack>
                        <Stack>
                            <Typography>무료기간</Typography>
                            <TextField sx={{ mr: 1 }} />
                            <Typography>개월</Typography>
                        </Stack>
                        <Stack>
                            <Typography>요금</Typography>
                            <TextField sx={{ mr: 1 }} />
                            <Typography>원</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={3} justifyContent="center">
                        <Button color="_gray" onClick={() => setOpen(false)}>
                            닫기
                        </Button>
                        <Button onClick={() => setOpen(false)}>추가</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

const DiscountButton = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(true);
    }, []);
    return (
        <>
            <Button color="_gray" onClick={handleClick}>
                할인 추가
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography>할인 추가</Typography>
                    <Stack
                        sx={{
                            "&>div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3, height: "100%" },
                            "&>div": { flexDirection: "row", alignItems: "center" },
                        }}
                    >
                        <Stack>
                            <Typography>할인명</Typography>
                            <TextField sx={{ mr: 3 }} />
                            <FormControlLabel control={<Checkbox />} label="사용" />
                        </Stack>
                        <Stack>
                            <Typography>소개 문구</Typography>
                            <TextField fullWidth />
                        </Stack>
                        <Stack height={120}>
                            <Typography>할인 금액</Typography>
                            <Stack spacing={3}>
                                <RadioGroup defaultValue={0} row>
                                    <FormControlLabel value={0} control={<Radio />} label="비율" />
                                    <FormControlLabel value={1} control={<Radio />} label="금액" />
                                </RadioGroup>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <TextField fullWidth />
                                    <Typography>%</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Typography>할인 기간</Typography>
                            <TextField fullWidth />
                        </Stack>
                        <Stack>
                            <Typography>할인 반영 기간</Typography>
                            <Select></Select>
                        </Stack>
                        <Divider />
                        <Stack>
                            <Typography>할인 반영</Typography>
                            <TextField fullWidth />
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={3} justifyContent="center">
                        <Button color="_gray" onClick={() => setOpen(false)}>
                            닫기
                        </Button>
                        <Button onClick={() => setOpen(false)}>추가</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

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
                    <Button onClick={() => navigate(-1)}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const PlanUpdate = () => {
    return (
        <Stack spacing={3}>
            <PageTitle>요금제 수정</PageTitle>
            <PageCard spacing={3}>
                <Stack
                    sx={{
                        "&>div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3, height: "100%" },
                        "&>div": { flexDirection: "row", alignItems: "center" },
                    }}
                >
                    <Stack>
                        <Typography>요금제 이름</Typography>
                        <Stack flex={1} mr={3}>
                            <TextField fullWidth />
                        </Stack>
                        <FormControlLabel control={<Checkbox />} label="사용" />
                    </Stack>
                    <Stack>
                        <Typography>소개 문구</Typography>
                        <TextField fullWidth />
                    </Stack>
                    <Divider />
                    <Stack>
                        <Typography>가격</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <TextField fullWidth />
                            <Typography>원</Typography>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography>노출 기간</Typography>
                        <TextField fullWidth />
                    </Stack>
                    <Stack>
                        <Typography>할인</Typography>
                        <DiscountButton />
                    </Stack>
                    <Divider />
                    <Stack>
                        <Typography>옵션</Typography>
                        <Stack spacing={3} py={3} flex={1}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography>결과리포트 발송료</Typography>
                                <Stack direction="row" alignItems="center">
                                    <Typography>5,000원</Typography>
                                    <IconButton size="small">
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                </Stack>
                            </Stack>
                            <OptionButton />
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack>
                        <Typography>
                            기본사용료
                            <br />
                            (필수과금)
                        </Typography>
                        <FormControlLabel control={<Checkbox />} label="발송과금 월 정기결제" />
                        <IconButton size="small">
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>
                    <Divider />
                    <Stack>
                        <Typography>구독 단위</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography>기간</Typography>
                            <TextField />
                            <Select></Select>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography>이용 범위</Typography>
                        <Stack py={3} spacing={1}>
                            <FormControlLabel control={<Checkbox />} label="멤버수" />
                            <Stack direction="row" spacing={1}>
                                <TextField />
                                <Select></Select>
                                <TextField />
                                <Select></Select>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack>
                        <Typography>구독 조건</Typography>
                        <Stack py={3}>
                            <FormControlLabel control={<Checkbox />} label="기관" />
                            <FormControlLabel control={<Checkbox />} label="U2Check 회원" />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={3}>
                    <CancelButton />
                    <Button>저장</Button>
                </Stack>
            </PageCard>
        </Stack>
    );
};
