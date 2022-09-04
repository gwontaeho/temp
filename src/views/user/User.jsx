import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button } from "@mui/material";

import { ViewTitle } from "../../components/";
import { PasswordChange } from "./user/PasswordChange";
import { Withdrawal } from "./user/Withdrawal";

export const User = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [openWithdrawal, setOpeWithdrawal] = useState(false);

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                    <ViewTitle icon="user" title="내 정보" />
                    <Stack direction="row" spacing={3}>
                        <Button onClick={() => setOpeWithdrawal(true)} color="_gray">
                            탈퇴신청
                        </Button>
                        <Button onClick={() => navigate("/user/update")}>수정</Button>
                    </Stack>
                </Stack>
                <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3}>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7" sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                            이메일
                        </Typography>
                        <Typography>U2cloud@U2check.com</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7">
                            이름
                        </Typography>
                        <Typography>홍길동</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7">
                            비밀번호
                        </Typography>
                        <Button color="_gray" onClick={() => setOpen(true)}>
                            비밀번호 변경
                        </Button>
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
