import { Typography, Stack, Button, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

export const User = () => {
    return (
        <Stack spacing={5}>
            <Typography variant="h6">회원 관리</Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={3}>
                    <Select size="small">
                        <MenuItem>전체</MenuItem>
                    </Select>
                    <TextField size="small" />
                </Stack>
                <Button variant="contained">회원 초대</Button>
            </Stack>

            <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead bgColor="#eee">
                        <TableRow>
                            <TableCell>이메일</TableCell>
                            <TableCell>회원명</TableCell>
                            <TableCell>휴대전화</TableCell>
                            <TableCell>기관명</TableCell>
                            <TableCell>역할</TableCell>
                            <TableCell>마케팅</TableCell>
                            <TableCell>가입일</TableCell>
                            <TableCell>최종 로그인</TableCell>
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
                                    <TableCell>가입일</TableCell>
                                    <TableCell>최종 로그인</TableCell>
                                    <TableCell>구독</TableCell>
                                    <TableCell>상태</TableCell>
                                    <TableCell>더보기</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};
