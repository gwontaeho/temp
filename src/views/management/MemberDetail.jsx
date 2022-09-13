import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Stack,
    Typography,
    TextField,
    Dialog,
    Chip,
    Avatar,
    Checkbox,
    MenuItem,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
} from "@mui/material";

import { ViewTitle } from "../../components/";

const Dormancy = () => {
    const [open, setOpen] = useState(false);
    const [check, setCheck] = useState(false);
    const handleClick = useCallback(() => {
        setOpen(false);
        setCheck(true);
    }, []);

    return (
        <>
            <Button onClick={() => setOpen(true)}>휴면 해제</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography fontWeight="bold">휴면 해제</Typography>
                    <Stack spacing={3} alignItems="center">
                        <Typography>000 님을 휴면해제 하시겠습니까?</Typography>
                        <Button onClick={handleClick}>확인</Button>
                    </Stack>
                </Stack>
            </Dialog>
            <Dialog open={check} onClose={() => setCheck(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography fontWeight="bold">휴면 해제</Typography>
                    <Stack spacing={3} alignItems="center">
                        <Typography>님의 휴면 상태가 해제되었습니다</Typography>
                        <Typography>해제일시 : 2022-07-22 15:00</Typography>
                        <Typography>소중한 개인정보를 보호하기 위해 비밀번호를 변경해주세요</Typography>
                        <Button onClick={() => setCheck(false)}>확인</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

const Withdrawal = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)}>멤버 탈퇴</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                <Stack p={3} spacing={3}>
                    <Typography fontWeight="bold">멤버탈퇴</Typography>
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
                                <RadioGroup row>
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
                            <TextField placeholder="탈퇴 사유의 상세내용을 작성해주세요" fullWidth size="small" rows={2} multiline />
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography color="red" textAlign="center">
                            탈퇴시 회원정보 및 이용기록은 복구되지 않습니다.
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={3} justifyContent="center">
                        <Button>취소</Button>
                        <Button>탈퇴</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

const Update = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>구독 수정</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography fontWeight="bold">구독수정</Typography>
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
                                이름
                            </Typography>
                            <Typography>홍길동</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography fontWeight="bold" minWidth={150} px={2} py={4} bgcolor="#f2f3f7">
                                이메일
                            </Typography>
                            <Typography>email@email.com</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography fontWeight="bold" minWidth={150} px={2} py={4} bgcolor="#f2f3f7">
                                휴대전화
                            </Typography>
                            <Typography>010-1234-1234</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography fontWeight="bold" minWidth={150} px={2} py={4} bgcolor="#f2f3f7">
                                역할
                            </Typography>
                            <FormControl>
                                <RadioGroup row>
                                    <FormControlLabel value="0" control={<Radio />} label="멤버" />
                                    <FormControlLabel value="1" control={<Radio />} label="관리자" />
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
                                구독 요금제
                            </Typography>
                            <FormControlLabel control={<Checkbox />} label="U2알리미 정기결제" />
                        </Stack>
                    </Stack>

                    <Stack direction="row" spacing={3} justifyContent="center">
                        <Button>수정</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

const ButtonDialog = ({ handleClose, type }) => {
    const [open, setOpen] = useState(false);

    const options = {
        0: { title: "관리자 지정", text: "000님에게 관리자 권한을 부여하시겠습니까?", subtext: "관리자는 구독 및 회원관리를 할 수 있는 권한이 있습니다." },
        1: { title: "탈퇴 철회", text: "000 님의 탈퇴신청을 철회하시겠습니까?" },
        2: { title: "초대 재발송", text: "초대 메일을 다시 발송하시겠습니까?" },
    };

    const option = options[type];

    return (
        <>
            <Button onClick={() => setOpen(true)}>{option.title}</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography fontWeight="bold">{option.title}</Typography>
                    <Stack spacing={3} alignItems="center">
                        <Typography>{option.text}</Typography>
                        {option.subtext && <Typography variant="body2">{option.subtext}</Typography>}

                        <Button>확인</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

export const MemberDetail = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [openWithdrawal, setOpeWithdrawal] = useState(false);

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                    <ViewTitle icon="user" title="멤버 정보" />
                </Stack>

                <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3} spacing={3}>
                    <Stack alignItems="center" direction="row" spacing={3}>
                        <Avatar />
                        <Typography>홍길동</Typography>
                        <Typography>email@asd.asd</Typography>
                        <Chip label="가입대기" />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography>멤버 상세 정보</Typography>
                        <Stack direction="row" spacing={1}>
                            <Update />
                            <Withdrawal />
                            <Dormancy />
                            <ButtonDialog type={0} />
                            <ButtonDialog type={1} />
                            <ButtonDialog type={2} />
                        </Stack>
                    </Stack>
                    <Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7">
                                이름
                            </Typography>
                            <Typography>홍길동</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7" sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                이메일
                            </Typography>
                            <Typography>U2cloud@U2check.com</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7">
                                휴대전화
                            </Typography>
                            <Typography>010-1234-1234</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7">
                                기관
                            </Typography>
                            <Typography>유투바이오</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7">
                                역할
                            </Typography>
                            <Typography>멤버</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7">
                                가입일
                            </Typography>
                            <Typography>2022-02-02</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7">
                                상태
                            </Typography>
                            <Typography>가입대기</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7">
                                초대일
                            </Typography>
                            <Typography>2022-05-02 11:34 초대 (한미원)</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography
                                fontWeight="bold"
                                width={150}
                                px={2}
                                py={3}
                                bgcolor="#f2f3f7"
                                sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
                            >
                                구독서비스
                            </Typography>
                            <Typography>U2알리미</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
};
