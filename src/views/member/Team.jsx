import { Typography, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

export const Team = () => {
    return (
        <Stack spacing={5}>
            <Typography variant="h6">기관 관리</Typography>

            <TextField size="small" sx={{ alignSelf: "flex-start" }} />

            <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead bgColor="#eee">
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>기관명</TableCell>
                            <TableCell>사업자등록번호</TableCell>
                            <TableCell>소속회원</TableCell>
                            <TableCell>구독</TableCell>
                            <TableCell>역할</TableCell>
                            <TableCell>가입일</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[0, 1, 2].map((v) => {
                            return (
                                <TableRow key={v}>
                                    <TableCell>ID</TableCell>
                                    <TableCell>기관명</TableCell>
                                    <TableCell>사업자등록번호</TableCell>
                                    <TableCell>소속회원</TableCell>
                                    <TableCell>구독</TableCell>
                                    <TableCell>역할</TableCell>
                                    <TableCell>가입일</TableCell>
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
