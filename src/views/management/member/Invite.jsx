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

const initialState = {};

const reducer = (state, { type, payload }) => {};

const Complete = ({ open, setOpen }) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <Stack p={3} spacing={5}>
                <Typography>멤버초대 메일 발송</Typography>
                <Typography fontWeight="bold" alignSelf="center">
                    2명에게 초대메일을 발송했습니다
                </Typography>
                <Button size="small" variant="contained" sx={{ alignSelf: "center" }} onClick={() => setOpen(false)}>
                    확인
                </Button>
            </Stack>
        </Dialog>
    );
};

export const Invite = ({ open, setOpen }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [openComplete, setOpenComplete] = useState(false);

    const handleClickInvite = useCallback(() => {
        setOpenComplete(true);
        setOpen(false);
    }, []);

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography>멤버 초대</Typography>
                    <TableContainer>
                        <Table sx={{ minWidth: 500 }}>
                            <TableHead bgcolor="#f2f3f7">
                                <TableRow>
                                    <TableCell align="center">No</TableCell>
                                    <TableCell align="center">이름</TableCell>
                                    <TableCell align="center">이메일</TableCell>
                                    <TableCell align="center">역할</TableCell>
                                    <TableCell align="center" padding="checkbox">
                                        <Checkbox size="small" />
                                    </TableCell>
                                    <TableCell align="center" padding="checkbox">
                                        <Checkbox size="small" />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2, 3, 4, 5].map((v, i) => {
                                    return (
                                        <TableRow key={v}>
                                            <TableCell align="center">{i + 1}</TableCell>
                                            <TableCell align="center">
                                                <TextField size="small" />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField size="small" />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Select value={0} size="small">
                                                    <MenuItem value={0}>관리자</MenuItem>
                                                    <MenuItem value={1}>멤버</MenuItem>
                                                </Select>
                                            </TableCell>
                                            <TableCell align="center" padding="checkbox">
                                                <Checkbox size="small" />
                                            </TableCell>
                                            <TableCell align="center" padding="checkbox">
                                                <Checkbox size="small" />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography>초대 멤버 수 : 1</Typography>
                    <Stack direction="row" spacing={3} justifyContent="center">
                        <Button color="_gray" variant="contained" size="small" onClick={() => setOpen(false)}>
                            취소
                        </Button>
                        <Button variant="contained" size="small" onClick={handleClickInvite}>
                            초대 메일 발송
                        </Button>
                    </Stack>
                </Stack>
            </Dialog>
            <Complete open={openComplete} setOpen={setOpenComplete} />
        </>
    );
};
