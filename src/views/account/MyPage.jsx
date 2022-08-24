import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Button, Dialog, TextField, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import { sampleIcon } from "../../ui-component/icons/icons";
import MainCard from "../../ui-component/cards/MainCard";

// 비밀번호 변경
const PasswordReset = ({ open, setOpen }) => {
    const [password, setPassword] = useState({ value: "", validation: false });
    const [passwordCheck, setPasswordCheck] = useState({ value: "", validation: false });

    useEffect(() => {
        setPassword({ value: "", validation: false });
        setPasswordCheck({ value: "", validation: false });
    }, [open]);

    const handleClickChange = useCallback(() => {
        // 비밀번호 정규식 적용
        // if () return setPassword({ value: "", validation: true });
        if (password.value !== passwordCheck.value) return setPasswordCheck({ value: "", validation: true });

        // 비밀번호 변경 로직

        setOpen(false);
    }, [password, passwordCheck]);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
            <Stack p={3} spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h4">비밀번호 변경</Typography>
                    <Typography onClick={() => setOpen(false)}>닫기</Typography>
                </Stack>
                <Stack direction="row">
                    <Stack sx={{ borderRadius: 2, bgcolor: "#eee", width: 160, "*": { height: 120, alignItems: "center", display: "flex", p: 3 } }}>
                        <Typography>비밀번호</Typography>
                        <Typography>비밀번호 확인</Typography>
                    </Stack>
                    <Stack sx={{ "& > *": { height: 120, alignItems: "center", display: "flex", p: 3 } }} flex={1}>
                        <Stack justifyContent="center" position="relative">
                            <TextField
                                fullWidth
                                value={password.value}
                                type="password"
                                onChange={(e) => setPassword((prev) => ({ value: e.target.value, validation: false }))}
                            />
                            {password.validation && (
                                <Typography variant="caption" color="red" sx={{ position: "absolute", bottom: -12, left: 24 }}>
                                    비밀번호는 영문 대소문자, 숫자, 특수 문자를 2가지 이상 조합하여 8~16자리로 입력해주세요.
                                </Typography>
                            )}
                        </Stack>
                        <Stack justifyContent="center" position="relative">
                            <TextField
                                fullWidth
                                value={passwordCheck.value}
                                type="password"
                                onChange={(e) => setPasswordCheck((prev) => ({ value: e.target.value, validation: false }))}
                            />
                            {passwordCheck.validation && (
                                <Typography variant="caption" color="red" sx={{ position: "absolute", bottom: 12, left: 24 }}>
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

// 탈퇴 신청
const Withdrawal = ({ open, setOpen }) => {
    const [type, setType] = useState(0);
    const [text, setText] = useState("");

    const handleClickWithdrawal = useCallback(() => {
        setOpen(false);
    }, [type, text]);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
            <Stack p={3} spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h4">탈퇴 신청</Typography>
                    <Typography onClick={() => setOpen(false)}>닫기</Typography>
                </Stack>
                <Stack direction="row">
                    <Stack sx={{ borderRadius: 2, bgcolor: "#eee", width: 160, "*": { height: 120, alignItems: "center", display: "flex", p: 3 } }}>
                        <Typography>탈퇴사유</Typography>
                        <Typography>내용</Typography>
                    </Stack>
                    <Stack sx={{ "& > *": { height: 120, alignItems: "center", display: "flex", p: 3 } }} flex={1}>
                        <Stack justifyContent="center" alignItems="flex-start">
                            <FormControl>
                                <RadioGroup defaultValue="0" row>
                                    <FormControlLabel value="0" control={<Radio />} label="퇴사" />
                                    <FormControlLabel value="1" control={<Radio />} label="부서이동" />
                                    <FormControlLabel value="2" control={<Radio />} label="서비스 미사용" />
                                    <FormControlLabel value="3" control={<Radio />} label="기타" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                        <Stack justifyContent="center">
                            <TextField fullWidth multiline rows={3} placeholder="탈퇴사유의 상세 내용을 작성해주세요." />
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
    );
};

export default function MyPage() {
    const navigate = useNavigate();

    const [openPasswordReset, setOpenPasswordReset] = useState(false);
    const [openWithdrawal, setOpenWithdrawal] = useState(false);

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row">
                    <Typography variant="h2" alignItems="center">
                        {sampleIcon()}
                        <label style={{ marginLeft: "0.4rem" }}>내 정보</label>
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Button onClick={() => setOpenWithdrawal(true)}>탈퇴 신청</Button>
                        <Button color="primary" onClick={() => navigate("/mypage/update")}>
                            수정
                        </Button>
                    </Stack>
                </Stack>
                <MainCard>
                    <Stack direction="row">
                        <Stack sx={{ borderRadius: 2, bgcolor: "#eee", width: 160, "*": { height: 80, alignItems: "center", display: "flex", p: 3 } }}>
                            <Typography>이메일</Typography>
                            <Typography>이름</Typography>
                            <Typography>비밀번호</Typography>
                            <Typography>휴대전화</Typography>
                        </Stack>
                        <Stack sx={{ "& > *": { height: 80, alignItems: "center", display: "flex", p: 3 } }}>
                            <Typography>U2cloud@U2check.com</Typography>
                            <Typography>홍길동</Typography>
                            <Stack alignItems="flex-start">
                                <Button onClick={() => setOpenPasswordReset(true)}>비밀번호 변경</Button>
                            </Stack>
                            <Typography>010-1234-4567</Typography>
                        </Stack>
                    </Stack>
                </MainCard>
            </Stack>

            <PasswordReset open={openPasswordReset} setOpen={setOpenPasswordReset} />
            <Withdrawal open={openWithdrawal} setOpen={setOpenWithdrawal} />
        </>
    );
}
