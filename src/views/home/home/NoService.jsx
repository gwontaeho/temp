import { Typography, Stack, Divider, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const NoMaxWidthTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: "none",
    },
});

export const NoService = () => {
    const navigate = useNavigate();
    return (
        <Stack bgcolor="#fff" borderRadius={3} p={3} spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography fontWeight="bold">U2Cloud 서비스</Typography>
            </Stack>
            <Divider />
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography color="primary" variant="h6" fontWeight="bold">
                            U2
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                            알리미
                        </Typography>
                        <Typography color="primary" fontWeight="bold">
                            지금 구독하면 첫달 무료 이용, 200건 무료
                        </Typography>
                    </Stack>
                    <Button color="_gray" variant="text">
                        서비스 상세보기
                    </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography>검진대상자 전용 검진안내 문자 발송 및 카카오 알림톡 발송 서비스</Typography>
                    <Button color="_gray" onClick={() => navigate("/subscribe/list/create")}>
                        구독신청
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};
