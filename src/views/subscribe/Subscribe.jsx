import {
    Typography,
    Stack,
    IconButton,
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Grid,
    Select,
    TextField,
} from "@mui/material";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { PageCard, PageTitle, CountCard } from "../../components";

const Row = () => {
    const navigate = useNavigate();
    return (
        <TableRow onClick={() => navigate("/subscribe/management/member")}>
            <TableCell>ID</TableCell>
            <TableCell>구독서비스</TableCell>
            <TableCell>기관명</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>역할</TableCell>
            <TableCell>이메일</TableCell>
            <TableCell>이용멤버</TableCell>
            <TableCell>이용기간</TableCell>
            <TableCell>상태</TableCell>
        </TableRow>
    );
};

export const Subscribe = () => {
    const navigate = useNavigate();
    return (
        <Stack spacing={3}>
            <PageTitle>구독 회원 관리</PageTitle>
            <PageCard spacing={5} overflow="auto">
                <Stack spacing={3} minWidth={1000}>
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Typography>U2알리미</Typography>
                        <CountCard label="전체" count="100" />
                        <CountCard label="U2Check x 정기결제" count="100" />
                        <CountCard label="정기결제" count="100" />
                    </Stack>
                    <Stack>
                        <Grid
                            container
                            sx={{
                                "&>div>div": {
                                    flexDirection: "row",
                                    alignItems: "center",
                                    "&>:first-child": { p: 3, minWidth: 120, mr: 3, bgcolor: "_bg.main" },
                                },
                            }}
                        >
                            <Grid item xs={6}>
                                <Stack>
                                    <Typography>서비스</Typography>
                                    <RadioGroup defaultValue={0} row>
                                        <FormControlLabel value={0} control={<Radio />} label="전체" />
                                        <FormControlLabel value={1} control={<Radio />} label="U2알리미" />
                                    </RadioGroup>
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack>
                                    <Typography>구독기간</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack>
                                    <Typography>요금제</Typography>
                                    <RadioGroup defaultValue={0} row>
                                        <FormControlLabel value={0} control={<Radio />} label="U2Check x 정기결제" />
                                        <FormControlLabel value={1} control={<Radio />} label="정기결제" />
                                    </RadioGroup>
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack>
                                    <Typography>구독상태</Typography>
                                    <RadioGroup defaultValue={0} row>
                                        <FormControlLabel value={0} control={<Radio />} label="전체" />
                                        <FormControlLabel value={1} control={<Radio />} label="구독중" />
                                        <FormControlLabel value={2} control={<Radio />} label="구독취소" />
                                        <FormControlLabel value={3} control={<Radio />} label="구독해지" />
                                    </RadioGroup>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack>
                                    <Typography>검색어</Typography>
                                    <Stack direction="row" spacing={1} alignItems="center" flex={1}>
                                        <Select></Select>
                                        <TextField fullWidth />
                                        <Button>검색</Button>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>
                <Stack spacing={3} minWidth={1000}>
                    <Typography>전체 100</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead bgColor="#eee">
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>구독서비스</TableCell>
                                    <TableCell>기관명</TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>역할</TableCell>
                                    <TableCell>이메일</TableCell>
                                    <TableCell>이용멤버</TableCell>
                                    <TableCell>이용기간</TableCell>
                                    <TableCell>상태</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2, 3].map((v) => {
                                    return <Row key={v} />;
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </PageCard>
        </Stack>
    );
};
