import { useState, useReducer, useRef, useEffect } from "react";
import { Checkbox, IconButton, Dialog, Divider, Button, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const pwState = { pw: "", pwCheck: "", pwValidation: false, pwCheckValidation: false };
const pwReducer = (state, { type, payload }) => {
    switch (type) {
        case "setPw":
            return { ...state, pw: payload };
        case "setPwCheck":
            return { ...state, pwCheck: payload, pwCheckValidation: false };
        case "setPwValidation":
            const pw = state.pw;
            const regexp = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            if (!Boolean(pw)) return { ...state, pwValidation: "비밀번호를 입력해주세요" };
            if (pw.length < 8) return { ...state, pwValidation: "비밀번호는 8~16자로 입력해주세요" };
            if (payload?.capslock) return { ...state, pwValidation: "Caps Lock이 켜져 있습니다" };
            if (!regexp.test(pw)) return { ...state, pwValidation: "비밀번호는 영문(대/소문자 구분, 숫자, 특수 문자를 조합하여 8~16자리로 입력해 주세요." };
            return { ...state, pwValidation: "" };
        case "setPwCheckValidation":
            return { ...state, pwCheckValidation: true };
    }
};

const ResetButton = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [check, setCheck] = useState(false);
    const [state, dispatch] = useReducer(pwReducer, pwState);
    const { pw, pwCheck, pwValidation, pwCheckValidation } = state;

    const handleClickCheck = () => {
        setOpen(false);
        setCheck(false);
    };

    return (
        <>
            <Button variant="text" onClick={() => setOpen(true)}>
                비밀번호 재설정
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={5}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>비밀번호 재설정</Typography>
                        <IconButton>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <Typography minWidth={120}>비밀번호</Typography>
                        <TextField
                            fullWidth
                            value={pw}
                            onBlur={() => dispatch({ type: "setPwValidation" })}
                            onKeyDown={(e) => dispatch({ type: "setPwValidation", payload: { capslock: e.getModifierState("CapsLock") ? true : false } })}
                            onChange={(e) => dispatch({ type: "setPw", payload: e.target.value })}
                            inputProps={{ maxLength: 16 }}
                            error={Boolean(pwValidation)}
                            helperText={pwValidation}
                            type="password"
                            size="small"
                        />
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <Typography minWidth={120}>비밀번호 확인</Typography>
                        <TextField
                            value={pwCheck}
                            onBlur={() => pw !== pwCheck && dispatch({ type: "setPwCheckValidation" })}
                            onChange={(e) => dispatch({ type: "setPwCheck", payload: e.target.value })}
                            inputProps={{ maxLength: 16 }}
                            type="password"
                            fullWidth
                            error={pwCheckValidation}
                            helperText={pwCheckValidation && "작성된 비밀번호와 일치하지 않습니다."}
                        />
                    </Stack>
                    <Button sx={{ alignSelf: "center" }} onClick={() => setCheck(true)}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
            <Dialog open={check} onClose={() => setCheck(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>비밀번호 설정 완료</Typography>
                        <IconButton onClick={() => setCheck(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Typography textAlign="center">
                        새로운 비밀번호가 저장되었습니다.
                        <br />
                        다시 로그인해주세요
                    </Typography>
                    <Button sx={{ alignSelf: "center" }} onClick={handleClickCheck}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
};

const findState = { name: "", phone: "", nameError: false, phoneError: false, send: false, retry: false, code: "" };
const findReducer = (state, { type, payload }) => {
    switch (type) {
        case "setName": {
            const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
            if (regex.test(payload) || !payload) return { ...state, name: payload, nameError: false };
            return { ...state };
        }
        case "setPhone": {
            const regex = /^[0-9]+$/;
            if (regex.test(payload) || !payload) return { ...state, phone: payload, phoneError: false };
            return { ...state };
        }
        case "setNameError": {
            return { ...state, nameError: true };
        }
        case "setPhoneError": {
            return { ...state, phoneError: true };
        }
        case "setSend": {
            if (payload) return { ...state, send: payload };
            return { ...state, send: payload, retry: false };
        }
        case "setRetry": {
            return { ...state, retry: true };
        }
        case "setCode": {
            const regex = /^[0-9]+$/;
            if (regex.test(payload) || !payload) return { ...state, code: payload };
            return { ...state };
        }
        default:
            return { ...state };
    }
};

const FindButton = () => {
    const [open, setOpen] = useState(false);

    const [state, dispatch] = useReducer(findReducer, findState);
    const { send, name, phone, nameError, phoneError, retry, code } = state;

    const stoRef = useRef(null);

    useEffect(() => {
        return () => clearTimeout(stoRef.current);
    }, []);

    const handleClick = () => {
        if (send && !retry) return dispatch({ type: "setRetry" });
        if (send) return;

        if (!name) dispatch({ type: "setNameError" });
        if (!phone) dispatch({ type: "setPhoneError" });
        if (!name || !phone) return;

        dispatch({ type: "setSend", payload: true });
        stoRef.current = setTimeout(() => {
            dispatch({ type: "setSend", payload: false });
        }, 60000);
    };

    return (
        <>
            <Button variant="text" onClick={() => setOpen(true)}>
                이메일 찾기
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>이메일 찾기</Typography>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <Typography minWidth={120}>이름</Typography>
                        <TextField
                            error={nameError}
                            helperText={nameError ? "이름을 입력해주세요" : " "}
                            value={name}
                            onChange={(e) => dispatch({ type: "setName", payload: e.target.value })}
                            inputProps={{ maxLength: 8 }}
                            fullWidth
                        />
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <Typography minWidth={120}>휴대폰번호</Typography>
                        <Stack flex={1} mr={3}>
                            <TextField
                                error={phoneError}
                                helperText={phoneError ? "휴대폰번호를 입력해주세요" : " "}
                                value={phone}
                                onChange={(e) => dispatch({ type: "setPhone", payload: e.target.value })}
                                inputProps={{ maxLength: 11 }}
                                fullWidth
                            />
                        </Stack>
                        <Button onClick={handleClick}>인증번호 전송</Button>
                    </Stack>
                    {send && (
                        <Typography textAlign="center" variant="body2">
                            {retry ? "인증번호가 이미 전송되었습니다. 1분후 다시 시도해주세요." : "인증번호가 전송되었습니다"}
                        </Typography>
                    )}
                    <Stack direction="row" alignItems="center">
                        <Typography minWidth={120}>인증번호</Typography>
                        <Stack flex={1} mr={3}>
                            <TextField
                                value={code}
                                onChange={(e) => dispatch({ type: "setCode", payload: e.target.value })}
                                inputProps={{ maxLength: 6 }}
                                fullWidth
                            />
                        </Stack>
                    </Stack>
                    <Typography textAlign="center" variant="body2">
                        인증번호가 일치합니다
                    </Typography>
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

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        if (!pw) {
            dispatch({ type: "setPwCheck" });
            refs.current[1].focus();
        }
        if (!email) {
            dispatch({ type: "setEmailCheck" });
            refs.current[0].focus();
        }
        if (!pw || !email) return;
        setOpen(true);
    };

    return (
        <>
            <Stack alignItems="center">
                <Stack p={10} spacing={3} maxWidth="md">
                    <Typography variant="h4" fontWeight="bold">
                        U2Cloud Admin 로그인
                    </Typography>
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
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3} alignItems="center">
                    <Typography textAlign="center">
                        등록되지 않은 아이디이거나,
                        <br />
                        아이디 또는 비밀번호를 잘못 입력하셨습니다
                    </Typography>
                    <Button onClick={() => setOpen(false)}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};
