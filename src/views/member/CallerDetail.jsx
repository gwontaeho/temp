import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Dialog, Stack, Button, Chip, TextField, Snackbar } from "@mui/material";
import { PageCard, PageTitle } from "../../components";

const PendingButton = () => {
    const [open, setOpen] = useState(false);
    const [toast, setToast] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(false);
        setToast(true);
    }, []);
    return (
        <>
            <Button onClick={() => setOpen(true)}>등록보류</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3}>
                    <Typography>등록 보류</Typography>
                    <TextField multiline rows={3} placeholder="등록보류 사유를 작성해주세요" />
                    <Button sx={{ alignSelf: "center" }} onClick={handleClick}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
            <Snackbar
                open={toast}
                autoHideDuration={3000}
                message="email 님의 발신번호가 등록보류되었습니다."
                onClose={() => setToast(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            />
        </>
    );
};

const CompleteButton = () => {
    const [open, setOpen] = useState(false);
    const [toast, setToast] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(false);
        setToast(true);
    }, []);

    return (
        <>
            <Button onClick={() => setOpen(true)}>등록완료</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3}>
                    <Typography>등록 완료</Typography>
                    <Typography textAlign="center">1577-1444 를 발신번호로 등록하시겠습니까?</Typography>
                    <Button sx={{ alignSelf: "center" }} onClick={handleClick}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
            <Snackbar
                open={toast}
                autoHideDuration={3000}
                message="email 님의 발신번호가 등록완료되었습니다."
                onClose={() => setToast(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            />
        </>
    );
};

export const CallerDetail = () => {
    const navigate = useNavigate();

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
                        <Typography>기관정보</Typography>
                        <Stack direction="row">
                            <Stack
                                sx={{
                                    flex: 1,
                                    ">div": {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 3,

                                        ">:first-child": {
                                            minWidth: 180,
                                            bgcolor: "_bg.main",
                                            p: 3,
                                        },
                                    },
                                }}
                            >
                                <Stack>
                                    <Typography>기관명</Typography>
                                    <Typography>유튜바이오</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>대표자 이름</Typography>
                                    <Typography>관리자</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>발신번호</Typography>
                                    <Stack direction="row" alignItems="center" spacing={3}>
                                        <Typography>1577-1338</Typography>
                                        <Chip label="사용중" />
                                    </Stack>
                                </Stack>
                                <Stack>
                                    <Typography>요양기관번호</Typography>
                                    <Typography>11</Typography>
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
                                            minWidth: 180,
                                            bgcolor: "_bg.main",
                                            p: 3,
                                        },
                                    },
                                }}
                            >
                                <Stack>
                                    <Typography>사업자등록번호</Typography>
                                    <Typography>123-123-1231</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>주소</Typography>
                                    <Typography>서울특별시 거마로 65 여명빌딩 유투바이오</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>U2Check 연계</Typography>
                                    <Typography>인증 완료 (ID: Supervisor)</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>기관등록일</Typography>
                                    <Typography>2022.02.02</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography>발신번호 정보</Typography>
                        <Stack direction="row">
                            <Stack
                                sx={{
                                    ">div": {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 3,
                                        ">:first-child": {
                                            minWidth: 180,
                                            bgcolor: "_bg.main",
                                            p: 2,
                                        },
                                    },
                                }}
                            >
                                <Stack>
                                    <Typography>발신번호 명의자</Typography>
                                    <Typography>대표자 본인</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>발신번호</Typography>
                                    <Typography>1577-1338</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>등록요청일</Typography>
                                    <Typography>2022.02.02</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>상태</Typography>
                                    <Typography>등록요청</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack spacing={1}>
                        <Typography>인증 서류</Typography>
                        <Stack direction="row">
                            <Stack
                                sx={{
                                    ">div": {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 3,
                                        ">:first-child": {
                                            minWidth: 180,
                                            bgcolor: "_bg.main",
                                            p: 2,
                                        },
                                    },
                                }}
                            >
                                <Stack>
                                    <Typography>통신서비스 이용 증명원</Typography>
                                    <Typography>-</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>사업자 등록증</Typography>
                                    <Typography>-</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>위임장</Typography>
                                    <Typography>-</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>대리인 신분증 사본</Typography>
                                    <Typography>-</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>대리인 재직증명서</Typography>
                                    <Typography>-</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={3} justifyContent="center">
                        <PendingButton />
                        <Button>심사중</Button>
                        <CompleteButton />
                    </Stack>
                </PageCard>
            </Stack>
        </>
    );
};
