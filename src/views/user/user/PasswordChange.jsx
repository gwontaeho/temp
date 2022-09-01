import { useState, useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Dialog, TextField } from "@mui/material";

const initialState = { pw: "", pwCheck: "", pwValidation: false, pwCheckValidation: false };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setPw":
            return { ...state, pw: payload, pwValidation: false };
        case "setPwCheck":
            return { ...state, pwCheck: payload, pwCheckValidation: false };
        case "setPwValidation":
            return { ...state, pwValidation: true };
        case "setPwCheckValidation":
            return { ...state, pwCheckValidation: true };
    }
};

export const PasswordChange = ({ open, setOpen }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { pw, pwCheck, pwValidation, pwCheckValidation } = state;

    const regexp = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    const handleClickChange = useCallback(() => {
        if (!regexp.test(pw)) return dispatch({ type: "setPwValidation" });
        if (pw !== pwCheck) return dispatch({ type: "setPwCheckValidation" });
    }, [state]);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <Stack p={3} spacing={3}>
                <Typography>비밀번호 변경</Typography>
                <Stack>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography minWidth={150} px={2} py={4} bgcolor="#f2f3f7" sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                            비밀번호
                        </Typography>
                        <TextField
                            value={pw}
                            onChange={(e) => dispatch({ type: "setPw", payload: e.target.value })}
                            inputProps={{ maxLength: 16 }}
                            type="password"
                            fullWidth
                            size="small"
                            error={pwValidation}
                            helperText={pwValidation && "비밀번호는 영문(대/소문자 구분, 숫자, 특수 문자를 조합하여 8~16자리로 입력해 주세요."}
                        />
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography minWidth={150} px={2} py={4} bgcolor="#f2f3f7" sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                            비밀번호 확인
                        </Typography>

                        <TextField
                            value={pwCheck}
                            onChange={(e) => dispatch({ type: "setPwCheck", payload: e.target.value })}
                            inputProps={{ maxLength: 16 }}
                            type="password"
                            fullWidth
                            size="small"
                            error={pwCheckValidation}
                            helperText={pwCheckValidation && "작성된 비밀번호와 일치하지 않습니다."}
                        />
                    </Stack>
                </Stack>
                <Button variant="contained" sx={{ alignSelf: "center" }} size="small" onClick={handleClickChange}>
                    변경
                </Button>
            </Stack>
        </Dialog>
    );
};
