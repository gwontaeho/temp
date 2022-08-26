import { useCallback, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, TextField, Button } from "@mui/material";
import { sampleIcon } from "../../ui-component/icons/icons";
import MainCard from "../../ui-component/cards/MainCard";

const initialState = { name: "", phone: "" };

const reducer = (state, action) => {
    switch (action.type) {
        case "setName":
            return { ...state, name: action.payload };
        case "setPhone":
            return { ...state, phone: action.payload };
    }
};

const MyPageUpdate = () => {
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(reducer, initialState);

    const [name, setName] = useState("set origin name");
    const [phone, setPhone] = useState("set origin phone");

    // 저장
    const handleClickSubmit = useCallback(() => {
        navigate("/mypage", { replace: true });
    }, []);

    return (
        <Stack spacing={3}>
            <Typography variant="h2" alignItems="center">
                {sampleIcon()}
                <label style={{ marginLeft: "0.4rem" }}>내 정보</label>
            </Typography>

            <MainCard>
                <Stack spacing={5}>
                    <Stack direction="row">
                        <Stack sx={{ borderRadius: 2, bgcolor: "#eee", width: 160, "*": { height: 80, alignItems: "center", display: "flex", p: 3 } }}>
                            <Typography>이메일</Typography>
                            <Typography>이름</Typography>
                            <Typography>휴대전화</Typography>
                        </Stack>
                        <Stack sx={{ "& > *": { height: 80, alignItems: "center", display: "flex", p: 3 } }}>
                            <Typography>U2cloud@U2check.com</Typography>
                            <Stack>
                                <TextField variant="standard" value={state.name} onChange={(e) => dispatch({ type: "setName", payload: e.target.value })} />
                            </Stack>
                            <Stack>
                                <TextField variant="standard" value={state.phone} onChange={(e) => dispatch({ type: "setPhone", payload: e.target.value })} />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="center" spacing={5}>
                        <Button sx={{ width: 100 }} onClick={() => navigate("/mypage", { replace: true })}>
                            취소
                        </Button>
                        <Button sx={{ width: 100 }} color="primary" onClick={handleClickSubmit}>
                            저장
                        </Button>
                    </Stack>
                </Stack>
            </MainCard>
        </Stack>
    );
};

export default MyPageUpdate;
