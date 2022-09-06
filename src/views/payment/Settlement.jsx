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

export const Settlement = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>정산 관리</PageTitle>
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
                            <FormControlLabel value={1} control={<Radio />} label="입금요청" />
                            <FormControlLabel value={2} control={<Radio />} label="입금대기" />
                            <FormControlLabel value={3} control={<Radio />} label="보류" />
                            <FormControlLabel value={4} control={<Radio />} label="입금완료" />
                        </RadioGroup>
                    </Stack>
                    <Stack>
                        <Typography>검색기간</Typography>
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
                        <Button>엑셀</Button>
                    </Stack>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead bgColor="#eee">
                                <TableRow>
                                    <TableCell>정산ID</TableCell>
                                    <TableCell>주문번호</TableCell>
                                    <TableCell>결제수단</TableCell>
                                    <TableCell>결제금액</TableCell>
                                    <TableCell>수수료</TableCell>
                                    <TableCell>부가세</TableCell>
                                    <TableCell>정산예정금액</TableCell>
                                    <TableCell>실 지급액</TableCell>
                                    <TableCell>결제일</TableCell>
                                    <TableCell>정산예정일</TableCell>
                                    <TableCell>정산일</TableCell>
                                    <TableCell>상태</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v) => {
                                    return (
                                        <TableRow key={v} onClick={() => navigate("/payment/settlement/detail")}>
                                            <TableCell>정산ID</TableCell>
                                            <TableCell>주문번호</TableCell>
                                            <TableCell>결제수단</TableCell>
                                            <TableCell>결제금액</TableCell>
                                            <TableCell>수수료</TableCell>
                                            <TableCell>부가세</TableCell>
                                            <TableCell>정산예정금액</TableCell>
                                            <TableCell>실 지급액</TableCell>
                                            <TableCell>결제일</TableCell>
                                            <TableCell>정산예정일</TableCell>
                                            <TableCell>정산일</TableCell>
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
