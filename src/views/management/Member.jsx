import { useNavigate } from "react-router-dom";
import { Typography, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const Member = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="h6">멤버 관리</Typography>
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3} spacing={3}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">전체 3건</Typography>
                    <Stack direction="row" spacing={3}>
                        <Button variant="contained" size="small">
                            멤버 탈퇴
                        </Button>
                        <Button variant="contained" size="small">
                            멤버 초대
                        </Button>
                    </Stack>
                </Stack>
                <TableContainer>
                    <Table sx={{ minWidth: 900 }}>
                        <TableHead bgColor="#f2f3f7">
                            <TableRow>
                                <TableCell>쳌밬</TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>휴대전화</TableCell>
                                <TableCell>가입일</TableCell>
                                <TableCell>구독</TableCell>
                                <TableCell>상태</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[0, 1, 2].map((v) => {
                                return (
                                    <TableRow key={v}>
                                        <TableCell>이메일</TableCell>
                                        <TableCell>회원명</TableCell>
                                        <TableCell>휴대전화</TableCell>
                                        <TableCell>기관명</TableCell>
                                        <TableCell>역할</TableCell>
                                        <TableCell>마케팅</TableCell>
                                        <TableCell>마케팅</TableCell>
                                        <TableCell>가입일</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Stack>
    );
};
