import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Divider, TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from "@mui/material";

export const History = () => {
    const navigate = useNavigate();
    return (
        <Stack spacing={3}>
            <Typography fontWeight="bold">결제 내역</Typography>
            <Stack bgcolor="#fff" borderRadius={3} p={3}>
                <TableContainer>
                    <Table sx={{ minWidth: 600 }}>
                        <TableHead bgcolor="#f2f3f7">
                            <TableRow>
                                <TableCell>납부일자</TableCell>
                                <TableCell>서비스명</TableCell>
                                <TableCell>결제금액</TableCell>
                                <TableCell>결제수단</TableCell>
                                <TableCell>상태</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[0, 1, 2].map((v) => {
                                return (
                                    <TableRow
                                        key={v}
                                        onClick={() => navigate("/subscribe/bill/1")}
                                        sx={{ cursor: "pointer", ":hover": { bgcolor: "_bg.main" } }}
                                    >
                                        <TableCell>납부일자</TableCell>
                                        <TableCell>서비스명</TableCell>
                                        <TableCell>결제금액</TableCell>
                                        <TableCell>결제수단</TableCell>
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
