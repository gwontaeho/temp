import { useCallback, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, TextField, Select, MenuItem } from "@mui/material";

const prePhoneOptions = ["010", "011", "016", "017", "018", "019"];

const initialState = { name: "", phone: "", prePhone: "010" };

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
        case "setPrePhone": {
            return { ...state, prePhone: payload };
        }
    }
};

export const UserUpdate = () => {
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, phone, prePhone } = state;

    const handleClickSubmit = useCallback(() => {
        console.log(state);
    }, [state]);

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="_title">내 정보</Typography>
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3}>
                <Stack maxWidth="sm" spacing={3}>
                    <Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="_bg.main" sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                이메일
                            </Typography>
                            <Typography>U2cloud@U2check.com</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="_bg.main">
                                이름
                            </Typography>
                            <TextField
                                size="small"
                                fullWidth
                                value={name}
                                inputProps={{ maxLength: 8 }}
                                onChange={(e) => dispatch({ type: "setName", payload: e.target.value })}
                            />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="_bg.main" sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                                휴대전화
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1} flex={1}>
                                <Select size="small" value={prePhone} onChange={(e) => dispatch({ type: "setPrePhone", payload: e.target.value })}>
                                    {prePhoneOptions.map((v) => (
                                        <MenuItem key={v} value={v}>
                                            {v}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Typography>-</Typography>
                                <TextField size="small" fullWidth value={phone} onChange={(e) => dispatch({ type: "setPhone", payload: e.target.value })} />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="flex-end" spacing={3}>
                        <Button variant="contained" onClick={() => navigate("/user")} size="small">
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
