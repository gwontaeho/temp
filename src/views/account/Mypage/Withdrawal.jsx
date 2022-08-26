import { useCallback, useReducer } from "react";
import { Typography, Stack, Button, Dialog, TextField, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";

const initialState = { type: 0, text: "", open: false, modalText: "" };

const reducer = (state, action) => {
    switch (action.type) {
        case "setType":
            return { ...state, type: action.payload };
        case "setText":
            return { ...state, text: action.payload };
        case "setOpen":
            return { ...state, open: true, modalText: action.payload };
        case "setClose":
            return { ...state, open: false };
    }
};

// 탈퇴 신청
export const Withdrawal = ({ open, setOpen }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleClickWithdrawal = useCallback(() => {
        if (state.text.length < 10) return dispatch({ type: "setOpen", payload: "탈퇴사유의 상세내용을<br />10자이상 작성해주셔야 합니다" });
        dispatch({ type: "setOpen", payload: "탈퇴 신청되었습니다.<br />탈퇴 심사 후 탈퇴 처리 결과를 안내하겠습니다" });
        setOpen(false);
    }, [state]);

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h4">탈퇴 신청</Typography>
                        <Typography onClick={() => setOpen(false)}>닫기</Typography>
                    </Stack>
                    <Stack direction="row">
                        <Stack sx={{ borderRadius: 2, bgcolor: "#eee", width: 160, "*": { alignItems: "center", display: "flex", p: 3 } }}>
                            <Typography height={80} variant="caption">
                                탈퇴사유
                            </Typography>
                            <Typography variant="caption">내용</Typography>
                        </Stack>
                        <Stack sx={{ "& > *": { alignItems: "center", display: "flex", p: 3 } }} flex={1}>
                            <Stack justifyContent="center" alignItems="flex-start" height={80}>
                                <FormControl>
                                    <RadioGroup value={state.type} row onChange={(e) => dispatch({ type: "setType", payload: e.target.value })}>
                                        <FormControlLabel value="0" control={<Radio />} label="퇴사" />
                                        <FormControlLabel value="1" control={<Radio />} label="부서이동" />
                                        <FormControlLabel value="2" control={<Radio />} label="서비스 미사용" />
                                        <FormControlLabel value="3" control={<Radio />} label="기타" />
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                            <Stack justifyContent="center">
                                <TextField
                                    value={state.text}
                                    onChange={(e) => dispatch({ type: "setText", payload: e.target.value })}
                                    fullWidth
                                    multiline
                                    rows={3}
                                    placeholder="탈퇴사유의 상세 내용을 작성해주세요."
                                />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack alignItems="center">
                        <Typography variant="subtitle1">선택된 멤버 2명을 탈퇴하시겠습니까?</Typography>
                        <Typography variant="caption" color="red">
                            탈퇴시 회원정보 및 이용기록은 복구되지 않습니다.
                        </Typography>
                    </Stack>
                    <Button color="primary" sx={{ alignSelf: "center", width: 200 }} onClick={handleClickWithdrawal}>
                        탈퇴
                    </Button>
                </Stack>
            </Dialog>

            <Dialog open={state.open} onClose={() => dispatch({ type: "setClose" })} maxWidth="xs">
                <Stack p={3} spacing={3}>
                    <Typography textAlign="center" variant="caption">
                        <span dangerouslySetInnerHTML={{ __html: state.modalText }} />
                    </Typography>
                    <Button color="primary" sx={{ alignSelf: "center" }} onClick={() => dispatch({ type: "setClose" })}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
};
