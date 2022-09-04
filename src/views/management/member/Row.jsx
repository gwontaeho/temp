import { useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Checkbox, TableCell, TableRow, IconButton, Menu, MenuItem, Chip, Dialog, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const MenuItemDialog = ({ handleClose, type }) => {
    const [open, setOpen] = useState(false);

    const options = {
        0: { title: "멤버 탈퇴" },
        1: { title: "구독 수정" },
        2: { title: "관리자 지정", text: "000님에게 관리자 권한을 부여하시겠습니까?" },
        3: { title: "탈퇴 철회", text: "000 님의 탈퇴신청을 철회하시겠습니까?" },
        4: { title: "휴면 해제", text: "000 님을 휴면해제 하시겠습니까?" },
        5: { title: "초대 재발송" },
    };

    const option = options[type];

    return (
        <>
            <MenuItem onClick={() => setOpen(true)}>{option.title}</MenuItem>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography fontWeight="bold">{option.title}</Typography>
                    <Stack spacing={3} alignItems="center">
                        <Typography>{option.text}</Typography>
                        <Button>확인</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

export const Row = ({ v, i, dispatch, state }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { checked } = state;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <TableRow>
            <TableCell padding="checkbox" align="center">
                <Checkbox checked={checked[i] || false} onChange={(e) => dispatch({ type: "setChecked", payload: { checked: e.target.checked, i } })} />
            </TableCell>
            <TableCell align="center">이름</TableCell>
            <TableCell align="center">이메일</TableCell>
            <TableCell align="center">휴대전화</TableCell>
            <TableCell align="center">가입일</TableCell>
            <TableCell align="center">구독</TableCell>
            <TableCell align="center">
                <Stack spacing={0.5} alignItems="center">
                    <Typography variant="body2">상태</Typography>
                    <Chip label="초대 재발송" variant="outlined" onClick={() => console.log("a")} />
                </Stack>
            </TableCell>
            <TableCell padding="none" align="center">
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItemDialog handleClose={handleClose} type={0} />
                    <MenuItemDialog handleClose={handleClose} type={1} />
                    <MenuItemDialog handleClose={handleClose} type={2} />
                    <MenuItemDialog handleClose={handleClose} type={3} />
                    <MenuItemDialog handleClose={handleClose} type={4} />
                    <MenuItemDialog handleClose={handleClose} type={5} />
                </Menu>
            </TableCell>
        </TableRow>
    );
};
