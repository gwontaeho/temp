import { useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputAdornment, Stack, Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

import { Invite, Withdrawal, Row } from "./member/";
import { ViewTitle } from "../../components/";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

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

    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                    <ViewTitle icon="member" title="멤버 관리" />
                </Stack>
                <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3} spacing={3}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <TextField
                            variant="standard"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Stack direction="row" spacing={3}>
                            <Button color="_gray" onClick={() => setOpenWithdrawal(true)}>
                                멤버 탈퇴
                            </Button>
                            <Button onClick={() => setOpenInvite(true)}>멤버 초대</Button>
                        </Stack>
                    </Stack>

                    <TableContainer>
                        <Table sx={{ minWidth: 600 }}>
                            <TableHead bgcolor="#f2f3f7">
                                <TableRow>
                                    <TableCell padding="checkbox" align="center">
                                        <Checkbox
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
                                    return <Row key={v} v={v} i={i} state={state} dispatch={dispatch} />;
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Stack>

            <Invite open={openInvite} setOpen={setOpenInvite} />
            <Withdrawal open={openWithdrawal} setOpen={setOpenWithdrawal} checked={checked} />
        </>
    );
};
