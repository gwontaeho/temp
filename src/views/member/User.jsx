import { useCallback, useState } from "react";
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
} from "@mui/material";
import { PageCard, PageTitle, CountCard } from "../../components";

const Row = () => {
    const navigate = useNavigate();
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
            callback: () => {},
        },
        1: {
            title: "회원 탈퇴",
            text: ["회원탈퇴시, 회원정보를 복구할 수 없습니다.", "U2Cloud에서 이메일 / 이름 님을 탈퇴하시겠습니까?"],
            callback: () => {},
        },
        2: {
            title: "사용 중지",
            text: ["U2Cloud에서 이메일 / 이름 님을 사용중지", "상태로 변경하시겠습니까"],
            callback: () => {},
        },
        3: {
            title: "데이터 파기",
            text: ["이메일 / 이름 님의 회원정보를 포함한 모든", "U2Cloud 이용기록을 파기하시겠습니까?"],
            callback: () => {},
        },
        4: {
            title: "사용 중지",
            text: ["U2Cloud에서 이메일 / 이름 님을 사용중지", "상태로 변경하시겠습니까"],
            callback: () => {},
        },
    };

    return (
        <>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox />
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
                <TableCell>
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
                    <Typography>비밀번호 확인</Typography>
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
                    <Typography>{types[type]["title"]}</Typography>
                    <Typography textAlign="center">
                        {types[type]["text"][0]}
                        <br />
                        {types[type]["text"][1]}
                    </Typography>
                    <Button sx={{ alignSelf: "center" }}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const User = () => {
    const navigate = useNavigate();
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
                            <Typography>등록일시</Typography>
                        </Stack>
                        <Stack>
                            <Typography>검색어</Typography>
                            <Select></Select>
                            <TextField fullWidth />
                            <Button>검색</Button>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>전체 3</Typography>
                        <Stack direction="row" spacing={1}>
                            <Button color="_gray">회원 탈퇴</Button>
                            <Button>알림 발송</Button>
                            <Button>회원 등록</Button>
                            <Button>엑셀</Button>
                        </Stack>
                    </Stack>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead bgColor="#eee">
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox />
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
                                {[0, 1, 2].map((v) => {
                                    return <Row key={v} />;
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </PageCard>
        </Stack>
    );
};
