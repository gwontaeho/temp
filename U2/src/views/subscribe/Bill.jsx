import { Typography, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider } from "@mui/material";
import { SubscriptionIcon } from "../../ui-component/icons/icons";
import MainCard from "../../ui-component/cards/MainCard";

export default function Bill() {
    return (
        <Stack spacing={3}>
            <Typography variant="h2">
                {SubscriptionIcon()}
                <label style={{ marginLeft: "0.8rem" }}>청구서</label>
            </Typography>
            <MainCard>
                <Stack spacing={5}>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography>5월 청구금액</Typography>
                        <Typography>100,000원</Typography>
                    </Stack>
                    <Stack border="1px solid #eee" p={3} borderRadius={2} direction="row" spacing={3}>
                        <Stack flex={1} spacing={3}>
                            <Stack direction="row">
                                <Typography width={100}>서비스명</Typography>
                                <Typography>U2알리미</Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography width={100}>결제수단</Typography>
                                <Typography>신용카드</Typography>
                            </Stack>
                        </Stack>
                        <Divider orientation="vertical" flexItem />
                        <Stack flex={1} spacing={3}>
                            <Stack direction="row">
                                <Typography width={100}>이용기간</Typography>
                                <Typography>2022.01.01 ~ 2022.02.02</Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography width={100}>납부기한</Typography>
                                <Typography>2022.03.03</Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography width={100}>상태</Typography>
                                <Typography>납부완료 (2022.02.06)</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Divider />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ "&>*": { fontSize: 14 } }}>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">납부일시</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">서비스명</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">결제금액</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">결제수단</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">상태</Typography>
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v) => {
                                    return (
                                        <TableRow key={v} sx={{ "&>*": { fontSize: 14 } }}>
                                            <TableCell component="th" scope="row"></TableCell>
                                            <TableCell>
                                                <Typography variant="caption">2021.11.25</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">U2알리미(정기결제)</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">5,000원</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">신용카드</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">납부완료</Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </MainCard>
        </Stack>
    );
}
