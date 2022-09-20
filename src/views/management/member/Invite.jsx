import { useState, useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import readXlsxFile from "read-excel-file";
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
    Tooltip,
    IconButton,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import WarningIcon from "@mui/icons-material/Warning";
const initialState = { members: [] };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setName": {
            const { name, index } = payload;
            const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;

            if (regex.test(name) || !name) {
                const newMembers = [...state.members];
                newMembers[index]["name"] = name;
                newMembers[index]["nameError"] = "";
                return { ...state, members: newMembers };
            }
            return { ...state };
        }
        case "setEmail": {
            const { email, index } = payload;
            const newMembers = [...state.members];
            newMembers[index]["email"] = email;
            newMembers[index]["emailError"] = "";
            return { ...state, members: newMembers };
        }
        case "addMember": {
            const members = [...state.members, { alimi: false, survey: false, name: "", email: "" }];
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
        case "upload": {
            const uploaded = payload.map((v) => ({ ...v, alimi: true, survey: true }));
            const members = [...state.members, ...uploaded];
            return { ...state, members };
        }
        case "send": {
            const newMembers = [...state.members].map((v) => {
                var reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                let error = {};
                if (!v.name) error.nameError = "이름을 입력해주세요";
                if (!reg.test(v.email)) error.emailError = "이메일 형식이 올바르지않습니다";
                if (!v.email) error.emailError = "이메일을 입력해주세요";
                return { ...v, ...error };
            });
            return { ...state, members: newMembers };
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

    const handleChange = useCallback((e) => {
        const map = {
            이름: "name",
            이메일: "email",
        };
        const file = e.target.files[0];
        readXlsxFile(file, { map }).then((rows) => {
            dispatch({ type: "upload", payload: rows.rows });
        });
    }, []);

    const handleClickSend = useCallback(() => {
        dispatch({ type: "send" });
        console.log(state);
    }, [state]);

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <Stack p={3} spacing={3}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography fontWeight="bold">멤버 초대</Typography>
                        <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" spacing={1}>
                            <Button variant="outlined" component="label">
                                엑셀 업로드
                                <input type="file" hidden onChange={handleChange} />
                            </Button>
                            <Button variant="outlined">엑셀 양식 다운</Button>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Button color="_gray">삭제</Button>
                            <Button onClick={() => dispatch({ type: "addMember" })}>추가</Button>
                        </Stack>
                    </Stack>
                    <TableContainer>
                        <Table sx={{ minWidth: 500 }}>
                            <TableHead bgcolor="#f2f3f7">
                                <TableRow>
                                    <TableCell align="center" />
                                    <TableCell align="center">No</TableCell>
                                    <TableCell align="center">이름</TableCell>
                                    <TableCell align="center">이메일</TableCell>
                                    <TableCell align="center">역할</TableCell>
                                    <TableCell align="center">
                                        <Stack alignItems="center">
                                            <Typography variant="caption">U2알리미</Typography>
                                            <Checkbox
                                                checked={Boolean(members.length) && members.every((v) => v.alimi === true)}
                                                onChange={(e) => dispatch({ type: "setAllAlimi", payload: e.target.checked })}
                                            />
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Stack alignItems="center">
                                            <Typography variant="caption">U2Survey</Typography>
                                            <Checkbox
                                                checked={Boolean(members.length) && members.every((v) => v.survey === true)}
                                                onChange={(e) => dispatch({ type: "setAllSurvey", payload: e.target.checked })}
                                            />
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {members.map((v, i) => {
                                    const { name, email, alimi, survey, nameError, emailError } = v;

                                    const error = nameError || emailError;

                                    return (
                                        <TableRow key={i} sx={{ bgcolor: error && "#fff0f0" }}>
                                            <TableCell align="center" padding="none">
                                                {error && (
                                                    <Tooltip title={error}>
                                                        <WarningIcon />
                                                    </Tooltip>
                                                )}
                                            </TableCell>
                                            <TableCell align="center">{i + 1}</TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    inputProps={{ maxLength: 8 }}
                                                    value={name}
                                                    onChange={(e) => dispatch({ type: "setName", payload: { name: e.target.value, index: i } })}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    value={email}
                                                    onChange={(e) => dispatch({ type: "setEmail", payload: { email: e.target.value, index: i } })}
                                                />
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
                        <Button variant="contained" onClick={handleClickSend}>
                            초대 메일 발송
                        </Button>
                    </Stack>
                </Stack>
            </Dialog>
            <Complete open={openComplete} setOpen={setOpenComplete} />
        </>
    );
};
