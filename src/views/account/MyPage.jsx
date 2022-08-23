import { Typography, Stack, Button } from "@mui/material";
import { sampleIcon } from "../../ui-component/icons/icons";
import MainCard from "../../ui-component/cards/MainCard";

export default function MyPage() {
    return (
        <Stack spacing={3}>
            <Stack direction="row">
                <Typography variant="h2" alignItems="center">
                    {sampleIcon()}
                    <label style={{ marginLeft: "0.4rem" }}>내 정보</label>
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button>탈퇴 신청</Button>
                    <Button color="primary">수정</Button>
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
                            <Button>비밀번호 변경</Button>
                        </Stack>
                        <Typography>010-1234-4567</Typography>
                    </Stack>
                </Stack>
            </MainCard>
        </Stack>
    );
}
