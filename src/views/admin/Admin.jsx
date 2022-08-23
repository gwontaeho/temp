import { Typography, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const Admin = () => {
    return (
        <Stack spacing={5}>
            <Typography variant="h6">운영자 관리</Typography>

            <Button variant="contained" sx={{ alignSelf: "flex-end" }}>
                운영자 초대
            </Button>
            <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead bgColor="#eee">
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>이메일</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>소속</TableCell>
                            <TableCell>가입일</TableCell>
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
                                    <TableCell>소속</TableCell>
                                    <TableCell>가입일</TableCell>
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
