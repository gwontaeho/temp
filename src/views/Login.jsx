import { useState, useReducer, useRef } from "react";
import { Checkbox, IconButton, Dialog, Divider, Button, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const ResetButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="text" onClick={() => setOpen(true)}>
                비밀번호 재설정
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>비밀번호 재설정</Typography>
                        <IconButton>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <Typography minWidth={120}>비밀번호</Typography>
                        <TextField fullWidth />
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <Typography minWidth={120}>비밀번호 확인</Typography>

                        <TextField fullWidth />
                    </Stack>

                    <Button sx={{ alignSelf: "center" }}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

const FindButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="text" onClick={() => setOpen(true)}>
                이메일 찾기
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>이메일 찾기</Typography>
                        <IconButton>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <Typography minWidth={120}>이름</Typography>
                        <TextField inputProps={{ maxLength: 8 }} fullWidth />
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <Typography minWidth={120}>휴대폰번호</Typography>
                        <Stack flex={1} mr={3}>
                            <TextField inputProps={{ maxLength: 11 }} fullWidth />
                        </Stack>
                        <Button>인증번호 전송</Button>
                    </Stack>
                    <Typography textAlign="center">인증번호가 전송되었습니다</Typography>
                    <Button sx={{ alignSelf: "center" }}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

const initialState = { email: "", pw: "", emailCheck: false, pwCheck: false };
const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setEmail":
            return { ...state, email: payload, emailCheck: false };
        case "setEmailCheck":
            return { ...state, emailCheck: true };
        case "setPw":
            return { ...state, pw: payload, pwCheck: false };
        case "setPwCheck":
            return { ...state, pwCheck: true };
        default:
            return { ...state };
    }
};

export const Login = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { email, emailCheck, pw, pwCheck } = state;
    const refs = useRef([]);

    const handleClick = () => {
        if (!pw) {
            dispatch({ type: "setPwCheck" });
            refs.current[1].focus();
        }
        if (!email) {
            dispatch({ type: "setEmailCheck" });
            refs.current[0].focus();
        }
    };

    return (
        <Stack alignItems="center">
            <Stack p={10} spacing={3} maxWidth="md">
                <Typography variant="h4" fontWeight="bold">
                    U2Cloud Admin 로그인
                </Typography>
                <Stack>
                    <TextField
                        inputRef={(ref) => (refs.current[0] = ref)}
                        error={emailCheck}
                        helperText={emailCheck ? "이메일을 입력해주세요" : " "}
                        value={email}
                        onChange={(e) => dispatch({ type: "setEmail", payload: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        inputRef={(ref) => (refs.current[1] = ref)}
                        error={pwCheck}
                        helperText={pwCheck ? "비밀번호를 입력해주세요" : " "}
                        value={pw}
                        onChange={(e) => dispatch({ type: "setPw", payload: e.target.value })}
                        fullWidth
                    />
                </Stack>
                <FormControlLabel label="이메일 저장" control={<Checkbox />} />
                <Button onClick={handleClick}>로그인</Button>
                <Stack direction="row" justifyContent="center" spacing={3}>
                    <Divider orientation="vertical" />
                    <FindButton />
                    <Divider orientation="vertical" />
                    <ResetButton />
                    <Divider orientation="vertical" />
                </Stack>
            </Stack>
        </Stack>
    );
};
