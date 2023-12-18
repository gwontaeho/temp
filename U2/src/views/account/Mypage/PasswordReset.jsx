import { useCallback, useReducer } from "react";
import { Typography, Stack, Button, Dialog, TextField } from "@mui/material";

const initialState = { password: "", passwordValidation: false, passwordCheck: "", passwordCheckValidation: "" };

const reducer = (state, action) => {
    switch (action.type) {
        case "setPassword":
            return { ...state, password: action.payload, passwordValidation: false };
        case "setPasswordCheck":
            return { ...state, passwordCheck: action.payload, passwordCheckValidation: false };
        case "setPasswordValidation":
            return { ...state, passwordValidation: true };
        case "setPasswordCheckValidation":
            return { ...state, passwordCheckValidation: true };
    }
};

// 비밀번호 변경
export const PasswordReset = ({ open, setOpen }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleClickChange = useCallback(() => {
        // 비밀번호 정규식 적용
        // if () return dispatch({ type: "setPasswordValidation" });
        if (state.password !== state.passwordCheck) return dispatch({ type: "setPasswordCheckValidation" });

        // 비밀번호 변경 로직
        setOpen(false);
    }, [state]);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
            <Stack p={3} spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h4">비밀번호 변경</Typography>
                    <Typography onClick={() => setOpen(false)}>닫기</Typography>
                </Stack>
                <Stack direction="row">
                    <Stack sx={{ borderRadius: 2, bgcolor: "#eee", width: 160, "*": { height: 100, alignItems: "center", display: "flex", p: 3 } }}>
                        <Typography variant="caption">비밀번호</Typography>
                        <Typography variant="caption">비밀번호 확인</Typography>
                    </Stack>
                    <Stack sx={{ "& > *": { height: 100, alignItems: "center", display: "flex", p: 3 } }} flex={1}>
                        <Stack justifyContent="center" position="relative">
                            <TextField
                                fullWidth
                                value={state.password}
                                type="password"
                                onChange={(e) => dispatch({ type: "setPassword", payload: e.target.value })}
                            />
                            {state.passwordValidation && (
                                <Typography variant="caption" color="red" sx={{ position: "absolute", bottom: 0, left: 24 }}>
                                    비밀번호는 영문 대소문자, 숫자, 특수 문자를 2가지 이상 조합하여 8~16자리로 입력해주세요.
                                </Typography>
                            )}
                        </Stack>
                        <Stack justifyContent="center" position="relative">
                            <TextField
                                fullWidth
                                value={state.passwordCheck}
                                type="password"
                                onChange={(e) => dispatch({ type: "setPasswordCheck", payload: e.target.value })}
                            />
                            {state.passwordCheckValidation && (
                                <Typography variant="caption" color="red" sx={{ position: "absolute", bottom: 0, left: 24 }}>
                                    입력된 비밀번호와 일치하지 않습니다.
                                </Typography>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
                <Button color="primary" sx={{ width: "fit-content", alignSelf: "center" }} onClick={handleClickChange}>
                    변경
                </Button>
            </Stack>
        </Dialog>
    );
};
