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

const CancelButton = () => {
    const [open, setOpen] = useState(false);
    const [complete, setComplete] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(false);
        setComplete(true);
    }, []);

    return (
        <>
            <Button onClick={() => setOpen(true)}>탈퇴 철회</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3}>
                    <Typography textAlign="center">
                        honG@email.com님의 탈퇴요청을
                        <br />
                        철회 하시겠습니까?
                    </Typography>
                    <TextField multiline rows={2} placeholder="탈퇴를 철회하는 사유를 작성해주세요" />
                    <Button sx={{ alignSelf: "center" }} onClick={handleClick}>
                        탈퇴 거부
                    </Button>
                </Stack>
            </Dialog>
            <Dialog open={complete} onClose={() => setComplete(false)} fullWidth maxWidth="xs">
                <Stack p={5}>
                    <Typography textAlign="center">탈퇴가 철회 처리되었습니다.</Typography>
                </Stack>
            </Dialog>
        </>
    );
};

const AllowButton = () => {
    const [open, setOpen] = useState(false);
    const [complete, setComplete] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(false);
        setComplete(true);
    }, []);

    return (
        <>
            <Button onClick={() => setOpen(true)}>탈퇴 승인</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3}>
                    <Typography textAlign="center">
                        honG@email.com님을
                        <br />
                        탈퇴 하시겠습니까?
                    </Typography>
                    <Button sx={{ alignSelf: "center" }} onClick={handleClick}>
                        탈퇴 승인
                    </Button>
                </Stack>
            </Dialog>
            <Dialog open={complete} onClose={() => setComplete(false)} fullWidth maxWidth="xs">
                <Stack p={5}>
                    <Typography textAlign="center">탈퇴 처리되었습니다.</Typography>
                </Stack>
            </Dialog>
        </>
    );
};

const Management = () => {
    const navigate = useNavigate();
    return (
        <PageCard spacing={5} sx={{ borderTopLeftRadius: 0 }}>
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
                    <Typography>탈퇴요청일</Typography>
                    <Typography>등록일시</Typography>
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
                        <CancelButton />
                        <AllowButton />
                        <Button>엑셀</Button>
                    </Stack>
                </Stack>
                <TableContainer>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead bgColor="#eee">
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>기관명</TableCell>
                                <TableCell>역할</TableCell>
                                <TableCell>미납금</TableCell>
                                <TableCell>탈퇴사유</TableCell>
                                <TableCell>탈퇴요청일</TableCell>
                                <TableCell>상태</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[0, 1, 2].map((v) => {
                                return (
                                    <TableRow key={v} onClick={() => navigate("/member/user/detail")}>
                                        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>ID</TableCell>
                                        <TableCell>이메일</TableCell>
                                        <TableCell>이름</TableCell>
                                        <TableCell>기관명</TableCell>
                                        <TableCell>역할</TableCell>
                                        <TableCell>미납금</TableCell>
                                        <TableCell>탈퇴사유</TableCell>
                                        <TableCell>탈퇴요청일</TableCell>
                                        <TableCell>상태</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </PageCard>
    );
};

const Member = () => {
    const navigate = useNavigate();

    return (
        <PageCard spacing={5} sx={{ borderTopLeftRadius: 0 }}>
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
                    <Typography>기간</Typography>
                    <RadioGroup defaultValue={0} row>
                        <FormControlLabel value={0} control={<Radio />} label="탈퇴요청일" />
                        <FormControlLabel value={1} control={<Radio />} label="탈퇴완료일" />
                    </RadioGroup>
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
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>기관명</TableCell>
                                <TableCell>역할</TableCell>
                                <TableCell>미납금</TableCell>
                                <TableCell>탈퇴사유</TableCell>
                                <TableCell>탈퇴요청일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[0, 1, 2].map((v) => {
                                return (
                                    <TableRow key={v} onClick={() => navigate("/member/user/detail")}>
                                        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>ID</TableCell>
                                        <TableCell>이메일</TableCell>
                                        <TableCell>이름</TableCell>
                                        <TableCell>기관명</TableCell>
                                        <TableCell>역할</TableCell>
                                        <TableCell>미납금</TableCell>
                                        <TableCell>탈퇴사유</TableCell>
                                        <TableCell>탈퇴요청일</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </PageCard>
    );
};

export const Withdrawal = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    return (
        <Stack spacing={3}>
            <PageTitle>탈퇴 관리</PageTitle>
            <Stack>
                <Stack direction="row" sx={{ ">p": { px: 2, py: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10, cursor: "pointer" } }}>
                    <Typography bgcolor={page === 0 && "#fff"} onClick={() => setPage(0)}>
                        탈퇴 관리
                    </Typography>
                    <Typography bgcolor={page === 1 && "#fff"} onClick={() => setPage(1)}>
                        탈퇴 회원
                    </Typography>
                </Stack>
                {page === 0 ? <Management /> : <Member />}
            </Stack>
        </Stack>
    );
};
