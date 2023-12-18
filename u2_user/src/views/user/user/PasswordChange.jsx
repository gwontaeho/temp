import { useReducer, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Stack, Typography, Button, Dialog, TextField, IconButton } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { openToast } from "../../../redux/features/toast/toastSlice";
const initialState = { pw: "", pwCheck: "", pwValidation: false, pwCheckValidation: false };

const reducer = (state, { type, payload }) => {
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

export const PasswordChange = ({ open, setOpen }) => {
    const reduxDispatch = useDispatch();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { pw, pwCheck, pwValidation, pwCheckValidation } = state;

    const handleClickChange = useCallback(() => {
        reduxDispatch(openToast("비밀번호가 변경되었습니다."));
    }, [state]);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <Stack p={3} spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography fontWeight="bold">비밀번호 변경</Typography>
                    <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                        <CloseOutlinedIcon />
                    </IconButton>
                </Stack>
                <Stack>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography fontWeight="bold" minWidth={150} px={2} py={4} bgcolor="#f2f3f7" sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                            비밀번호
                        </Typography>
                        <TextField
                            value={pw}
                            onBlur={() => dispatch({ type: "setPwValidation" })}
                            onKeyDown={(e) => dispatch({ type: "setPwValidation", payload: { capslock: e.getModifierState("CapsLock") ? true : false } })}
                            onChange={(e) => dispatch({ type: "setPw", payload: e.target.value })}
                            inputProps={{ maxLength: 16 }}
                            error={Boolean(pwValidation)}
                            helperText={pwValidation}
                            type="password"
                            fullWidth
                            size="small"
                        />
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography
                            fontWeight="bold"
                            minWidth={150}
                            px={2}
                            py={4}
                            bgcolor="#f2f3f7"
                            sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
                        >
                            비밀번호 확인
                        </Typography>

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
                </Stack>
                <Button sx={{ alignSelf: "center" }} onClick={handleClickChange}>
                    변경
                </Button>
            </Stack>
        </Dialog>
    );
};
