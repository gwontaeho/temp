import { useReducer } from "react";
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
    MenuItem,
} from "@mui/material";
import { PageCard, PageTitle } from "../../components";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const initialState = { checked: [false, false, false] };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "setChecked": {
            const { checked, index } = payload;
            const newChecked = [...state.checked];
            newChecked[index] = checked;
            return { ...state, checked: newChecked };
        }
        case "setAllChecked": {
            const newChecked = [...state.checked].map((v) => (v = payload));
            return { ...state, checked: newChecked };
        }
        default:
            return { ...state };
    }
};

export const Dormancy = () => {
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(reducer, initialState);
    const { checked } = state;
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
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={checked.every((v) => v === true)}
                                            onChange={(e) => dispatch({ type: "setAllChecked", payload: e.target.checked })}
                                        />
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
                                {[0, 1, 2].map((v, index) => {
                                    return (
                                        <TableRow key={v} onClick={() => navigate("/member/user/detail")} sx={{ ":hover": { bgcolor: "#eee" } }}>
                                            <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                                                <Checkbox
                                                    checked={checked[index]}
                                                    onChange={(e) => dispatch({ type: "setChecked", payload: { checked: e.target.checked, index } })}
                                                />
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
