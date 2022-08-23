import { Typography, Stack, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

export const Qna = () => {
    return (
        <Stack spacing={5}>
            <Typography variant="h6">문의 관리</Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <TextField size="small" />
            </Stack>

            <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead bgColor="#eee">
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>문의유형</TableCell>
                            <TableCell>서비스구분</TableCell>
                            <TableCell>계정</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>문의일</TableCell>
                            <TableCell>상태</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[0, 1, 2].map((v) => {
                            return (
                                <TableRow key={v}>
                                    <TableCell>ID</TableCell>
                                    <TableCell>문의유형</TableCell>
                                    <TableCell>서비스구분</TableCell>
                                    <TableCell>계정</TableCell>
                                    <TableCell>제목</TableCell>
                                    <TableCell>문의일</TableCell>
                                    <TableCell>상태</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};
