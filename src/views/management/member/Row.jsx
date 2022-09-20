import { useState, useReducer, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    Stack,
    Checkbox,
    TableCell,
    TableRow,
    IconButton,
    Menu,
    MenuItem,
    Chip,
    Dialog,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Update = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <MenuItem onClick={() => setOpen(true)}>구독 수정</MenuItem>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography fontWeight="bold">구독수정</Typography>
                        <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    </Stack>

                    <Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography
                                fontWeight="bold"
                                minWidth={150}
                                px={2}
                                py={4}
                                bgcolor="#f2f3f7"
                                sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                            >
                                이름
                            </Typography>
                            <Typography>홍길동</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography fontWeight="bold" minWidth={150} px={2} py={4} bgcolor="#f2f3f7">
                                이메일
                            </Typography>
                            <Typography>email@email.com</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography fontWeight="bold" minWidth={150} px={2} py={4} bgcolor="#f2f3f7">
                                휴대전화
                            </Typography>
                            <Typography>010-1234-1234</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography fontWeight="bold" minWidth={150} px={2} py={4} bgcolor="#f2f3f7">
                                역할
                            </Typography>
                            <FormControl>
                                <RadioGroup row>
                                    <FormControlLabel value="0" control={<Radio />} label="멤버" />
                                    <FormControlLabel value="1" control={<Radio />} label="관리자" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Typography
                                fontWeight="bold"
                                minWidth={150}
                                height={100}
                                px={2}
                                py={4}
                                bgcolor="#f2f3f7"
                                sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
                            >
                                구독 요금제
                            </Typography>
                            <FormControlLabel control={<Checkbox />} label="U2알리미 정기결제" />
                        </Stack>
                    </Stack>

                    <Stack direction="row" spacing={3} justifyContent="center">
                        <Button>수정</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

const Invite = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Chip label="초대 재발송" variant="outlined" onClick={() => setOpen(true)} />
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography fontWeight="bold">초대 재발송</Typography>
                        <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    </Stack>

                    <Stack spacing={3} alignItems="center">
                        <Typography>선택된 멤버에게 초대 메일을 다시 발송하시겠습니까?</Typography>
                        <Button>확인</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

const Withdrawal = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <MenuItem onClick={() => setOpen(true)}>멤버 탈퇴</MenuItem>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography fontWeight="bold">멤버 탈퇴</Typography>
                        <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    </Stack>

                    <Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography
                                fontWeight="bold"
                                minWidth={150}
                                px={2}
                                py={4}
                                bgcolor="#f2f3f7"
                                sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                            >
                                탈퇴사유
                            </Typography>
                            <FormControl>
                                <RadioGroup row>
                                    <FormControlLabel value="0" control={<Radio />} label="퇴사" />
                                    <FormControlLabel value="1" control={<Radio />} label="부서이동" />
                                    <FormControlLabel value="2" control={<Radio />} label="서비스 미사용" />
                                    <FormControlLabel value="3" control={<Radio />} label="기타" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography
                                fontWeight="bold"
                                minWidth={150}
                                height={100}
                                px={2}
                                py={4}
                                bgcolor="#f2f3f7"
                                sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
                            >
                                내용
                            </Typography>
                            <TextField placeholder="탈퇴 사유의 상세내용을 작성해주세요" fullWidth size="small" rows={2} multiline />
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography color="red" textAlign="center">
                            탈퇴시 회원정보 및 이용기록은 복구되지 않습니다.
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={3} justifyContent="center">
                        <Button>취소</Button>
                        <Button>탈퇴</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

const Dormancy = () => {
    const [open, setOpen] = useState(false);
    const [check, setCheck] = useState(false);
    const handleClick = useCallback(() => {
        setOpen(false);
        setCheck(true);
    }, []);

    return (
        <>
            <MenuItem onClick={() => setOpen(true)}>휴면 해제</MenuItem>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography fontWeight="bold">휴면 해제</Typography>
                        <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    </Stack>

                    <Stack spacing={3} alignItems="center">
                        <Typography>000 님을 휴면해제 하시겠습니까?</Typography>
                        <Button onClick={handleClick}>확인</Button>
                    </Stack>
                </Stack>
            </Dialog>
            <Dialog open={check} onClose={() => setCheck(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography fontWeight="bold">휴면 해제</Typography>
                    <Stack spacing={3} alignItems="center">
                        <Typography>님의 휴면 상태가 해제되었습니다</Typography>
                        <Typography>해제일시 : 2022-07-22 15:00</Typography>

                        <Button onClick={() => setCheck(false)}>확인</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

const MenuItemDialog = ({ handleClose, type }) => {
    const [open, setOpen] = useState(false);

    const options = {
        0: { title: "관리자 지정", text: "000님에게 관리자 권한을 부여하시겠습니까?", subtext: "관리자는 구독 및 회원관리를 할 수 있는 권한이 있습니다." },
        1: { title: "탈퇴 철회", text: "000 님의 탈퇴신청을 철회하시겠습니까?" },
        2: { title: "초대 재발송", text: "선택된 멤버에게 초대 메일을 다시 발송하시겠습니까?" },
    };

    const option = options[type];

    return (
        <>
            <MenuItem onClick={() => setOpen(true)}>{option.title}</MenuItem>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography fontWeight="bold">{option.title}</Typography>
                        <IconButton sx={{ alignSelf: "flex-end" }} onClick={() => setOpen(false)}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    </Stack>

                    <Stack spacing={3} alignItems="center">
                        <Typography>{option.text}</Typography>
                        {option.subtext && <Typography variant="body2">{option.subtext}</Typography>}
                        <Button>확인</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    );
};

export const Row = ({ v, i, dispatch, state }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { checked } = state;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <TableRow onClick={() => navigate("/management/member/detail")} sx={{ cursor: "pointer", ":hover": { bgcolor: "#eee" } }}>
            <TableCell padding="checkbox" align="center" onClick={(e) => e.stopPropagation()}>
                <Checkbox checked={checked[i] || false} onChange={(e) => dispatch({ type: "setChecked", payload: { checked: e.target.checked, i } })} />
            </TableCell>
            <TableCell align="center">이름</TableCell>
            <TableCell align="center">이메일</TableCell>
            <TableCell align="center">휴대전화</TableCell>
            <TableCell align="center">가입일</TableCell>
            <TableCell align="center">구독</TableCell>
            <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                <Stack spacing={0.5} alignItems="center">
                    <Typography variant="body2">상태</Typography>
                    <Invite />
                </Stack>
            </TableCell>
            <TableCell padding="none" align="center" onClick={(e) => e.stopPropagation()}>
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <Withdrawal />
                    <Update />
                    <Dormancy />
                    <MenuItemDialog handleClose={handleClose} type={0} />
                    <MenuItemDialog handleClose={handleClose} type={1} />
                    <MenuItemDialog handleClose={handleClose} type={2} />
                </Menu>
            </TableCell>
        </TableRow>
    );
};
