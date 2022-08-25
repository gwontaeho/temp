import { Typography, Stack, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const Plan = () => {
    return (
        <Stack spacing={5}>
            <Typography variant="h6">앱 / 요금제 관리</Typography>
            {[0, 1, 2, 3].map((v) => {
                return (
                    <Stack spacing={1} key={v}>
                        <Typography fontWeight="bold">U2알리미</Typography>
                        <Typography variant="body2">검진대상자 전용 검진안내 문자 발송 및 카카오 알림톡 발송 서비스</Typography>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead bgColor="#eee">
                                    <TableRow>
                                        <TableCell>요금제</TableCell>
                                        <TableCell>금액</TableCell>
                                        <TableCell>구독단위</TableCell>
                                        <TableCell>기간</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[0, 1, 2].map((v) => {
                                        return (
                                            <TableRow key={v}>
                                                <TableCell>이메일</TableCell>
                                                <TableCell>회원명</TableCell>
                                                <TableCell>휴대전화</TableCell>
                                                <TableCell>기관명</TableCell>
                                                <TableCell>역할</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                );
            })}
        </Stack>
    );
};
