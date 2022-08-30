import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Dialog, TextField, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";

const PasswordChange = ({ open, setOpen }) => {
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
                            fullWidth
                            size="small"
                            error
                            helperText="비밀번호는 영문(대/소문자 구분, 숫자, 특수 문자를 조합하여 8~16자리로 입력해 주세요."
                        />
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography minWidth={150} px={2} py={4} bgcolor="#f2f3f7" sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                            비밀번호 확인
                        </Typography>

                        <TextField fullWidth size="small" error helperText="작성된 비밀번호와 일치하지 않습니다." />
                    </Stack>
                </Stack>
                <Button variant="contained" sx={{ alignSelf: "center" }} size="small">
                    변경
                </Button>
            </Stack>
        </Dialog>
    );
};

const Withdrawal = ({ open, setOpen }) => {
    const [openAlert, setOpenAlert] = useState(false);

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography>탈퇴 신청</Typography>
                    <Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={4} bgcolor="#f2f3f7" sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                탈퇴사유
                            </Typography>
                            <FormControl>
                                <RadioGroup row defaultValue="female">
                                    <FormControlLabel value="female" control={<Radio size="small" />} label="퇴사" />
                                    <FormControlLabel value="male" control={<Radio size="small" />} label="부서이동" />
                                    <FormControlLabel value="other" control={<Radio size="small" />} label="서비스 미사용" />
                                    <FormControlLabel value="other" control={<Radio size="small" />} label="기타" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography
                                minWidth={150}
                                height={100}
                                px={2}
                                py={4}
                                bgcolor="#f2f3f7"
                                sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
                            >
                                내용
                            </Typography>
                            <TextField fullWidth size="small" rows={2} multiline />
                        </Stack>
                    </Stack>

                    <Stack alignItems="center">
                        <Typography>탈퇴 신청하시겠습니까?</Typography>
                        <Typography color="red" fontWeight="bold">
                            탈퇴시 회원정보 및 이용기록은 복구되지 않습니다.
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={3} justifyContent="center">
                        <Button variant="contained" sx={{ alignSelf: "center" }} size="small" onClick={() => setOpenAlert(true)}>
                            취소
                        </Button>
                        <Button variant="contained" sx={{ alignSelf: "center" }} size="small" onClick={() => setOpenAlert(true)}>
                            탈퇴 신청
                        </Button>
                    </Stack>
                </Stack>
            </Dialog>

            <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
                <Stack p={5} spacing={3} textAlign="center">
                    {/* <Typography>탈퇴사유의 상세내용을 10자 이상 작성해주세야 합니다</Typography> */}
                    <Typography>
                        탈퇴 신청되었습니다.
                        <br />
                        탈퇴 심사 후 탈퇴 처리 결과를 안내하겠습니다.
                    </Typography>
                    <Button size="small" variant="contained" sx={{ alignSelf: "center" }}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
};

export const User = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [openWithdrawal, setOpeWithdrawal] = useState(false);

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                    <Typography variant="subtitle1">내 정보</Typography>
                    <Stack direction="row" spacing={3}>
                        <Button variant="contained" onClick={() => setOpeWithdrawal(true)} size="small">
                            탈퇴신청
                        </Button>
                        <Button variant="contained" onClick={() => navigate("/user/update")} size="small">
                            수정
                        </Button>
                    </Stack>
                </Stack>
                <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3}>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography width={150} px={2} py={3} bgcolor="#f2f3f7" sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                            이메일
                        </Typography>
                        <Typography>U2cloud@U2check.com</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography width={150} px={2} py={3} bgcolor="#f2f3f7">
                            이름
                        </Typography>
                        <Typography>홍길동</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography width={150} px={2} py={3} bgcolor="#f2f3f7">
                            비밀번호
                        </Typography>
                        <Button color="_gray" variant="contained" onClick={() => setOpen(true)} size="small">
                            비밀번호 변경
                        </Button>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography width={150} px={2} py={3} bgcolor="#f2f3f7" sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                            휴대전화
                        </Typography>
                        <Typography>010-1234-1234</Typography>
                    </Stack>
                </Stack>
            </Stack>

            <PasswordChange open={open} setOpen={setOpen} />
            <Withdrawal open={openWithdrawal} setOpen={setOpeWithdrawal} />
        </>
    );
};
