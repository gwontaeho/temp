import { Typography, Stack, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const Caller = () => {
    return (
        <Stack spacing={5}>
            <Typography variant="h6">발신번호 관리</Typography>

            <Stack spacing={3}>
                <Typography>등록 요청</Typography>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead bgColor="#eee">
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>등록요청자</TableCell>
                                <TableCell>기관명</TableCell>
                                <TableCell>발신번호</TableCell>
                                <TableCell>등록요청일</TableCell>
                                <TableCell>상태</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[0, 1, 2].map((v) => {
                                return (
                                    <TableRow key={v}>
                                        <TableCell>ID</TableCell>
                                        <TableCell>등록요청자</TableCell>
                                        <TableCell>기관명</TableCell>
                                        <TableCell>발신번호</TableCell>
                                        <TableCell>등록요청일</TableCell>
                                        <TableCell>상태</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>

            <Stack spacing={3}>
                <Typography>등록된 발신번호</Typography>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead bgColor="#eee">
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>등록요청자</TableCell>
                                <TableCell>기관명</TableCell>
                                <TableCell>발신번호</TableCell>
                                <TableCell>등록요청일</TableCell>
                                <TableCell>상태</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[0, 1, 2].map((v) => {
                                return (
                                    <TableRow key={v}>
                                        <TableCell>ID</TableCell>
                                        <TableCell>등록요청자</TableCell>
                                        <TableCell>기관명</TableCell>
                                        <TableCell>발신번호</TableCell>
                                        <TableCell>등록요청일</TableCell>
                                        <TableCell>상태</TableCell>
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
