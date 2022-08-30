import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, TextField } from "@mui/material";

export const UserUpdate = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="subtitle1">내 정보</Typography>
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3}>
                <Stack maxWidth="sm" spacing={3}>
                    <Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7" sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                이메일
                            </Typography>
                            <Typography>U2cloud@U2check.com</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                이름
                            </Typography>
                            <TextField size="small" fullWidth />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7" sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                                휴대전화
                            </Typography>
                            <TextField size="small" fullWidth />
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="flex-end" spacing={3}>
                        <Button variant="contained" onClick={() => navigate("/user")} size="small">
                            취소
                        </Button>
                        <Button variant="contained" size="small">
                            저장
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
