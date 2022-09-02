import { useState, useReducer, useEffect } from "react";
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
import { ViewTitle } from "../../components/";

const initialState = { checked: [false, false, false] };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setChecked": {
            const { checked, i } = payload;
            let newChecked = [...state.checked];
            newChecked[i] = checked;
            return { ...state, checked: newChecked };
        }
        case "setAllChecked": {
            const newChecked = [...state.checked].map((v) => (v = payload));
            return { ...state, checked: newChecked };
        }
    }
};

export const Member = () => {
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(reducer, initialState);
    const { checked } = state;

    const [openInvite, setOpenInvite] = useState(false);
    const [openWithdrawal, setOpenWithdrawal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        console.log(state);
    }, [state]);

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
                    <ViewTitle icon="member" title="멤버 관리" />
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
                        <Table sx={{ minWidth: 600 }}>
                            <TableHead bgcolor="#f2f3f7">
                                <TableRow>
                                    <TableCell padding="checkbox" align="center">
                                        <Checkbox
                                            size="small"
                                            checked={checked.every((v) => v === true)}
                                            onChange={(e) => dispatch({ type: "setAllChecked", payload: e.target.checked })}
                                        />
                                    </TableCell>
                                    <TableCell align="center">이름</TableCell>
                                    <TableCell align="center">이메일</TableCell>
                                    <TableCell align="center">휴대전화</TableCell>
                                    <TableCell align="center">가입일</TableCell>
                                    <TableCell align="center">구독</TableCell>
                                    <TableCell align="center">상태</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v, i) => {
                                    return (
                                        <TableRow key={v}>
                                            <TableCell padding="checkbox" align="center">
                                                <Checkbox
                                                    size="small"
                                                    checked={checked[i] || false}
                                                    onChange={(e) => dispatch({ type: "setChecked", payload: { checked: e.target.checked, i } })}
                                                />
                                            </TableCell>
                                            <TableCell align="center">이름</TableCell>
                                            <TableCell align="center">이메일</TableCell>
                                            <TableCell align="center">휴대전화</TableCell>
                                            <TableCell align="center">가입일</TableCell>
                                            <TableCell align="center">구독</TableCell>
                                            <TableCell align="center">
                                                <Stack spacing={0.5} alignItems="center">
                                                    <Typography variant="body2">상태</Typography>
                                                    <Chip size="small" label="초대 재발송" variant="outlined" onClick={() => console.log("a")} />
                                                </Stack>
                                            </TableCell>
                                            <TableCell padding="none" align="center">
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
