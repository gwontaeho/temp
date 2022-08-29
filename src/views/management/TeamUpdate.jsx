import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button, TextField, Select, MenuItem } from "@mui/material";

export const TeamUpdate = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="h6">기관 관리</Typography>
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3}>
                <Stack maxWidth="sm" spacing={3}>
                    <Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7" sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                기관명
                            </Typography>
                            <Typography>U2cloud@U2check.com</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                사업자등록번호
                            </Typography>
                            <Typography>홍길동</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                대표자명
                            </Typography>
                            <TextField size="small" fullWidth />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                대표번호
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1} flex={1}>
                                <Select size="small"></Select>
                                <Typography>-</Typography>
                                <TextField size="small" fullWidth />
                            </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} height={180} bgcolor="#f2f3f7">
                                주소
                            </Typography>
                            <Stack height="100%" justifyContent="space-around" flex={1}>
                                <Stack direction="row" spacing={3} alignItems="center">
                                    <TextField size="small" fullWidth />
                                    <Button variant="contained" size="small">
                                        검색
                                    </Button>
                                </Stack>
                                <TextField size="small" fullWidth />
                                <TextField size="small" fullWidth />
                            </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                요양기관번호
                            </Typography>
                            <TextField size="small" fullWidth />
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={3} justifyContent="flex-end">
                        <Button variant="contained" size="small">
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
