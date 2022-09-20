import { useState, useReducer, useCallback } from "react";
import { Stack, IconButton, Typography, Button, Dialog, TextField, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const initialState = { reason: "0", text: "" };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setReason":
            return { ...state, reason: payload };
        case "setText":
            return { ...state, text: payload };
    }
};

export const Withdrawal = ({ open, setOpen }) => {
    const [openComplete, setOpenComplete] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const [state, dispatch] = useReducer(reducer, initialState);
    const { reason, text } = state;

    const handleClickSubmit = useCallback(() => {
        console.log(state);
        if (text.length < 10) return setOpenAlert(true);
        return setOpenComplete(true);
    }, [state]);

    const handleClickComplete = useCallback(() => {
        setOpenComplete(false);
        setOpen(false);
    }, [state]);

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography fontWeight="bold">탈퇴 신청</Typography>
                        <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    </Stack>

                    <Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography
                                fontWeight="bold"
                                minWidth={150}
                                px={2}
                                py={4}
                                bgcolor="#f2f3f7"
                                sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                            >
                                탈퇴사유
                            </Typography>
                            <FormControl>
                                <RadioGroup row value={reason} onChange={(e) => dispatch({ type: "setReason", payload: e.target.value })}>
                                    <FormControlLabel value="0" control={<Radio />} label="퇴사" />
                                    <FormControlLabel value="1" control={<Radio />} label="부서이동" />
                                    <FormControlLabel value="2" control={<Radio />} label="서비스 미사용" />
                                    <FormControlLabel value="3" control={<Radio />} label="기타" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography
                                fontWeight="bold"
                                minWidth={150}
                                height={100}
                                px={2}
                                py={4}
                                bgcolor="#f2f3f7"
                                sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
                            >
                                내용
                            </Typography>
                            <TextField
                                value={text}
                                onChange={(e) => dispatch({ type: "setText", payload: e.target.value })}
                                fullWidth
                                size="small"
                                rows={2}
                                multiline
                            />
                        </Stack>
                    </Stack>

                    <Stack alignItems="center">
                        <Typography>탈퇴 신청하시겠습니까?</Typography>
                        <Typography color="red" fontWeight="bold">
                            탈퇴시 회원정보 및 이용기록은 복구되지 않습니다.
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={3} justifyContent="center">
                        <Button sx={{ alignSelf: "center" }} onClick={() => setOpen(false)} color="_gray">
                            취소
                        </Button>
                        <Button onClick={handleClickSubmit} sx={{ alignSelf: "center" }}>
                            탈퇴 신청
                        </Button>
                    </Stack>
                </Stack>
            </Dialog>

            <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
                <Stack p={5} spacing={3} textAlign="center">
                    <Typography>탈퇴사유의 상세내용을 10자 이상 작성해주세야 합니다</Typography>
                    <Button sx={{ alignSelf: "center" }} onClick={() => setOpenAlert(false)}>
                        확인
                    </Button>
                </Stack>
            </Dialog>

            <Dialog open={openComplete}>
                <Stack p={5} spacing={3} textAlign="center">
                    <Typography>
                        탈퇴 신청되었습니다.
                        <br />
                        탈퇴 심사 후 탈퇴 처리 결과를 안내하겠습니다.
                    </Typography>
                    <Button sx={{ alignSelf: "center" }} onClick={handleClickComplete}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
};
