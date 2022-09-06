import { Typography, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Select, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageCard, PageTitle } from "../../components";

export const TeamDetail = () => {
    const navigate = useNavigate();
    return (
        <Stack spacing={3}>
            <PageTitle>기관 정보</PageTitle>
            <PageCard spacing={5}>
                <Stack spacing={1}>
                    <Typography>기관정보</Typography>
                    <Stack direction="row">
                        <Stack
                            sx={{
                                flex: 1,
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
                                <Typography>기관명</Typography>
                                <Typography>유튜바이오</Typography>
                            </Stack>
                            <Stack>
                                <Typography>대표자 이름</Typography>
                                <Typography>관리자</Typography>
                            </Stack>
                            <Stack>
                                <Typography>발신번호</Typography>
                                <Stack direction="row" alignItems="center" spacing={3}>
                                    <Typography>1577-1338</Typography>
                                    <Chip label="사용중" />
                                </Stack>
                            </Stack>
                            <Stack>
                                <Typography>요양기관번호</Typography>
                                <Typography>11</Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            sx={{
                                flex: 1,
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
                                <Typography>사업자등록번호</Typography>
                                <Typography>123-123-1231</Typography>
                            </Stack>
                            <Stack>
                                <Typography>주소</Typography>
                                <Typography>서울특별시 거마로 65 여명빌딩 유투바이오</Typography>
                            </Stack>
                            <Stack>
                                <Typography>U2Check 연계</Typography>
                                <Typography>인증 완료 (ID: Supervisor)</Typography>
                            </Stack>
                            <Stack>
                                <Typography>기관등록일</Typography>
                                <Typography>2022.02.02</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack spacing={1}>
                    <Typography>소속 회원</Typography>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead bgColor="#eee">
                                <TableRow>
                                    <TableCell>회원명</TableCell>
                                    <TableCell>이메일</TableCell>
                                    <TableCell>휴대전화</TableCell>
                                    <TableCell>역할</TableCell>
                                    <TableCell>마케팅</TableCell>
                                    <TableCell>가입일</TableCell>
                                    <TableCell>회종 로그인</TableCell>
                                    <TableCell>구독</TableCell>
                                    <TableCell>상태</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v) => {
                                    return (
                                        <TableRow key={v} onClick={() => navigate("/member/user/detail")}>
                                            <TableCell>회원명</TableCell>
                                            <TableCell>이메일</TableCell>
                                            <TableCell>휴대전화</TableCell>
                                            <TableCell>역할</TableCell>
                                            <TableCell>마케팅</TableCell>
                                            <TableCell>가입일</TableCell>
                                            <TableCell>회종 로그인</TableCell>
                                            <TableCell>구독</TableCell>
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
