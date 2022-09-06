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
} from "@mui/material";
import { PageCard, PageTitle, CountCard } from "../../components";

export const Dormancy = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>휴면 회원</PageTitle>
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
                            <FormControlLabel value={0} control={<Radio />} label="휴면전환일" />
                            <FormControlLabel value={1} control={<Radio />} label="휴면해제일" />
                        </RadioGroup>
                    </Stack>
                    <Stack>
                        <Typography>검색어</Typography>
                        <Select></Select>
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
                                    <TableCell padding="checkbox">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>ID</TableCell>
                                    <TableCell>이메일</TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>휴대전화</TableCell>
                                    <TableCell>역할</TableCell>
                                    <TableCell>기관명</TableCell>
                                    <TableCell>휴면전환일</TableCell>
                                    <TableCell>휴면메일발송</TableCell>
                                    <TableCell>상태</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v) => {
                                    return (
                                        <TableRow key={v} onClick={() => navigate("/member/user/detail")}>
                                            <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell>ID</TableCell>
                                            <TableCell>이메일</TableCell>
                                            <TableCell>이름</TableCell>
                                            <TableCell>휴대전화</TableCell>
                                            <TableCell>역할</TableCell>
                                            <TableCell>기관명</TableCell>
                                            <TableCell>휴면전환일</TableCell>
                                            <TableCell>휴면메일발송</TableCell>
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
