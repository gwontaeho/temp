import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
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
} from "@mui/material";
import { PageCard, PageTitle, CountCard } from "../../components";

export const Qna = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>문의 관리</PageTitle>
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
                        <Typography>문의유형</Typography>
                        <RadioGroup defaultValue={0} row>
                            <FormControlLabel value={0} control={<Radio />} label="전체" />
                            <FormControlLabel value={1} control={<Radio />} label="구독문의" />
                            <FormControlLabel value={2} control={<Radio />} label="사용문의" />
                            <FormControlLabel value={3} control={<Radio />} label="오류신고" />
                            <FormControlLabel value={4} control={<Radio />} label="기타문의" />
                        </RadioGroup>
                    </Stack>
                    <Stack>
                        <Typography>검색기간</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                            <Typography>~</Typography>
                            <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography>검색어</Typography>
                        <Select></Select>
                        <TextField fullWidth />
                        <Button>검색</Button>
                    </Stack>
                </Stack>

                <Stack spacing={3}>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead bgColor="#eee">
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>문의유형</TableCell>
                                    <TableCell>서비스 구분</TableCell>
                                    <TableCell>이메일</TableCell>
                                    <TableCell>제목</TableCell>
                                    <TableCell>문의일시</TableCell>
                                    <TableCell>응답자</TableCell>
                                    <TableCell>상태</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v) => {
                                    return (
                                        <TableRow
                                            key={v}
                                            onClick={() => navigate("/support/qna/detail")}
                                            sx={{
                                                cursor: "pointer",
                                                ":hover": {
                                                    bgcolor: "#eee",
                                                },
                                            }}
                                        >
                                            <TableCell>ID</TableCell>
                                            <TableCell>문의유형</TableCell>
                                            <TableCell>서비스 구분</TableCell>
                                            <TableCell>이메일</TableCell>
                                            <TableCell>제목</TableCell>
                                            <TableCell>문의일시</TableCell>
                                            <TableCell>응답자</TableCell>
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
