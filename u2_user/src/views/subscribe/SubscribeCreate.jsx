import { useNavigate } from "react-router-dom";
import {
    Stack,
    Typography,
    Button,
    IconButton,
    FormControlLabel,
    Radio,
    Checkbox,
    Chip,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    RadioGroup,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ViewTitle } from "../../components/";
export const SubscribeCreate = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3} mb="120px">
            <Stack direction="row" alignItems="center" height={60}>
                <IconButton onClick={() => navigate(-1)} size="large">
                    <ChevronLeftIcon fontSize="inherit" />
                </IconButton>
                <ViewTitle title="구독 신청" />
            </Stack>
            <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={3}>
                <Typography>서비스</Typography>
                <Stack spacing={5}>
                    <Stack bgcolor="#f2f3f7" borderRadius={3}>
                        <Stack borderRadius={3} p={3} spacing={3}>
                            <Stack>
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <FormControlLabel value="female" control={<Radio />} label="U2알리미" />
                                        <Chip label="지금 구독하면 첫달 무료 이용, 200건 무료" color="primary" />
                                        <Chip label="무료체험중" />
                                    </Stack>
                                    <Button variant="text">서비스 상세보기</Button>
                                </Stack>
                                <Typography pl={3} variant="body2">
                                    검진대상자 전용 검진안내 문자 발송 및 카카오 알림톡 발송 서비스
                                </Typography>
                            </Stack>
                            <Stack px={3} spacing={1}>
                                <Typography variant="body2" fontWeight="bold">
                                    요금제
                                </Typography>
                                <RadioGroup>
                                    <Stack p={3} bgcolor="#fff" borderRadius={3} spacing={3}>
                                        <Stack>
                                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <FormControlLabel value="0" control={<Radio />} label="U2Check x 정기결제" />
                                                    <Chip label="구독중" />
                                                </Stack>
                                                <Typography fontWeight="bold">무료</Typography>
                                            </Stack>
                                            <Typography variant="body2" pl={3}>
                                                U2Check 이용 고객 전용 요금제
                                            </Typography>
                                        </Stack>
                                        <Divider />
                                        <Stack>
                                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                <FormControlLabel value="1" control={<Radio />} label="정기 결제" />
                                                <Stack alignItems="center">
                                                    <Typography fontWeight="bold" sx={{ textDecoration: "line-through" }}>
                                                        5,000원
                                                    </Typography>
                                                    <Typography fontWeight="bold">0원</Typography>
                                                </Stack>
                                            </Stack>

                                            <Typography variant="body2" pl={3}>
                                                U2알리미 일반 요금제
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </RadioGroup>
                            </Stack>
                            <Stack px={3} spacing={1}>
                                <Typography variant="body2" fontWeight="bold">
                                    부가서비스
                                </Typography>
                                <Stack p={3} bgcolor="#fff" borderRadius={3} spacing={3}>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <FormControlLabel value="female" control={<Checkbox />} label="검진대상자 마케팅 분석 리포트 제공" />
                                        <Typography fontWeight="bold">5,000원</Typography>
                                    </Stack>
                                    <Stack pl={3}>
                                        <Typography variant="body2">U2Cloud 이용 고객 전용 요금제</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack px={3} spacing={1}>
                                <Typography variant="body2" fontWeight="bold">
                                    사용요금
                                </Typography>
                                <Stack p={3} bgcolor="#fff" borderRadius={3} spacing={3}>
                                    <Stack direction="row" alignItems="center">
                                        <FormControlLabel value="female" control={<Radio />} label="발송 과금 월 정기결제" />
                                        <Chip label="필수" />
                                    </Stack>
                                    <Stack pl={3}>
                                        <TableContainer>
                                            <Table sx={{ minWidth: 600 }}>
                                                <TableHead bgcolor="#f2f3f7">
                                                    <TableRow>
                                                        <TableCell align="center">발송과금</TableCell>
                                                        <TableCell align="center">SMS</TableCell>
                                                        <TableCell align="center">LMS</TableCell>
                                                        <TableCell align="center">카카오 알림톡</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {[0].map((v) => {
                                                        return (
                                                            <TableRow key={v}>
                                                                <TableCell align="center">발송과금</TableCell>
                                                                <TableCell align="center">SMS</TableCell>
                                                                <TableCell align="center">LMS</TableCell>
                                                                <TableCell align="center">카카오 알림톡</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack bgcolor="#f2f3f7" borderRadius={3} p={3} spacing={3}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <FormControlLabel value="female" control={<Radio />} label="U2Survey" />
                                <Chip label="지금 구독하면 첫달 무료 이용, 200건 무료" color="primary" />
                            </Stack>
                            <Button variant="text">서비스 상세보기</Button>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    direction="row"
                    position="fixed"
                    width="calc(100% - 400px)"
                    left={350}
                    bottom={0}
                    height={120}
                    bgcolor="primary.main"
                    py={3}
                    px={5}
                    color="#fff"
                    alignItems="center"
                    spacing={3}
                    sx={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
                >
                    <Stack spacing={1} flex={1}>
                        <Stack direction="row" spacing={3} alignItems="center">
                            <Typography variant="body2" fontWeight="bold">
                                U2Check x 정기결제
                            </Typography>
                        </Stack>
                        <Typography variant="body2">U2Check x 정기결제 + 발송과금 월 정기결제</Typography>
                    </Stack>
                    <Stack direction="row" spacing={10}>
                        <Stack>
                            <Typography>월 구독 금액</Typography>
                            <Typography variant="body2">(부가 과금 미포함)</Typography>
                        </Stack>
                        <Typography variant="h6" fontWeight="bold">
                            10,000 원
                        </Typography>
                    </Stack>
                    <Button>구독</Button>
                </Stack>
            </Stack>
        </Stack>
    );
};
