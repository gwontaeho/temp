import { Typography, Stack, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const Experience = () => {
    return (
        <Stack spacing={5}>
            <Typography variant="h6">체험 회원</Typography>

            <Select size="small" sx={{ alignSelf: "flex-start" }}>
                <MenuItem>전체</MenuItem>
            </Select>

            <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead bgColor="#eee">
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>이메일</TableCell>
                            <TableCell>담당자명</TableCell>
                            <TableCell>휴대전화</TableCell>
                            <TableCell>서비스</TableCell>
                            <TableCell>체험일</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[0, 1, 2].map((v) => {
                            return (
                                <TableRow key={v}>
                                    <TableCell>ID</TableCell>
                                    <TableCell>이메일</TableCell>
                                    <TableCell>담당자명</TableCell>
                                    <TableCell>휴대전화</TableCell>
                                    <TableCell>서비스</TableCell>
                                    <TableCell>체험일</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};
