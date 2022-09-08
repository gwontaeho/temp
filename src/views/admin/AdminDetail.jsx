import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Dialog, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Select, Chip } from "@mui/material";
import { PageCard, PageTitle } from "../../components";

const UpdateButton = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button color="_gray" onClick={() => setOpen(true)}>
                수정
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography>운영자 정보 수정</Typography>
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
                            <TextField fullWidth />
                        </Stack>
                        <Stack>
                            <Typography>소속</Typography>
                            <TextField fullWidth />
                        </Stack>
                    </Stack>
                    <Button sx={{ alignSelf: "center" }}>수정</Button>
                </Stack>
            </Dialog>
        </>
    );
};

const ResetButton = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button color="_gray" onClick={() => setOpen(true)}>
                비밀번호 초기화
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3}>
                    <Typography>운영자 비밀번호 초기화</Typography>
                    <Typography textAlign="center">
                        ~ 이메일 ~ 님의 비밀번호를
                        <br />
                        초기화하시겠습니까?
                    </Typography>
                    <Button sx={{ alignSelf: "center" }}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

const WithdrawalButton = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button color="_gray" onClick={() => setOpen(true)}>
                탈퇴
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3}>
                    <Typography>운영자 탈퇴</Typography>
                    <Typography textAlign="center">
                        U2Cloud Admin 에서
                        <br />
                        ~이메일 ~이름 님을 탈퇴하시겠습니까?
                    </Typography>
                    <Button sx={{ alignSelf: "center" }}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

const DeleteButton = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button color="_gray" onClick={() => setOpen(true)}>
                데이터 파기
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3}>
                    <Typography>운영자 탈퇴</Typography>
                    <Typography textAlign="center">
                        ~이메일 ~이름 님의 회원정보를 포함한 모든
                        <br />
                        U2Cloud admin 이용기록을 파기하시겠습니까?
                    </Typography>
                    <Button sx={{ alignSelf: "center" }}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

const DormancyButton = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button color="_gray" onClick={() => setOpen(true)}>
                휴면해제
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3}>
                    <Typography>휴면 해제</Typography>
                    <Typography textAlign="center">~이메일 ~이름 님을 휴면해제 하시겠습니까?</Typography>
                    <Button sx={{ alignSelf: "center" }}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const AdminDetail = () => {
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

    return (
        <Stack spacing={3}>
            <PageTitle>운영자 회원 정보</PageTitle>
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
                            <UpdateButton />
                            <WithdrawalButton />
                            <DeleteButton />
                            <DormancyButton />
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
                                <Typography>이메일</Typography>
                                <Typography>email@email.com</Typography>
                            </Stack>
                            <Stack>
                                <Typography>비밀번호</Typography>
                                <ResetButton />
                            </Stack>
                            <Stack>
                                <Typography>이름</Typography>
                                <Typography>홍길동</Typography>
                            </Stack>
                            <Stack>
                                <Typography>소속</Typography>
                                <Typography>솔루션팀</Typography>
                            </Stack>
                            <Stack>
                                <Typography>가입일</Typography>
                                <Typography>2022-05-06</Typography>
                            </Stack>
                            <Stack>
                                <Typography>상태</Typography>
                                <Typography>사용중</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </PageCard>
        </Stack>
    );
};
