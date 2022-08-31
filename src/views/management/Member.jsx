import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    Stack,
    Button,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Menu,
    MenuItem,
    Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Invite, Withdrawal } from "./member/";

export const Member = () => {
    const navigate = useNavigate();

    const [openInvite, setOpenInvite] = useState(false);
    const [openWithdrawal, setOpenWithdrawal] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                    <Typography variant="_title">멤버 관리</Typography>
                </Stack>
                <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3} spacing={3}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">전체 3건</Typography>
                        <Stack direction="row" spacing={3}>
                            <Button variant="contained" size="small" onClick={() => setOpenWithdrawal(true)}>
                                멤버 탈퇴
                            </Button>
                            <Button variant="contained" size="small" onClick={() => setOpenInvite(true)}>
                                멤버 초대
                            </Button>
                        </Stack>
                    </Stack>
                    <TableContainer>
                        <Table sx={{ minWidth: 900 }}>
                            <TableHead bgcolor="#f2f3f7">
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox size="small" />
                                    </TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>이메일</TableCell>
                                    <TableCell>휴대전화</TableCell>
                                    <TableCell>가입일</TableCell>
                                    <TableCell>구독</TableCell>
                                    <TableCell>상태</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v) => {
                                    return (
                                        <TableRow key={v}>
                                            <TableCell padding="checkbox">
                                                <Checkbox size="small" />
                                            </TableCell>
                                            <TableCell>이름</TableCell>
                                            <TableCell>이메일</TableCell>
                                            <TableCell>휴대전화</TableCell>
                                            <TableCell>가입일</TableCell>
                                            <TableCell>구독</TableCell>
                                            <TableCell>
                                                <Stack alignItems="center" spacing={0.5}>
                                                    <Typography variant="body2">상태</Typography>
                                                    <Chip size="small" label="초대 재발송" variant="outlined" onClick={() => console.log("a")} />
                                                </Stack>
                                            </TableCell>
                                            <TableCell padding="none">
                                                <IconButton onClick={handleClick}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                                    <MenuItem onClick={handleClose}>멤버 탈퇴</MenuItem>
                                                    <MenuItem onClick={handleClose}>구독 수정</MenuItem>
                                                    <MenuItem onClick={handleClose}>관리자 지정</MenuItem>
                                                    <MenuItem onClick={handleClose}>초대 재발송</MenuItem>
                                                    <MenuItem onClick={handleClose}>구독 수정</MenuItem>
                                                    <MenuItem onClick={handleClose}>탈퇴 철회</MenuItem>
                                                    <MenuItem onClick={handleClose}>휴면 해제</MenuItem>
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Stack>

            <Invite open={openInvite} setOpen={setOpenInvite} />
            <Withdrawal open={openWithdrawal} setOpen={setOpenWithdrawal} />
        </>
    );
};
