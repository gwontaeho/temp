import { useState, useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    TextField,
    Select,
    MenuItem,
    Stack,
    Button,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
} from "@mui/material";

const initialState = { members: [] };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "addMember": {
            const members = [...state.members, { alimi: false, survey: false }];
            return { ...state, members };
        }
        case "setAlimi": {
            const { index, checked } = payload;
            const members = [...state.members];
            members[index]["alimi"] = checked;
            return { ...state, members };
        }
        case "setSurvey": {
            const { index, checked } = payload;
            const members = [...state.members];
            members[index]["survey"] = checked;
            return { ...state, members };
        }
        case "setAllAlimi": {
            const members = [...state.members].map((member) => ({ ...member, alimi: payload }));
            return { ...state, members };
        }
        case "setAllSurvey": {
            const members = [...state.members].map((member) => ({ ...member, survey: payload }));
            return { ...state, members };
        }
    }
};

const Complete = ({ open, setOpen }) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <Stack p={3} spacing={5}>
                <Typography>멤버초대 메일 발송</Typography>
                <Typography fontWeight="bold" alignSelf="center">
                    2명에게 초대메일을 발송했습니다
                </Typography>
                <Button variant="contained" sx={{ alignSelf: "center" }} onClick={() => setOpen(false)}>
                    확인
                </Button>
            </Stack>
        </Dialog>
    );
};

export const Invite = ({ open, setOpen }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { members } = state;

    const [openComplete, setOpenComplete] = useState(false);

    const handleClickInvite = useCallback(() => {
        setOpenComplete(true);
        setOpen(false);
    }, []);

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <Stack p={3} spacing={3}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography fontWeight="bold">멤버 초대</Typography>
                        <Stack direction="row" spacing={1}>
                            <Button color="_gray">삭제</Button>
                            <Button onClick={() => dispatch({ type: "addMember" })}>추가</Button>
                        </Stack>
                    </Stack>
                    <TableContainer>
                        <Table sx={{ minWidth: 500 }}>
                            <TableHead bgcolor="#f2f3f7">
                                <TableRow>
                                    <TableCell align="center">No</TableCell>
                                    <TableCell align="center">이름</TableCell>
                                    <TableCell align="center">이메일</TableCell>
                                    <TableCell align="center">역할</TableCell>
                                    <TableCell align="center">
                                        <Stack alignItems="center">
                                            <Typography variant="caption">U2알리미</Typography>
                                            <Checkbox onChange={(e) => dispatch({ type: "setAllAlimi", payload: e.target.checked })} />
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Stack alignItems="center">
                                            <Typography variant="caption">U2Survey</Typography>
                                            <Checkbox onChange={(e) => dispatch({ type: "setAllSurvey", payload: e.target.checked })} />
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {members.map((v, i) => {
                                    const { alimi, survey } = v;

                                    return (
                                        <TableRow key={i}>
                                            <TableCell align="center">{i + 1}</TableCell>
                                            <TableCell align="center">
                                                <TextField />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Select value={0}>
                                                    <MenuItem value={0}>관리자</MenuItem>
                                                    <MenuItem value={1}>멤버</MenuItem>
                                                </Select>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={alimi}
                                                    onChange={(e) => dispatch({ type: "setAlimi", payload: { index: i, checked: e.target.checked } })}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox
                                                    checked={survey}
                                                    onChange={(e) => dispatch({ type: "setSurvey", payload: { index: i, checked: e.target.checked } })}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography>초대 멤버 수 : {members.length}</Typography>
                    <Stack direction="row" spacing={3} justifyContent="center">
                        <Button color="_gray" variant="contained" onClick={() => setOpen(false)}>
                            취소
                        </Button>
                        <Button variant="contained" onClick={handleClickInvite}>
                            초대 메일 발송
                        </Button>
                    </Stack>
                </Stack>
            </Dialog>
            <Complete open={openComplete} setOpen={setOpenComplete} />
        </>
    );
};
