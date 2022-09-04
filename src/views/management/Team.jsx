import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, Dialog } from "@mui/material";
import { ViewTitle } from "../../components/";

export const Team = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <ViewTitle icon="team" title="기관 관리" />
                <Button onClick={() => navigate("/management/team/update")}>수정</Button>
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography fontWeight="bold">등록된 기관 정보가 없습니다.</Typography>
                    <Button onClick={() => navigate("/management/team/create")}>기관 등록</Button>
                </Stack>
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3}>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7" sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                        기관명
                    </Typography>
                    <Typography>U2cloud@U2check.com</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7">
                        사업자등록번호
                    </Typography>
                    <Typography>홍길동</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7">
                        대표자명
                    </Typography>
                    <Typography>홍길동</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7">
                        대표번호
                    </Typography>
                    <Typography>홍길동</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7">
                        주소
                    </Typography>
                    <Typography>홍길동</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7">
                        요양기관번호
                    </Typography>
                    <Typography>1231231212312</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography fontWeight="bold" width={150} px={2} py={3} bgcolor="#f2f3f7" sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                        U2Check 연계
                    </Typography>
                    <Typography>010-1234-1234</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};
