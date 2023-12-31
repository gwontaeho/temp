import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Typography, TextField, Stack, Button, Dialog, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
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

export const Withdrawal = ({ open, setOpen, checked }) => {
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(reducer, initialState);
    const { reason, text } = state;

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
            <Stack p={3} spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography fontWeight="bold">멤버 탈퇴</Typography>
                    <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                        <CloseOutlinedIcon />
                    </IconButton>
                </Stack>

                <Stack>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography minWidth={150} px={2} py={4} bgcolor="#f2f3f7" sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
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
                        <Typography minWidth={150} height={100} px={2} py={4} bgcolor="#f2f3f7" sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                            내용
                        </Typography>
                        <TextField
                            placeholder="탈퇴 사유의 상세내용을 작성해주세요"
                            value={text}
                            onChange={(e) => dispatch({ type: "setText", payload: e.target.value })}
                            fullWidth
                            rows={2}
                            multiline
                        />
                    </Stack>
                </Stack>

                <Stack alignItems="center">
                    <Typography>선택된 멤버 {checked.filter((v) => v === true).length} 명을 탈퇴하시겠습니까?</Typography>
                    <Typography color="red" fontWeight="bold">
                        탈퇴시 회원정보 및 이용기록은 복구되지 않습니다.
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={3} justifyContent="center">
                    <Button color="_gray" sx={{ alignSelf: "center" }} onClick={() => setOpen(false)}>
                        취소
                    </Button>
                    <Button sx={{ alignSelf: "center" }} onClick={() => setOpen(false)}>
                        탈퇴
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    );
};
