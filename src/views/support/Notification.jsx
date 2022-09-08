import { useCallback, useEffect, useState, forwardRef } from "react";
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
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { MoreVert as MoreVertIcon, DeleteOutlineOutlined as DeleteOutlineOutlinedIcon } from "@mui/icons-material";
import { PageCard, PageTitle } from "../../components";

const MoreButton = () => {
    return (
        <>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        </>
    );
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

export const Notification = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <PageTitle>알림 관리</PageTitle>
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
                        <Typography>상태</Typography>
                        <RadioGroup defaultValue={0} row>
                            <FormControlLabel value={0} control={<Radio />} label="전체" />
                            <FormControlLabel value={1} control={<Radio />} label="발송예정" />
                            <FormControlLabel value={2} control={<Radio />} label="발송완료" />
                        </RadioGroup>
                    </Stack>
                    <Stack>
                        <Typography>발송일시</Typography>
                        <Select></Select>
                    </Stack>
                    <Stack>
                        <Typography>검색어</Typography>
                        <Select></Select>
                        <TextField fullWidth />
                        <Button>검색</Button>
                    </Stack>
                </Stack>

                <Stack spacing={3}>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button onClick={() => navigate("/support/notification/auto")}>자동알림 설정</Button>
                        <Button onClick={() => navigate("/support/notification/create")}>알림 발송</Button>
                    </Stack>

                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead bgColor="#eee">
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>대상자</TableCell>
                                    <TableCell>제목</TableCell>
                                    <TableCell>내용</TableCell>
                                    <TableCell>발송일시</TableCell>
                                    <TableCell>상태</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v) => {
                                    return (
                                        <TableRow key={v} onClick={() => navigate("/support/notification/detail")}>
                                            <TableCell>ID</TableCell>
                                            <TableCell>대상자</TableCell>
                                            <TableCell>제목</TableCell>
                                            <TableCell>내용</TableCell>
                                            <TableCell>발송일시</TableCell>
                                            <TableCell>상태</TableCell>
                                            <TableCell onClick={(e) => e.stopPropagation()} padding="none">
                                                <MoreButton />
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
