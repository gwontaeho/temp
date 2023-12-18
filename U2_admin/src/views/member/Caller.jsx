import { useNavigate } from "react-router-dom";
import {
    Typography,
    MenuItem,
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
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { PageCard, PageTitle } from "../../components";

export const Caller = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>발신번호 관리</PageTitle>
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
                            <FormControlLabel value={0} control={<Radio />} label="전체" />
                            <FormControlLabel value={1} control={<Radio />} label="등록요청" />
                            <FormControlLabel value={2} control={<Radio />} label="사용중" />
                            <FormControlLabel value={3} control={<Radio />} label="심사중" />
                            <FormControlLabel value={4} control={<Radio />} label="등록보류" />
                        </RadioGroup>
                    </Stack>
                    <Stack>
                        <Typography>등록요청일</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                            <Typography>~</Typography>
                            <DesktopDatePicker inputFormat="YYYY-MM-DD" renderInput={(params) => <TextField {...params} />} />
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography>검색어</Typography>
                        <Select defaultValue={0}>
                            <MenuItem value={0}>전체</MenuItem>
                            <MenuItem value={1}>이름</MenuItem>
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
                                    <TableCell>이름</TableCell>
                                    <TableCell>기관명</TableCell>
                                    <TableCell>발신번호</TableCell>
                                    <TableCell>등록요청일</TableCell>
                                    <TableCell>상태</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v) => {
                                    return (
                                        <TableRow
                                            key={v}
                                            onClick={() => navigate("/member/caller/detail")}
                                            sx={{
                                                cursor: "pointer",
                                                ":hover": {
                                                    bgcolor: "#eee",
                                                },
                                            }}
                                        >
                                            <TableCell>ID</TableCell>
                                            <TableCell>이메일</TableCell>
                                            <TableCell>이름</TableCell>
                                            <TableCell>기관명</TableCell>
                                            <TableCell>발신번호</TableCell>
                                            <TableCell>등록요청일</TableCell>
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
