import { useCallback, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    Typography,
    Stack,
    Menu,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Select,
    Checkbox,
    IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { openToast } from "../../redux/features/toast/toastSlice";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { PageCard, PageTitle, CountCard } from "../../components";
import { Close as CloseIcon } from "@mui/icons-material";

const initialState = { checked: [false, false, false] };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setChecked": {
            const { checked, index } = payload;
            const newChecked = [...state.checked];
            newChecked[index] = checked;
            return { ...state, checked: newChecked };
        }
        case "setAllChecked": {
            const newChecked = [...state.checked].map((v) => (v = payload));
            return { ...state, checked: newChecked };
        }
        default:
            return { ...state };
    }
};

const WithdrawalButton = (props) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(false);
        dispatch(openToast("U2CLoud에서 ~님이 탈퇴되었습니다."));
    };
    return (
        <>
            <Button color="_gray" onClick={() => setOpen(true)} {...props}>
                회원 탈퇴
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography>회원 탈퇴</Typography>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Typography textAlign="center">
                        회원탈퇴시, 회원정보를 복구할 수 없습니다.
                        <br />
                        U2Cloud에서 ~님을 탈퇴하시겠습니까?
                    </Typography>
                    <Button sx={{ alignSelf: "center" }} onClick={handleClick}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
};

const Row = ({ state, dispatch, index }) => {
    const reduxDispatch = useDispatch();
    const navigate = useNavigate();

    const { checked } = state;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [openPWCheck, setOpenPWCheck] = useState(false);
    const [openCallbackDialog, setOpenCallbackDialog] = useState(false);
    const [type, setType] = useState(0);

    const handleClickItem = useCallback((type) => {
        setOpenPWCheck(true);
        setType(type);
        setAnchorEl(null);
    }, []);

    const handleClickCheck = useCallback(() => {
        setOpenPWCheck(false);
        setOpenCallbackDialog(true);
    }, []);

    const types = {
        0: {
            title: "회원 비밀번호 초기화",
            text: ["이메일 / 이름 님의 비밀번호를", "초기화히시겠습니까?"],
            callback: () => {
                setOpenCallbackDialog(false);
                reduxDispatch(openToast("~님의 비밀번호 초기화 안내메일이 발송 되었습니다."));
            },
        },
        1: {
            title: "회원 탈퇴",
            text: ["회원탈퇴시, 회원정보를 복구할 수 없습니다.", "U2Cloud에서 이메일 / 이름 님을 탈퇴하시겠습니까?"],
            callback: () => {
                setOpenCallbackDialog(false);
                reduxDispatch(openToast("U2CLoud에서 ~님이 탈퇴되었습니다."));
            },
        },
        2: {
            title: "사용 중지",
            text: ["U2Cloud에서 이메일 / 이름 님을 사용중지", "상태로 변경하시겠습니까"],
            callback: () => {
                setOpenCallbackDialog(false);
                reduxDispatch(openToast("~님이 사용중지로 변경 되었습니다."));
            },
        },
        3: {
            title: "데이터 파기",
            text: ["이메일 / 이름 님의 회원정보를 포함한 모든", "U2Cloud 이용기록을 파기하시겠습니까?"],
            callback: () => {
                setOpenCallbackDialog(false);
                reduxDispatch(openToast("~님의 회원정보를 포함한 모든 U2Cloud 이용기록이 파기되었습니다."));
            },
        },
        4: {
            title: "?",
            text: ["기획없음", "기획없음"],
            callback: () => {
                setOpenCallbackDialog(false);
                reduxDispatch(openToast("~님이 사용중으로 변경 되었습니다."));
            },
        },
    };

    return (
        <>
            <TableRow
                onClick={() => navigate("/member/user/detail")}
                sx={{
                    ":hover": {
                        bgcolor: "#eee",
                    },
                }}
            >
                <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                    <Checkbox checked={checked[index]} onChange={(e) => dispatch({ type: "setChecked", payload: { checked: e.target.checked, index } })} />
                </TableCell>
                <TableCell>이메일</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>휴대전화</TableCell>
                <TableCell>기관명</TableCell>
                <TableCell>역할</TableCell>
                <TableCell>소속회원</TableCell>
                <TableCell>마케팅</TableCell>
                <TableCell>가입일</TableCell>
                <TableCell>최종 로그인</TableCell>
                <TableCell>구독</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button onClick={(e) => setAnchorEl(e.currentTarget)}>더보기</Button>
                    <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                        <MenuItem onClick={() => navigate("/member/user/detail")}>회원정보</MenuItem>
                        <MenuItem onClick={() => handleClickItem(0)}>비밀번호 초기화</MenuItem>
                        <MenuItem onClick={() => handleClickItem(1)}>회원탈퇴</MenuItem>
                        <MenuItem onClick={() => handleClickItem(2)}>사용중지</MenuItem>
                        <MenuItem onClick={() => handleClickItem(3)}>데이터 파기</MenuItem>
                        <MenuItem onClick={() => handleClickItem(4)}>사용중 변경</MenuItem>
                    </Menu>
                </TableCell>
            </TableRow>
            <Dialog open={openPWCheck} onClose={() => setOpenPWCheck(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>비밀번호 확인</Typography>
                        <IconButton onClick={() => setOpenPWCheck(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <Typography sx={{ minWidth: 160, bgcolor: "_bg.main", p: 3, mr: 3 }}>비밀번호</Typography>
                        <TextField fullWidth type="password" />
                    </Stack>
                    <Button sx={{ alignSelf: "center" }} onClick={handleClickCheck}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
            <Dialog open={openCallbackDialog} onClose={() => setOpenCallbackDialog(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>{types[type]["title"]}</Typography>
                        <IconButton onClick={() => setOpenCallbackDialog(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Typography textAlign="center">
                        {types[type]["text"][0]}
                        <br />
                        {types[type]["text"][1]}
                    </Typography>
                    <Button sx={{ alignSelf: "center" }} onClick={types[type]["callback"]}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const User = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { checked } = state;

    return (
        <Stack spacing={3}>
            <PageTitle>회원 관리</PageTitle>
            <PageCard spacing={5}>
                <Stack spacing={3}>
                    <Stack direction="row" spacing={1}>
                        <CountCard label="전체" count="100" />
                        <CountCard label="사용중" count="100" />
                        <CountCard label="가입대기" count="100" />
                        <CountCard label="휴면" count="100" />
                        <CountCard label="탈퇴신청" count="100" />
                        <CountCard label="탈퇴" count="100" />
                        <CountCard label="사용중지" count="100" />
                    </Stack>
                    <Stack
                        sx={{
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
                            <Typography>기간</Typography>
                            <Select defaultValue={0} sx={{ minWidth: 120 }}>
                                <MenuItem value={0}>전체</MenuItem>
                                <MenuItem value={1}>가입일</MenuItem>
                                <MenuItem value={2}>최종로그인</MenuItem>
                            </Select>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                                <Typography>~</Typography>
                                <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                            </Stack>
                        </Stack>
                        <Stack>
                            <Typography>검색어</Typography>
                            <Select defaultValue={0} sx={{ minWidth: 120 }}>
                                <MenuItem value={0}>전체</MenuItem>
                                <MenuItem value={1}>회원명</MenuItem>
                                <MenuItem value={2}>이메일</MenuItem>
                                <MenuItem value={3}>휴대전화</MenuItem>
                                <MenuItem value={4}>기관명</MenuItem>
                            </Select>
                            <TextField fullWidth />
                            <Button>검색</Button>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>전체 3</Typography>
                        <Stack direction="row" spacing={1}>
                            <WithdrawalButton disabled={checked.every((v) => v === false)} />
                            <Button disabled={checked.every((v) => v === false)}>알림 발송</Button>
                            <Button>엑셀</Button>
                        </Stack>
                    </Stack>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead bgColor="#eee">
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={checked.every((v) => v === true)}
                                            onChange={(e) => dispatch({ type: "setAllChecked", payload: e.target.checked })}
                                        />
                                    </TableCell>
                                    <TableCell>이메일</TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>휴대전화</TableCell>
                                    <TableCell>기관명</TableCell>
                                    <TableCell>역할</TableCell>
                                    <TableCell>소속회원</TableCell>
                                    <TableCell>마케팅</TableCell>
                                    <TableCell>가입일</TableCell>
                                    <TableCell>최종 로그인</TableCell>
                                    <TableCell>구독</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v, i) => {
                                    return <Row key={v} state={state} dispatch={dispatch} index={i} />;
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </PageCard>
        </Stack>
    );
};
