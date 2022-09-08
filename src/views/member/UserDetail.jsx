import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Dialog, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Select, Chip } from "@mui/material";
import { PageCard, PageTitle } from "../../components";

export const UserDetail = () => {
    const navigate = useNavigate();

    const [openPWCheck, setOpenPWCheck] = useState(false);
    const [openCallbackDialog, setOpenCallbackDialog] = useState(false);
    const [type, setType] = useState(0);

    const handleClickButton = useCallback((type) => {
        setOpenPWCheck(true);
        setType(type);
    }, []);

    const handleClickCheck = useCallback(() => {
        setOpenPWCheck(false);
        setOpenCallbackDialog(true);
    }, []);

    const types = {
        0: {
            title: "사용 중지",
            text: ["U2Cloud에서 이메일 / 이름 님을 사용중지", "상태로 변경하시겠습니까"],
            callback: () => {},
        },
        1: {
            title: "회원 탈퇴",
            text: ["회원탈퇴시, 회원정보를 복구할 수 없습니다.", "U2Cloud에서 이메일 / 이름 님을 탈퇴하시겠습니까?"],
            callback: () => {},
        },
        2: {
            title: "회원 비밀번호 초기화",
            text: ["이메일 / 이름 님의 비밀번호를", "초기화히시겠습니까?"],
            callback: () => {},
        },
        3: {
            title: "데이터 파기",
            text: ["이메일 / 이름 님의 회원정보를 포함한 모든", "U2Cloud 이용기록을 파기하시겠습니까?"],
            callback: () => {},
        },
    };

    return (
        <>
            <Stack spacing={3}>
                <PageTitle>회원 정보</PageTitle>
                <PageCard spacing={5}>
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Typography>홍길동</Typography>
                        <Typography>email@email.com</Typography>
                        <Chip label="정상" />
                    </Stack>

                    <Stack spacing={1}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography>회원 상세 정보</Typography>
                            <Stack direction="row" spacing={1}>
                                <Button color="_gray" onClick={() => handleClickButton(0)}>
                                    사용중지
                                </Button>
                                <Button color="_gray" onClick={() => handleClickButton(1)}>
                                    회원탈퇴
                                </Button>
                                <Button color="_gray" onClick={() => handleClickButton(3)}>
                                    데이터 파기
                                </Button>
                            </Stack>
                        </Stack>
                        <Stack direction="row">
                            <Stack
                                sx={{
                                    ">div": {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 3,
                                        ">:first-child": {
                                            minWidth: 160,
                                            bgcolor: "_bg.main",
                                            p: 2,
                                        },
                                    },
                                }}
                            >
                                <Stack>
                                    <Typography>이름</Typography>
                                    <Typography>홍길동</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>이메일</Typography>
                                    <Typography>email@email.com</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>비밀번호</Typography>
                                    <Button color="_gray" onClick={() => handleClickButton(2)}>
                                        비밀번호 초기화
                                    </Button>
                                </Stack>
                                <Stack>
                                    <Typography>휴대전화</Typography>
                                    <Typography>010-1234-1234</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>기관</Typography>
                                    <Typography>유투바이오</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>역할</Typography>
                                    <Typography>관리자</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>동의</Typography>
                                    <Typography>마케팅 동의</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>가입일</Typography>
                                    <Typography>2022.02.02</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>최종 로그인</Typography>
                                    <Typography>2022.02.02</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>상태</Typography>
                                    <Typography>정상</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography>탈퇴 정보</Typography>
                        <Stack direction="row">
                            <Stack
                                sx={{
                                    ">div": {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 3,
                                        ">:first-child": {
                                            minWidth: 160,
                                            bgcolor: "_bg.main",
                                            p: 2,
                                        },
                                    },
                                }}
                            >
                                <Stack>
                                    <Typography>탈퇴상태</Typography>
                                    <Typography>탈퇴완료</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>신청일시</Typography>
                                    <Typography>2022-05-14 09:33</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>탈퇴사유</Typography>
                                    <Typography>퇴사</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>내용</Typography>
                                    <Typography>2022.02.02 퇴사완료</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>탈퇴일시</Typography>
                                    <Typography>2022-05-15 02:33</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography>휴면 정보</Typography>
                        <Stack direction="row">
                            <Stack
                                sx={{
                                    ">div": {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 3,
                                        ">:first-child": {
                                            minWidth: 160,
                                            bgcolor: "_bg.main",
                                            p: 2,
                                        },
                                    },
                                }}
                            >
                                <Stack>
                                    <Typography>휴면상태</Typography>
                                    <Typography>휴면</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>휴면전환일</Typography>
                                    <Typography>2022-05-14 09:53</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography>체험 정보</Typography>
                        <Stack direction="row">
                            <Stack
                                sx={{
                                    ">div": {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 3,
                                        ">:first-child": {
                                            minWidth: 160,
                                            bgcolor: "_bg.main",
                                            p: 2,
                                        },
                                    },
                                }}
                            >
                                <Stack>
                                    <Typography>체험 서비스</Typography>
                                    <Typography>U2알리미</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>이용건수/크레딧</Typography>
                                    <Typography>15/200</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>체험기간</Typography>
                                    <Typography>2022.02.02 ~ 2022.02.02</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>상태</Typography>
                                    <Typography>체험중</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography>구독 정보</Typography>
                        <TableContainer>
                            <Table sx={{ minWidth: 800 }}>
                                <TableHead bgColor="#eee">
                                    <TableRow>
                                        <TableCell>구독 서비스(요금제)</TableCell>
                                        <TableCell>이용기간</TableCell>
                                        <TableCell>누적 결제금액</TableCell>
                                        <TableCell>미납금</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[0].map((v) => {
                                        return (
                                            <TableRow key={v} onClick={() => navigate("/member/user/detail")}>
                                                <TableCell>U2알리미(정기결제)</TableCell>
                                                <TableCell>2022.01.01 ~ 2022.01.01</TableCell>
                                                <TableCell>15,000원</TableCell>
                                                <TableCell>12,000원</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </PageCard>
            </Stack>

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
                    <Button sx={{ alignSelf: "center" }} onClick={types[type]["callback"]}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
};
