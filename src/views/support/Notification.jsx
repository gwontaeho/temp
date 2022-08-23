import { Typography, Stack, Checkbox, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

export const Notification = () => {
    return (
        <Stack spacing={5}>
            <Typography variant="h6">알림 관리</Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <TextField size="small" />
                <Stack direction="row" spacing={3}>
                    <Button variant="contained">자동알림 설정</Button>
                    <Button variant="contained">알림발송</Button>
                </Stack>
            </Stack>

            <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead bgColor="#eee">
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>보낸계정</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>내용</TableCell>
                            <TableCell>발송일</TableCell>
                            <TableCell>상태</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[0, 1, 2].map((v) => {
                            return (
                                <TableRow key={v}>
                                    <TableCell>ID</TableCell>
                                    <TableCell>보낸계정</TableCell>
                                    <TableCell>제목</TableCell>
                                    <TableCell>내용</TableCell>
                                    <TableCell>발송일</TableCell>
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
