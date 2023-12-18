import {
    Typography,
    Stack,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    Pagination,
    Select,
    MenuItem,
} from "@mui/material";
import { SubscriptionIcon } from "../../ui-component/icons/icons";
import MainCard from "../../ui-component/cards/MainCard";

export default function Member() {
    return (
        <Stack spacing={3}>
            <Typography variant="h2">
                {SubscriptionIcon()}
                <label style={{ marginLeft: "0.8rem" }}>멤버관리</label>
            </Typography>
            <MainCard>
                <Stack spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1">전체 4건</Typography>
                        <Stack direction="row" spacing={1}>
                            <Button color="primary">초대 재발송</Button>
                            <Button>멤버 탈퇴</Button>
                            <Button color="primary">멤버 초대</Button>
                        </Stack>
                    </Stack>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ "&>*": { fontSize: 14 } }}>
                                    <TableCell>
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">이름</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">이메일</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">휴대전화</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">가입일</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">구독</Typography>
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
                                            <TableCell component="th" scope="row">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">홍길동홍</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">abc@adcd.asc</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">010-1234-1234</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">2022.01.25</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">알리미</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">사용중</Typography>
                                            </TableCell>
                                            <TableCell>아이콘</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Pagination count={1} />
                        <Select>
                            <MenuItem>10개보기</MenuItem>
                            <MenuItem>100개보기</MenuItem>
                            <MenuItem>1000개보기</MenuItem>
                        </Select>
                    </Stack>
                </Stack>
            </MainCard>
        </Stack>
    );
}
