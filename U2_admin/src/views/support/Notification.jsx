import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
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
    IconButton,
    RadioGroup,
    FormControlLabel,
    Radio,
    Menu,
    MenuItem,
    Avatar,
    Chip,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";

import { PageCard, PageTitle } from "../../components";

const MoreButton = ({ setOpenDetail }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => setOpenDetail(true)}>상세보기</MenuItem>
                <MenuItem onClick={() => navigate("/support/notification/update")}>수정</MenuItem>
                <MenuItem>발송취소</MenuItem>
            </Menu>
        </>
    );
};

const NotificationDetail = ({ open, setOpen }) => {
    const navigate = useNavigate();
    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <Stack p={3} spacing={3}>
                <Typography>알림 내용</Typography>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Avatar />
                    <Typography>email@email.com</Typography>
                    <Chip label="발송예정" />
                </Stack>
                <Typography>발신번호가 등록되었습니다.</Typography>
                <Typography>문자 발신번호가 1577-1338으로 등록되었습니다. 등록된 발신번호로 발송예약해보세요.</Typography>
                <Typography>2020-02-02 10:00</Typography>
                <Stack direction="row" spacing={3} justifyContent="center">
                    <Button>발송 취소</Button>
                    <Button onClick={() => navigate("/support/notification/update")}>수정</Button>
                </Stack>
            </Stack>
        </Dialog>
    );
};

export const Notification = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    return (
        <>
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
                            <Select defaultValue={0} sx={{ minWidth: 120 }}>
                                <MenuItem value={0}>전체</MenuItem>
                                <MenuItem value={1}>발송예정</MenuItem>
                                <MenuItem value={2}>발송완료</MenuItem>
                            </Select>
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
                                <MenuItem value={1}>발송예정</MenuItem>
                                <MenuItem value={2}>발송완료</MenuItem>
                            </Select>
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
                                            <TableRow key={v} onClick={() => setOpen(true)} sx={{ cursor: "pointer", ":hover": { bgcolor: "#eee" } }}>
                                                <TableCell>ID</TableCell>
                                                <TableCell>대상자</TableCell>
                                                <TableCell>제목</TableCell>
                                                <TableCell>내용</TableCell>
                                                <TableCell>발송일시</TableCell>
                                                <TableCell>상태</TableCell>
                                                <TableCell onClick={(e) => e.stopPropagation()} padding="none">
                                                    <IconButton onClick={() => navigate("/support/notification/update")}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton>
                                                        <CloseIcon />
                                                    </IconButton>
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
            <NotificationDetail open={open} setOpen={setOpen} />
        </>
    );
};
