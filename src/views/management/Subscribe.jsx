import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, IconButton } from "@mui/material";

import { ViewTitle } from "../../components/";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const CloseButton = ({ setOpen }) => {
    const [alert, setAlert] = useState(false);

    const handleClick = useCallback(() => {
        setAlert(false);
        setOpen(false);
    }, []);
    return (
        <>
            <IconButton onClick={() => setAlert(true)}>
                <CloseOutlinedIcon />
            </IconButton>
            <Dialog open={alert} onClose={() => setAlert(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3}>
                    <Typography textAlign="center">작성된 내용이 삭제됩니다. 취소하시겠습니까?</Typography>
                    <Button sx={{ alignSelf: "center" }} onClick={handleClick}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
};

const Update = ({ open, setOpen }) => {
    const [alert, setAlert] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(false);
        setAlert(false);
    }, []);
    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <Stack p={3} spacing={3}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography fontWeight="bold">멤버 이용권한 수정</Typography>
                        <CloseButton setOpen={setOpen} />
                    </Stack>
                    <TableContainer>
                        <Table sx={{ minWidth: 500 }}>
                            <TableHead bgcolor="#f2f3f7">
                                <TableRow>
                                    <TableCell align="center">No</TableCell>
                                    <TableCell align="center">이름</TableCell>
                                    <TableCell align="center">이메일</TableCell>
                                    <TableCell align="center">역할</TableCell>
                                    <TableCell padding="checkbox" align="center">
                                        <Checkbox />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2, 3, 4, 5].map((v) => {
                                    return (
                                        <TableRow key={v}>
                                            <TableCell align="center">이름</TableCell>
                                            <TableCell align="center">이름</TableCell>
                                            <TableCell align="center">이메일</TableCell>
                                            <TableCell align="center">휴대전화</TableCell>
                                            <TableCell padding="checkbox" align="center">
                                                <Checkbox />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button variant="contained" sx={{ alignSelf: "flex-end" }} onClick={() => setAlert(true)}>
                        수정
                    </Button>
                </Stack>
            </Dialog>
            <Dialog open={alert} onClose={() => setAlert(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3}>
                    <Typography fontWeight="bold">멤버 이용권한 수정 확인</Typography>
                    <Stack alignItems="center">
                        <Typography>멤버 2명의 U2알리미 서비스 이용권한을 해지합니다.</Typography>
                        <Typography>멤버 10명의 U2알리미 이용권한을 수정하시겠습니까?</Typography>
                    </Stack>
                    <Button sx={{ alignSelf: "center" }} onClick={handleClick}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const Subscribe = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                    <ViewTitle icon="subscribe" title="멤버 이용현황" />
                </Stack>
                <Stack spacing={5}>
                    <Stack spacing={3}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography fontWeight="bold">구독 현황</Typography>
                            <Button variant="contained" onClick={() => navigate("/subscribe/list/create")}>
                                구독 수정
                            </Button>
                        </Stack>
                        <Stack bgcolor="#fff" borderRadius={3} p={3}>
                            <TableContainer>
                                <Table sx={{ minWidth: 600, overflow: "auto" }}>
                                    <TableHead bgcolor="#f2f3f7">
                                        <TableRow>
                                            <TableCell>서비스명</TableCell>
                                            <TableCell>요금제명</TableCell>
                                            <TableCell>이용멤버</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {[0, 1, 2].map((v) => {
                                            return (
                                                <TableRow key={v}>
                                                    <TableCell>이메일</TableCell>
                                                    <TableCell>회원명</TableCell>
                                                    <TableCell>휴대전화</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </Stack>
                    <Stack spacing={3}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography fontWeight="bold">멤버별 이용현황</Typography>
                            <Button variant="contained" onClick={() => setOpen(true)}>
                                이용권한 수정
                            </Button>
                        </Stack>
                        <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={3}>
                            <Typography variant="body2">전체 10건</Typography>
                            <TableContainer>
                                <Table sx={{ minWidth: 600 }}>
                                    <TableHead bgcolor="#f2f3f7">
                                        <TableRow>
                                            <TableCell align="center" colSpan={3}>
                                                멤버
                                            </TableCell>
                                            <TableCell align="center" colSpan={2}>
                                                U2알리미
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell align="center">이름</TableCell>
                                            <TableCell align="center">이메일</TableCell>
                                            <TableCell align="center">U2Check x 정기결제</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {[0, 1, 2].map((v) => {
                                            return (
                                                <TableRow key={v}>
                                                    <TableCell padding="checkbox">
                                                        <Checkbox />
                                                    </TableCell>
                                                    <TableCell align="center">이름</TableCell>
                                                    <TableCell align="center">이메일</TableCell>
                                                    <TableCell align="center">v</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            <Update open={open} setOpen={setOpen} />
        </>
    );
};
