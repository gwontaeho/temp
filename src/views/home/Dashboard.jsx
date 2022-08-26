import { useSelector } from "react-redux";
import { Typography, Stack, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import MainCard from "../../ui-component/cards/MainCard";

const Dashboard = () => {
    const navigate = useNavigate();
    const memberInfo = useSelector((state) => state.session?.memberInfo);

    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h2" flexGrow={0}>
                    {memberInfo.memberName || "홍길동"}
                </Typography>
                <Typography>님 반갑습니다.</Typography>
            </Stack>
            <Stack spacing={3}>
                <MainCard>
                    <Stack spacing={5}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" border="1px solid #eee" p={2} borderRadius={2}>
                            <Typography variant="h4">U2알리미</Typography>
                            <Typography>아이콘</Typography>
                        </Stack>
                        <Stack spacing={3} p={3}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography variant="subtitle1">발송현황</Typography>
                                <Typography>2022.12.12 ~ 2022.12.31</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <Typography width={100} variant="subtitle2">
                                    오늘
                                </Typography>
                                <Stack direction="row" flex={1} height={50}>
                                    <Stack border="1px solid #eee" bgcolor="#eee" flex={1.5} alignItems="center" justifyContent="center">
                                        50%
                                    </Stack>
                                    <Stack border="1px solid #eee" bgcolor="#ddd" flex={1} alignItems="center" justifyContent="center">
                                        40%
                                    </Stack>
                                    <Stack border="1px solid #eee" bgcolor="#ccc" flex={0.5} alignItems="center" justifyContent="center">
                                        10%
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <Typography width={100} variant="subtitle2">
                                    당월
                                </Typography>
                                <Stack direction="row" flex={1} height={50}>
                                    <Stack border="1px solid #eee" bgcolor="#eee" flex={1.5} alignItems="center" justifyContent="center">
                                        50%
                                    </Stack>
                                    <Stack border="1px solid #eee" bgcolor="#ddd" flex={1} alignItems="center" justifyContent="center">
                                        40%
                                    </Stack>
                                    <Stack border="1px solid #eee" bgcolor="#ccc" flex={0.5} alignItems="center" justifyContent="center">
                                        10%
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack direction="row" justifyContent="center" spacing={3}>
                                <Typography>추가 이용 금액 약 10,000원</Typography>
                                <Typography>이용 금액 100,000원</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </MainCard>
                <MainCard>
                    <Stack spacing={5}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            border="1px solid #eee"
                            p={2}
                            borderRadius={2}
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate("/subscribe/fee")}
                        >
                            <Typography variant="h4">실시간 이용요금</Typography>
                            <Typography>아이콘</Typography>
                        </Stack>

                        <Stack spacing={3} p={3} direction="row">
                            <Stack flex={1} alignItems="center" justifyContent="center" spacing={3}>
                                <Stack direction="row" spacing={3}>
                                    <Typography>U2알리미 월 정기 결제</Typography>
                                    <Typography>5,000원</Typography>
                                </Stack>
                                <Stack direction="row" spacing={3}>
                                    <Typography>발송 이용요금</Typography>
                                    <Typography>100,000원</Typography>
                                </Stack>
                            </Stack>
                            <Divider orientation="vertical" flexItem />
                            <Stack flex={1} alignItems="center" justifyContent="center">
                                <Typography>총 105,000원</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </MainCard>
                <MainCard onClick={() => navigate("/support/notice")} sx={{ cursor: "pointer" }}>
                    <Stack direction="row" spacing={5}>
                        <Typography variant="h4">공지사항</Typography>
                        <Typography flex={1}>U2알리미 오픈 안내</Typography>
                        <Typography variant="caption">22-05-14</Typography>
                        <Typography>아이콘</Typography>
                    </Stack>
                </MainCard>
                <MainCard onClick={() => navigate("/support/qna")} sx={{ cursor: "pointer" }}>
                    <Stack direction="row" spacing={5}>
                        <Typography variant="h4">문의내역</Typography>
                        <Typography flex={1}>환불 가능한가요?</Typography>
                        <Typography variant="caption">22-05-14</Typography>
                        <Typography>아이콘</Typography>
                    </Stack>
                </MainCard>

                <MainCard sx={{ cursor: "pointer" }}>
                    <Stack direction="row" spacing={5}>
                        <Typography variant="h4">최근알림</Typography>
                        <Typography flex={1}>발신번호가 등록되었습니다</Typography>
                        <Typography variant="caption">22-05-14</Typography>
                        <Typography>아이콘</Typography>
                    </Stack>
                </MainCard>
            </Stack>
        </Stack>
    );
};

export default Dashboard;
