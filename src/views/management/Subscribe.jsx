import { useNavigate } from "react-router-dom";
import { Typography, Stack, Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const Subscribe = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="h6">멤버 구독</Typography>
            </Stack>
            <Stack spacing={5}>
                <Stack spacing={3}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography fontWeight="bold">구독 현황</Typography>
                        <Button variant="contained" size="small">
                            구독 수정
                        </Button>
                    </Stack>
                    <Stack bgcolor="#fff" borderRadius={3} p={3}>
                        <TableContainer>
                            <Table sx={{ minWidth: 600 }}>
                                <TableHead bgColor="#f2f3f7">
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
                        <Button variant="contained" size="small">
                            이용권한 수정
                        </Button>
                    </Stack>
                    <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={3}>
                        <Typography variant="body2">전체 10건</Typography>
                        <TableContainer>
                            <Table sx={{ minWidth: 600 }}>
                                <TableHead bgColor="#f2f3f7">
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
                                        <TableCell align="center">휴대전화</TableCell>
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
                                                <TableCell align="center">휴대전화</TableCell>
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
    );
};
