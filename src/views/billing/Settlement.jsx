import { Typography, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const Settlement = () => {
    return (
        <Stack spacing={5}>
            <Typography variant="h6">정산 관리</Typography>

            <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead bgColor="#eee">
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>이메일</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>기관명</TableCell>
                            <TableCell>구독 서비스</TableCell>
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
                                    <TableCell>기관명</TableCell>
                                    <TableCell>구독 서비스</TableCell>
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
