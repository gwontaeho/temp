import { Typography, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageCard, PageTitle, CountCard } from "../../components";

export const Team = () => {
    const navigate = useNavigate();
    return (
        <Stack spacing={3}>
            <PageTitle>기관 관리</PageTitle>
            <PageCard spacing={5}>
                <Stack spacing={3}>
                    <Stack direction="row" spacing={1}>
                        <CountCard label="기관수" count="100" />
                        <CountCard label="기관소속 회원수" count="100" />
                    </Stack>
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
                            <Typography>등록일시</Typography>
                            <Typography>등록일시</Typography>
                        </Stack>
                        <Stack>
                            <Typography>검색어</Typography>
                            <Select></Select>
                            <TextField fullWidth />
                            <Button>검색</Button>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack spacing={3}>
                    <Typography>전체 3</Typography>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead bgColor="#eee">
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>기관명</TableCell>
                                    <TableCell>대표자 이름</TableCell>
                                    <TableCell>대표번호</TableCell>
                                    <TableCell>사업자등록번호</TableCell>
                                    <TableCell>소속회원</TableCell>
                                    <TableCell>구독</TableCell>
                                    <TableCell>관리자</TableCell>
                                    <TableCell>등록일</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v) => {
                                    return (
                                        <TableRow key={v} onClick={() => navigate("/member/team/detail")}>
                                            <TableCell>ID</TableCell>
                                            <TableCell>기관명</TableCell>
                                            <TableCell>대표자 이름</TableCell>
                                            <TableCell>대표번호</TableCell>
                                            <TableCell>사업자등록번호</TableCell>
                                            <TableCell>소속회원</TableCell>
                                            <TableCell>구독</TableCell>
                                            <TableCell>관리자</TableCell>
                                            <TableCell>등록일</TableCell>
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
