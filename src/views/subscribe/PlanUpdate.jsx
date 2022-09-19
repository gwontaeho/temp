import { useCallback, useState, useReducer, useRef } from "react";
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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit as EditIcon, Close as CloseIcon, ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { PageCard, PageTitle } from "../../components";

const initialState = { title: "", intro: "", price: "", terms: "" };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setTitle": {
            return { ...state, title: payload };
        }
        case "setIntro": {
            return { ...state, intro: payload };
        }
        case "setPrice": {
            const reg = /^\d*$/g;
            if (reg.test(payload)) return { ...state, price: payload };
            return { ...state };
        }
        case "setTerms": {
            const reg = /^\d*$/g;
            if (reg.test(payload)) return { ...state, terms: payload };
            return { ...state };
        }
        default:
            return { ...state };
    }
};

const OptionButton = ({ update }) => {
    const navigate = useNavigate();

    const [type, setType] = useState(0);
    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(true);
    }, []);
    return (
        <>
            {update ? (
                <IconButton size="small" onClick={handleClick}>
                    <EditIcon fontSize="inherit" />
                </IconButton>
            ) : (
                <Button color="_gray" onClick={handleClick} sx={{ alignSelf: "flex-start" }}>
                    부가서비스 추가
                </Button>
            )}

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>{update ? "부가서비스 수정" : "부가서비스 추가"}</Typography>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>

                    <Stack
                        sx={{
                            "&>div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3, height: "100%" },
                            "&>div": { flexDirection: "row", alignItems: "center" },
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
                                <RadioGroup defaultValue={0} value={type} onChange={(e) => setType(e.target.value)} row>
                                    <FormControlLabel value={0} control={<Radio />} label="정액" />
                                    <FormControlLabel value={1} control={<Radio />} label="종량" />
                                </RadioGroup>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Typography>노출 기간</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                                <Typography>~</Typography>
                                <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                            </Stack>
                        </Stack>
                        {type == 1 && (
                            <Stack>
                                <Typography alignSelf="flex-start">요금</Typography>
                                <TableContainer>
                                    <Table>
                                        <TableHead bgColor="#eee">
                                            <TableRow>
                                                <TableCell>항목</TableCell>
                                                <TableCell>단위</TableCell>
                                                <TableCell>요금</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>SMS</TableCell>
                                                <TableCell>건당</TableCell>
                                                <TableCell>10</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>LMS</TableCell>
                                                <TableCell>건당</TableCell>
                                                <TableCell>120</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>카카오 알림톡</TableCell>
                                                <TableCell>건당</TableCell>
                                                <TableCell>12</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Stack>
                        )}
                        {type == 0 && (
                            <>
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
                            </>
                        )}
                    </Stack>
                    <Stack direction="row" spacing={3} justifyContent="center">
                        <Button onClick={() => setOpen(false)}>추가</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

const disState = { price: "" };
const disReducer = (state, { type, payload }) => {
    switch (type) {
        case "setPrice":
            const reg = /^\d*$/g;
            if (reg.test(payload)) return { ...state, price: payload };
            return { ...state };
        default:
            return { ...state };
    }
};

const DiscountButton = ({ update }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(disReducer, disState);
    const { price } = state;

    const [disOption, setDisOption] = useState(0);

    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(true);
    }, []);
    return (
        <>
            {update ? (
                <IconButton size="small" onClick={handleClick}>
                    <EditIcon fontSize="inherit" />
                </IconButton>
            ) : (
                <Button color="_gray" onClick={handleClick} sx={{ alignSelf: "flex-start" }}>
                    할인 추가
                </Button>
            )}

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>{update ? "할인 수정" : "할인 추가"}</Typography>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
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
                                <RadioGroup value={disOption} onChange={(e) => setDisOption(e.target.value)} row>
                                    <FormControlLabel value={0} control={<Radio />} label="비율" />
                                    <FormControlLabel value={1} control={<Radio />} label="금액" />
                                </RadioGroup>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <TextField value={price} onChange={(e) => dispatch({ type: "setPrice", payload: e.target.value })} fullWidth />
                                    <Typography>{disOption == 0 ? "%" : "원"}</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Typography>할인 기간</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                                <Typography>~</Typography>
                                <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                            </Stack>
                        </Stack>
                        <Stack>
                            <Typography>할인 반영 기간</Typography>
                            <Select defaultValue={0}>
                                <MenuItem value={0}>개월</MenuItem>
                                <MenuItem value={1}>년</MenuItem>
                                <MenuItem value={2}>분기</MenuItem>
                            </Select>
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

const DeleteButton = ({ type }) => {
    // type 0: 할인 1: 부가서비스
    const [open, setOpen] = useState(false);
    return (
        <>
            <IconButton size="small" onClick={() => setOpen(true)}>
                <CloseIcon fontSize="inherit" />
            </IconButton>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3} alignItems="center">
                    <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                    <Typography textAlign="center">~을 삭제하시겠습니까?</Typography>
                    <Button onClick={() => setOpen(false)}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

const SubmitButton = ({ state, refs }) => {
    const { title, intro, price, terms } = state;
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleClick = useCallback(() => {
        if (!terms) refs.current[3].focus();
        if (!price) refs.current[2].focus();
        if (!intro) refs.current[1].focus();
        if (!title) refs.current[0].focus();
        if (!title || !intro || !price || !terms) return setOpen(true);
        setOpen2(true);
    }, [state, refs]);

    const handleClickSubmit = useCallback(() => {
        navigate("/subscribe/app");
    }, []);

    return (
        <>
            <Button onClick={handleClick}>저장</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3} alignItems="center">
                    <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                    <Typography textAlign="center">입력하신 정보를 다시 확인해주세요</Typography>
                    <Button onClick={() => setOpen(false)}>확인</Button>
                </Stack>
            </Dialog>
            <Dialog open={open2} onClose={() => setOpen2(false)} fullWidth>
                <Stack p={3} spacing={3} alignItems="center">
                    <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen2(false)}>
                        <CloseIcon />
                    </IconButton>
                    <Typography textAlign="center">입력된 내용으로 요금제를 추가하시겠습니까?</Typography>
                    <Stack direction="row" spacing={3}>
                        <Button onClick={handleClickSubmit}>확인</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

const Usage = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <IconButton size="small" onClick={() => setOpen(true)}>
                <EditIcon fontSize="inherit" />
            </IconButton>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>사용요금 수정</Typography>
                        <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <Typography minWidth={120}>사용요금 이름</Typography>
                        <TextField fullWidth />
                        <Checkbox />
                        <Typography minWidth={30}>필수</Typography>
                    </Stack>
                    <Stack direction="row">
                        <Typography minWidth={120}>소개 문구</Typography>
                        <TextField fullWidth />
                    </Stack>
                    <Stack direction="row">
                        <Typography minWidth={120}>요금</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead bgColor="#eee">
                                    <TableRow>
                                        <TableCell>항목</TableCell>
                                        <TableCell>단위</TableCell>
                                        <TableCell>요금</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[0, 1].map((v) => {
                                        return (
                                            <TableRow>
                                                <TableCell>요금제</TableCell>
                                                <TableCell>금액</TableCell>
                                                <TableCell>10</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                    <Stack direction="row" justifyContent="center" spacing={3}>
                        <Button onClick={() => setOpen(false)}>저장</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

export const PlanUpdate = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { title, intro, price, terms } = state;

    const refs = useRef([]);

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center">
                <IconButton onClick={() => navigate(-1)}>
                    <ChevronLeftIcon />
                </IconButton>
                <PageTitle>요금제 수정</PageTitle>
            </Stack>

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
                            <TextField
                                inputRef={(ref) => (refs.current[0] = ref)}
                                value={title}
                                onChange={(e) => dispatch({ type: "setTitle", payload: e.target.value })}
                                fullWidth
                                inputProps={{ maxLength: 30 }}
                            />
                        </Stack>
                        <FormControlLabel control={<Checkbox />} label="사용" />
                    </Stack>
                    <Stack>
                        <Typography>소개 문구</Typography>
                        <TextField
                            inputRef={(ref) => (refs.current[1] = ref)}
                            value={intro}
                            onChange={(e) => dispatch({ type: "setIntro", payload: e.target.value })}
                            fullWidth
                            inputProps={{ maxLength: 30 }}
                        />
                    </Stack>
                    <Divider />
                    <Stack>
                        <Typography>가격</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <TextField
                                inputRef={(ref) => (refs.current[2] = ref)}
                                value={price}
                                onChange={(e) => dispatch({ type: "setPrice", payload: e.target.value })}
                                fullWidth
                            />
                            <Typography>원</Typography>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography>노출 기간</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                            <Typography>~</Typography>
                            <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography>할인</Typography>
                        <Stack py={3} spacing={3}>
                            <DiscountButton />
                            <Stack direction="row" spacing={3} alignItems="center">
                                <Typography>첫달 프로모션 할인</Typography>
                                <Typography>2022.02.02 ~ 2022.02.02</Typography>
                                <Stack direction="row">
                                    <DiscountButton update={true} />
                                    <DeleteButton type={0} />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack>
                        <Typography>부가서비스</Typography>
                        <Stack py={3} spacing={3}>
                            <OptionButton />
                            <Stack direction="row" spacing={3} alignItems="center">
                                <Typography>결과 리포트 수신 발송료</Typography>
                                <Typography>2022.02.02 ~ 2022.02.02</Typography>
                                <Stack direction="row">
                                    <OptionButton update={true} />
                                    <DeleteButton type={1} />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography>사용요금</Typography>
                        <Typography>발송과금 월 정기결제</Typography>
                        <Usage />
                    </Stack>
                    <Divider />
                    <Stack>
                        <Typography>구독 단위</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography>기간</Typography>
                            <TextField
                                inputRef={(ref) => (refs.current[3] = ref)}
                                value={terms}
                                onChange={(e) => dispatch({ type: "setTerms", payload: e.target.value })}
                            />
                            <Select defaultValue={0}>
                                <MenuItem value={0}>개월</MenuItem>
                                <MenuItem value={1}>년</MenuItem>
                                <MenuItem value={2}>분기</MenuItem>
                            </Select>
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
                    <SubmitButton state={state} refs={refs} />
                </Stack>
            </PageCard>
        </Stack>
    );
};
