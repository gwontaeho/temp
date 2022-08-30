import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    TextField,
    Select,
    MenuItem,
    Stack,
    Button,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
} from "@mui/material";

const Withdrawal = ({ open, setOpen }) => {
    const [openAlert, setOpenAlert] = useState(false);

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <Stack p={3} spacing={3}>
                    <Typography>멤버 탈퇴</Typography>
                    <Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography minWidth={150} px={2} py={4} bgcolor="#f2f3f7" sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                탈퇴사유
                            </Typography>
                            <FormControl>
                                <RadioGroup row defaultValue="female">
                                    <FormControlLabel value="female" control={<Radio size="small" />} label="퇴사" />
                                    <FormControlLabel value="male" control={<Radio size="small" />} label="부서이동" />
                                    <FormControlLabel value="other" control={<Radio size="small" />} label="서비스 미사용" />
                                    <FormControlLabel value="other" control={<Radio size="small" />} label="기타" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography
                                minWidth={150}
                                height={100}
                                px={2}
                                py={4}
                                bgcolor="#f2f3f7"
                                sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
                            >
                                내용
                            </Typography>
                            <TextField fullWidth size="small" rows={2} multiline />
                        </Stack>
                    </Stack>

                    <Stack alignItems="center">
                        <Typography>선택된 멤버 2 명을 탈퇴하시겠습니까?</Typography>
                        <Typography color="red" fontWeight="bold">
                            탈퇴시 회원정보 및 이용기록은 복구되지 않습니다.
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={3} justifyContent="center">
                        <Button variant="contained" sx={{ alignSelf: "center" }} size="small" onClick={() => setOpenAlert(true)}>
                            취소
                        </Button>
                        <Button variant="contained" sx={{ alignSelf: "center" }} size="small" onClick={() => setOpenAlert(true)}>
                            탈퇴 신청
                        </Button>
                    </Stack>
                </Stack>
            </Dialog>

            <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
                <Stack p={5} spacing={3} textAlign="center">
                    {/* <Typography>탈퇴사유의 상세내용을 10자 이상 작성해주세야 합니다</Typography> */}
                    <Typography>
                        탈퇴 신청되었습니다.
                        <br />
                        탈퇴 심사 후 탈퇴 처리 결과를 안내하겠습니다.
                    </Typography>
                    <Button size="small" variant="contained" sx={{ alignSelf: "center" }}>
                        확인
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
};

const Invite = ({ open, setOpen }) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
            <Stack p={3} spacing={3}>
                <Typography>멤버 초대</Typography>
                <TableContainer>
                    <Table sx={{ minWidth: 500 }}>
                        <TableHead bgColor="#f2f3f7">
                            <TableRow>
                                <TableCell align="center">No</TableCell>
                                <TableCell align="center">이름</TableCell>
                                <TableCell align="center">이메일</TableCell>
                                <TableCell align="center">역할</TableCell>
                                <TableCell align="center" padding="checkbox">
                                    <Checkbox size="small" />
                                </TableCell>
                                <TableCell align="center" padding="checkbox">
                                    <Checkbox size="small" />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[0, 1, 2, 3, 4, 5].map((v, i) => {
                                return (
                                    <TableRow key={v}>
                                        <TableCell align="center">{i + 1}</TableCell>
                                        <TableCell align="center">
                                            <TextField size="small" />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField size="small" />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Select value={0} size="small">
                                                <MenuItem value={0}>관리자</MenuItem>
                                                <MenuItem value={1}>멤버</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell align="center" padding="checkbox">
                                            <Checkbox size="small" />
                                        </TableCell>
                                        <TableCell align="center" padding="checkbox">
                                            <Checkbox size="small" />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography>초대 멤버 수 : 1</Typography>
                <Stack direction="row" spacing={3} justifyContent="center">
                    <Button color="_gray" variant="contained" size="small">
                        취소
                    </Button>
                    <Button variant="contained" size="small">
                        초대 메일 발송
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    );
};

export const Member = () => {
    const navigate = useNavigate();

    const [openInvite, setOpenInvite] = useState(false);
    const [openWithdrawal, setOpenWithdrawal] = useState(false);

    return (
        <>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                    <Typography variant="subtitle1">멤버 관리</Typography>
                </Stack>
                <Stack bgcolor="#fff" flex={1} borderRadius={3} p={3} spacing={3}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">전체 3건</Typography>
                        <Stack direction="row" spacing={3}>
                            <Button variant="contained" size="small" onClick={() => setOpenWithdrawal(true)}>
                                멤버 탈퇴
                            </Button>
                            <Button variant="contained" size="small" onClick={() => setOpenInvite(true)}>
                                멤버 초대
                            </Button>
                        </Stack>
                    </Stack>
                    <TableContainer>
                        <Table sx={{ minWidth: 900 }}>
                            <TableHead bgColor="#f2f3f7">
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox size="small" />
                                    </TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>이메일</TableCell>
                                    <TableCell>휴대전화</TableCell>
                                    <TableCell>가입일</TableCell>
                                    <TableCell>구독</TableCell>
                                    <TableCell>상태</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[0, 1, 2].map((v) => {
                                    return (
                                        <TableRow key={v}>
                                            <TableCell padding="checkbox">
                                                <Checkbox size="small" />
                                            </TableCell>
                                            <TableCell>이름</TableCell>
                                            <TableCell>이메일</TableCell>
                                            <TableCell>휴대전화</TableCell>
                                            <TableCell>가입일</TableCell>
                                            <TableCell>구독</TableCell>
                                            <TableCell>상태</TableCell>
                                            <TableCell>아이콘</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Stack>

            <Invite open={openInvite} setOpen={setOpenInvite} />
            <Withdrawal open={openWithdrawal} setOpen={setOpenWithdrawal} />
        </>
    );
};
