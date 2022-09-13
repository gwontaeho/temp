import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { Stack, Typography, Button, TextField, Select, MenuItem, Radio, RadioGroup, FormControlLabel, FormControl, Dialog } from "@mui/material";

const initialState = { name: "", phone: "", title: "", text: "" };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setName": {
            const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
            if (regex.test(payload) || !payload) return { ...state, name: payload };
            return { ...state };
        }

        case "setPhone": {
            const regex = /^[0-9]+$/;
            if (regex.test(payload) || !payload) return { ...state, phone: payload };
            return { ...state };
        }
        case "setTitle": {
            return { ...state, title: payload };
        }
        case "setText": {
            return { ...state, text: payload };
        }
    }
};

const SubmitButton = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button variant="contained" size="small" onClick={() => setOpen(true)}>
                문의 등록
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3}>
                    <Typography variant="bold">문의 등록 완료</Typography>
                    <Typography textAlign="center">
                        문의 내용이 접수되었습니다.
                        <br />
                        2~3일 이내에 등록된 이메일로 답변드리겠습니다.
                    </Typography>
                    <Button sx={{ alignSelf: "center" }} onClick={() => navigate("/support/qna/detail")}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const QnaCreate = () => {
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, phone, email, title, text } = state;

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="_title">문의등록</Typography>
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3}>
                <Stack maxWidth="sm" spacing={3}>
                    <Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7" sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                문의유형
                            </Typography>
                            <FormControl>
                                <RadioGroup row defaultValue="0">
                                    <FormControlLabel value="0" control={<Radio />} label="구독문의" />
                                    <FormControlLabel value="1" control={<Radio />} label="사용문의" />
                                    <FormControlLabel value="2" control={<Radio />} label="오류신고" />
                                    <FormControlLabel value="3" control={<Radio />} label="기타문의" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                서비스 구분
                            </Typography>
                            <FormControl>
                                <RadioGroup row defaultValue="female">
                                    <FormControlLabel value="female" control={<Radio />} label="U2알리미" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                담당자명
                            </Typography>
                            <TextField size="small" fullWidth value={name} onChange={(e) => dispatch({ type: "setName", payload: e.target.value })} />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                휴대전화
                            </Typography>
                            <TextField size="small" fullWidth value={phone} onChange={(e) => dispatch({ type: "setPhone", payload: e.target.value })} />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                이메일
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1} flex={1}>
                                <TextField size="small" fullWidth />
                                <Typography>@</Typography>
                                <Select fullWidth></Select>
                            </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                제목
                            </Typography>
                            <TextField size="small" fullWidth value={title} onChange={(e) => dispatch({ type: "setTitle", payload: e.target.value })} />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} height={180} bgcolor="#f2f3f7">
                                문의내용
                            </Typography>
                            <TextField
                                size="small"
                                rows={6}
                                multiline
                                fullWidth
                                value={text}
                                onChange={(e) => dispatch({ type: "setText", payload: e.target.value })}
                            />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                첨부파일
                            </Typography>
                            <Button variant="contained" size="small" component="label">
                                파일 업로드
                                <input hidden type="file" />
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={3} justifyContent="flex-end">
                        <Button variant="contained" size="small" onClick={() => navigate(-1)}>
                            취소
                        </Button>
                        <SubmitButton />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
