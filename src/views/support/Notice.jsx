import { Typography, Stack, Checkbox, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

export const Notice = () => {
    return (
        <Stack spacing={5}>
            <Typography variant="h6">공지사항 관리</Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <TextField size="small" />
                <Stack direction="row" spacing={3}>
                    <Button variant="contained">선택 삭제</Button>
                    <Button variant="contained">공지 등록</Button>
                </Stack>
            </Stack>

            <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead bgColor="#eee">
                        <TableRow>
                            <TableCell>
                                <Checkbox size="small" />
                            </TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>카테고리</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>등록일</TableCell>
                            <TableCell>조회수</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[0, 1, 2].map((v) => {
                            return (
                                <TableRow key={v}>
                                    <TableCell>
                                        <Checkbox size="small" />
                                    </TableCell>
                                    <TableCell>ID</TableCell>
                                    <TableCell>카테고리</TableCell>
                                    <TableCell>제목</TableCell>
                                    <TableCell>등록일</TableCell>
                                    <TableCell>조회수</TableCell>
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
