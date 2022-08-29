import { useNavigate } from "react-router-dom";

import { Typography, Stack, Divider } from "@mui/material";

export const Home = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" height={60}>
                <Typography variant="h6">홍길동님 반갑습니다</Typography>
            </Stack>
            <Stack spacing={3}>
                <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={5}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">U2알리미</Typography>
                        <Typography>아이콘</Typography>
                    </Stack>
                    <Stack spacing={3}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography>발송현황</Typography>
                            <Typography>2022.12.12 ~ 2022.12.12</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography>당월</Typography>
                            <Stack height={40} direction="row" flex={1}>
                                <Stack border="1px solid pink" flex={7 / 10} alignItems="center" justifyContent="center">
                                    70%
                                </Stack>
                                <Stack border="1px solid gray" flex={2 / 10} alignItems="center" justifyContent="center">
                                    20%
                                </Stack>
                                <Stack border="1px solid lightgreen" flex={1 / 10} alignItems="center" justifyContent="center">
                                    10%
                                </Stack>
                            </Stack>
                            <Typography>100명</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography>오늘</Typography>
                            <Stack height={40} direction="row" flex={1}>
                                <Stack border="1px solid pink" flex={7 / 10} alignItems="center" justifyContent="center">
                                    70%
                                </Stack>
                                <Stack border="1px solid gray" flex={2 / 10} alignItems="center" justifyContent="center">
                                    20%
                                </Stack>
                                <Stack border="1px solid lightgreen" flex={1 / 10} alignItems="center" justifyContent="center">
                                    10%
                                </Stack>
                            </Stack>
                            <Typography>100명</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={5}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">실시간 이용요금</Typography>
                        <Typography>아이콘</Typography>
                    </Stack>
                    <Stack direction="row">
                        <Stack flex={1} justifyContent="center" alignItems="center" spacing={2}>
                            <Stack direction="row" spacing={5} alignItems="center">
                                <Typography variant="body2">U2알리미 월 정기 결제</Typography>
                                <Typography fontWeight="bold">5,000 원</Typography>
                            </Stack>
                            <Stack direction="row" spacing={5} alignItems="center">
                                <Typography variant="body2">발송 이용요금</Typography>
                                <Typography fontWeight="bold">100,000 원</Typography>
                            </Stack>
                        </Stack>
                        <Divider orientation="vertical" flexItem />
                        <Stack flex={1} justifyContent="center" alignItems="center" spacing={2}>
                            <Typography variant="body2">22.12.12 결제예정</Typography>
                            <Typography variant="h6" fontWeight="bold">
                                총 105,000 원
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction="row" bgcolor="#fff" borderRadius={3} p={3} alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Typography variant="h6">공지사항</Typography>
                        <Typography>U2알리미 오픈 안내</Typography>
                    </Stack>
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Typography>22-05-14</Typography>
                        <Typography>아이콘</Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" bgcolor="#fff" borderRadius={3} p={3} alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Typography variant="h6">문의내역</Typography>
                        <Typography>환불 가능한가요?</Typography>
                    </Stack>
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Typography>22-05-14</Typography>
                        <Typography>아이콘</Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" bgcolor="#fff" borderRadius={3} p={3} alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Typography variant="h6">최근알림</Typography>
                        <Typography>발신번호가 등록되었습니다</Typography>
                    </Stack>
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Typography>22-05-14</Typography>
                        <Typography>아이콘</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
