import { useCallback, useReducer, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, TextField } from "@mui/material";
import { ViewTitle } from "../../components/";

const initialState = { name: "", phone: "", nameError: false, phoneError: false };

const reducer = (state, { type, payload }) => {
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
    }
};

export const UserUpdate = () => {
    const navigate = useNavigate();

    const nameRef = useRef();
    const phoneRef = useRef();

    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, phone, nameError, phoneError } = state;

    const handleClickSubmit = useCallback(() => {
        validation();
        navigate("/user");
    }, [state]);

    const validation = useCallback(() => {
        if (!name) {
            dispatch({ type: "setNameError" });
            nameRef.current.focus();
        }
        if (!phone) {
            dispatch({ type: "setPhoneError" });
            phoneRef.current.focus();
        }
    }, [nameRef, phoneRef, state]);

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <ViewTitle icon="user" title="내 정보" />
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3}>
                <Stack maxWidth="sm" spacing={3}>
                    <Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography
                                fontWeight="bold"
                                minWidth={150}
                                px={2}
                                py={3}
                                bgcolor="_bg.main"
                                sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                            >
                                이메일
                            </Typography>
                            <Typography>U2cloud@U2check.com</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography fontWeight="bold" minWidth={150} px={2} py={3} bgcolor="_bg.main">
                                이름
                            </Typography>
                            <TextField
                                inputRef={nameRef}
                                size="small"
                                fullWidth
                                value={name}
                                error={nameError}
                                helperText={nameError && "이름을 입력해주세요"}
                                inputProps={{ maxLength: 8 }}
                                onChange={(e) => dispatch({ type: "setName", payload: e.target.value })}
                            />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography
                                fontWeight="bold"
                                minWidth={150}
                                px={2}
                                py={3}
                                bgcolor="_bg.main"
                                sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
                            >
                                휴대전화
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1} flex={1}>
                                <TextField
                                    inputRef={phoneRef}
                                    size="small"
                                    inputProps={{ maxLength: 11 }}
                                    fullWidth
                                    value={phone}
                                    error={phoneError}
                                    helperText={phoneError && "휴대전화번호를 입력해주세요"}
                                    onChange={(e) => dispatch({ type: "setPhone", payload: e.target.value })}
                                />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="flex-end" spacing={3}>
                        <Button color="_gray" variant="contained" onClick={() => navigate("/user")} size="small">
                            취소
                        </Button>
                        <Button variant="contained" size="small" onClick={handleClickSubmit}>
                            저장
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
