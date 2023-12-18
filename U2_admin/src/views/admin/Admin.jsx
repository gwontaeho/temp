import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    Stack,
    MenuItem,
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

const InviteButton = () => {
    const [open, setOpen] = useState(false);
    const [check, setCheck] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)}>운영자 초대</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography>운영자 초대</Typography>
                    <Stack>
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
                                <Typography>이메일</Typography>
                                <TextField fullWidth />
                            </Stack>
                            <Stack>
                                <Typography>이름</Typography>
                                <TextField fullWidth />
                            </Stack>
                            <Stack>
                                <Typography>소속</Typography>
                                <TextField fullWidth />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Button sx={{ alignSelf: "center" }} onClick={() => setCheck(true)}>
                        초대
                    </Button>
                </Stack>
            </Dialog>
            <Dialog open={check} onClose={() => setCheck(false)}>
                <Stack p={3} spacing={3}>
                    <Typography>운영자 초대</Typography>
                    <Typography textAlign="center">
                        이메일 이름 님을
                        <br />
                        U2Clod Admin의 운영자로 등록하시겠습니까?
                    </Typography>
                    <Button sx={{ alignSelf: "center" }}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const Admin = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>운영자 관리</PageTitle>
            <PageCard spacing={5}>
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
                        <Typography>검색어</Typography>
                        <Select defaultValue={0} sx={{ minWidth: 120 }}>
                            <MenuItem value={0}>사용중</MenuItem>
                            <MenuItem value={1}>휴면</MenuItem>
                            <MenuItem value={2}>탈퇴</MenuItem>
                        </Select>
                        <TextField fullWidth />
                        <Button>검색</Button>
                    </Stack>
                </Stack>

                <Stack spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="flex-end">
                        <InviteButton />
                    </Stack>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead bgColor="#eee">
                                <TableRow>
                                    <TableCell>이메일</TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>소속</TableCell>
                                    <TableCell>가입일</TableCell>
                                    <TableCell>상태</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v) => {
                                    return (
                                        <TableRow key={v} onClick={() => navigate("/admin/detail")} sx={{ ":hover": { bgcolor: "#eee" }, cursor: "pointer" }}>
                                            <TableCell>이메일</TableCell>
                                            <TableCell>이름</TableCell>
                                            <TableCell>소속</TableCell>
                                            <TableCell>가입일</TableCell>
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
