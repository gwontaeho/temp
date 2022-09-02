import { Typography, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

export const Payment = () => {
    return (
        <Stack spacing={5}>
            <Typography variant="h6">청구 관리</Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row">
                    <TextField size="small" />
                </Stack>
                <Button variant="contained">청구서 작성</Button>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1}>
                    <Stack direction="row" p={1} bgcolor="#eee" spacing={5}>
                        <Typography variant="body2">발송</Typography>
                        <Typography variant="body2">500</Typography>
                    </Stack>
                    <Stack direction="row" p={1} bgcolor="#eee" spacing={5}>
                        <Typography variant="body2">예약</Typography>
                        <Typography variant="body2">300</Typography>
                    </Stack>
                    <Stack direction="row" p={1} bgcolor="#eee" spacing={5}>
                        <Typography variant="body2">결제완료</Typography>
                        <Typography variant="body2">50</Typography>
                    </Stack>
                    <Stack direction="row" p={1} bgcolor="#eee" spacing={5}>
                        <Typography variant="body2">미납</Typography>
                        <Typography variant="body2">0</Typography>
                    </Stack>
                </Stack>
                <Typography>아이콘</Typography>
            </Stack>

            <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead bgColor="#eee">
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>청구일</TableCell>
                            <TableCell>고객명</TableCell>
                            <TableCell>서비스</TableCell>
                            <TableCell>요금제</TableCell>
                            <TableCell>금액</TableCell>
                            <TableCell>상태</TableCell>
                            <TableCell>결제일</TableCell>
                            <TableCell>결제기한</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[0, 1, 2].map((v) => {
                            return (
                                <TableRow key={v}>
                                    <TableCell>ID</TableCell>
                                    <TableCell>청구일</TableCell>
                                    <TableCell>고객명</TableCell>
                                    <TableCell>서비스</TableCell>
                                    <TableCell>요금제</TableCell>
                                    <TableCell>금액</TableCell>
                                    <TableCell>상태</TableCell>
                                    <TableCell>결제일</TableCell>
                                    <TableCell>결제기한</TableCell>
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
