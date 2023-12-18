import { useReducer, useState, forwardRef } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    Stack,
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
    Checkbox,
    IconButton,
} from "@mui/material";
import { Edit as EditIcon, DeleteOutlineOutlined as DeleteOutlineOutlinedIcon } from "@mui/icons-material";
import { PageCard, PageTitle, CountCard } from "../../components";

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

const DeleteButton = forwardRef(({ icon }, ref) => {
    const [open, setOpen] = useState(false);
    const [check, setCheck] = useState(false);
    return (
        <>
            {icon ? (
                <IconButton onClick={(e) => setOpen(true)}>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            ) : (
                <Button onClick={() => setOpen(true)}>선택 삭제</Button>
            )}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <Stack p={3} spacing={3} alignItems="center">
                    <Typography>선택하신 공지사항을 삭제하시겠습니까?</Typography>
                    <Button onClick={() => setCheck(true)}>삭제</Button>
                </Stack>
            </Dialog>
        </>
    );
});

export const Notice = () => {
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(reducer, initialState);
    const { checked } = state;

    return (
        <Stack spacing={3}>
            <PageTitle>공지사항</PageTitle>
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
                        <Select></Select>
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
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <TextField />
                        <Stack direction="row" spacing={1}>
                            <DeleteButton />
                            <Button onClick={() => navigate("/support/notice/create")}>공지 등록</Button>
                        </Stack>
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
                                    <TableCell>팝업공지</TableCell>
                                    <TableCell>카테고리</TableCell>
                                    <TableCell>제목</TableCell>
                                    <TableCell>등록일</TableCell>
                                    <TableCell>조회수</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v, index) => {
                                    return (
                                        <TableRow
                                            key={v}
                                            onClick={() => navigate("/support/notice/detail")}
                                            sx={{ ":hover": { bgcolor: "#eee" }, cursor: "pointer" }}
                                        >
                                            <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                                                <Checkbox
                                                    checked={checked[index]}
                                                    onChange={(e) => dispatch({ type: "setChecked", payload: { checked: e.target.checked, index } })}
                                                />
                                            </TableCell>
                                            <TableCell>ID</TableCell>
                                            <TableCell>팝업공지</TableCell>
                                            <TableCell>카테고리</TableCell>
                                            <TableCell>제목</TableCell>
                                            <TableCell>등록일</TableCell>
                                            <TableCell>조회수</TableCell>
                                            <TableCell onClick={(e) => e.stopPropagation()} padding="none">
                                                <IconButton onClick={(e) => navigate("/support/notice/update")}>
                                                    <EditIcon />
                                                </IconButton>
                                                <DeleteButton icon={true} />
                                            </TableCell>
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
