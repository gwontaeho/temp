import { useNavigate } from "react-router-dom";
import { IconButton, Stack, Typography, Button, Divider, Chip } from "@mui/material";
import { ViewTitle } from "../../components/";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export const BillDetail = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" height={60}>
                <IconButton onClick={() => navigate(-1)}>
                    <ChevronLeftIcon />
                </IconButton>
                <ViewTitle title="결제 내역" />
            </Stack>
            <Stack spacing={5}>
                <Stack spacing={3}>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography fontWeight="bold">22년 5월 결제금액</Typography>
                        <Typography variant="h5" fontWeight="bold">
                            48,400 원
                        </Typography>
                        <Chip label="결제대기" />
                    </Stack>
                    <Stack bgcolor="#fff" borderRadius={3} p={3} overflow="auto" spacing={3}>
                        <Stack spacing={5} minWidth={900}>
                            <Stack direction="row" alignItems="center">
                                <Stack direction="row" flex={2} alignItems="center" justifyContent="center" spacing={2}>
                                    <Typography variant="body2">결제수단</Typography>
                                    <Typography fontWeight="bold">신한 카드(1234-****-****-5678)</Typography>
                                </Stack>
                                <Divider orientation="vertical" />
                                <Stack direction="row" flex={1} justifyContent="center" alignItems="center" spacing={2}>
                                    <Typography variant="body2">결제일</Typography>
                                    <Typography fontWeight="bold">2022년 06월 05일</Typography>
                                </Stack>
                                <Divider orientation="vertical" />
                                <Stack direction="row" flex={1} justifyContent="center" alignItems="center" spacing={2}>
                                    <Typography variant="body2">금액</Typography>
                                    <Typography fontWeight="bold">48,400 원</Typography>
                                </Stack>
                            </Stack>
                            <Stack direction="row">
                                <Stack flex={2}>
                                    <Typography p={1} textAlign="center" bgcolor="#f2f3f7">
                                        서비스명
                                    </Typography>
                                    <Stack p={2} alignItems="center" spacing={2}>
                                        <Typography>U2알리미</Typography>
                                        <Stack p={1} bgcolor="#f2f3f7" borderRadius={1} direction="row" spacing={2}>
                                            <Typography variant="body2">이용기간</Typography>
                                            <Typography variant="caption">
                                                2022.12.12
                                                <br />~ 2022.12.12
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Divider orientation="vertical" flexItem />
                                <Stack flex={2}>
                                    <Typography p={1} textAlign="center" bgcolor="#f2f3f7">
                                        월정액
                                    </Typography>
                                    <Stack p={2} alignItems="center">
                                        <Typography>U2알리미 정기결제 5,000 원</Typography>
                                    </Stack>
                                </Stack>
                                <Divider orientation="vertical" flexItem />
                                <Stack flex={2}>
                                    <Typography p={1} textAlign="center" bgcolor="#f2f3f7">
                                        부가서비스 사용료
                                    </Typography>
                                    <Stack alignItems="center" p={2} spacing={2}>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="body2">SMS</Typography>
                                            <Typography variant="body2">10원 x 1,000 건</Typography>
                                            <Typography variant="body2">10,000 원</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="body2">SMS</Typography>
                                            <Typography variant="body2">10원 x 1,000 건</Typography>
                                            <Typography variant="body2">10,000 원</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="body2">SMS</Typography>
                                            <Typography variant="body2">10원 x 1,000 건</Typography>
                                            <Typography variant="body2">10,000 원</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Divider orientation="vertical" flexItem />
                                <Stack flex={1}>
                                    <Typography p={1} textAlign="center" bgcolor="#f2f3f7">
                                        할인
                                    </Typography>
                                    <Stack p={2} alignItems="center">
                                        <Typography>4,400원</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction="row" justifyContent="center" spacing={3}>
                            <Button color="_gray" onClick={() => navigate(-1)}>
                                뒤로가기
                            </Button>
                            <Button>매출전표 출력</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
