import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Chip, Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";

import { PageCard, PageTitle, CountCard } from "../../components";

export const PaymentDetail = () => {
    const navigate = useNavigate();
    return (
        <Stack spacing={3}>
            <PageTitle>결제 정보</PageTitle>
            <PageCard spacing={5}>
                <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography>홍길동</Typography>
                        <Typography>hong@u2blo.com</Typography>
                        <Chip label="입금완료" />
                    </Stack>
                    <Stack direction="row">
                        <Stack
                            flex={1}
                            sx={{
                                "& >div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3 },
                                "& > div": { flexDirection: "row", alignItems: "center" },
                            }}
                        >
                            <Stack>
                                <Typography>휴대전화</Typography>
                                <Typography>010-1234-1234</Typography>
                            </Stack>
                            <Stack>
                                <Typography>역할</Typography>
                                <Typography>관리자</Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            flex={1}
                            sx={{
                                "& >div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3 },
                                "& > div": { flexDirection: "row", alignItems: "center" },
                            }}
                        >
                            <Stack>
                                <Typography>기관명</Typography>
                                <Typography>유투검진센터</Typography>
                            </Stack>
                            <Stack>
                                <Typography>대표자명</Typography>
                                <Typography>홍길동</Typography>
                            </Stack>
                            <Stack>
                                <Typography>대표 전화번호</Typography>
                                <Typography>010-1234-1234</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack spacing={3}>
                    <Typography>결제 정보</Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={5}>
                            <Typography>주문번호</Typography>
                            <Typography fontWeight="bold">20202020</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Button>거래확인서 발행</Button>
                            <Button>결제 취소</Button>
                            <Button>결제 요청</Button>
                        </Stack>
                    </Stack>
                    <Stack direction="row">
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <Stack border="1px solid #eee" p={1} spacing={1} alignItems="center" borderRadius={2}>
                                    <Typography>결제수단</Typography>
                                    <Typography fontWeight="bold">신용카드</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={3}>
                                <Stack border="1px solid #eee" p={1} spacing={1} alignItems="center" borderRadius={2}>
                                    <Typography>결제일</Typography>
                                    <Typography fontWeight="bold">2022년 22월 22일</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={3}>
                                <Stack border="1px solid #eee" p={1} spacing={1} alignItems="center" borderRadius={2}>
                                    <Typography>결제금액</Typography>
                                    <Typography fontWeight="bold">80,000원</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead bgColor="#eee">
                                <TableRow>
                                    <TableCell>서비스명</TableCell>
                                    <TableCell>월정액</TableCell>
                                    <TableCell>옵션 사용료</TableCell>
                                    <TableCell>할인</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Stack alignItems="center" spacing={1}>
                                            <Typography>U2알리미</Typography>
                                            <Stack px={3} py={1} bgcolor="_bg.main" borderRadius={1}>
                                                <Typography>이용기간</Typography>
                                                <Typography>
                                                    2022-05-01
                                                    <br />~ 2022-05-02
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={3} justifyContent="center">
                                            <Typography>정기결제</Typography>
                                            <Typography>5,000원</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Stack alignItems="center" spacing={1}>
                                            <Stack direction="row" spacing={3}>
                                                <Typography>LMS</Typography>
                                                <Typography>10원 x 1000건</Typography>
                                                <Typography>10,000원</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={3}>
                                                <Typography>LMS</Typography>
                                                <Typography>10원 x 1000건</Typography>
                                                <Typography>10,000원</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={3}>
                                                <Typography>LMS</Typography>
                                                <Typography>10원 x 1000건</Typography>
                                                <Typography>10,000원</Typography>
                                            </Stack>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={3} alignItems="center">
                                            <Typography>첫달 프로모션</Typography>
                                            <Typography>-5,000원</Typography>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead bgColor="#eee">
                                <TableRow>
                                    <TableCell>주문번호</TableCell>
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
                                        <TableRow key={v}>
                                            <TableCell>주문번호</TableCell>
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
