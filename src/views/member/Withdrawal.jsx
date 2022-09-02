import { Typography, Stack, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const Withdrawal = () => {
    return (
        <Stack spacing={5}>
            <Typography variant="h6">탈퇴 / 휴면 회원</Typography>

            <Select size="small" sx={{ alignSelf: "flex-start" }}>
                <MenuItem>전체</MenuItem>
            </Select>

            <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead bgColor="#eee">
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>이메일</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>탈퇴사유</TableCell>
                            <TableCell>역할</TableCell>
                            <TableCell>청구예상금액</TableCell>
                            <TableCell>미수납금</TableCell>
                            <TableCell>상태</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[0, 1, 2].map((v) => {
                            return (
                                <TableRow key={v}>
                                    <TableCell>ID</TableCell>
                                    <TableCell>이메일</TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>탈퇴사유</TableCell>
                                    <TableCell>역할</TableCell>
                                    <TableCell>청구예상금액</TableCell>
                                    <TableCell>미수납금</TableCell>
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
