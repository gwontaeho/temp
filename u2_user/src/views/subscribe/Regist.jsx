import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Stack, Typography, Button, Select, Dialog, Radio, RadioGroup, FormControlLabel, FormControl, TextField, Checkbox } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const initialState = { cardNum: ["", "", "", ""], expiration: "", birth: "", pw: "", birth2: "" };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setCardNum": {
            const { num, index } = payload;
            const regex = /^[0-9]+$/;
            if (!regex.test(num) && num !== "") return { ...state };
            const cardNum = [...state.cardNum];
            cardNum[index] = num;
            return { ...state, cardNum };
        }
        case "setExpiration": {
            const regex = /^[0-9]+$/;
            if (!regex.test(payload) && payload !== "") return { ...state };
            return { ...state, expiration: payload };
        }
        case "setBirth": {
            const regex = /^[0-9]+$/;
            if (!regex.test(payload) && payload !== "") return { ...state };
            return { ...state, birth: payload };
        }
        case "setBirth2": {
            const regex = /^[0-9]+$/;
            if (!regex.test(payload) && payload !== "") return { ...state };
            return { ...state, birth2: payload };
        }
        case "setPw": {
            const regex = /^[0-9]+$/;
            if (!regex.test(payload) && payload !== "") return { ...state };
            return { ...state, pw: payload };
        }
        case "reset": {
            return { ...initialState };
        }
    }
};

const CancleButton = ({ state, setOpen, dispatch }) => {
    const { cardNum, expiration, pw, birth, birth2 } = state;
    const [check, setCheck] = useState(false);
    const handleClick = useCallback(() => {
        if (cardNum[0] || !!cardNum[1] || !!cardNum[2] || !!cardNum[3] || expiration || pw || birth || birth2) return setCheck(true);
        setOpen(false);
    }, [state]);

    const handleClickCheck = useCallback(() => {
        dispatch({ type: "reset" });
        setCheck(false);
        setOpen(false);
    }, []);

    return (
        <>
            <Button color="_gray" onClick={handleClick}>
                취소
            </Button>
            <Dialog open={check} onClose={() => setCheck(false)} fullWidth maxWidth="xs">
                <Stack alignItems="center" p={3} spacing={3}>
                    <Typography>
                        취소하시면 작성된 내용이 삭제됩니다.
                        <br />
                        결제수단 등록을 취소하시겠습니까?
                    </Typography>
                    <Button onClick={handleClickCheck}>확인</Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const Regist = ({ open, setOpen }) => {
    const [type, setType] = useState(0);

    const cardNumRefs = useRef([]);

    const [openResult, setOpenResult] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const { cardNum, expiration, pw, birth, birth2 } = state;

    useEffect(() => {
        const val = [cardNum[0].length === 4, cardNum[1].length === 4, cardNum[2].length === 4];

        if (val[0]) cardNumRefs.current[1].focus();
        if (val[0] && val[1]) cardNumRefs.current[2].focus();
        if (val[0] && val[1] && val[2]) cardNumRefs.current[3].focus();
    }, [cardNum]);

    const handleClick = useCallback(() => {
        console.log(state);
        // setOpenResult(true);
    }, [state]);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <Stack p={3} spacing={5}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography fontWeight="bold">결제수단 등록</Typography>
                    <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                        <CloseOutlinedIcon />
                    </IconButton>
                </Stack>
                <Stack direction="row" spacing={3}>
                    <Stack bgcolor="#f2f3f7" sx={{ cursor: "pointer" }} py={2} px={3} borderRadius={1} onClick={() => setType(0)}>
                        <Typography>신용카드</Typography>
                    </Stack>
                    <Stack bgcolor="#f2f3f7" sx={{ cursor: "pointer" }} py={2} px={3} borderRadius={1} onClick={() => setType(1)}>
                        <Typography>계좌이체</Typography>
                    </Stack>
                </Stack>
                {!type ? (
                    <Stack spacing={1}>
                        <FormControl>
                            <RadioGroup row defaultValue="female">
                                <FormControlLabel value="female" control={<Radio />} label="개인" />
                                <FormControlLabel value="male" control={<Radio />} label="법인" />
                            </RadioGroup>
                        </FormControl>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>카드사</Typography>
                            {/* <Select></Select> */}
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>카드번호</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <TextField
                                    inputRef={(el) => (cardNumRefs.current[0] = el)}
                                    placeholder="0000"
                                    inputProps={{ maxLength: 4 }}
                                    value={cardNum[0]}
                                    onChange={(e) => dispatch({ type: "setCardNum", payload: { index: 0, num: e.target.value } })}
                                />
                                <Typography>-</Typography>
                                <TextField
                                    inputRef={(el) => (cardNumRefs.current[1] = el)}
                                    placeholder="0000"
                                    inputProps={{ maxLength: 4 }}
                                    value={cardNum[1]}
                                    onChange={(e) => dispatch({ type: "setCardNum", payload: { index: 1, num: e.target.value } })}
                                />
                                <Typography>-</Typography>
                                <TextField
                                    inputRef={(el) => (cardNumRefs.current[2] = el)}
                                    placeholder="0000"
                                    inputProps={{ maxLength: 4 }}
                                    value={cardNum[2]}
                                    onChange={(e) => dispatch({ type: "setCardNum", payload: { index: 2, num: e.target.value } })}
                                />
                                <Typography>-</Typography>
                                <TextField
                                    inputRef={(el) => (cardNumRefs.current[3] = el)}
                                    placeholder="0000"
                                    inputProps={{ maxLength: 4 }}
                                    value={cardNum[3]}
                                    onChange={(e) => dispatch({ type: "setCardNum", payload: { index: 3, num: e.target.value } })}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>유효기간</Typography>
                            <TextField
                                value={expiration}
                                onChange={(e) => dispatch({ type: "setExpiration", payload: e.target.value })}
                                fullWidth
                                placeholder="MM/YY"
                                inputProps={{ maxLength: 4 }}
                            />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>생년월일</Typography>
                            <TextField
                                value={birth}
                                onChange={(e) => dispatch({ type: "setBirth", payload: e.target.value })}
                                fullWidth
                                placeholder="YYMMDD"
                                inputProps={{ maxLength: 6 }}
                            />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>카드 비밀번호</Typography>
                            <TextField
                                onChange={(e) => dispatch({ type: "setPw", payload: e.target.value })}
                                value={pw}
                                fullWidth
                                placeholder="비밀번호 앞 2자리 숫자"
                                inputProps={{ maxLength: 2 }}
                            />
                        </Stack>
                    </Stack>
                ) : (
                    <Stack spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={100}>이름</Typography>
                            <TextField fullWidth />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography value={expiration} minWidth={100}>
                                생년월일
                            </Typography>
                            <TextField
                                value={birth2}
                                onChange={(e) => dispatch({ type: "setBirth2", payload: e.target.value })}
                                fullWidth
                                inputProps={{ maxLength: 8 }}
                            />
                        </Stack>
                    </Stack>
                )}
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center">
                        <FormControlLabel control={<Checkbox />} label="본인의 개인정보를 결제 서비스 업체에 제공하는 데에 동의합니다" />
                        <Typography color="primary" ml={-2}>
                            (필수)
                        </Typography>
                    </Stack>
                    <Button variant="text" sx={{ mt: 0.5 }}>
                        보기
                    </Button>
                </Stack>
                <Stack direction="row" spacing={3} justifyContent="center">
                    <CancleButton setOpen={setOpen} state={state} dispatch={dispatch} />
                    <Button onClick={handleClick}>확인</Button>
                </Stack>
            </Stack>
            <Dialog open={openResult} onClose={() => setOpenResult(false)} fullWidth>
                <Stack py={5} spacing={3} alignItems="center">
                    <Typography>카드등록이 완료되었습니다.</Typography>
                    <Button>확인</Button>
                </Stack>
            </Dialog>
        </Dialog>
    );
};
