import { useNavigate } from "react-router-dom";

import { Stack, Typography, Button, TextField, Select, MenuItem, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";

export const QnaCreate = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="h6">문의등록</Typography>
            </Stack>
            <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3}>
                <Stack maxWidth="sm" spacing={3}>
                    <Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7" sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                문의유형
                            </Typography>
                            <FormControl>
                                <RadioGroup row defaultValue="female">
                                    <FormControlLabel value="female" control={<Radio />} label="구독문의" />
                                    <FormControlLabel value="male" control={<Radio />} label="사용문의" />
                                    <FormControlLabel value="other" control={<Radio />} label="오류신고" />
                                    <FormControlLabel value="other" control={<Radio />} label="기타문의" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                서비스 구분
                            </Typography>
                            <FormControl>
                                <RadioGroup row defaultValue="female">
                                    <FormControlLabel value="female" control={<Radio />} label="U2알리미" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                담당자명
                            </Typography>
                            <TextField size="small" fullWidth />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                휴대전화
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1} flex={1}>
                                <Select size="small"></Select>
                                <Typography>-</Typography>
                                <TextField size="small" fullWidth />
                            </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                이메일
                            </Typography>
                            <TextField size="small" fullWidth />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                제목
                            </Typography>
                            <TextField size="small" fullWidth />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} height={180} bgcolor="#f2f3f7">
                                문의내용
                            </Typography>
                            <TextField size="small" rows={6} multiline fullWidth />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={3} bgcolor="#f2f3f7">
                                첨부파일
                            </Typography>
                            <Button variant="contained" size="small">
                                파일 업로드
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={3} justifyContent="flex-end">
                        <Button variant="contained" size="small">
                            취소
                        </Button>
                        <Button variant="contained" size="small">
                            문의 등록
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
