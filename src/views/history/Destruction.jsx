import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
    Typography,
    Stack,
    Table,
    TableBody,
    TableCell,
    MenuItem,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Select,
    Dialog,
} from "@mui/material";
import { PageCard, PageTitle } from "../../components";

export const Destruction = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>데이터 파기 기록</PageTitle>
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
                        <Typography>파기일시</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                            <Typography>~</Typography>
                            <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography>검색어</Typography>
                        <Select defaultValue={0} sx={{ minWidth: 120 }}>
                            <MenuItem value={0}>전체</MenuItem>
                            <MenuItem value={1}>이메일</MenuItem>
                            <MenuItem value={2}>이름</MenuItem>
                        </Select>
                        <TextField fullWidth />
                        <Button>검색</Button>
                    </Stack>
                </Stack>

                <TableContainer>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead bgColor="#eee">
                            <TableRow>
                                <TableCell>번호</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>사유</TableCell>
                                <TableCell>파기항목</TableCell>
                                <TableCell>파기일시</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[0, 1, 2].map((v) => {
                                return (
                                    <TableRow key={v} sx={{ ":hover": { bgcolor: "#eee" } }}>
                                        <TableCell>번호</TableCell>
                                        <TableCell>이메일</TableCell>
                                        <TableCell>이름</TableCell>
                                        <TableCell>사유</TableCell>
                                        <TableCell>파기항목</TableCell>
                                        <TableCell>파기일시</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PageCard>
        </Stack>
    );
};
