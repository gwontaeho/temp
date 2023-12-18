import { Typography, Stack, Button } from "@mui/material";
import { SubscriptionIcon } from "../../ui-component/icons/icons";
import MainCard from "../../ui-component/cards/MainCard";
import { LinkButton } from "../../ui-component/buttons/LinkButton";

export default function Subscription() {
    return (
        <Stack spacing={3}>
            <Typography variant="h2">
                {SubscriptionIcon()}
                <label style={{ marginLeft: "0.8rem" }}>구독현황</label>
            </Typography>
            <Stack spacing={1}>
                <Typography variant="subtitle1">구독 중인 요금제</Typography>
                <MainCard>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="notice">서비스를 구독해주세요.</Typography>
                        <Button color="primary">구독신청</Button>
                    </Stack>
                </MainCard>
            </Stack>
            <Stack spacing={1}>
                <Typography variant="subtitle1">결제 수단</Typography>
                <MainCard>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="notice">결제수단을 등록해주세요.</Typography>
                        <Button color="primary">결제수단 등록</Button>
                    </Stack>
                </MainCard>
            </Stack>
            <Stack spacing={1}>
                <Typography variant="subtitle1">U2Cloud 서비스</Typography>
                <MainCard>
                    <Stack spacing={3}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="body1">U2알리미</Typography>
                            <Button variant="text" sx={{ textDecoration: "underline" }}>
                                서비스 상세보기
                            </Button>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack>
                                <Typography variant="subtitle2" color="primary">
                                    지금 구독하면 첫 달 무료 이용
                                </Typography>
                                <Typography variant="caption">검진대상자 전용 검진안내 문자 발송 및 카카오 알림톡 발송 서비스</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Button>구독신청</Button>
                                <Button color="primary">무료 체험</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </MainCard>
            </Stack>
        </Stack>
    );
}
