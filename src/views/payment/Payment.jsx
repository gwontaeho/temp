import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    Checkbox,
    Stack,
    RadioGroup,
    Radio,
    FormControlLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Select,
    Dialog,
} from "@mui/material";
import { PageCard, PageTitle, CountCard } from "../../components";

const RequestButton = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)}>결제요청</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3} alignItems="center">
                    <Typography>결제요청이 완료되었습니다</Typography>
                    <Button>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

const CancelButton = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)}>결제취소</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3} alignItems="center">
                    <Typography>결제취소가 완료되었습니다</Typography>
                    <Button>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const Payment = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>결제 관리</PageTitle>
            <PageCard spacing={5}>
                <Stack direction="row" spacing={3} alignItems="center">
                    <Typography>최근 정산예정일</Typography>
                    <Typography fontWeight="bold">2022-05-01</Typography>
                    <Typography>총 정산 금액</Typography>
                    <Typography fontWeight="bold">101,000원</Typography>
                </Stack>
                <Stack
                    sx={{
                        ">div": {
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 3,
                            ">:first-child": {
                                minWidth: 160,
                                bgcolor: "_bg.main",
                                p: 3,
                            },
                        },
                    }}
                >
                    <Stack>
                        <Typography>상태</Typography>
                        <RadioGroup defaultValue={0} row>
                            <FormControlLabel value={0} control={<Radio />} label="전체" />
                            <FormControlLabel value={1} control={<Radio />} label="결제예정" />
                            <FormControlLabel value={2} control={<Radio />} label="결제승인" />
                            <FormControlLabel value={3} control={<Radio />} label="미납" />
                            <FormControlLabel value={4} control={<Radio />} label="결제취소" />
                        </RadioGroup>
                    </Stack>
                    <Stack>
                        <Typography>기간</Typography>
                        <Select></Select>
                    </Stack>
                    <Stack>
                        <Typography>검색어</Typography>
                        <Select></Select>
                        <TextField fullWidth />
                        <Button>검색</Button>
                    </Stack>
                </Stack>

                <Stack spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>전체 3</Typography>
                        <Stack direction="row" spacing={1}>
                            <RequestButton />
                            <CancelButton />
                            <Button>엑셀</Button>
                        </Stack>
                    </Stack>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead bgColor="#eee">
                                <TableRow>
                                    <TableCell>주문번호</TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>기관명</TableCell>
                                    <TableCell>구독</TableCell>
                                    <TableCell>결제금액</TableCell>
                                    <TableCell>결제방법</TableCell>
                                    <TableCell>결제수단</TableCell>
                                    <TableCell>결제요청일시</TableCell>
                                    <TableCell>결제승인/취소 일시</TableCell>
                                    <TableCell>상태</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v) => {
                                    return (
                                        <TableRow key={v} onClick={() => navigate("/payment/management/detail")}>
                                            <TableCell>주문번호</TableCell>
                                            <TableCell>이름</TableCell>
                                            <TableCell>기관명</TableCell>
                                            <TableCell>구독</TableCell>
                                            <TableCell>결제금액</TableCell>
                                            <TableCell>결제방법</TableCell>
                                            <TableCell>결제수단</TableCell>
                                            <TableCell>결제요청일시</TableCell>
                                            <TableCell>결제승인/취소 일시</TableCell>
                                            <TableCell>상태</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </PageCard>
        </Stack>
    );
};
