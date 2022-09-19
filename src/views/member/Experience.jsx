import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    Checkbox,
    Stack,
    RadioGroup,
    Radio,
    FormControlLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Select,
    Dialog,
    MenuItem,
} from "@mui/material";
import { PageCard, PageTitle, CountCard } from "../../components";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export const Experience = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>체험 회원</PageTitle>
            <PageCard spacing={5}>
                <Stack
                    sx={{
                        ">div": {
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 3,

                            ">:first-child": {
                                minWidth: 160,
                                bgcolor: "_bg.main",
                                p: 3,
                            },
                        },
                    }}
                >
                    <Stack>
                        <Typography>기간</Typography>
                        <RadioGroup defaultValue={0} row>
                            <FormControlLabel value={0} control={<Radio />} label="체험신청일" />
                            <FormControlLabel value={1} control={<Radio />} label="체험만료일" />
                        </RadioGroup>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                            <Typography>~</Typography>
                            <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography>검색어</Typography>
                        <Select sx={{ minWidth: 120 }} defaultValue={0}>
                            <MenuItem value={0}>전체</MenuItem>
                            <MenuItem value={1}>회원명</MenuItem>
                            <MenuItem value={2}>이메일</MenuItem>
                            <MenuItem value={3}>휴대전화</MenuItem>
                            <MenuItem value={4}>기관명</MenuItem>
                        </Select>
                        <TextField fullWidth />
                        <Button>검색</Button>
                    </Stack>
                </Stack>

                <Stack spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>전체 3</Typography>
                        <Button>엑셀</Button>
                    </Stack>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead bgColor="#eee">
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>이메일</TableCell>
                                    <TableCell>담당자명</TableCell>
                                    <TableCell>휴대전화</TableCell>
                                    <TableCell>서비스</TableCell>
                                    <TableCell>이용/크레딧</TableCell>
                                    <TableCell>체험기간</TableCell>
                                    <TableCell>상태</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v) => {
                                    return (
                                        <TableRow key={v} onClick={() => navigate("/member/user/detail")} sx={{ ":hover": { bgcolor: "#eee" } }}>
                                            <TableCell>ID</TableCell>
                                            <TableCell>이메일</TableCell>
                                            <TableCell>담당자명</TableCell>
                                            <TableCell>휴대전화</TableCell>
                                            <TableCell>서비스</TableCell>
                                            <TableCell>이용/크레딧</TableCell>
                                            <TableCell>체험기간</TableCell>
                                            <TableCell>상태</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </PageCard>
        </Stack>
    );
};
