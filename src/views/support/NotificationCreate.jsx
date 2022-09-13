import { useCallback, useEffect, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    Stack,
    TextField,
    IconButton,
    Button,
    Checkbox,
    Dialog,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Pagination,
    Select,
} from "@mui/material";

import { PageCard, PageTitle, CountCard } from "../../components";

const TargetButton = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button color="_gray" onClick={() => setOpen(true)}>
                선택
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
                <Stack p={3} spacing={3}>
                    <Typography>알림 발송 대상자 선택</Typography>
                    <TextField sx={{ alignSelf: "flex-start" }} />
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>전체 10</Typography>
                        <Typography>선택 1건</Typography>
                    </Stack>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead bgColor="#eee">
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>이메일</TableCell>
                                    <TableCell>회원명</TableCell>
                                    <TableCell>휴대전화</TableCell>
                                    <TableCell>기관명</TableCell>
                                    <TableCell>역할</TableCell>
                                    <TableCell>마케팅</TableCell>
                                    <TableCell>가입일</TableCell>
                                    <TableCell>최종 로그인</TableCell>
                                    <TableCell>구독</TableCell>
                                    <TableCell>상태</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v) => {
                                    return (
                                        <TableRow key={v}>
                                            <TableCell padding="checkbox">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell>이메일</TableCell>
                                            <TableCell>회원명</TableCell>
                                            <TableCell>휴대전화</TableCell>
                                            <TableCell>기관명</TableCell>
                                            <TableCell>역할</TableCell>
                                            <TableCell>마케팅</TableCell>
                                            <TableCell>가입일</TableCell>
                                            <TableCell>최종 로그인</TableCell>
                                            <TableCell>구독</TableCell>
                                            <TableCell>상태</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Pagination />
                        <Select></Select>
                    </Stack>

                    <Button sx={{ alignSelf: "center" }}>선택완료</Button>
                </Stack>
            </Dialog>
        </>
    );
};

const SendButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button sx={{ alignSelf: "center" }} onClick={() => setOpen(true)}>
                알림 발송
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3} alignItems="center">
                    <Typography>~ 명에게 알림을 발송하겠습니까?</Typography>
                    <Button>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const NotificationCreate = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>알림발송</PageTitle>
            <PageCard spacing={5}>
                <Stack
                    sx={{
                        "&>div>:first-child": { p: 3, bgcolor: "_bg.main", minWidth: 160, mr: 3, height: "100%" },
                        "&>div": { flexDirection: "row", alignItems: "center" },
                    }}
                >
                    <Stack>
                        <Typography>발송일시</Typography>
                        <Typography>알림명</Typography>
                    </Stack>
                    <Stack>
                        <Typography>대상자</Typography>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <TargetButton />
                            <Typography>email@email.com</Typography>
                            <Typography>총 51명</Typography>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack>
                        <Typography>내용</Typography>
                        <TextField fullWidth />
                    </Stack>
                    <Stack>
                        <Typography>내용</Typography>
                        <Stack py={3} flex={1}>
                            <TextField fullWidth multiline rows={5} />
                        </Stack>
                    </Stack>
                </Stack>
                <SendButton />
            </PageCard>
        </Stack>
    );
};
