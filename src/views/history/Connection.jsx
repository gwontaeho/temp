import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Select, Dialog } from "@mui/material";
import { PageCard, PageTitle, CountCard } from "../../components";

export const Connection = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>접속 기록</PageTitle>
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
                        <Typography>접속일시</Typography>
                    </Stack>
                    <Stack>
                        <Typography>검색어</Typography>
                        <Select></Select>
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
                                <TableCell>IP</TableCell>
                                <TableCell>접속일시</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[0, 1, 2].map((v) => {
                                return (
                                    <TableRow key={v}>
                                        <TableCell>번호</TableCell>
                                        <TableCell>이메일</TableCell>
                                        <TableCell>이름</TableCell>
                                        <TableCell>IP</TableCell>
                                        <TableCell>접속일시</TableCell>
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
